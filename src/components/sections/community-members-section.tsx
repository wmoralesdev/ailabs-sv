import { useMemo } from "react";
import { Link } from "@tanstack/react-router";
import { useQuery } from "convex/react";
import { api } from "convex/_generated/api";
import { useI18n } from "@/lib/i18n";
import { SectionHeader } from "@/components/section-header";
import { SocialLinks } from "@/components/social-links";
import { formatWithBrandText } from "@/components/brand-text";

const SPOTLIGHT_LIMIT = 12;

function MemberCard({
  slug,
  name,
  tagline,
  bio,
  avatarUrl,
  links,
}: {
  slug: string;
  name: string;
  tagline?: string;
  bio: string;
  avatarUrl?: string;
  links: { linkedin?: string; x?: string };
}) {
  const line = tagline?.trim() ? tagline : bio;
  const socials = {
    twitter: links.x,
    linkedin: links.linkedin,
  };

  return (
    <article className="group interactive-lift flex w-[300px] shrink-0 flex-col gap-4 rounded-[1.5rem] border border-border/70 bg-card/70 p-5 text-left md:w-[330px]">
      <Link
        to="/community/$slug"
        params={{ slug }}
        className="flex flex-col gap-4 text-left outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
      >
        <div className="flex items-start justify-between">
          <div className="relative">
            {avatarUrl ? (
              <img
                src={avatarUrl}
                alt=""
                className="size-14 rounded-2xl object-cover transition-transform duration-300 motion-safe:group-hover:scale-105"
              />
            ) : (
              <div className="flex size-14 items-center justify-center rounded-2xl border border-primary/20 bg-primary/10 text-base font-bold text-primary transition-transform duration-300 motion-safe:group-hover:scale-105">
                {name.charAt(0)}
              </div>
            )}
          </div>
        </div>
        <div>
          <p className="font-display text-xl font-medium leading-tight tracking-[-0.03em]">
            {name}
          </p>
        </div>
        <p className="line-clamp-3 whitespace-normal text-sm font-light leading-relaxed text-foreground/65">
          {formatWithBrandText(line)}
        </p>
      </Link>
      {(socials.twitter || socials.linkedin) && (
        <SocialLinks socials={socials} variant="minimal" />
      )}
    </article>
  );
}

function LoadingMarquee() {
  return (
    <div className="mt-12 overflow-hidden py-4">
      <div className="flex items-stretch gap-5 whitespace-nowrap px-6 motion-reduce:overflow-x-auto motion-reduce:animate-none motion-reduce:scrollbar-hide animate-marquee hover:paused">
        {Array.from({ length: 8 }).map((_, i) => (
          <div
            key={i}
            className="flex w-[300px] shrink-0 flex-col gap-4 rounded-[1.5rem] border border-border/70 bg-card/70 p-5"
          >
            <div className="size-10 animate-pulse rounded-full bg-muted" />
            <div className="h-4 w-32 animate-pulse rounded bg-muted" />
            <div className="h-10 w-full animate-pulse rounded bg-muted/80" />
          </div>
        ))}
      </div>
    </div>
  );
}

export function CommunityMembersSection() {
  const { t } = useI18n();
  const seed = useMemo(
    () => Math.floor(Math.random() * 0x7fffffff),
    [],
  );
  const members = useQuery(api.profiles.publicSpotlight, {
    limit: SPOTLIGHT_LIMIT,
    seed,
  });

  return (
    <section
      id="community"
      className="section-editorial py-20 md:py-28"
    >
      <div className="container mx-auto px-4">
        <div className="max-w-4xl">
          <SectionHeader
            eyebrow={t.ui.communityMembers.badge}
            title={t.ui.communityMembers.title}
            description={t.ui.communityMembers.desc}
            align="left"
          />
        </div>
      </div>

      {members === undefined ? (
        <LoadingMarquee />
      ) : members.length === 0 ? (
        <p className="mx-auto mt-10 max-w-md px-4 text-center text-sm text-muted-foreground">
          {t.ui.communityMembers.emptyState}
        </p>
      ) : (
        <div className="mt-12 overflow-hidden py-4">
          <div className="flex items-stretch gap-5 whitespace-nowrap px-6 motion-reduce:overflow-x-auto motion-reduce:animate-none motion-reduce:scrollbar-hide animate-marquee hover:paused">
            {[...members, ...members].map((member, index) => (
              <MemberCard
                key={`${member.slug}-${index}`}
                slug={member.slug}
                name={member.name}
                tagline={member.tagline}
                bio={member.bio}
                avatarUrl={member.avatarUrl}
                links={member.links}
              />
            ))}
          </div>
        </div>
      )}
    </section>
  );
}
