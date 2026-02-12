import { createFileRoute } from "@tanstack/react-router";
import { AmbassadorSection } from "@/components/sections/ambassador-section";
import { CommunityMembersSection } from "@/components/sections/community-members-section";
import { EventsSection } from "@/components/sections/events-section";
import { HeroSection } from "@/components/sections/hero-section";
import { HighlightsSection } from "@/components/sections/highlights-section";
import { JoinCtaSection } from "@/components/sections/join-cta-section";
import { LearningPreviewSection } from "@/components/sections/learning-preview-section";
import { StatsSection } from "@/components/sections/stats-section";
import { TestimonialsSection } from "@/components/sections/testimonials-section";
import { WhatHappensHereSection } from "@/components/sections/what-happens-here-section";
import { WhySection } from "@/components/sections/why-section";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";

export const Route = createFileRoute("/")({
  component: Index,
});

function Index() {
  return (
    <>
      <SiteHeader />
      <div className="min-h-dvh bg-background text-foreground font-sans selection:bg-primary selection:text-primary-foreground overflow-x-hidden motion-safe:animate-page-in">
        <main className="pt-24">
        <HeroSection />
        <StatsSection />
        <WhySection />
        <WhatHappensHereSection />
        <CommunityMembersSection />
        <TestimonialsSection />
        <LearningPreviewSection />
        <EventsSection />
        <AmbassadorSection />
        <JoinCtaSection />
        <HighlightsSection />
      </main>

        <SiteFooter />
      </div>
    </>
  );
}
