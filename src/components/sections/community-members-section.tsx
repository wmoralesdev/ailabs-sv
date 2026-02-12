import { useI18n } from "@/lib/i18n";
import { SectionHeader } from "@/components/section-header";
import { SocialLinks } from "@/components/social-links";

export function CommunityMembersSection() {
  const { t } = useI18n();
  const members = t.communityMembers;

  return (
    <section
      id="community"
      className="section-spacing border-y border-border/50 bg-muted/20"
    >
      <div className="container mx-auto px-4">
        <SectionHeader
          eyebrow={t.ui.communityMembers.badge}
          title={t.ui.communityMembers.title}
          description={t.ui.communityMembers.desc}
          align="center"
        />
      </div>

      <div className="mt-12 overflow-hidden py-4">
        <div className="flex items-stretch gap-6 whitespace-nowrap px-6 motion-reduce:overflow-x-auto motion-reduce:animate-none motion-reduce:scrollbar-hide animate-marquee hover:paused">
          {[...members, ...members].map((member, index) => (
            <article
              key={index}
              className="group flex w-[260px] shrink-0 cursor-default flex-col gap-4 rounded-xl border border-border bg-card p-6 text-left shadow-sm transition-all duration-300 hover:border-primary/30 hover:shadow-md"
            >
              <div className="flex items-start justify-between">
                <div className="relative">
                  {member.avatar ? (
                    <img
                      src={member.avatar}
                      alt={member.name}
                      className="size-10 rounded-full object-cover transition-transform duration-300 motion-safe:group-hover:scale-105"
                    />
                  ) : (
                    <div className="flex size-10 items-center justify-center rounded-full border border-primary/20 bg-primary/10 text-base font-bold text-primary transition-transform duration-300 motion-safe:group-hover:scale-105">
                      {member.name.charAt(0)}
                    </div>
                  )}
                </div>
              </div>
              <div>
                <p className="text-base font-medium">{member.name}</p>
              </div>
              <p className="line-clamp-2 whitespace-normal text-sm font-light text-foreground/60">
                {member.bio}
              </p>
              {member.socials &&
              (member.socials.twitter ||
                member.socials.linkedin ||
                member.socials.github) ? (
                <SocialLinks socials={member.socials} />
              ) : null}
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
