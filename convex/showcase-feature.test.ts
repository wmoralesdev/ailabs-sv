import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'

const { assertCoverStorageWithinLimitMock, isAdminMock } = vi.hoisted(() => ({
  assertCoverStorageWithinLimitMock: vi.fn(),
  isAdminMock: vi.fn(),
}))

vi.mock('./lib/storage_limits', () => ({
  assertCoverStorageWithinLimit: assertCoverStorageWithinLimitMock,
}))

vi.mock('./lib/admin', () => ({
  isAdmin: isAdminMock,
}))

import * as showcase from './showcase'

type Status = 'shipped' | 'in_progress' | 'concept'

type ProfileDoc = {
  _id: string
  slug: string
  name: string
  title: string
  bio: string
  links: {
    linkedin?: string
    x?: string
  }
  ownerId: string
  createdAt: number
  updatedAt: number
  avatarUrl?: string
}

type ShowcaseEntryDoc = {
  _id: string
  title: string
  tagline: string
  description: string
  coverImageId: string
  coverImageUrl: string
  slug: string
  ownerId: string
  projectUrl?: string
  repoUrl?: string
  socialPostUrl?: string
  event?: string
  toolsUsed?: Array<string>
  collaboratorIds?: Array<string>
  status: Status
  featured?: boolean
  featuredAt?: number
  createdAt: number
  updatedAt: number
}

type TableMap = {
  profiles: Array<ProfileDoc>
  showcaseEntries: Array<ShowcaseEntryDoc>
}

type TableName = keyof TableMap
type TableDoc = TableMap[TableName][number]

let docSeq = 0

function nextId(prefix: string): string {
  docSeq += 1
  return `${prefix}-${docSeq}`
}

function makeProfile(overrides: Partial<ProfileDoc> = {}): ProfileDoc {
  const ownerId = overrides.ownerId ?? nextId('user')

  return {
    _id: overrides._id ?? nextId('profile'),
    slug: overrides.slug ?? ownerId,
    name: overrides.name ?? `User ${ownerId}`,
    title: overrides.title ?? 'Builder',
    bio: overrides.bio ?? 'Bio',
    links: overrides.links ?? {},
    ownerId,
    createdAt: overrides.createdAt ?? 100,
    updatedAt: overrides.updatedAt ?? 100,
    avatarUrl: overrides.avatarUrl,
  }
}

function makeEntry(
  overrides: Partial<ShowcaseEntryDoc> = {},
): ShowcaseEntryDoc {
  const ownerId = overrides.ownerId ?? nextId('user')
  const slug = overrides.slug ?? nextId('entry')

  return {
    _id: overrides._id ?? nextId('showcase'),
    title: overrides.title ?? 'Project',
    tagline: overrides.tagline ?? 'Tagline',
    description: overrides.description ?? 'Description',
    coverImageId: overrides.coverImageId ?? 'storage-1',
    coverImageUrl: overrides.coverImageUrl ?? 'https://img.test/project.png',
    slug,
    ownerId,
    projectUrl: overrides.projectUrl,
    repoUrl: overrides.repoUrl,
    socialPostUrl: overrides.socialPostUrl,
    event: overrides.event,
    toolsUsed: overrides.toolsUsed,
    collaboratorIds: overrides.collaboratorIds,
    status: overrides.status ?? 'shipped',
    featured: overrides.featured,
    featuredAt: overrides.featuredAt,
    createdAt: overrides.createdAt ?? 100,
    updatedAt: overrides.updatedAt ?? 100,
  }
}

class QueryBuilder<T extends TableDoc> {
  constructor(
    private readonly readDocs: () => Array<T>,
    private readonly filters: Array<[keyof T, unknown]> = [],
    private readonly direction?: 'asc' | 'desc',
  ) {}

  withIndex(
    _indexName: string,
    build: (query: {
      eq: <K extends keyof T>(field: K, value: T[K]) => unknown
    }) => unknown,
  ): QueryBuilder<T> {
    const nextFilters = [...this.filters]
    const query = {
      eq: <K extends keyof T>(field: K, value: T[K]) => {
        nextFilters.push([field, value])
        return query
      },
    }

    build(query)
    return new QueryBuilder(this.readDocs, nextFilters, this.direction)
  }

  order(direction: 'asc' | 'desc'): QueryBuilder<T> {
    return new QueryBuilder(this.readDocs, this.filters, direction)
  }

  async collect(): Promise<Array<T>> {
    return this.rows()
  }

  async first(): Promise<T | null> {
    return this.rows()[0] ?? null
  }

  async take(limit: number): Promise<Array<T>> {
    return this.rows().slice(0, limit)
  }

  private rows(): Array<T> {
    let rows = this.readDocs().filter((doc) =>
      this.filters.every(([field, value]) => doc[field] === value),
    )

    if (this.direction) {
      rows = [...rows].sort((a, b) => {
        const aTime = 'createdAt' in a ? Number(a.createdAt) : 0
        const bTime = 'createdAt' in b ? Number(b.createdAt) : 0
        return this.direction === 'desc' ? bTime - aTime : aTime - bTime
      })
    }

    return rows
  }
}

class TestDb {
  private readonly tables: TableMap

  constructor(seed: Partial<TableMap> = {}) {
    this.tables = {
      profiles: [...(seed.profiles ?? [])],
      showcaseEntries: [...(seed.showcaseEntries ?? [])],
    }
  }

  query<T extends TableName>(tableName: T): QueryBuilder<TableMap[T][number]> {
    return new QueryBuilder(() => [...this.tables[tableName]])
  }

  async get(id: string): Promise<TableDoc | null> {
    return this.findDoc(id) ?? null
  }

  async insert<T extends TableName>(
    tableName: T,
    value: Omit<TableMap[T][number], '_id'>,
  ): Promise<string> {
    const id = nextId(tableName)
    this.tables[tableName].push({ _id: id, ...value } as TableMap[T][number])
    return id
  }

  async patch(id: string, updates: Partial<TableDoc>): Promise<void> {
    const doc = this.findDoc(id)
    if (!doc) {
      throw new Error(`Missing doc ${id}`)
    }

    Object.assign(doc, updates)
  }

  async delete(id: string): Promise<void> {
    for (const tableName of Object.keys(this.tables) as Array<TableName>) {
      const index = this.tables[tableName].findIndex((doc) => doc._id === id)
      if (index >= 0) {
        this.tables[tableName].splice(index, 1)
        return
      }
    }
  }

  entries(): Array<ShowcaseEntryDoc> {
    return this.tables.showcaseEntries
  }

  profiles(): Array<ProfileDoc> {
    return this.tables.profiles
  }

  private findDoc(id: string): TableDoc | undefined {
    return [...this.tables.profiles, ...this.tables.showcaseEntries].find(
      (doc) => doc._id === id,
    )
  }
}

type HandlerContext = Parameters<typeof showcase.create._handler>[0]

function makeCtx(db: TestDb, userId?: string): HandlerContext {
  return {
    auth: {
      getUserIdentity: async () => (userId ? { subject: userId } : null),
    },
    db,
  } as HandlerContext
}

function baseCreateArgs() {
  return {
    title: 'Launch Pad',
    tagline: 'Fast prototype',
    description: 'A concise project description',
    coverImageId: 'storage-1' as never,
    coverImageUrl: 'https://img.test/launch-pad.png',
    projectUrl: 'https://launchpad.test',
    repoUrl: 'https://github.com/acme/launch-pad',
    socialPostUrl: 'https://x.com/acme/status/1',
    event: 'Demo Day',
    toolsUsed: ['cursor', 'react'],
    collaboratorIds: ['friend-1', 'friend-2'],
    status: 'shipped' as const,
  }
}

describe('showcase convex handlers', () => {
  beforeEach(() => {
    docSeq = 0
    vi.spyOn(Date, 'now').mockReturnValue(1_700_000_000_000)
    assertCoverStorageWithinLimitMock.mockReset()
    assertCoverStorageWithinLimitMock.mockResolvedValue(undefined)
    isAdminMock.mockReset()
    isAdminMock.mockReturnValue(false)
  })

  afterEach(() => {
    vi.restoreAllMocks()
  })

  it('creates a unique slug when the same user submits a duplicate project', async () => {
    const profile = makeProfile({ ownerId: 'user-alice', slug: 'alice' })
    const existing = makeEntry({
      ownerId: profile.ownerId,
      slug: 'alice-launch-pad',
      title: 'Launch Pad',
    })
    const db = new TestDb({ profiles: [profile], showcaseEntries: [existing] })
    const randomValue = 0.123456789
    const randomSpy = vi.spyOn(Math, 'random').mockReturnValue(randomValue)

    const slug = await showcase.create._handler(
      makeCtx(db, profile.ownerId),
      baseCreateArgs(),
    )

    const suffix = randomValue.toString(36).slice(2, 8)
    expect(slug).toBe(`alice-launch-pad-${suffix}`)
    expect(db.entries()).toHaveLength(2)
    expect(db.entries().map((entry) => entry.slug)).toEqual([
      'alice-launch-pad',
      `alice-launch-pad-${suffix}`,
    ])
    expect(randomSpy).toHaveBeenCalledOnce()
  })

  it('keeps the existing slug stable when a project is updated to a colliding title', async () => {
    const profile = makeProfile({ ownerId: 'user-alice', slug: 'alice' })
    const first = makeEntry({
      _id: 'showcase-a',
      ownerId: profile.ownerId,
      slug: 'alice-launch-pad',
      title: 'Launch Pad',
    })
    const second = makeEntry({
      _id: 'showcase-b',
      ownerId: profile.ownerId,
      slug: 'alice-signal-box',
      title: 'Signal Box',
      tagline: 'Original',
    })
    const db = new TestDb({
      profiles: [profile],
      showcaseEntries: [first, second],
    })

    await showcase.update._handler(makeCtx(db, profile.ownerId), {
      id: second._id as never,
      title: 'Launch Pad',
      tagline: 'Retitled',
    })

    const updated = db.entries().find((entry) => entry._id === second._id)
    expect(updated?.title).toBe('Launch Pad')
    expect(updated?.tagline).toBe('Retitled')
    expect(updated?.slug).toBe('alice-signal-box')
  })

  it('removes only the selected owned project', async () => {
    const owner = makeProfile({ ownerId: 'user-alice', slug: 'alice' })
    const sibling = makeEntry({
      _id: 'showcase-sibling',
      ownerId: owner.ownerId,
      slug: 'alice-second-project',
      title: 'Second Project',
    })
    const target = makeEntry({
      _id: 'showcase-target',
      ownerId: owner.ownerId,
      slug: 'alice-launch-pad',
      title: 'Launch Pad',
    })
    const someoneElse = makeEntry({
      _id: 'showcase-other-user',
      ownerId: 'user-bob',
      slug: 'bob-lighthouse',
      title: 'Lighthouse',
    })
    const db = new TestDb({
      profiles: [owner],
      showcaseEntries: [target, sibling, someoneElse],
    })

    await showcase.remove._handler(makeCtx(db, owner.ownerId), {
      id: target._id as never,
    })

    expect(db.entries().map((entry) => entry._id)).toEqual([
      sibling._id,
      someoneElse._id,
    ])
  })

  it("rejects deleting someone else's project", async () => {
    const owner = makeProfile({ ownerId: 'user-owner', slug: 'owner' })
    const intruder = makeProfile({ ownerId: 'user-intruder', slug: 'intruder' })
    const entry = makeEntry({
      _id: 'showcase-owner',
      ownerId: owner.ownerId,
      slug: 'owner-project',
      title: 'Owner Project',
    })
    const db = new TestDb({
      profiles: [owner, intruder],
      showcaseEntries: [entry],
    })

    await expect(
      showcase.remove._handler(makeCtx(db, intruder.ownerId), {
        id: entry._id as never,
      }),
    ).rejects.toThrow('You can only delete your own projects')

    expect(db.entries()).toHaveLength(1)
  })

  it('lists featured entries first and honors event, tool, and status filters', async () => {
    const alice = makeProfile({
      ownerId: 'user-alice',
      slug: 'alice',
      name: 'Alice',
    })
    const bob = makeProfile({ ownerId: 'user-bob', slug: 'bob', name: 'Bob' })
    const entries = [
      makeEntry({
        _id: 'featured-match',
        ownerId: alice.ownerId,
        slug: 'alice-featured',
        title: 'Featured Match',
        event: 'Demo Day',
        toolsUsed: ['cursor', 'react'],
        status: 'shipped',
        featured: true,
        createdAt: 300,
      }),
      makeEntry({
        _id: 'recent-match',
        ownerId: bob.ownerId,
        slug: 'bob-recent',
        title: 'Recent Match',
        event: 'Demo Day',
        toolsUsed: ['cursor'],
        status: 'shipped',
        createdAt: 400,
      }),
      makeEntry({
        _id: 'wrong-tool',
        ownerId: bob.ownerId,
        slug: 'bob-wrong-tool',
        title: 'Wrong Tool',
        event: 'Demo Day',
        toolsUsed: ['figma'],
        status: 'shipped',
        createdAt: 500,
      }),
      makeEntry({
        _id: 'wrong-status',
        ownerId: alice.ownerId,
        slug: 'alice-wrong-status',
        title: 'Wrong Status',
        event: 'Demo Day',
        toolsUsed: ['cursor'],
        status: 'concept',
        createdAt: 600,
      }),
    ]
    const db = new TestDb({ profiles: [alice, bob], showcaseEntries: entries })

    const result = await showcase.list._handler(makeCtx(db), {
      event: 'Demo Day',
      tool: 'cursor',
      status: 'shipped',
      limit: 10,
    })

    expect(result.items.map((entry) => entry._id)).toEqual([
      'featured-match',
      'recent-match',
    ])
    expect(result.items[0]?.author).toEqual({
      name: 'Alice',
      slug: 'alice',
      avatarUrl: undefined,
    })
  })

  it('returns detail payload with author and only existing collaborator profiles', async () => {
    const author = makeProfile({
      ownerId: 'user-alice',
      slug: 'alice',
      name: 'Alice',
    })
    const collaborator = makeProfile({
      ownerId: 'user-bob',
      slug: 'bob',
      name: 'Bob',
      avatarUrl: 'https://img.test/bob.png',
    })
    const entry = makeEntry({
      ownerId: author.ownerId,
      slug: 'alice-launch-pad',
      collaboratorIds: [collaborator.ownerId, 'missing-user'],
    })
    const db = new TestDb({
      profiles: [author, collaborator],
      showcaseEntries: [entry],
    })

    const result = await showcase.getBySlug._handler(makeCtx(db), {
      slug: entry.slug,
    })

    expect(result?.author).toEqual({
      name: 'Alice',
      slug: 'alice',
      avatarUrl: undefined,
    })
    expect(result?.collaborators).toEqual([
      {
        name: 'Bob',
        slug: 'bob',
        avatarUrl: 'https://img.test/bob.png',
      },
    ])
  })

  it('previews the base slug and flags duplicates for signed-in users with a profile', async () => {
    const profile = makeProfile({ ownerId: 'user-alice', slug: 'alice' })
    const entry = makeEntry({
      ownerId: profile.ownerId,
      slug: 'alice-launch-pad',
      title: 'Launch Pad',
    })
    const db = new TestDb({ profiles: [profile], showcaseEntries: [entry] })

    const result = await showcase.previewSlugForTitle._handler(
      makeCtx(db, profile.ownerId),
      { title: 'Launch Pad' },
    )

    expect(result).toEqual({
      slug: 'alice-launch-pad',
      baseIsTaken: true,
    })
  })

  it('returns null from slug preview when the viewer is signed out, missing a profile, or over the title limit', async () => {
    const profile = makeProfile({ ownerId: 'user-alice', slug: 'alice' })
    const db = new TestDb({ profiles: [profile] })

    await expect(
      showcase.previewSlugForTitle._handler(makeCtx(db), {
        title: 'Launch Pad',
      }),
    ).resolves.toBeNull()
    await expect(
      showcase.previewSlugForTitle._handler(
        makeCtx(new TestDb(), 'user-missing'),
        {
          title: 'Launch Pad',
        },
      ),
    ).resolves.toBeNull()
    await expect(
      showcase.previewSlugForTitle._handler(makeCtx(db, profile.ownerId), {
        title: 'x'.repeat(81),
      }),
    ).resolves.toBeNull()
  })

  it('reports slug availability for invalid, taken, and self-excluded slugs', async () => {
    const entry = makeEntry({
      _id: 'showcase-1',
      slug: 'alice-launch-pad',
      ownerId: 'user-alice',
    })
    const db = new TestDb({ showcaseEntries: [entry] })

    await expect(
      showcase.isSlugAvailable._handler(makeCtx(db), { slug: 'Bad Slug!' }),
    ).resolves.toEqual({ available: false, reason: 'invalid' })
    await expect(
      showcase.isSlugAvailable._handler(makeCtx(db), { slug: entry.slug }),
    ).resolves.toEqual({ available: false, reason: 'taken' })
    await expect(
      showcase.isSlugAvailable._handler(makeCtx(db), {
        slug: entry.slug,
        excludeId: entry._id as never,
      }),
    ).resolves.toEqual({ available: true })
  })

  it('creates trimmed records, caps collaborators, and records timestamps', async () => {
    const profile = makeProfile({ ownerId: 'user-alice', slug: 'alice' })
    const db = new TestDb({ profiles: [profile] })

    const slug = await showcase.create._handler(makeCtx(db, profile.ownerId), {
      ...baseCreateArgs(),
      title: '  Launch Pad  ',
      tagline: '  Fast prototype  ',
      description: '  A concise project description  ',
      collaboratorIds: ['u1', 'u2', 'u3', 'u4', 'u5', 'u6'],
    })

    const created = db.entries()[0]
    expect(slug).toBe('alice-launch-pad')
    expect(created).toMatchObject({
      title: 'Launch Pad',
      tagline: 'Fast prototype',
      description: 'A concise project description',
      slug: 'alice-launch-pad',
      ownerId: profile.ownerId,
      createdAt: 1_700_000_000_000,
      updatedAt: 1_700_000_000_000,
    })
    expect(created?.collaboratorIds).toEqual(['u1', 'u2', 'u3', 'u4', 'u5'])
    expect(assertCoverStorageWithinLimitMock).toHaveBeenCalledWith(
      expect.objectContaining({ db }),
      'storage-1',
    )
  })

  it('rejects create when authentication or profile is missing', async () => {
    const db = new TestDb()
    const profilelessDb = new TestDb({
      profiles: [makeProfile({ ownerId: 'user-other', slug: 'other' })],
    })

    await expect(
      showcase.create._handler(makeCtx(db), baseCreateArgs()),
    ).rejects.toThrow('Must be signed in to submit a project')
    await expect(
      showcase.create._handler(
        makeCtx(profilelessDb, 'user-missing'),
        baseCreateArgs(),
      ),
    ).rejects.toThrow('Complete your profile before submitting a project')
  })

  it('updates owned projects with trimmed values and capped collaborators', async () => {
    const profile = makeProfile({ ownerId: 'user-alice', slug: 'alice' })
    const entry = makeEntry({
      _id: 'showcase-update',
      ownerId: profile.ownerId,
      slug: 'alice-launch-pad',
      title: 'Launch Pad',
      tagline: 'Original',
      description: 'Original description',
      collaboratorIds: ['u1'],
    })
    const db = new TestDb({ profiles: [profile], showcaseEntries: [entry] })

    await showcase.update._handler(makeCtx(db, profile.ownerId), {
      id: entry._id as never,
      title: '  Updated Title  ',
      tagline: '  Updated Tagline  ',
      description: '  Updated Description  ',
      collaboratorIds: ['a', 'b', 'c', 'd', 'e', 'f'],
      coverImageId: 'storage-2' as never,
      coverImageUrl: 'https://img.test/updated.png',
      status: 'in_progress',
    })

    expect(db.entries()[0]).toMatchObject({
      title: 'Updated Title',
      tagline: 'Updated Tagline',
      description: 'Updated Description',
      slug: 'alice-launch-pad',
      status: 'in_progress',
      collaboratorIds: ['a', 'b', 'c', 'd', 'e'],
      coverImageId: 'storage-2',
      coverImageUrl: 'https://img.test/updated.png',
      updatedAt: 1_700_000_000_000,
    })
    expect(assertCoverStorageWithinLimitMock).toHaveBeenCalledWith(
      expect.objectContaining({ db }),
      'storage-2',
    )
  })

  it('rejects updates for non-owners and oversized fields', async () => {
    const owner = makeProfile({ ownerId: 'user-owner', slug: 'owner' })
    const intruder = makeProfile({ ownerId: 'user-intruder', slug: 'intruder' })
    const entry = makeEntry({
      _id: 'showcase-owned',
      ownerId: owner.ownerId,
      slug: 'owner-project',
      title: 'Owner Project',
    })
    const db = new TestDb({
      profiles: [owner, intruder],
      showcaseEntries: [entry],
    })

    await expect(
      showcase.update._handler(makeCtx(db, intruder.ownerId), {
        id: entry._id as never,
        tagline: 'Try edit',
      }),
    ).rejects.toThrow('You can only edit your own projects')

    await expect(
      showcase.update._handler(makeCtx(db, owner.ownerId), {
        id: entry._id as never,
        title: 'x'.repeat(81),
      }),
    ).rejects.toThrow('Title must be 80 characters or less')
  })

  it('lists showcase entries for a specific owner only', async () => {
    const alice = makeProfile({ ownerId: 'user-alice', slug: 'alice' })
    const bob = makeProfile({ ownerId: 'user-bob', slug: 'bob' })
    const db = new TestDb({
      profiles: [alice, bob],
      showcaseEntries: [
        makeEntry({
          _id: 'alice-oldest',
          ownerId: alice.ownerId,
          slug: 'alice-oldest',
          createdAt: 100,
        }),
        makeEntry({
          _id: 'alice-newest',
          ownerId: alice.ownerId,
          slug: 'alice-newest',
          createdAt: 300,
        }),
        makeEntry({
          _id: 'bob-only',
          ownerId: bob.ownerId,
          slug: 'bob-only',
          createdAt: 400,
        }),
      ],
    })

    const result = await showcase.listByOwner._handler(makeCtx(db), {
      ownerId: alice.ownerId,
      limit: 6,
    })

    expect(result.map((entry) => entry._id)).toEqual([
      'alice-newest',
      'alice-oldest',
    ])
    expect(result.every((entry) => entry.ownerId === alice.ownerId)).toBe(true)
  })

  it('toggles featured status for admins only', async () => {
    const entry = makeEntry({
      _id: 'showcase-admin',
      ownerId: 'user-owner',
      slug: 'owner-project',
      featured: false,
    })
    const db = new TestDb({ showcaseEntries: [entry] })

    await expect(
      showcase.toggleFeatured._handler(makeCtx(db, 'user-owner'), {
        id: entry._id as never,
      }),
    ).rejects.toThrow('Admin only')

    isAdminMock.mockReturnValue(true)

    await showcase.toggleFeatured._handler(makeCtx(db, 'user-admin'), {
      id: entry._id as never,
    })

    expect(db.entries()[0]?.featured).toBe(true)
    expect(db.entries()[0]?.featuredAt).toBe(1_700_000_000_000)
  })
})
