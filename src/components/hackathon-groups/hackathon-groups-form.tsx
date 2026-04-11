"use client";

import { useForm } from "@tanstack/react-form";
import { useMutation, useQuery } from "convex/react";
import { useNavigate } from "@tanstack/react-router";
import { z } from "zod";
import { useEffect, useMemo, useState } from "react";
import { api } from "convex/_generated/api";
import type { ReactNode } from "react";
import type { CoverImageValue } from "@/components/showcase/showcase-cover-upload";
import { ShowcaseCoverUpload } from "@/components/showcase/showcase-cover-upload";
import { AnimatedGrid } from "@/components/ui/animated-grid";
import { BENTO_CARD_CLASS } from "@/lib/bento-card";
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
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

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

function HackathonCreateSlugHint({
  title,
  groupName,
  label,
  takenSuffix,
}: {
  title: string;
  groupName: string;
  label: string;
  takenSuffix: string;
}) {
  const preview = useQuery(
    api.hackathon_groups.previewSlugForTitle,
    title.trim().length > 0 && groupName.trim().length > 0
      ? { title: title.trim(), groupName: groupName.trim() }
      : "skip"
  );
  if (preview === undefined || preview === null) return null;
  return (
    <p className="text-xs text-muted-foreground">
      <span className="font-medium text-foreground/80">{label}</span>{" "}
      <span className="break-all font-mono text-foreground/70">
        /hackathon-groups/{preview.slug}
      </span>
      {preview.baseIsTaken ? <span className="mt-1 block">{takenSuffix}</span> : null}
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
      <span className="shrink-0 text-xs font-semibold uppercase text-primary">
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

function createHackathonFormSchema(labels: {
  groupNameRequired: string;
  titleRequired: string;
  taglineRequired: string;
  descriptionRequired: string;
  coverRequired: string;
  invalidUrl: string;
  toolTooLong: string;
  toolMax: string;
}) {
  const optionalUrl = (invalidMsg: string) =>
    z.union([z.literal(""), z.string().url(invalidMsg)]);

  return z.object({
    groupName: z.string().min(1, labels.groupNameRequired).max(80),
    title: z.string().min(1, labels.titleRequired).max(80),
    tagline: z.string().min(1, labels.taglineRequired).max(120),
    description: z.string().min(1, labels.descriptionRequired).max(1500),
    coverImage: z
      .object({
        storageId: z.any(),
        url: z.string(),
      })
      .nullable()
      .refine((v) => v !== null, labels.coverRequired),
    projectUrl: optionalUrl(labels.invalidUrl),
    repoUrl: optionalUrl(labels.invalidUrl),
    socialPostUrl: optionalUrl(labels.invalidUrl),
    toolsUsed: z.array(z.string().max(TOOL_NAME_MAX, labels.toolTooLong)).max(
      TOOLS_MAX,
      labels.toolMax
    ),
    status: z.enum(["shipped", "in_progress", "concept"]),
    historyNote: z.string().max(160).optional(),
  });
}

interface HackathonGroupsFormProps {
  editSlug?: string;
}

export function HackathonGroupsForm({ editSlug }: HackathonGroupsFormProps) {
  const { t } = useI18n();
  const navigate = useNavigate();
  const createEntry = useMutation(api.hackathon_groups.create);
  const updateEntry = useMutation(api.hackathon_groups.update);
  const existingEntry = useQuery(
    api.hackathon_groups.getBySlug,
    editSlug ? { slug: editSlug } : "skip"
  );

  const labels = useMemo(
    () => ({
      heroBadge: "Hackathon groups",
      heroTitleSubmit: "Upload your group project",
      heroTitleEdit: "Update your group project",
      heroSubtitle:
        "Publish project updates while your session is active and keep a visible history.",
      sectionBasics: "Basics",
      sectionStory: "Story",
      sectionCover: "Cover",
      sectionLinks: "Links",
      sectionTools: "Tools",
      sectionMeta: "Status and history",
      groupNameLabel: "Group name",
      groupNamePlaceholder: "e.g. Team Prompt Pirates",
      groupNameRequired: "Group name is required",
      titleLabel: "Project title",
      titlePlaceholder: "What your group is building",
      titleRequired: "Title is required",
      urlPreviewLabel: "Project URL preview",
      urlPreviewTakenSuffix:
        "That URL already exists. A short unique suffix will be added when submitted.",
      taglineLabel: "Tagline",
      taglinePlaceholder: "One sentence value proposition",
      taglineRequired: "Tagline is required",
      descriptionLabel: "Description",
      descriptionRequired: "Description is required",
      descriptionMdHint:
        "Use write mode for markdown and preview mode to validate formatting.",
      coverLabel: "Cover image",
      coverUploadCta: "Choose image",
      coverUploading: "Uploading...",
      coverDragDropHint: "Drag and drop or click to upload",
      coverFileSizeHint:
        "JPG, PNG, WebP - max 3MB. 1200x630 recommended for social previews.",
      coverRequired: "Cover image is required",
      coverErrorMaxSize: "Max size 3MB",
      coverErrorFileType: "Use JPG, PNG or WebP",
      coverErrorUploadFailed: "Upload failed. Try again.",
      projectUrlLabel: "Project URL",
      projectUrlPlaceholder: "https://...",
      repoUrlLabel: "Repository URL",
      repoUrlPlaceholder: "https://github.com/...",
      socialPostUrlLabel: "Social post URL",
      socialPostUrlPlaceholder: "https://...",
      invalidUrl: "Enter a valid URL",
      toolsUsedLabel: "Tools used",
      addOtherTool: "Add tool",
      addOtherToolTitle: "Add a custom tool",
      addOtherToolPlaceholder: "e.g. Cursor Agent",
      addOtherToolConfirm: "Add",
      addOtherToolCancel: "Cancel",
      addOtherToolEmpty: "Type a tool name.",
      addOtherToolDuplicate: "That tool is already selected.",
      addOtherToolMax: "Maximum 25 tools.",
      addOtherToolTooLong: "Maximum 40 characters.",
      statusLabel: "Current status",
      statusShipped: "Shipped",
      statusInProgress: "In progress",
      statusConcept: "Concept",
      historyNoteLabel: "History note",
      historyNotePlaceholder: "What changed in this update?",
      historyNoteDescription:
        "Optional. This note appears in the project history timeline.",
      submit: "Upload project",
      saveChanges: "Save update",
      saving: "Saving...",
      cancel: "Cancel",
      editNotFound: "Project not found",
      editNotFoundDescription:
        "This project no longer exists or is not available.",
      toolTooLong: "Maximum 40 characters.",
      toolMax: "Maximum 25 tools.",
    }),
    []
  );

  const schema = useMemo(
    () =>
      createHackathonFormSchema({
        groupNameRequired: labels.groupNameRequired,
        titleRequired: labels.titleRequired,
        taglineRequired: labels.taglineRequired,
        descriptionRequired: labels.descriptionRequired,
        coverRequired: labels.coverRequired,
        invalidUrl: labels.invalidUrl,
        toolTooLong: labels.toolTooLong,
        toolMax: labels.toolMax,
      }),
    [labels]
  );

  const toolLabelById = useMemo(() => {
    const map = new Map<string, string>();
    for (const opt of t.onboarding.interests.tools) {
      map.set(opt.id, opt.label);
    }
    return map;
  }, [t.onboarding.interests.tools]);

  const form = useForm({
    defaultValues: {
      groupName: "",
      title: "",
      tagline: "",
      description: "",
      coverImage: null as CoverImageValue | null,
      projectUrl: "",
      repoUrl: "",
      socialPostUrl: "",
      toolsUsed: [] as Array<string>,
      status: "in_progress" as "shipped" | "in_progress" | "concept",
      historyNote: "",
    },
    validators: { onSubmit: schema as any },
    onSubmit: async ({ value }) => {
      if (!value.coverImage) return;
      if (editSlug && existingEntry) {
        await updateEntry({
          id: existingEntry._id,
          groupName: value.groupName,
          title: value.title,
          tagline: value.tagline,
          description: value.description,
          coverImageId: value.coverImage.storageId,
          coverImageUrl: value.coverImage.url,
          projectUrl: value.projectUrl || undefined,
          repoUrl: value.repoUrl || undefined,
          socialPostUrl: value.socialPostUrl || undefined,
          toolsUsed: value.toolsUsed.length ? value.toolsUsed : undefined,
          status: value.status,
          historyNote: value.historyNote.trim() || undefined,
        });
        navigate({
          to: "/hackathon-groups/$slug",
          params: { slug: existingEntry.slug },
        });
      } else {
        const slug = await createEntry({
          groupName: value.groupName,
          title: value.title,
          tagline: value.tagline,
          description: value.description,
          coverImageId: value.coverImage.storageId,
          coverImageUrl: value.coverImage.url,
          projectUrl: value.projectUrl || undefined,
          repoUrl: value.repoUrl || undefined,
          socialPostUrl: value.socialPostUrl || undefined,
          toolsUsed: value.toolsUsed.length ? value.toolsUsed : undefined,
          status: value.status,
        });
        navigate({
          to: "/hackathon-groups/$slug",
          params: { slug },
        });
      }
    },
  });

  useEffect(() => {
    if (!existingEntry || !editSlug) return;
    form.setFieldValue("groupName", existingEntry.groupName);
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
    form.setFieldValue("toolsUsed", existingEntry.toolsUsed ?? []);
    form.setFieldValue("status", existingEntry.status);
  }, [existingEntry, editSlug]);

  const toggleTool = (toolId: string) => {
    const current = form.getFieldValue("toolsUsed");
    const next = current.includes(toolId)
      ? current.filter((x) => x !== toolId)
      : [...current, toolId];
    form.setFieldValue("toolsUsed", next);
  };

  const [addToolOpen, setAddToolOpen] = useState(false);
  const [addToolDraft, setAddToolDraft] = useState("");
  const [addToolError, setAddToolError] = useState<string | null>(null);

  const confirmAddCustomTool = () => {
    const raw = addToolDraft.trim();
    if (!raw) {
      setAddToolError(labels.addOtherToolEmpty);
      return;
    }
    if (raw.length > TOOL_NAME_MAX) {
      setAddToolError(labels.addOtherToolTooLong);
      return;
    }
    const current = form.getFieldValue("toolsUsed");
    if (current.length >= TOOLS_MAX) {
      setAddToolError(labels.addOtherToolMax);
      return;
    }
    const presetId = resolvePresetToolId(raw, toolLabelById);
    if (presetId) {
      if (current.includes(presetId)) {
        setAddToolError(labels.addOtherToolDuplicate);
        return;
      }
      form.setFieldValue("toolsUsed", [...current, presetId]);
    } else {
      const lower = raw.toLowerCase();
      if (current.some((x) => x.toLowerCase() === lower)) {
        setAddToolError(labels.addOtherToolDuplicate);
        return;
      }
      for (const id of TOOL_IDS) {
        const lab = toolLabelById.get(id)?.toLowerCase();
        if (lab === lower && current.includes(id)) {
          setAddToolError(labels.addOtherToolDuplicate);
          return;
        }
      }
      form.setFieldValue("toolsUsed", [...current, raw]);
    }
    setAddToolOpen(false);
    setAddToolDraft("");
    setAddToolError(null);
  };

  if (editSlug && existingEntry === null) {
    return (
      <div className="container mx-auto px-6 py-20 text-center">
        <h1 className="mb-2 text-balance text-2xl font-medium text-foreground">
          {labels.editNotFound}
        </h1>
        <p className="mx-auto max-w-md text-pretty text-sm text-muted-foreground">
          {labels.editNotFoundDescription}
        </p>
      </div>
    );
  }

  return (
    <div className="flex flex-col">
      <section className="relative overflow-hidden" aria-labelledby="hackathon-form-title">
        <AnimatedGrid />
        <div className="hero-top-fade pointer-events-none absolute inset-0 z-2" />
        <div className="container relative z-10 mx-auto px-6 pb-8 pt-6 md:pb-10 md:pt-10 lg:pt-12">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-3 py-1 shadow-sm motion-safe:animate-hero-in [animation-delay:80ms]">
            <span className="text-xs font-medium uppercase text-primary">
              {labels.heroBadge}
            </span>
          </div>
          <h1
            id="hackathon-form-title"
            className="mb-4 max-w-3xl text-balance text-3xl font-medium leading-tight motion-safe:animate-hero-in [animation-delay:140ms] md:text-4xl lg:text-5xl"
          >
            {editSlug ? labels.heroTitleEdit : labels.heroTitleSubmit}
          </h1>
          <p className="max-w-2xl text-pretty text-base font-light leading-relaxed text-foreground/60 motion-safe:animate-hero-in [animation-delay:200ms] md:text-lg">
            {labels.heroSubtitle}
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
              <span className="text-xs font-semibold uppercase text-primary">
                {labels.sectionBasics}
              </span>
              <form.Field name="groupName">
                {(field) => (
                  <Field>
                    <FieldLabel required>{labels.groupNameLabel}</FieldLabel>
                    <Input
                      value={field.state.value}
                      onChange={(e) => field.handleChange(e.target.value)}
                      onBlur={field.handleBlur}
                      placeholder={labels.groupNamePlaceholder}
                      maxLength={80}
                    />
                    <FieldError errors={field.state.meta.errors} />
                  </Field>
                )}
              </form.Field>
              <form.Field name="title">
                {(field) => (
                  <Field>
                    <FieldLabel required>{labels.titleLabel}</FieldLabel>
                    <Input
                      value={field.state.value}
                      onChange={(e) => field.handleChange(e.target.value)}
                      onBlur={field.handleBlur}
                      placeholder={labels.titlePlaceholder}
                      maxLength={80}
                    />
                    <FieldError errors={field.state.meta.errors} />
                    {!editSlug && (
                      <HackathonCreateSlugHint
                        title={field.state.value}
                        groupName={form.getFieldValue("groupName")}
                        label={labels.urlPreviewLabel}
                        takenSuffix={labels.urlPreviewTakenSuffix}
                      />
                    )}
                  </Field>
                )}
              </form.Field>
              <form.Field name="tagline">
                {(field) => (
                  <Field>
                    <FieldLabel required>{labels.taglineLabel}</FieldLabel>
                    <Input
                      value={field.state.value}
                      onChange={(e) => field.handleChange(e.target.value)}
                      onBlur={field.handleBlur}
                      placeholder={labels.taglinePlaceholder}
                      maxLength={120}
                    />
                    <FieldError errors={field.state.meta.errors} />
                  </Field>
                )}
              </form.Field>
            </div>

            <BentoFormSection
              label={labels.sectionCover}
              delayMs={140}
              className="md:col-span-2 lg:col-span-2"
            >
              <form.Field name="coverImage">
                {(field) => (
                  <Field>
                    <ShowcaseCoverUpload
                      value={field.state.value as CoverImageValue | null}
                      onChange={(v) => field.handleChange(v)}
                      label={labels.coverLabel}
                      uploadCta={labels.coverUploadCta}
                      uploading={labels.coverUploading}
                      dragDropHint={labels.coverDragDropHint}
                      fileSizeHint={labels.coverFileSizeHint}
                      errorMaxSize={labels.coverErrorMaxSize}
                      errorFileType={labels.coverErrorFileType}
                      errorUploadFailed={labels.coverErrorUploadFailed}
                      required
                      hideLabel
                    />
                    <FieldError errors={field.state.meta.errors} />
                  </Field>
                )}
              </form.Field>
            </BentoFormSection>

            <BentoFormSection
              label={labels.sectionStory}
              delayMs={200}
              fillHeight
              className="min-h-0 md:col-span-2 lg:col-span-2 lg:min-h-[22rem]"
            >
              <form.Field name="description">
                {(field) => (
                  <Field className="min-h-0 flex-1 flex-col">
                    <FieldLabel className="shrink-0" required>
                      {labels.descriptionLabel}
                    </FieldLabel>
                    <FieldDescription className="shrink-0">
                      {labels.descriptionMdHint}
                    </FieldDescription>
                    <MarkdownEditor
                      value={field.state.value}
                      onChange={(v) => field.handleChange(v)}
                      maxLength={1500}
                      rows={6}
                      writeLabel={t.resources.writeLabel ?? "Write"}
                      previewLabel={t.resources.previewLabel ?? "Preview"}
                      emptyPreviewText={t.resources.previewEmpty ?? "Nothing to preview"}
                      monospaceWrite
                      fillHeight
                    />
                    <FieldError className="shrink-0" errors={field.state.meta.errors} />
                  </Field>
                )}
              </form.Field>
            </BentoFormSection>

            <BentoFormSection
              label={labels.sectionLinks}
              delayMs={220}
              className="h-full min-h-0 md:col-span-2 lg:col-span-2 lg:min-h-[22rem]"
            >
              <form.Field name="projectUrl">
                {(field) => (
                  <Field>
                    <FieldLabel>{labels.projectUrlLabel}</FieldLabel>
                    <Input
                      type="url"
                      value={field.state.value}
                      onChange={(e) => field.handleChange(e.target.value)}
                      placeholder={labels.projectUrlPlaceholder}
                    />
                    <FieldError errors={field.state.meta.errors} />
                  </Field>
                )}
              </form.Field>
              <form.Field name="repoUrl">
                {(field) => (
                  <Field>
                    <FieldLabel>{labels.repoUrlLabel}</FieldLabel>
                    <Input
                      type="url"
                      value={field.state.value}
                      onChange={(e) => field.handleChange(e.target.value)}
                      placeholder={labels.repoUrlPlaceholder}
                    />
                    <FieldError errors={field.state.meta.errors} />
                  </Field>
                )}
              </form.Field>
              <form.Field name="socialPostUrl">
                {(field) => (
                  <Field>
                    <FieldLabel>{labels.socialPostUrlLabel}</FieldLabel>
                    <Input
                      type="url"
                      value={field.state.value}
                      onChange={(e) => field.handleChange(e.target.value)}
                      placeholder={labels.socialPostUrlPlaceholder}
                    />
                    <FieldError errors={field.state.meta.errors} />
                  </Field>
                )}
              </form.Field>
            </BentoFormSection>

            <BentoFormSection
              label={labels.sectionTools}
              delayMs={320}
              className="md:col-span-2 lg:col-span-2"
            >
              <form.Field name="toolsUsed">
                {() => {
                  const selectedTools = form.getFieldValue("toolsUsed");
                  const customInOrder = selectedTools.filter((x) => !TOOL_ID_SET.has(x));
                  return (
                    <div
                      className="flex flex-col gap-3"
                      role="group"
                      aria-label={labels.toolsUsedLabel}
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
                          {labels.addOtherTool}
                        </Button>
                      </div>
                    </div>
                  );
                }}
              </form.Field>
            </BentoFormSection>

            <BentoFormSection
              label={labels.sectionMeta}
              delayMs={360}
              className="md:col-span-2 lg:col-span-2"
            >
              <form.Field name="status">
                {(field) => (
                  <Field>
                    <FieldLabel>{labels.statusLabel}</FieldLabel>
                    <div className="flex flex-wrap gap-x-2 gap-y-3">
                      {(["shipped", "in_progress", "concept"] as const).map((statusVal) => (
                        <ToggleChip
                          key={statusVal}
                          label={
                            statusVal === "shipped"
                              ? labels.statusShipped
                              : statusVal === "in_progress"
                                ? labels.statusInProgress
                                : labels.statusConcept
                          }
                          selected={field.state.value === statusVal}
                          onToggle={() => form.setFieldValue("status", statusVal)}
                        />
                      ))}
                    </div>
                  </Field>
                )}
              </form.Field>
              {editSlug ? (
                <form.Field name="historyNote">
                  {(field) => (
                    <Field>
                      <FieldLabel>{labels.historyNoteLabel}</FieldLabel>
                      <FieldDescription>{labels.historyNoteDescription}</FieldDescription>
                      <Input
                        value={field.state.value}
                        onChange={(e) => field.handleChange(e.target.value)}
                        placeholder={labels.historyNotePlaceholder}
                        maxLength={160}
                      />
                      <FieldError errors={field.state.meta.errors} />
                    </Field>
                  )}
                </form.Field>
              ) : null}
            </BentoFormSection>

            <div
              className={cn(
                BENTO_CARD_CLASS,
                "flex flex-col gap-4 p-6 motion-safe:animate-hero-in md:col-span-2 lg:col-span-4"
              )}
              style={{ animationDelay: "440ms" }}
            >
              <div className="flex flex-wrap gap-3">
                <Button type="submit" disabled={form.state.isSubmitting}>
                  {form.state.isSubmitting
                    ? labels.saving
                    : editSlug
                      ? labels.saveChanges
                      : labels.submit}
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  onClick={() =>
                    navigate({
                      to: "/hackathon-groups",
                      search: { status: undefined },
                    })
                  }
                >
                  {labels.cancel}
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
            <DialogTitle>{labels.addOtherToolTitle}</DialogTitle>
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
            placeholder={labels.addOtherToolPlaceholder}
            maxLength={TOOL_NAME_MAX}
            autoFocus
            aria-invalid={!!addToolError}
          />
          {addToolError ? <p className="text-sm text-destructive">{addToolError}</p> : null}
          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => setAddToolOpen(false)}>
              {labels.addOtherToolCancel}
            </Button>
            <Button type="button" onClick={confirmAddCustomTool}>
              {labels.addOtherToolConfirm}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
