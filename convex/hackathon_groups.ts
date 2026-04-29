import { v } from "convex/values";
import { mutation, query } from "./_generated/server";
import { assertCoverStorageWithinLimit } from "./lib/storage_limits";
import type { Doc } from "./_generated/dataModel";

const statusValidator = v.union(
  v.literal("shipped"),
  v.literal("in_progress"),
  v.literal("concept")
);

const HACKATHON_SLUG_MAX_LEN = 120;

type ProjectStatus = "shipped" | "in_progress" | "concept";

function slugSegment(raw: string): string {
  return raw
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "");
}

function slugFromText(raw: string): string {
  const s = slugSegment(raw);
  return s.slice(0, 40).replace(/^-|-$/g, "") || "";
}

function baseHackathonSlug(
  profileSlug: string,
  groupName: string,
  title: string
): string {
  const userPart = slugSegment(profileSlug) || "builder";
  const groupPart = slugFromText(groupName) || "group";
  const titlePart = slugFromText(title) || "project";
  const base = `${userPart}-${groupPart}-${titlePart}`
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "");
  return base.slice(0, HACKATHON_SLUG_MAX_LEN).replace(/-+$/g, "");
}

function randomSuffix(): string {
  return Math.random().toString(36).slice(2, 8);
}

function snapshotFromProject(project: {
  groupName: string;
  title: string;
  tagline: string;
  description: string;
  coverImageUrl: string;
  projectUrl?: string;
  repoUrl?: string;
  socialPostUrl?: string;
  toolsUsed?: Array<string>;
  status: ProjectStatus;
}) {
  return {
    groupName: project.groupName,
    title: project.title,
    tagline: project.tagline,
    description: project.description,
    coverImageUrl: project.coverImageUrl,
    projectUrl: project.projectUrl,
    repoUrl: project.repoUrl,
    socialPostUrl: project.socialPostUrl,
    toolsUsed: project.toolsUsed,
    status: project.status,
  };
}

function validateCommonFields(args: {
  groupName?: string;
  title?: string;
  tagline?: string;
  description?: string;
}) {
  if (args.groupName !== undefined) {
    const trimmed = args.groupName.trim();
    if (trimmed.length === 0 || trimmed.length > 80) {
      throw new Error("Group name must be between 1 and 80 characters");
    }
  }
  if (args.title !== undefined && args.title.length > 80) {
    throw new Error("Title must be 80 characters or less");
  }
  if (args.tagline !== undefined && args.tagline.length > 120) {
    throw new Error("Tagline must be 120 characters or less");
  }
  if (args.description !== undefined && args.description.length > 1500) {
    throw new Error("Description must be 1500 characters or less");
  }
}

export const getMySession = query({
  args: {},
  handler: async (ctx) => {
    const identity = await ctx.auth.getUserIdentity();
    const ownerId = identity?.subject;
    if (!ownerId) return null;

    const session = await ctx.db
      .query("hackathonGroupSessions")
      .withIndex("by_owner_startedAt", (q) => q.eq("ownerId", ownerId))
      .order("desc")
      .first();
    if (!session) return null;

    const projects = await ctx.db
      .query("hackathonGroupProjects")
      .withIndex("by_session_createdAt", (q) => q.eq("sessionId", session._id))
      .collect();

    return {
      ...session,
      projectCount: projects.length,
    };
  },
});

export const isSessionStarted = query({
  args: {},
  handler: async (ctx) => {
    const identity = await ctx.auth.getUserIdentity();
    const ownerId = identity?.subject;
    if (!ownerId) return false;
    const session = await ctx.db
      .query("hackathonGroupSessions")
      .withIndex("by_owner_startedAt", (q) => q.eq("ownerId", ownerId))
      .order("desc")
      .first();
    return !!session;
  },
});

export const startSession = mutation({
  args: {},
  handler: async (ctx) => {
    const identity = await ctx.auth.getUserIdentity();
    const ownerId = identity?.subject;
    if (!ownerId) {
      throw new Error("Must be signed in to start a hackathon session");
    }

    const existing = await ctx.db
      .query("hackathonGroupSessions")
      .withIndex("by_owner_startedAt", (q) => q.eq("ownerId", ownerId))
      .order("desc")
      .first();
    if (existing) return existing._id;

    const now = Date.now();
    return await ctx.db.insert("hackathonGroupSessions", {
      ownerId,
      startedAt: now,
      createdAt: now,
      updatedAt: now,
    });
  },
});

export const list = query({
  args: {
    status: v.optional(statusValidator),
    limit: v.optional(v.number()),
  },
  handler: async (ctx, args) => {
    const limit = Math.min(args.limit ?? 24, 50);
    let projects = await ctx.db
      .query("hackathonGroupProjects")
      .order("desc")
      .collect();

    if (args.status) {
      projects = projects.filter((p) => p.status === args.status);
    }

    const page = projects.slice(0, limit);
    const profiles = await Promise.all(
      page.map((project) =>
        ctx.db
          .query("profiles")
          .withIndex("by_owner", (q) => q.eq("ownerId", project.ownerId))
          .first()
      )
    );

    return {
      items: page.map((project, index) => ({
        ...project,
        author: profiles[index]
          ? {
              name: profiles[index].name,
              slug: profiles[index].slug,
              avatarUrl: profiles[index].avatarUrl,
            }
          : null,
      })),
    };
  },
});

export const getById = query({
  args: { id: v.id("hackathonGroupProjects") },
  handler: async (ctx, args) => {
    const project = await ctx.db.get(args.id);
    if (!project) return null;
    return project;
  },
});

export const getBySlug = query({
  args: { slug: v.string() },
  handler: async (ctx, args) => {
    const project = await ctx.db
      .query("hackathonGroupProjects")
      .withIndex("by_slug", (q) => q.eq("slug", args.slug))
      .first();
    if (!project) return null;

    const author = await ctx.db
      .query("profiles")
      .withIndex("by_owner", (q) => q.eq("ownerId", project.ownerId))
      .first();
    const history = await ctx.db
      .query("hackathonGroupProjectHistory")
      .withIndex("by_project_createdAt", (q) => q.eq("projectId", project._id))
      .order("desc")
      .collect();

    return {
      ...project,
      author: author
        ? { name: author.name, slug: author.slug, avatarUrl: author.avatarUrl }
        : null,
      history,
    };
  },
});

export const getHackathonGroupSeoBySlug = query({
  args: { slug: v.string() },
  handler: async (ctx, args) => {
    const project = await ctx.db
      .query("hackathonGroupProjects")
      .withIndex("by_slug", (q) => q.eq("slug", args.slug))
      .first();
    if (!project) return null;
    const description =
      project.tagline.trim().slice(0, 160) ||
      project.description.trim().slice(0, 160);
    return {
      title: `${project.groupName} · ${project.title}`,
      description,
      imageUrl: project.coverImageUrl,
    };
  },
});

export const previewSlugForTitle = query({
  args: { title: v.string(), groupName: v.string() },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    const ownerId = identity?.subject;
    if (!ownerId) return null;

    const session = await ctx.db
      .query("hackathonGroupSessions")
      .withIndex("by_owner_startedAt", (q) => q.eq("ownerId", ownerId))
      .order("desc")
      .first();
    if (!session) return null;

    const profile = await ctx.db
      .query("profiles")
      .withIndex("by_owner", (q) => q.eq("ownerId", ownerId))
      .first();
    if (!profile) return null;

    const title = args.title.trim();
    const groupName = args.groupName.trim();
    if (!title || !groupName) return null;

    const base = baseHackathonSlug(profile.slug, groupName, title);
    const existing = await ctx.db
      .query("hackathonGroupProjects")
      .withIndex("by_slug", (q) => q.eq("slug", base))
      .first();

    return { slug: base, baseIsTaken: !!existing };
  },
});

export const create = mutation({
  args: {
    groupName: v.string(),
    title: v.string(),
    tagline: v.string(),
    description: v.string(),
    coverImageId: v.id("_storage"),
    coverImageUrl: v.string(),
    projectUrl: v.optional(v.string()),
    repoUrl: v.optional(v.string()),
    socialPostUrl: v.optional(v.string()),
    toolsUsed: v.optional(v.array(v.string())),
    status: statusValidator,
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    const ownerId = identity?.subject;
    if (!ownerId) {
      throw new Error("Must be signed in to submit a hackathon project");
    }

    const session = await ctx.db
      .query("hackathonGroupSessions")
      .withIndex("by_owner_startedAt", (q) => q.eq("ownerId", ownerId))
      .order("desc")
      .first();
    if (!session) {
      throw new Error("Start your hackathon session before uploading projects");
    }

    const profile = await ctx.db
      .query("profiles")
      .withIndex("by_owner", (q) => q.eq("ownerId", ownerId))
      .first();
    if (!profile) {
      throw new Error("Complete your profile before submitting a project");
    }

    validateCommonFields({
      groupName: args.groupName,
      title: args.title,
      tagline: args.tagline,
      description: args.description,
    });
    await assertCoverStorageWithinLimit(ctx, args.coverImageId);

    const baseSlug = baseHackathonSlug(profile.slug, args.groupName, args.title);
    let slug = baseSlug;
    let attempts = 0;
    let slugAvailable = false;
    while (attempts < 20) {
      const taken = await ctx.db
        .query("hackathonGroupProjects")
        .withIndex("by_slug", (q) => q.eq("slug", slug))
        .first();
      if (!taken) {
        slugAvailable = true;
        break;
      }
      const suffix = randomSuffix();
      const withSuffix = `${baseSlug}-${suffix}`.replace(/-+/g, "-");
      slug =
        withSuffix.length > HACKATHON_SLUG_MAX_LEN
          ? `${baseSlug.slice(0, HACKATHON_SLUG_MAX_LEN - suffix.length - 1)}-${suffix}`
          : withSuffix;
      attempts++;
    }
    if (!slugAvailable) {
      throw new Error("Could not allocate a unique URL. Try a different title.");
    }

    const now = Date.now();
    const projectId = await ctx.db.insert("hackathonGroupProjects", {
      sessionId: session._id,
      ownerId,
      slug,
      groupName: args.groupName.trim(),
      title: args.title.trim(),
      tagline: args.tagline.trim(),
      description: args.description.trim(),
      coverImageId: args.coverImageId,
      coverImageUrl: args.coverImageUrl,
      projectUrl: args.projectUrl,
      repoUrl: args.repoUrl,
      socialPostUrl: args.socialPostUrl,
      toolsUsed: args.toolsUsed,
      status: args.status,
      createdAt: now,
      updatedAt: now,
    });

    await ctx.db.insert("hackathonGroupProjectHistory", {
      projectId,
      ownerId,
      action: "created",
      snapshot: snapshotFromProject({
        groupName: args.groupName.trim(),
        title: args.title.trim(),
        tagline: args.tagline.trim(),
        description: args.description.trim(),
        coverImageUrl: args.coverImageUrl,
        projectUrl: args.projectUrl,
        repoUrl: args.repoUrl,
        socialPostUrl: args.socialPostUrl,
        toolsUsed: args.toolsUsed,
        status: args.status,
      }),
      createdAt: now,
    });
    await ctx.db.patch(session._id, { updatedAt: now });

    return slug;
  },
});

export const update = mutation({
  args: {
    id: v.id("hackathonGroupProjects"),
    groupName: v.optional(v.string()),
    title: v.optional(v.string()),
    tagline: v.optional(v.string()),
    description: v.optional(v.string()),
    coverImageId: v.optional(v.id("_storage")),
    coverImageUrl: v.optional(v.string()),
    projectUrl: v.optional(v.string()),
    repoUrl: v.optional(v.string()),
    socialPostUrl: v.optional(v.string()),
    toolsUsed: v.optional(v.array(v.string())),
    status: v.optional(statusValidator),
    historyNote: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    const ownerId = identity?.subject;
    if (!ownerId) {
      throw new Error("Must be signed in to update a project");
    }

    const existing = await ctx.db.get(args.id);
    if (!existing) throw new Error("Project not found");
    if (existing.ownerId !== ownerId) {
      throw new Error("You can only edit your own projects");
    }

    validateCommonFields({
      groupName: args.groupName,
      title: args.title,
      tagline: args.tagline,
      description: args.description,
    });
    if (args.coverImageId !== undefined) {
      await assertCoverStorageWithinLimit(ctx, args.coverImageId);
    }

    const updates: Partial<Doc<"hackathonGroupProjects">> = {
      updatedAt: Date.now(),
    };
    if (args.groupName !== undefined) updates.groupName = args.groupName.trim();
    if (args.title !== undefined) updates.title = args.title.trim();
    if (args.tagline !== undefined) updates.tagline = args.tagline.trim();
    if (args.description !== undefined) updates.description = args.description.trim();
    if (args.coverImageId !== undefined) updates.coverImageId = args.coverImageId;
    if (args.coverImageUrl !== undefined) updates.coverImageUrl = args.coverImageUrl;
    if (args.projectUrl !== undefined) updates.projectUrl = args.projectUrl;
    if (args.repoUrl !== undefined) updates.repoUrl = args.repoUrl;
    if (args.socialPostUrl !== undefined) updates.socialPostUrl = args.socialPostUrl;
    if (args.toolsUsed !== undefined) updates.toolsUsed = args.toolsUsed;
    if (args.status !== undefined) updates.status = args.status;

    await ctx.db.patch(args.id, updates);
    const next = { ...existing, ...updates };
    const historyNow = Date.now();

    await ctx.db.insert("hackathonGroupProjectHistory", {
      projectId: existing._id,
      ownerId,
      action: "updated",
      note: args.historyNote?.trim() || undefined,
      snapshot: snapshotFromProject({
        groupName: next.groupName,
        title: next.title,
        tagline: next.tagline,
        description: next.description,
        coverImageUrl: next.coverImageUrl,
        projectUrl: next.projectUrl,
        repoUrl: next.repoUrl,
        socialPostUrl: next.socialPostUrl,
        toolsUsed: next.toolsUsed,
        status: next.status,
      }),
      createdAt: historyNow,
    });
    await ctx.db.patch(existing.sessionId, { updatedAt: historyNow });

    return args.id;
  },
});

export const remove = mutation({
  args: { id: v.id("hackathonGroupProjects") },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    const ownerId = identity?.subject;
    if (!ownerId) {
      throw new Error("Must be signed in to delete a project");
    }

    const existing = await ctx.db.get(args.id);
    if (!existing) throw new Error("Project not found");
    if (existing.ownerId !== ownerId) {
      throw new Error("You can only delete your own projects");
    }

    await ctx.db.delete(args.id);
    return args.id;
  },
});

export const listPublicUrls = query({
  args: {},
  handler: async (ctx) => {
    const projects = await ctx.db.query("hackathonGroupProjects").collect();
    return projects.map((project) => ({
      slug: project.slug,
      lastmod: project.updatedAt,
    }));
  },
});
