"use client";

import { useForm, useStore } from "@tanstack/react-form";
import { useMutation } from "convex/react";
import { z } from "zod";
import { useI18n } from "@/lib/i18n";
import { api } from "convex/_generated/api";
import { useState } from "react";
import type { Doc } from "convex/_generated/dataModel";
import { normalizeInterestsFromProfile } from "@/lib/onboarding-interests";

export type OnboardingStep =
  | "welcome"
  | "about"
  | "work"
  | "interests-explore"
  | "interests-connect"
  | "connect"
  | "done";

const STEPS: OnboardingStep[] = [
  "welcome",
  "about",
  "work",
  "connect",
  "interests-explore",
  "interests-connect",
  "done",
];

function suggestSlug(email: string | undefined): string {
  if (!email) return "";
  const local = email.split("@")[0] ?? "";
  return local
    .toLowerCase()
    .replace(/[^a-z0-9]/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "")
    .slice(0, 30) || "";
}

interface ClerkUserLike {
  firstName?: string | null;
  lastName?: string | null;
  imageUrl?: string;
  primaryEmailAddress?: { emailAddress?: string } | null;
}

type Profile = Doc<"profiles">;

interface UseOnboardingWizardOptions {
  clerkUser: ClerkUserLike | null;
  existingProfile?: Profile | null;
  onComplete?: (slug: string) => void;
}

function getRoleFromTitle(
  title: string,
  roleOptions: { value: string; label: string }[]
): { role: string; title: string } {
  const match = roleOptions.find((o) => o.label === title);
  if (match) return { role: match.value, title: match.label };
  return { role: "other", title };
}

export function useOnboardingWizard({
  clerkUser,
  existingProfile,
  onComplete,
}: UseOnboardingWizardOptions) {
  const { t } = useI18n();
  const upsert = useMutation(api.profiles.upsertMine);

  const onboardingSchema = z
    .object({
      step: z.enum([
        "welcome",
        "about",
        "work",
        "interests-explore",
        "interests-connect",
        "connect",
        "done",
      ]),
      name: z.string(),
      slug: z.string(),
      avatarUrl: z.string(),
      location: z.string(),
      tagline: z.string(),
      role: z.string(),
      title: z.string(),
      company: z.string(),
      experienceLevel: z.enum(["beginner", "intermediate", "advanced", "exploring", "building", "shipping"]),
      bio: z.string(),
      interests: z.array(z.string()),
      tools: z.array(z.string()),
      lookingFor: z.array(z.string()),
      availability: z.array(z.string()),
      linkedin: z.string(),
      x: z.string(),
      contact: z.string(),
    })
    .superRefine((value, ctx) => {
      if (value.step === "about") {
        if (!value.name.trim()) {
          ctx.addIssue({
            path: ["name"],
            code: "custom",
            message: t.onboarding.about.nameRequired,
          });
        }
        if (!value.slug.trim()) {
          ctx.addIssue({
            path: ["slug"],
            code: "custom",
            message: t.onboarding.about.slugRequired,
          });
        }
        if (value.slug && !/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(value.slug)) {
          ctx.addIssue({
            path: ["slug"],
            code: "custom",
            message: "Slug must be lowercase letters, numbers, and hyphens only",
          });
        }
        if (!value.tagline?.trim()) {
          ctx.addIssue({
            path: ["tagline"],
            code: "custom",
            message: t.onboarding.about.taglineRequired,
          });
        }
        const taglineTrimmed = value.tagline?.trim() ?? "";
        if (taglineTrimmed && taglineTrimmed.length > 60) {
          ctx.addIssue({
            path: ["tagline"],
            code: "custom",
            message: "Tagline must be 60 characters or less",
          });
        }
        if (taglineTrimmed && taglineTrimmed.includes("\n")) {
          ctx.addIssue({
            path: ["tagline"],
            code: "custom",
            message: "Tagline must be a single line",
          });
        }
      }
      if (value.step === "work") {
        if (!value.role.trim()) {
          ctx.addIssue({
            path: ["role"],
            code: "custom",
            message: "Role is required",
          });
        }
        if (value.role === "other" && !value.title.trim()) {
          ctx.addIssue({
            path: ["title"],
            code: "custom",
            message: t.onboarding.work.titleRequired,
          });
        }
        if (value.role !== "other" && !value.title.trim()) {
          // If role is not other, we set title automatically, but if somehow empty:
          // Actually we will sync title with role label if not other.
        }
        if (!value.bio.trim()) {
          ctx.addIssue({
            path: ["bio"],
            code: "custom",
            message: t.onboarding.work.bioRequired,
          });
        }
        if (value.bio.length < 10) {
          ctx.addIssue({
            path: ["bio"],
            code: "custom",
            message: "Bio must be at least 10 characters",
          });
        }
      }
      if (value.step === "interests-explore") {
        if (value.interests.length === 0) {
          ctx.addIssue({
            path: ["interests"],
            code: "custom",
            message: t.onboarding.interests.interestsRequired,
          });
        }
      }
    });

  const [isSavingProfile, setIsSavingProfile] = useState(false);

  const roleOptions = t.onboarding.work.roleOptions;
  const { role: defaultRole, title: defaultTitle } = existingProfile
    ? getRoleFromTitle(existingProfile.title, roleOptions)
    : { role: "", title: "" };

  const normalizedInterests = existingProfile
    ? normalizeInterestsFromProfile(existingProfile)
    : { interests: [], tools: [], lookingFor: [], availability: [] };

  const form = useForm({
    defaultValues: {
      step: "welcome" as OnboardingStep,
      name: existingProfile?.name ?? `${clerkUser?.firstName ?? ""} ${clerkUser?.lastName ?? ""}`.trim(),
      slug: existingProfile?.slug ?? suggestSlug(clerkUser?.primaryEmailAddress?.emailAddress),
      avatarUrl: existingProfile?.avatarUrl ?? clerkUser?.imageUrl ?? "",
      location: existingProfile?.location ?? "",
      tagline: existingProfile?.tagline ?? "",
      role: defaultRole,
      title: defaultTitle,
      company: existingProfile?.company ?? "",
      experienceLevel: (existingProfile?.experienceLevel ?? "building") as "beginner" | "intermediate" | "advanced" | "exploring" | "building" | "shipping",
      bio: existingProfile?.bio ?? "",
      interests: normalizedInterests.interests,
      tools: normalizedInterests.tools,
      lookingFor: normalizedInterests.lookingFor,
      availability: normalizedInterests.availability,
      linkedin: existingProfile?.links?.linkedin ?? "",
      x: existingProfile?.links?.x ?? "",
      contact: existingProfile?.contact ?? "",
    },
    validators: { onSubmit: onboardingSchema },
    onSubmit: async ({ value }) => {
      if (value.step === "welcome") {
        form.setFieldValue("step", "about");
        return;
      }
      if (value.step === "about") {
        form.setFieldValue("step", "work");
        return;
      }
      if (value.step === "work") {
        form.setFieldValue("step", "connect");
        return;
      }
      if (value.step === "connect") {
        form.setFieldValue("step", "interests-explore");
        return;
      }
      if (value.step === "interests-explore") {
        form.setFieldValue("step", "interests-connect");
        return;
      }
      if (value.step === "interests-connect") {
        setIsSavingProfile(true);
        try {
          await upsert({
            slug: value.slug,
            name: value.name,
            title: value.role === "other" ? value.title : (t.onboarding.work.roleOptions.find(o => o.value === value.role)?.label ?? value.title),
            bio: value.bio,
            avatarUrl: value.avatarUrl || undefined,
            location: value.location || undefined,
            company: value.company || undefined,
            experienceLevel: value.experienceLevel,
            interests: value.interests.length ? value.interests : undefined,
            tools: value.tools.length ? value.tools : undefined,
            lookingFor: value.lookingFor.length ? value.lookingFor : undefined,
            availability: value.availability.length ? value.availability : undefined,
            links: {
              linkedin: value.linkedin || undefined,
              x: value.x || undefined,
            },
            contact: value.contact || undefined,
            tagline: value.tagline?.trim() || undefined,
          });
          form.setFieldValue("step", "done");
          onComplete?.(value.slug);
        } finally {
          setIsSavingProfile(false);
        }
      }
    },
  });

  const step = useStore(form.store, (state) => state.values.step as OnboardingStep);
  const currentIndex = STEPS.indexOf(step);

  const goNext = () => {
    if (step === "welcome") {
      form.setFieldValue("step", "about");
      return;
    }
    form.handleSubmit();
  };

  const goBack = () => {
    if (currentIndex > 0 && step !== "done") {
      form.setFieldValue("step", STEPS[currentIndex - 1]);
    }
  };

  const canGoBack =
    currentIndex > 0 &&
    step !== "welcome" &&
    step !== "done";

  return {
    form,
    currentStep: step,
    stepIndex: currentIndex,
    totalSteps: STEPS.length - 1,
    goNext,
    goBack,
    canGoBack,
    isSubmitting: form.state.isSubmitting,
    isSavingProfile,
  };
}
