"use client";

import { useForm } from "@tanstack/react-form";
import { useMutation, useQuery } from "convex/react";
import { api } from "convex/_generated/api";
import { useNavigate } from "@tanstack/react-router";
import { z } from "zod";
import { useEffect, useMemo, useState } from "react";
import { ShowcaseCoverUpload } from "./showcase-cover-upload";
import type {ReactNode} from "react";
import type { CoverImageValue } from "./showcase-cover-upload";
import type { SiteContent } from "@/content/site-content";
import { TurnstileGate } from "@/components/auth/turnstile-gate";
import { AnimatedGrid } from "@/components/ui/animated-grid";
import { BENTO_CARD_CLASS } from "@/lib/bento-card";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { cn } from "@/lib/utils";
import {
  Field,
  FieldDescription,
  FieldError,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { MarkdownEditor } from "@/components/ui/markdown-editor";
import { Button } from "@/components/ui/button";
import { ToggleChip } from "@/components/ui/toggle-chip";
import { TOOL_IDS } from "@/content/onboarding-interest-ids";
import { toolIcons } from "@/components/onboarding/tool-icons";
import { useI18n } from "@/lib/i18n";
import { isTurnstileConfigured } from "@/lib/turnstile-config";

const TOOL_ID_SET = new Set<string>(TOOL_IDS);
const TOOLS_MAX = 25;
const TOOL_NAME_MAX = 40;

function resolvePresetToolId(
  raw: string,
  toolLabelById: Map<string, string>
): string | null {
  const norm = raw.trim().toLowerCase();
  if (!norm) return null;
  for (const id of TOOL_IDS) {
    if (id.toLowerCase() === norm) return id;
    const label = toolLabelById.get(id)?.toLowerCase();
    if (label !== undefined && label === norm) return id;
  }
  return null;
}

function ShowcaseCreateSlugHint({
  title,
  label,
  takenSuffix,
}: {
  title: string;
  label: string;
  takenSuffix: string;
}) {
  const preview = useQuery(
    api.showcase.previewSlugForTitle,
    title.trim().length > 0 ? { title: title.trim() } : "skip"
  );
  if (preview === undefined || preview === null) return null;
  return (
    <p className="text-xs text-muted-foreground">
      <span className="font-medium text-foreground/80">{label}</span>{" "}
      <span className="break-all font-mono text-foreground/70">
        /showcase/{preview.slug}
      </span>
      {preview.baseIsTaken ? (
        <span className="mt-1 block">{takenSuffix}</span>
      ) : null}
    </p>
  );
}

function BentoFormSection({
  label,
  delayMs,
  className,
  fillHeight,
  children,
}: {
  label: string;
  delayMs: number;
  className?: string;
  /** Stretch to grid row height and let children flex (e.g. description editor). */
  fillHeight?: boolean;
  children: ReactNode;
}) {
  return (
    <div
      className={cn(
        BENTO_CARD_CLASS,
        "flex flex-col gap-4 p-6 motion-safe:animate-hero-in",
        fillHeight && "h-full min-h-0",
        className
      )}
      style={{ animationDelay: `${delayMs}ms` }}
    >
      <span className="shrink-0 text-xs font-semibold uppercase tracking-[0.16em] text-primary">
        {label}
      </span>
      {fillHeight ? (
        <div className="flex min-h-0 flex-1 flex-col">{children}</div>
      ) : (
        children
      )}
    </div>
  );
}

function createShowcaseFormSchema(t: SiteContent) {
  const optionalUrl = (invalidMsg: string) =>
    z.union([z.literal(""), z.string().url(invalidMsg)]);

  return z.object({
    title: z.string().min(1, t.showcaseSubmit.titleRequired).max(80),
    tagline: z.string().min(1, t.showcaseSubmit.taglineRequired).max(120),
    description: z
      .string()
      .min(1, t.showcaseSubmit.descriptionRequired)
      .max(1500),
    coverImage: z
      .object({
        storageId: z.any(),
        url: z.string(),
      })
      .nullable()
      .refine((v) => v !== null, t.showcaseSubmit.coverRequired),
    projectUrl: optionalUrl(t.showcaseSubmit.invalidUrl),
    repoUrl: optionalUrl(t.showcaseSubmit.invalidUrl),
    socialPostUrl: optionalUrl(t.showcaseSubmit.invalidUrl),
    event: z.string().optional(),
    toolsUsed: z
      .array(
        z.string().max(TOOL_NAME_MAX, t.showcaseSubmit.addOtherToolTooLong)
      )
      .max(TOOLS_MAX, t.showcaseSubmit.addOtherToolMax),
    collaboratorIds: z.array(z.string()).max(5),
    status: z.enum(["shipped", "in_progress", "concept"]),
  });
}

interface ShowcaseFormProps {
  editSlug?: string;
}

export function ShowcaseForm({ editSlug }: ShowcaseFormProps) {
  const { language } = useI18n();
  return <ShowcaseFormImpl key={language} editSlug={editSlug} />;
}

function ShowcaseFormImpl({ editSlug }: ShowcaseFormProps) {
  const { t } = useI18n();
  const navigate = useNavigate();
  const createEntry = useMutation(api.showcase.create);
  const updateEntry = useMutation(api.showcase.update);
  const existingEntry = useQuery(
    api.showcase.getBySlug,
    editSlug ? { slug: editSlug } : "skip"
  );

  const schema = useMemo(() => createShowcaseFormSchema(t), [t]);

  const toolLabelById = useMemo(() => {
    const map = new Map<string, string>();
    for (const opt of t.onboarding.interests.tools) {
      map.set(opt.id, opt.label);
    }
    return map;
  }, [t.onboarding.interests.tools]);

  const form = useForm({
    defaultValues: {
      title: "",
      tagline: "",
      description: "",
      coverImage: null as CoverImageValue | null,
      projectUrl: "",
      repoUrl: "",
      socialPostUrl: "",
      event: "",
      toolsUsed: [] as Array<string>,
      collaboratorIds: [] as Array<string>,
      status: "shipped" as "shipped" | "in_progress" | "concept",
    },
    validators: { onSubmit: schema as any },
    onSubmit: async ({ value }) => {
      if (!value.coverImage) return;
      if (editSlug && existingEntry) {
        await updateEntry({
          id: existingEntry._id,
          title: value.title,
          tagline: value.tagline,
          description: value.description,
          coverImageId: value.coverImage.storageId,
          coverImageUrl: value.coverImage.url,
          projectUrl: value.projectUrl || undefined,
          repoUrl: value.repoUrl || undefined,
          socialPostUrl: value.socialPostUrl || undefined,
          event: value.event || undefined,
          toolsUsed: value.toolsUsed.length ? value.toolsUsed : undefined,
          collaboratorIds: value.collaboratorIds.length
            ? value.collaboratorIds
            : undefined,
          status: value.status,
        });
        navigate({ to: "/showcase/$slug", params: { slug: editSlug } });
      } else {
        const slug = await createEntry({
          title: value.title,
          tagline: value.tagline,
          description: value.description,
          coverImageId: value.coverImage.storageId,
          coverImageUrl: value.coverImage.url,
          projectUrl: value.projectUrl || undefined,
          repoUrl: value.repoUrl || undefined,
          socialPostUrl: value.socialPostUrl || undefined,
          event: value.event || undefined,
          toolsUsed: value.toolsUsed.length ? value.toolsUsed : undefined,
          collaboratorIds: value.collaboratorIds.length
            ? value.collaboratorIds
            : undefined,
          status: value.status,
        });
        navigate({ to: "/showcase/$slug", params: { slug } });
      }
    },
  });

  useEffect(() => {
    if (existingEntry && editSlug) {
      form.setFieldValue("title", existingEntry.title);
      form.setFieldValue("tagline", existingEntry.tagline);
      form.setFieldValue("description", existingEntry.description);
      form.setFieldValue("coverImage", {
        storageId: existingEntry.coverImageId,
        url: existingEntry.coverImageUrl,
      });
      form.setFieldValue("projectUrl", existingEntry.projectUrl ?? "");
      form.setFieldValue("repoUrl", existingEntry.repoUrl ?? "");
      form.setFieldValue("socialPostUrl", existingEntry.socialPostUrl ?? "");
      form.setFieldValue("event", existingEntry.event ?? "");
      form.setFieldValue("toolsUsed", existingEntry.toolsUsed ?? []);
      form.setFieldValue(
        "collaboratorIds",
        existingEntry.collaboratorIds ?? []
      );
      form.setFieldValue("status", existingEntry.status as any);
    }
  }, [existingEntry, editSlug]);

  const toggleTool = (toolId: string) => {
    const current = form.getFieldValue("toolsUsed");
    const next = current.includes(toolId)
      ? current.filter((x) => x !== toolId)
      : [...current, toolId];
    form.setFieldValue("toolsUsed", next);
  };

  const s = t.showcaseSubmit;
  const needsTurnstile = !editSlug && isTurnstileConfigured();
  const [turnstileOk, setTurnstileOk] = useState(() => !needsTurnstile);
  useEffect(() => {
    setTurnstileOk(!needsTurnstile);
  }, [needsTurnstile]);
  const submitBlocked = needsTurnstile && !turnstileOk;
  const [addToolOpen, setAddToolOpen] = useState(false);
  const [addToolDraft, setAddToolDraft] = useState("");
  const [addToolError, setAddToolError] = useState<string | null>(null);

  const confirmAddCustomTool = () => {
    const raw = addToolDraft.trim();
    if (!raw) {
      setAddToolError(s.addOtherToolEmpty);
      return;
    }
    if (raw.length > TOOL_NAME_MAX) {
      setAddToolError(s.addOtherToolTooLong);
      return;
    }
    const current = form.getFieldValue("toolsUsed");
    if (current.length >= TOOLS_MAX) {
      setAddToolError(s.addOtherToolMax);
      return;
    }
    const presetId = resolvePresetToolId(raw, toolLabelById);
    if (presetId) {
      if (current.includes(presetId)) {
        setAddToolError(s.addOtherToolDuplicate);
        return;
      }
      form.setFieldValue("toolsUsed", [...current, presetId]);
    } else {
      const lower = raw.toLowerCase();
      if (current.some((x) => x.toLowerCase() === lower)) {
        setAddToolError(s.addOtherToolDuplicate);
        return;
      }
      for (const id of TOOL_IDS) {
        const lab = toolLabelById.get(id)?.toLowerCase();
        if (lab === lower && current.includes(id)) {
          setAddToolError(s.addOtherToolDuplicate);
          return;
        }
      }
      form.setFieldValue("toolsUsed", [...current, raw]);
    }
    setAddToolOpen(false);
    setAddToolDraft("");
    setAddToolError(null);
  };

  return (
    <div className="flex flex-col">
      <section className="relative overflow-hidden" aria-labelledby="showcase-form-hero-heading">
        <AnimatedGrid />
        <div className="hero-top-fade pointer-events-none absolute inset-0 z-2" />
        <div className="container relative z-10 mx-auto px-6 pb-8 pt-6 md:pb-10 md:pt-10 lg:pt-12">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-3 py-1 shadow-sm motion-safe:animate-hero-in [animation-delay:80ms]">
            <span className="text-xs font-medium uppercase tracking-wider text-primary">
              {s.heroBadge}
            </span>
          </div>
          <h1
            id="showcase-form-hero-heading"
            className="mb-4 max-w-3xl text-3xl font-medium leading-tight tracking-tighter motion-safe:animate-hero-in [animation-delay:140ms] md:text-4xl lg:text-5xl"
          >
            {editSlug ? s.heroTitleEdit : s.heroTitleSubmit}
          </h1>
          <p className="max-w-2xl text-pretty text-base font-light leading-relaxed text-foreground/60 motion-safe:animate-hero-in [animation-delay:200ms] md:text-lg">
            {s.heroSubtitle}
          </p>
        </div>
      </section>

      <div className="container mx-auto px-6 pb-10 md:pb-14">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            form.handleSubmit();
          }}
        >
          <div className="grid items-stretch gap-4 md:grid-cols-2 md:gap-5 lg:grid-cols-4 lg:gap-6">
            <div
              className={cn(
                BENTO_CARD_CLASS,
                "flex flex-col gap-4 p-6 motion-safe:animate-hero-in md:col-span-2 lg:col-span-2"
              )}
              style={{ animationDelay: "80ms" }}
            >
              <span className="text-xs font-semibold uppercase tracking-[0.16em] text-primary">
                {s.sectionBasics}
              </span>
              <form.Field name="title">
                {(field) => (
                  <Field>
                    <FieldLabel required>{s.titleLabel}</FieldLabel>
                    <Input
                      value={field.state.value}
                      onChange={(e) => field.handleChange(e.target.value)}
                      onBlur={field.handleBlur}
                      placeholder={s.titlePlaceholder}
                      maxLength={80}
                    />
                    <FieldError errors={field.state.meta.errors} />
                    {!editSlug && (
                      <ShowcaseCreateSlugHint
                        title={field.state.value}
                        label={s.urlPreviewLabel}
                        takenSuffix={s.urlPreviewTakenSuffix}
                      />
                    )}
                  </Field>
                )}
              </form.Field>
              <form.Field name="tagline">
                {(field) => (
                  <Field>
                    <FieldLabel required>{s.taglineLabel}</FieldLabel>
                    <Input
                      value={field.state.value}
                      onChange={(e) => field.handleChange(e.target.value)}
                      onBlur={field.handleBlur}
                      placeholder={s.taglinePlaceholder}
                      maxLength={120}
                    />
                    <FieldError errors={field.state.meta.errors} />
                  </Field>
                )}
              </form.Field>
              <div
                className="mt-1 flex flex-col gap-4 border-t border-border/50 pt-4"
                role="group"
                aria-label={s.sectionDetails}
              >
                <span className="text-xs font-semibold uppercase tracking-[0.16em] text-primary">
                  {s.sectionDetails}
                </span>
                <form.Field name="event">
                  {(field) => (
                    <Field>
                      <FieldLabel>{s.eventLabel}</FieldLabel>
                      <Input
                        value={field.state.value}
                        onChange={(e) => field.handleChange(e.target.value)}
                        placeholder={s.eventPlaceholder}
                      />
                    </Field>
                  )}
                </form.Field>
                <form.Field name="status">
                  {(field) => (
                    <Field>
                      <FieldLabel>{s.statusLabel}</FieldLabel>
                      <div className="flex flex-wrap gap-x-2 gap-y-3">
                        {(["shipped", "in_progress", "concept"] as const).map(
                          (statusVal) => (
                            <ToggleChip
                              key={statusVal}
                              label={
                                statusVal === "shipped"
                                  ? s.statusShipped
                                  : statusVal === "in_progress"
                                    ? s.statusInProgress
                                    : s.statusConcept
                              }
                              selected={field.state.value === statusVal}
                              onToggle={() =>
                                form.setFieldValue("status", statusVal)
                              }
                            />
                          )
                        )}
                      </div>
                    </Field>
                  )}
                </form.Field>
              </div>
            </div>

            <BentoFormSection
              label={s.sectionCover}
              delayMs={140}
              className="md:col-span-2 lg:col-span-2"
            >
              <form.Field name="coverImage">
                {(field) => (
                  <Field>
                    <ShowcaseCoverUpload
                      value={field.state.value as CoverImageValue | null}
                      onChange={(v) => field.handleChange(v)}
                      label={s.coverLabel}
                      uploadCta={s.coverUploadCta}
                      uploading={s.coverUploading}
                      dragDropHint={s.coverDragDropHint}
                      fileSizeHint={s.coverFileSizeHint}
                      errorMaxSize={s.coverErrorMaxSize}
                      errorFileType={s.coverErrorFileType}
                      errorUploadFailed={s.coverErrorUploadFailed}
                      required
                      hideLabel
                    />
                    <FieldError errors={field.state.meta.errors} />
                  </Field>
                )}
              </form.Field>
            </BentoFormSection>

            <BentoFormSection
              label={s.sectionStory}
              delayMs={200}
              fillHeight
              className="md:col-span-2 lg:col-span-2 min-h-0 lg:min-h-[22rem]"
            >
              <form.Field name="description">
                {(field) => (
                  <Field className="min-h-0 flex-1 flex-col">
                    <FieldLabel className="shrink-0" required>
                      {s.descriptionLabel}
                    </FieldLabel>
                    <FieldDescription className="shrink-0">
                      {s.descriptionMdHint}
                    </FieldDescription>
                    <MarkdownEditor
                      value={field.state.value}
                      onChange={(v) => field.handleChange(v)}
                      maxLength={1500}
                      rows={6}
                      writeLabel={t.resources.writeLabel ?? "Write"}
                      previewLabel={t.resources.previewLabel ?? "Preview"}
                      emptyPreviewText={
                        t.resources.previewEmpty ?? "Nothing to preview"
                      }
                      monospaceWrite
                      fillHeight
                    />
                    <FieldError
                      className="shrink-0"
                      errors={field.state.meta.errors}
                    />
                  </Field>
                )}
              </form.Field>
            </BentoFormSection>

            <BentoFormSection
              label={s.sectionLinks}
              delayMs={220}
              className="md:col-span-2 lg:col-span-2 h-full min-h-0 lg:min-h-[22rem]"
            >
              <form.Field name="projectUrl">
                {(field) => (
                  <Field>
                    <FieldLabel>{s.projectUrlLabel}</FieldLabel>
                    <Input
                      type="url"
                      value={field.state.value}
                      onChange={(e) => field.handleChange(e.target.value)}
                      placeholder={s.projectUrlPlaceholder}
                    />
                    <FieldError errors={field.state.meta.errors} />
                  </Field>
                )}
              </form.Field>
              <form.Field name="repoUrl">
                {(field) => (
                  <Field>
                    <FieldLabel>{s.repoUrlLabel}</FieldLabel>
                    <Input
                      type="url"
                      value={field.state.value}
                      onChange={(e) => field.handleChange(e.target.value)}
                      placeholder={s.repoUrlPlaceholder}
                    />
                    <FieldError errors={field.state.meta.errors} />
                  </Field>
                )}
              </form.Field>
              <form.Field name="socialPostUrl">
                {(field) => (
                  <Field>
                    <FieldLabel>{s.socialPostUrlLabel}</FieldLabel>
                    <FieldDescription>
                      {s.socialPostUrlDescription}
                    </FieldDescription>
                    <Input
                      type="url"
                      value={field.state.value}
                      onChange={(e) => field.handleChange(e.target.value)}
                      placeholder={s.socialPostUrlPlaceholder}
                    />
                    <FieldError errors={field.state.meta.errors} />
                  </Field>
                )}
              </form.Field>
            </BentoFormSection>

            <BentoFormSection
              label={s.sectionTools}
              delayMs={380}
              className="md:col-span-2 lg:col-span-4"
            >
              <form.Field name="toolsUsed">
                {() => {
                  const selectedTools = form.getFieldValue("toolsUsed");
                  const customInOrder = selectedTools.filter(
                    (x) => !TOOL_ID_SET.has(x)
                  );
                  return (
                    <div
                      className="flex flex-col gap-3"
                      role="group"
                      aria-label={s.toolsUsedLabel}
                    >
                      <div className="flex flex-wrap items-start gap-x-2 gap-y-3">
                        {TOOL_IDS.map((id) => {
                          const selected = selectedTools.includes(id);
                          const icon = toolIcons[id];
                          const label =
                            toolLabelById.get(id) ??
                            id
                              .replace(/-/g, " ")
                              .replace(/\b\w/g, (c) => c.toUpperCase());
                          return (
                            <ToggleChip
                              key={id}
                              label={label}
                              selected={selected}
                              onToggle={() => toggleTool(id)}
                              icon={icon}
                            />
                          );
                        })}
                        {customInOrder.map((name) => (
                          <ToggleChip
                            key={`custom-${name}`}
                            label={name}
                            selected
                            onToggle={() => toggleTool(name)}
                          />
                        ))}
                        <Button
                          type="button"
                          variant="outline"
                          size="lg"
                          className="shrink-0 px-4"
                          onClick={() => {
                            setAddToolError(null);
                            setAddToolDraft("");
                            setAddToolOpen(true);
                          }}
                        >
                          {s.addOtherTool}
                        </Button>
                      </div>
                    </div>
                  );
                }}
              </form.Field>
            </BentoFormSection>

            <div
              className={cn(
                BENTO_CARD_CLASS,
                "flex flex-col gap-4 p-6 motion-safe:animate-hero-in md:col-span-2 lg:col-span-4"
              )}
              style={{ animationDelay: "440ms" }}
            >
              {needsTurnstile ? (
                <TurnstileGate onVerified={() => setTurnstileOk(true)} />
              ) : null}
              <div className="flex flex-wrap gap-3">
                <Button type="submit" disabled={form.state.isSubmitting || submitBlocked}>
                  {form.state.isSubmitting
                    ? s.saving
                    : editSlug
                      ? s.saveChanges
                      : s.submit}
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  onClick={() =>
                    navigate({
                      to: "/showcase",
                      search: {
                        event: undefined,
                        tool: undefined,
                        status: undefined,
                      },
                    })
                  }
                >
                  {s.cancel}
                </Button>
              </div>
            </div>
          </div>
        </form>
      </div>

      <Dialog
        open={addToolOpen}
        onOpenChange={(open) => {
          setAddToolOpen(open);
          if (!open) {
            setAddToolDraft("");
            setAddToolError(null);
          }
        }}
      >
        <DialogContent size="sm">
          <DialogHeader>
            <DialogTitle>{s.addOtherToolTitle}</DialogTitle>
          </DialogHeader>
          <Input
            value={addToolDraft}
            onChange={(e) => {
              setAddToolDraft(e.target.value);
              setAddToolError(null);
            }}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                e.preventDefault();
                confirmAddCustomTool();
              }
            }}
            placeholder={s.addOtherToolPlaceholder}
            maxLength={TOOL_NAME_MAX}
            autoFocus
            aria-invalid={!!addToolError}
          />
          {addToolError ? (
            <p className="text-sm text-destructive">{addToolError}</p>
          ) : null}
          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={() => setAddToolOpen(false)}
            >
              {s.addOtherToolCancel}
            </Button>
            <Button type="button" onClick={confirmAddCustomTool}>
              {s.addOtherToolConfirm}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
