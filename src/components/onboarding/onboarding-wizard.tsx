"use client";

import { Link, useRouter } from "@tanstack/react-router";
import { useStore } from "@tanstack/react-form";
import { useQuery } from "convex/react";
import { api } from "convex/_generated/api";
import { useAuthState } from "@/components/auth/auth-context";
import { useOnboardingWizard } from "./use-onboarding-wizard";
import { useI18n } from "@/lib/i18n";
import { useDebounce } from "@/hooks/use-debounce";
import {
  Field,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { MarkdownEditor } from "@/components/ui/markdown-editor";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group";
import { Spinner } from "@/components/ui/spinner";
import { HugeiconsIcon } from "@hugeicons/react";
import { Cancel01Icon, Tick02Icon } from "@hugeicons/core-free-icons";
import { cn } from "@/lib/utils";
import { ToggleChip } from "@/components/ui/toggle-chip";
import { AvatarUpload } from "./avatar-upload";
import { formatWithBrandText } from "@/components/brand-text";
import {
  toolIcons,
  topicIcons,
  lookingForIcons,
  availabilityIcons,
} from "./tool-icons";

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
    isSavingProfile,
  } = useOnboardingWizard({
    clerkUser: user ?? null,
    existingProfile,
    onComplete: () => router.navigate({ to: onCompleteRedirectTo }),
  });

  const slug = useStore(form.store, (s) => s.values.slug);
  const tagline = useStore(form.store, (s) => s.values.tagline);
  const debouncedSlug = useDebounce(slug, 400);
  const slugValidFormat = /^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(debouncedSlug);
  const slugAvailability = useQuery(
    api.profiles.isSlugAvailable,
    debouncedSlug && slugValidFormat ? { slug: debouncedSlug } : "skip"
  );
  const slugChecking = debouncedSlug && slugValidFormat && slugAvailability === undefined;
  const slugAvailable = slugAvailability?.available === true;
  const slugUnavailable = slugAvailability?.available === false;

  return (
    <div className={cn(CARD_CLASS, "mx-auto w-full", (currentStep === "interests-explore" || currentStep === "interests-connect") ? "max-w-2xl" : "max-w-lg")}>
      <StepIndicator currentIndex={stepIndex} totalSteps={totalSteps} />

      {currentStep === "welcome" && (
        <div className="space-y-6 text-center">
          <img
            src="/images/walter-morales.webp"
            alt=""
            className="mx-auto size-16 rounded-full object-cover"
          />
          <div>
            {existingProfile && t.onboarding.welcome.edit ? (
              <>
                <h1 className="mb-2 text-2xl font-medium tracking-tight md:text-3xl">
                  {t.onboarding.welcome.edit.headline}
                </h1>
                <p className="text-sm text-muted-foreground">
                  {formatWithBrandText(t.onboarding.welcome.edit.subheadline)}
                </p>
              </>
            ) : (
              <>
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
              </>
            )}
          </div>
          <Button
            size="lg"
            className="w-full"
            onClick={goNext}
          >
            {existingProfile && t.onboarding.welcome.edit
              ? t.onboarding.welcome.edit.cta
              : t.onboarding.welcome.cta}
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
              name="avatarUrl"
              children={(field) => (
                <AvatarUpload
                  value={field.state.value}
                  onChange={(url) => field.handleChange(url)}
                  label={t.onboarding.about.avatarLabel}
                  uploadCta={t.onboarding.about.avatarUploadCta}
                  uploading={t.onboarding.about.avatarUploading}
                  userId={user?.id ?? ""}
                  dragDropHint={t.onboarding.about.avatarDragDropHint}
                  fileSizeHint={t.onboarding.about.avatarFileSizeHint}
                  required
                />
              )}
            />
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
                const isInvalidFormat = debouncedSlug && !slugValidFormat && debouncedSlug.length > 0;
                const showUnavailable = slugUnavailable || isInvalidFormat;
                return (
                  <Field data-invalid={!!isInvalid || !!showUnavailable}>
                    <FieldLabel required>{t.onboarding.about.slugLabel}</FieldLabel>
                    <FieldDescription>
                      {t.onboarding.about.slugDescription}
                    </FieldDescription>
                    <InputGroup
                      className={cn(
                        "rounded-(--radius) h-9",
                        showUnavailable && "border-destructive ring-destructive/20 ring-1",
                        !slugChecking && slugAvailable && "border-green-600 ring-green-600/20 ring-1"
                      )}
                    >
                      <InputGroupInput
                        value={field.state.value}
                        onBlur={field.handleBlur}
                        onChange={(e) =>
                          field.handleChange(
                            e.target.value.toLowerCase().replace(/[^a-z0-9-]/g, "-")
                          )
                        }
                        placeholder={t.onboarding.about.slugPlaceholder}
                        aria-invalid={!!isInvalid || !!showUnavailable}
                        required
                      />
                      <InputGroupAddon align="inline-end" className="pr-2">
                        {slugChecking && (
                          <Spinner size="sm" className="text-muted-foreground" />
                        )}
                        {!slugChecking && slugAvailable && (
                          <HugeiconsIcon
                            icon={Tick02Icon}
                            className="size-4 text-green-600 dark:text-green-500"
                            aria-hidden
                          />
                        )}
                        {!slugChecking && showUnavailable && (
                          <HugeiconsIcon
                            icon={Cancel01Icon}
                            className="size-4 text-destructive"
                            aria-hidden
                          />
                        )}
                      </InputGroupAddon>
                    </InputGroup>
                    {/* Handle availability status message */}
                    {!slugChecking && slugAvailable && (
                      <p className="flex items-center gap-1.5 text-xs text-green-600 dark:text-green-500 mt-1.5">
                        <HugeiconsIcon icon={Tick02Icon} className="size-3.5" aria-hidden />
                        {t.onboarding.about.handleAvailable}
                      </p>
                    )}
                    {!slugChecking && slugUnavailable && !isInvalidFormat && (
                      <p className="flex items-center gap-1.5 text-xs text-destructive mt-1.5">
                        <HugeiconsIcon icon={Cancel01Icon} className="size-3.5" aria-hidden />
                        {t.onboarding.about.handleTaken}
                      </p>
                    )}
                    {!slugChecking && isInvalidFormat && (
                      <p className="flex items-center gap-1.5 text-xs text-destructive mt-1.5">
                        <HugeiconsIcon icon={Cancel01Icon} className="size-3.5" aria-hidden />
                        {t.onboarding.about.handleInvalid}
                      </p>
                    )}
                    {!!isInvalid && <FieldError errors={field.state.meta.errors} />}
                  </Field>
                );
              }}
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
            <form.Field
              name="tagline"
              children={(field) => {
                const isInvalid = field.state.meta.errors?.length;
                return (
                  <Field data-invalid={!!isInvalid}>
                    <FieldLabel required>{t.onboarding.about.taglineLabel}</FieldLabel>
                    <FieldDescription>
                      {t.onboarding.about.taglineDescription}
                    </FieldDescription>
                    <Input
                      value={field.state.value}
                      onBlur={field.handleBlur}
                      onChange={(e) =>
                        field.handleChange(
                          e.target.value.replace(/\n/g, " ").slice(0, 60)
                        )
                      }
                      placeholder={t.onboarding.about.taglinePlaceholder}
                      maxLength={60}
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
            <Button
              type="submit"
              className="flex-1"
              disabled={
                currentStep === "about" &&
                (slugChecking ||
                  slugUnavailable ||
                  (!!debouncedSlug && !slugValidFormat) ||
                  !tagline?.trim())
              }
            >
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
                    onValueChange={(v) => field.handleChange(v ?? "")}
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder={t.onboarding.work.rolePlaceholder}>
                        {(value: string) => {
                          const opt = t.onboarding.work.roleOptions.find((o) => o.value === value);
                          return opt ? opt.label : value ?? "";
                        }}
                      </SelectValue>
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
                      <SelectValue placeholder={t.onboarding.work.experiencePlaceholder}>
                        {(value: string) => {
                          const opt = t.onboarding.work.experienceOptions.find((o) => o.value === value);
                          return opt ? opt.label : value ?? "";
                        }}
                      </SelectValue>
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
                    <MarkdownEditor
                      value={field.state.value}
                      onChange={(v) => field.handleChange(v)}
                      placeholder={t.onboarding.work.bioPlaceholder}
                      rows={5}
                      writeLabel={t.resources?.writeLabel ?? "Write"}
                      previewLabel={t.resources?.previewLabel ?? "Preview"}
                      emptyPreviewText={t.resources?.previewEmpty ?? "Nothing to preview"}
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

      {currentStep === "interests-explore" && (
        <form
          onSubmit={(e) => {
            e.preventDefault();
            goNext();
          }}
          className="space-y-5"
        >
          <div>
            <h2 className="mb-1 text-xl font-medium">
              {t.onboarding.interestsExplore?.headline ?? t.onboarding.interests.headline}
            </h2>
            <p className="text-sm text-muted-foreground">
              {t.onboarding.interestsExplore?.subheadline ?? t.onboarding.interests.subheadline}
            </p>
          </div>
          <FieldGroup className="gap-8">
            <div className="space-y-4">
              <h3 className="text-sm font-medium text-muted-foreground uppercase tracking-wider text-xs">
                {t.onboarding.interestsExplore?.interestsLabel ?? t.onboarding.interests.interestsLabel}
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
                            key={opt.id}
                            label={opt.label}
                            icon={topicIcons[opt.id]}
                            selected={field.state.value.includes(opt.id)}
                            onToggle={() => {
                              const next = field.state.value.includes(opt.id)
                                ? field.state.value.filter((x: string) => x !== opt.id)
                                : [...field.state.value, opt.id];
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
                {t.onboarding.interestsExplore?.toolsLabel ?? t.onboarding.interests.toolsLabel}
              </h3>
              <form.Field
                name="tools"
                children={(field) => (
                  <Field>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                      {t.onboarding.interests.tools.map((opt) => (
                        <ToggleChip
                          key={opt.id}
                          label={opt.label}
                          icon={toolIcons[opt.id]}
                          selected={field.state.value.includes(opt.id)}
                          onToggle={() => {
                            const next = field.state.value.includes(opt.id)
                              ? field.state.value.filter((x: string) => x !== opt.id)
                              : [...field.state.value, opt.id];
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

      {currentStep === "interests-connect" && (
        <form
          onSubmit={(e) => {
            e.preventDefault();
            goNext();
          }}
          className="space-y-5"
        >
          <div>
            <h2 className="mb-1 text-xl font-medium">
              {t.onboarding.interestsConnect?.headline ?? t.onboarding.interests.headline}
            </h2>
            <p className="text-sm text-muted-foreground">
              {t.onboarding.interestsConnect?.subheadline ?? t.onboarding.interests.subheadline}
            </p>
          </div>
          <FieldGroup className="gap-8">
            <div className="space-y-4">
              <h3 className="text-sm font-medium text-muted-foreground uppercase tracking-wider text-xs">
                {t.onboarding.interestsConnect?.lookingForLabel ?? t.onboarding.interests.lookingForLabel}
              </h3>
              <form.Field
                name="lookingFor"
                children={(field) => (
                  <Field>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                      {t.onboarding.interests.lookingFor.map((opt) => (
                        <ToggleChip
                          key={opt.id}
                          label={opt.label}
                          icon={lookingForIcons[opt.id]}
                          selected={field.state.value.includes(opt.id)}
                          onToggle={() => {
                            const next = field.state.value.includes(opt.id)
                              ? field.state.value.filter((x: string) => x !== opt.id)
                              : [...field.state.value, opt.id];
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
                {t.onboarding.interestsConnect?.availabilityLabel ?? t.onboarding.interests.availabilityLabel}
              </h3>
              <form.Field
                name="availability"
                children={(field) => (
                  <Field>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                      {t.onboarding.interests.availability.map((opt) => (
                        <ToggleChip
                          key={opt.id}
                          label={opt.label}
                          icon={availabilityIcons[opt.id]}
                          selected={field.state.value.includes(opt.id)}
                          onToggle={() => {
                            const next = field.state.value.includes(opt.id)
                              ? field.state.value.filter((x: string) => x !== opt.id)
                              : [...field.state.value, opt.id];
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
            <Button type="submit" className="flex-1" loading={isSavingProfile}>
              {t.onboarding.nav.finish}
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
            <Button type="submit" className="flex-1">
              {t.onboarding.nav.continue}
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
