import { createFileRoute } from "@tanstack/react-router";
import { seoCopyEs } from "@/content/seo-copy";
import { buildHomeJsonLd, buildSeoMeta } from "@/lib/seo-meta";
import { FounderSection } from "@/components/sections/founder-section";
import { CommunityMembersSection } from "@/components/sections/community-members-section";
import { EventsSection } from "@/components/sections/events-section";
import { HeroSection } from "@/components/sections/hero-section";
import { HighlightsSection } from "@/components/sections/highlights-section";
import { JoinCtaSection } from "@/components/sections/join-cta-section";
import { LearningPreviewSection } from "@/components/sections/learning-preview-section";
import { CommunityProofBentoSection } from "@/components/sections/community-proof-bento-section";
import { StatsSection } from "@/components/sections/stats-section";
import { TestimonialsSection } from "@/components/sections/testimonials-section";
import { WhatHappensHereSection } from "@/components/sections/what-happens-here-section";
import { WhySection } from "@/components/sections/why-section";
import { RevealOnScroll } from "@/components/reveal-on-scroll";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";

export const Route = createFileRoute("/")({
  head: () => {
    const { meta, links } = buildSeoMeta({
      path: "/",
      title: seoCopyEs.home.title,
      description: seoCopyEs.home.description,
    });
    return {
      meta: [
        ...meta,
        { "script:ld+json": buildHomeJsonLd() },
      ],
      links,
    };
  },
  component: Index,
});

function Index() {
  return (
    <>
      <SiteHeader />
      <div className="min-h-dvh bg-background text-foreground font-sans selection:bg-primary selection:text-primary-foreground overflow-x-hidden motion-safe:animate-page-in">
        <main>
          <HeroSection />
          <StatsSection />
          <RevealOnScroll>
            <CommunityProofBentoSection />
          </RevealOnScroll>
          <RevealOnScroll>
            <WhySection />
          </RevealOnScroll>
          <RevealOnScroll>
            <WhatHappensHereSection />
          </RevealOnScroll>
          <RevealOnScroll>
            <CommunityMembersSection />
          </RevealOnScroll>
          <RevealOnScroll>
            <TestimonialsSection />
          </RevealOnScroll>
          <RevealOnScroll>
            <LearningPreviewSection />
          </RevealOnScroll>
          <RevealOnScroll>
            <EventsSection />
          </RevealOnScroll>
          <RevealOnScroll>
            <FounderSection />
          </RevealOnScroll>
          <RevealOnScroll>
            <HighlightsSection />
          </RevealOnScroll>
          <RevealOnScroll>
            <JoinCtaSection />
          </RevealOnScroll>
        </main>

        <SiteFooter />
      </div>
    </>
  );
}
