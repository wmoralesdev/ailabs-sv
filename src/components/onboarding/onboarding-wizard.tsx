"use client";

import { Link, useRouter } from "@tanstack/react-router";
import { useAuthState } from "@/components/auth/auth-context";
import { useOnboardingWizard } from "./use-onboarding-wizard";
import { useI18n } from "@/lib/i18n";
import {
  Field,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";
import { ToggleChip } from "@/components/ui/toggle-chip";
import { AvatarUpload } from "./avatar-upload";
import { formatWithBrandText } from "@/components/brand-text";

const CARD_CLASS =
  "rounded-2xl border border-border/60 bg-card p-6 shadow-lg shadow-black/10 md:p-8";

function StepIndicator({
  currentIndex,
  totalSteps,
}: {
  currentIndex: number;
  totalSteps: number;
}) {
  if (currentIndex === 0 || currentIndex >= totalSteps) return null;
  return (
    <div className="mb-6 flex gap-1.5" aria-hidden>
      {Array.from({ length: totalSteps - 1 }).map((_, i) => (
        <div
          key={i}
          className={cn(
            "h-1 flex-1 rounded-full transition-colors",
            i < currentIndex ? "bg-primary" : "bg-muted"
          )}
        />
      ))}
    </div>
  );
}

type OnboardingWizardProps = {
  existingProfile?: import("convex/_generated/dataModel").Doc<"profiles"> | null;
  onCompleteRedirectTo?: string;
};

export function OnboardingWizard({
  existingProfile,
  onCompleteRedirectTo = "/",
}: OnboardingWizardProps = {}) {
  const { user } = useAuthState();
  const router = useRouter();
  const { t } = useI18n();

  const {
    form,
    currentStep,
    stepIndex,
    totalSteps,
    goNext,
    goBack,
    canGoBack,
    isSubmitting,
    isSavingProfile,
  } = useOnboardingWizard({
    clerkUser: user ?? null,
    existingProfile,
    onComplete: () => router.navigate({ to: onCompleteRedirectTo }),
  });

  return (
    <div className={cn(CARD_CLASS, "mx-auto w-full", currentStep === "interests" ? "max-w-2xl" : "max-w-lg")}>
      <StepIndicator currentIndex={stepIndex} totalSteps={totalSteps} />

      {currentStep === "welcome" && (
        <div className="space-y-6 text-center">
          <img
            src="/images/walter-morales.webp"
            alt=""
            className="mx-auto size-16 rounded-full object-cover"
          />
          <div>
            <h1 className="mb-2 text-2xl font-medium tracking-tight md:text-3xl">
              {t.onboarding.welcome.headline.split(t.onboarding.welcome.headlineAccent)[0]}
              <span className="text-primary">
                {t.onboarding.welcome.headlineAccent}
              </span>
              {t.onboarding.welcome.headline.split(t.onboarding.welcome.headlineAccent)[1]}
            </h1>
            <p className="text-sm text-muted-foreground">
              {formatWithBrandText(t.onboarding.welcome.subheadline)}
            </p>
          </div>
          <Button
            size="lg"
            className="w-full"
            onClick={goNext}
          >
            {t.onboarding.welcome.cta}
          </Button>
        </div>
      )}

      {currentStep === "about" && (
        <form
          onSubmit={(e) => {
            e.preventDefault();
            goNext();
          }}
          className="space-y-5"
        >
          <div>
            <h2 className="mb-1 text-xl font-medium">{t.onboarding.about.headline}</h2>
            <p className="text-sm text-muted-foreground">
              {t.onboarding.about.subheadline}
            </p>
          </div>
          <FieldGroup>
            <form.Field
              name="name"
              children={(field) => {
                const isInvalid = field.state.meta.errors?.length;
                return (
                  <Field data-invalid={!!isInvalid}>
                    <FieldLabel required>{t.onboarding.about.nameLabel}</FieldLabel>
                    <Input
                      value={field.state.value}
                      onBlur={field.handleBlur}
                      onChange={(e) => field.handleChange(e.target.value)}
                      placeholder={t.onboarding.about.namePlaceholder}
                      aria-invalid={!!isInvalid}
                      required
                    />
                    {!!isInvalid && <FieldError errors={field.state.meta.errors} />}
                  </Field>
                );
              }}
            />
            <form.Field
              name="slug"
              children={(field) => {
                const isInvalid = field.state.meta.errors?.length;
                return (
                  <Field data-invalid={!!isInvalid}>
                    <FieldLabel required>{t.onboarding.about.slugLabel}</FieldLabel>
                    <FieldDescription>
                      {t.onboarding.about.slugDescription}
                    </FieldDescription>
                    <Input
                      value={field.state.value}
                      onBlur={field.handleBlur}
                      onChange={(e) =>
                        field.handleChange(
                          e.target.value.toLowerCase().replace(/[^a-z0-9-]/g, "-")
                        )
                      }
                      placeholder={t.onboarding.about.slugPlaceholder}
                      aria-invalid={!!isInvalid}
                      required
                    />
                    {!!isInvalid && <FieldError errors={field.state.meta.errors} />}
                  </Field>
                );
              }}
            />
            <form.Field
              name="avatarUrl"
              children={(field) => (
                <AvatarUpload
                  value={field.state.value}
                  onChange={(url) => field.handleChange(url)}
                  label={t.onboarding.about.avatarLabel}
                  uploadCta={t.onboarding.about.avatarUploadCta}
                  uploading={t.onboarding.about.avatarUploading}
                />
              )}
            />
            <form.Field
              name="location"
              children={(field) => (
                <Field>
                  <FieldLabel>{t.onboarding.about.locationLabel}</FieldLabel>
                  <Input
                    value={field.state.value}
                    onBlur={field.handleBlur}
                    onChange={(e) => field.handleChange(e.target.value)}
                    placeholder={t.onboarding.about.locationPlaceholder}
                  />
                </Field>
              )}
            />
          </FieldGroup>
          <div className="flex gap-2 pt-2">
            {canGoBack && (
              <Button type="button" variant="outline" onClick={goBack}>
                {t.onboarding.nav.back}
              </Button>
            )}
            <Button type="submit" className="flex-1">
              {t.onboarding.nav.continue}
            </Button>
          </div>
        </form>
      )}

      {currentStep === "work" && (
        <form
          onSubmit={(e) => {
            e.preventDefault();
            goNext();
          }}
          className="space-y-5"
        >
          <div>
            <h2 className="mb-1 text-xl font-medium">{t.onboarding.work.headline}</h2>
            <p className="text-sm text-muted-foreground">
              {t.onboarding.work.subheadline}
            </p>
          </div>
          <FieldGroup>
            <form.Field
              name="role"
              children={(field) => (
                <Field>
                  <FieldLabel required>{t.onboarding.work.roleLabel}</FieldLabel>
                  <Select
                    value={field.state.value}
                    onValueChange={(v) => field.handleChange(v)}
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder={t.onboarding.work.rolePlaceholder} />
                    </SelectTrigger>
                    <SelectContent>
                      {t.onboarding.work.roleOptions.map((opt) => (
                        <SelectItem key={opt.value} value={opt.value}>
                          {opt.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </Field>
              )}
            />
            <form.Subscribe
              selector={(state) => state.values.role}
              children={(role) =>
                role === "other" ? (
                  <form.Field
                    name="title"
                    children={(field) => {
                      const isInvalid = field.state.meta.errors?.length;
                      return (
                        <Field data-invalid={!!isInvalid}>
                          <FieldLabel required>{t.onboarding.work.titleLabel}</FieldLabel>
                          <Input
                            value={field.state.value}
                            onBlur={field.handleBlur}
                            onChange={(e) => field.handleChange(e.target.value)}
                            placeholder={t.onboarding.work.titlePlaceholder}
                            aria-invalid={!!isInvalid}
                            required
                          />
                          {!!isInvalid && <FieldError errors={field.state.meta.errors} />}
                        </Field>
                      );
                    }}
                  />
                ) : null
              }
            />
            <form.Field
              name="company"
              children={(field) => (
                <Field>
                  <FieldLabel>{t.onboarding.work.companyLabel}</FieldLabel>
                  <Input
                    value={field.state.value}
                    onBlur={field.handleBlur}
                    onChange={(e) => field.handleChange(e.target.value)}
                    placeholder={t.onboarding.work.companyPlaceholder}
                  />
                </Field>
              )}
            />
            <form.Field
              name="experienceLevel"
              children={(field) => (
                <Field>
                  <FieldLabel>{t.onboarding.work.experienceLabel}</FieldLabel>
                  <Select
                    value={field.state.value}
                    onValueChange={(v) =>
                      field.handleChange(
                        v ?? "building"
                      )
                    }
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select…" />
                    </SelectTrigger>
                    <SelectContent>
                      {t.onboarding.work.experienceOptions.map((opt) => (
                        <SelectItem key={opt.value} value={opt.value}>
                          <span className="flex flex-col items-start">
                            <span>{opt.label}</span>
                            {opt.description && (
                              <span className="text-muted-foreground text-[10px] font-normal">
                                {opt.description}
                              </span>
                            )}
                          </span>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </Field>
              )}
            />
            <form.Field
              name="bio"
              children={(field) => {
                const isInvalid = field.state.meta.errors?.length;
                return (
                  <Field data-invalid={!!isInvalid}>
                    <FieldLabel required>{t.onboarding.work.bioLabel}</FieldLabel>
                    <Textarea
                      value={field.state.value}
                      onBlur={field.handleBlur}
                      onChange={(e) => field.handleChange(e.target.value)}
                      placeholder={t.onboarding.work.bioPlaceholder}
                      className="min-h-[100px]"
                      aria-invalid={!!isInvalid}
                      required
                    />
                    {!!isInvalid && <FieldError errors={field.state.meta.errors} />}
                  </Field>
                );
              }}
            />
          </FieldGroup>
          <div className="flex gap-2 pt-2">
            {canGoBack && (
              <Button type="button" variant="outline" onClick={goBack}>
                {t.onboarding.nav.back}
              </Button>
            )}
            <Button type="submit" className="flex-1">
              {t.onboarding.nav.continue}
            </Button>
          </div>
        </form>
      )}

      {currentStep === "interests" && (
        <form
          onSubmit={(e) => {
            e.preventDefault();
            goNext();
          }}
          className="space-y-5"
        >
          <div>
            <h2 className="mb-1 text-xl font-medium">
              {t.onboarding.interests.headline}
            </h2>
            <p className="text-sm text-muted-foreground">
              {t.onboarding.interests.subheadline}
            </p>
          </div>
          <FieldGroup className="gap-8">
            <div className="space-y-4">
              <h3 className="text-sm font-medium text-muted-foreground uppercase tracking-wider text-xs">
                {t.onboarding.interests.interestsLabel}
              </h3>
              <form.Field
                name="interests"
                children={(field) => {
                  const isInvalid = field.state.meta.errors?.length;
                  return (
                    <Field data-invalid={!!isInvalid}>
                      <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                        {t.onboarding.interests.interests.map((opt) => (
                          <ToggleChip
                            key={opt}
                            label={opt}
                            selected={field.state.value.includes(opt)}
                            onToggle={() => {
                              const next = field.state.value.includes(opt)
                                ? field.state.value.filter((x: string) => x !== opt)
                                : [...field.state.value, opt];
                              field.handleChange(next);
                            }}
                          />
                        ))}
                      </div>
                      {!!isInvalid && <FieldError errors={field.state.meta.errors} />}
                    </Field>
                  );
                }}
              />
            </div>

            <div className="space-y-4">
              <h3 className="text-sm font-medium text-muted-foreground uppercase tracking-wider text-xs">
                {t.onboarding.interests.toolsLabel}
              </h3>
              <form.Field
                name="tools"
                children={(field) => (
                  <Field>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                      {t.onboarding.interests.tools.map((opt) => (
                        <ToggleChip
                          key={opt}
                          label={opt}
                          selected={field.state.value.includes(opt)}
                          onToggle={() => {
                            const next = field.state.value.includes(opt)
                              ? field.state.value.filter((x: string) => x !== opt)
                              : [...field.state.value, opt];
                            field.handleChange(next);
                          }}
                        />
                      ))}
                    </div>
                  </Field>
                )}
              />
            </div>

            <div className="space-y-4">
              <h3 className="text-sm font-medium text-muted-foreground uppercase tracking-wider text-xs">
                {t.onboarding.interests.lookingForLabel}
              </h3>
              <form.Field
                name="lookingFor"
                children={(field) => (
                  <Field>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                      {t.onboarding.interests.lookingFor.map((opt) => (
                        <ToggleChip
                          key={opt}
                          label={opt}
                          selected={field.state.value.includes(opt)}
                          onToggle={() => {
                            const next = field.state.value.includes(opt)
                              ? field.state.value.filter((x: string) => x !== opt)
                              : [...field.state.value, opt];
                            field.handleChange(next);
                          }}
                        />
                      ))}
                    </div>
                  </Field>
                )}
              />
            </div>

            <div className="space-y-4">
              <h3 className="text-sm font-medium text-muted-foreground uppercase tracking-wider text-xs">
                {t.onboarding.interests.availabilityLabel}
              </h3>
              <form.Field
                name="availability"
                children={(field) => (
                  <Field>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                      {t.onboarding.interests.availability.map((opt) => (
                        <ToggleChip
                          key={opt}
                          label={opt}
                          selected={field.state.value.includes(opt)}
                          onToggle={() => {
                            const next = field.state.value.includes(opt)
                              ? field.state.value.filter((x: string) => x !== opt)
                              : [...field.state.value, opt];
                            field.handleChange(next);
                          }}
                        />
                      ))}
                    </div>
                  </Field>
                )}
              />
            </div>
          </FieldGroup>
          <div className="flex gap-2 pt-2">
            {canGoBack && (
              <Button type="button" variant="outline" onClick={goBack}>
                {t.onboarding.nav.back}
              </Button>
            )}
            <Button type="submit" className="flex-1">
              {t.onboarding.nav.continue}
            </Button>
          </div>
        </form>
      )}

      {currentStep === "connect" && (
        <form
          onSubmit={(e) => {
            e.preventDefault();
            goNext();
          }}
          className="space-y-5"
        >
          <div>
            <h2 className="mb-1 text-xl font-medium">
              {t.onboarding.connect.headline}
            </h2>
            <p className="text-sm text-muted-foreground">
              {t.onboarding.connect.subheadline}
            </p>
          </div>
          <FieldGroup>
            <form.Field
              name="linkedin"
              children={(field) => (
                <Field>
                  <FieldLabel>{t.onboarding.connect.linkedinLabel}</FieldLabel>
                  <Input
                    type="url"
                    value={field.state.value}
                    onBlur={field.handleBlur}
                    onChange={(e) => field.handleChange(e.target.value)}
                    placeholder={t.onboarding.connect.linkedinPlaceholder}
                  />
                </Field>
              )}
            />
            <form.Field
              name="x"
              children={(field) => (
                <Field>
                  <FieldLabel>{t.onboarding.connect.xLabel}</FieldLabel>
                  <Input
                    type="url"
                    value={field.state.value}
                    onBlur={field.handleBlur}
                    onChange={(e) => field.handleChange(e.target.value)}
                    placeholder={t.onboarding.connect.xPlaceholder}
                  />
                </Field>
              )}
            />
            <form.Field
              name="contact"
              children={(field) => (
                <Field>
                  <FieldLabel>{t.onboarding.connect.contactLabel}</FieldLabel>
                  <FieldDescription>
                    {t.onboarding.connect.contactDescription}
                  </FieldDescription>
                  <Input
                    value={field.state.value}
                    onBlur={field.handleBlur}
                    onChange={(e) => field.handleChange(e.target.value)}
                    placeholder={t.onboarding.connect.contactPlaceholder}
                  />
                </Field>
              )}
            />
          </FieldGroup>
          <div className="flex gap-2 pt-2">
            {canGoBack && (
              <Button type="button" variant="outline" onClick={goBack}>
                {t.onboarding.nav.back}
              </Button>
            )}
            <Button type="submit" className="flex-1" loading={isSavingProfile}>
              {t.onboarding.nav.finish}
            </Button>
          </div>
        </form>
      )}

      {currentStep === "done" && (
        <div className="space-y-6 text-center">
          <div>
            <h1 className="mb-2 text-2xl font-medium tracking-tight md:text-3xl">
              {t.onboarding.done.headline}
            </h1>
            <p className="text-sm text-muted-foreground">
              {t.onboarding.done.subheadline}
            </p>
          </div>
          <div className="flex flex-col gap-3 sm:flex-row sm:justify-center">
            <Link to="/me" className="inline-flex h-9 items-center justify-center rounded-md bg-primary px-4 text-primary-foreground text-xs font-medium w-full sm:w-auto">
              {t.onboarding.done.viewProfile}
            </Link>
            <Link
              to="/"
              className="inline-flex h-9 items-center justify-center rounded-md border border-border bg-transparent px-4 text-xs font-medium hover:bg-muted w-full sm:w-auto"
            >
              {t.onboarding.done.goHome}
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}
