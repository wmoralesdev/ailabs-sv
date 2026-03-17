"use client";

import { useForm } from "@tanstack/react-form";
import { useMutation, useQuery } from "convex/react";
import { api } from "convex/_generated/api";
import { useNavigate } from "@tanstack/react-router";
import { z } from "zod";
import { useEffect } from "react";
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
import { ShowcaseCoverUpload } from "./showcase-cover-upload";
import { useI18n } from "@/lib/i18n";

const schema = z.object({
  title: z.string().min(1, "Title is required").max(80),
  tagline: z.string().min(1, "Tagline is required").max(120),
  description: z.string().min(1, "Description is required").max(1500),
  coverImage: z
    .object({
      storageId: z.any(),
      url: z.string(),
    })
    .nullable()
    .refine((v) => v !== null, "Cover image is required"),
  projectUrl: z.string().url().optional().or(z.literal("")),
  repoUrl: z.string().url().optional().or(z.literal("")),
  socialPostUrl: z.string().url().optional().or(z.literal("")),
  event: z.string().optional(),
  toolsUsed: z.array(z.string()),
  collaboratorIds: z.array(z.string()).max(5),
  status: z.enum(["shipped", "in_progress", "concept"]),
});

interface ShowcaseFormProps {
  editSlug?: string;
}

export function ShowcaseForm({ editSlug }: ShowcaseFormProps) {
  const { t } = useI18n();
  const navigate = useNavigate();
  const createEntry = useMutation(api.showcase.create);
  const updateEntry = useMutation(api.showcase.update);
  const existingEntry = useQuery(
    api.showcase.getBySlug,
    editSlug ? { slug: editSlug } : "skip"
  );

  const form = useForm({
    defaultValues: {
      title: "",
      tagline: "",
      description: "",
      coverImage: null as { storageId: import("convex/_generated/dataModel").Id<"_storage">; url: string } | null,
      projectUrl: "",
      repoUrl: "",
      socialPostUrl: "",
      event: "",
      toolsUsed: [] as string[],
      collaboratorIds: [] as string[],
      status: "shipped" as const,
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
          coverImageId: value.coverImage.storageId as import("convex/_generated/dataModel").Id<"_storage">,
          coverImageUrl: value.coverImage.url,
          projectUrl: value.projectUrl || undefined,
          repoUrl: value.repoUrl || undefined,
          socialPostUrl: value.socialPostUrl || undefined,
          event: value.event || undefined,
          toolsUsed: value.toolsUsed.length ? value.toolsUsed : undefined,
          collaboratorIds: value.collaboratorIds.length ? value.collaboratorIds : undefined,
          status: value.status,
        });
        navigate({ to: "/showcase/$slug", params: { slug: editSlug } });
      } else {
        const slug = await createEntry({
          title: value.title,
          tagline: value.tagline,
          description: value.description,
          coverImageId: value.coverImage.storageId as unknown as import("convex/_generated/dataModel").Id<"_storage">,
          coverImageUrl: value.coverImage.url,
          projectUrl: value.projectUrl || undefined,
          repoUrl: value.repoUrl || undefined,
          socialPostUrl: value.socialPostUrl || undefined,
          event: value.event || undefined,
          toolsUsed: value.toolsUsed.length ? value.toolsUsed : undefined,
          collaboratorIds: value.collaboratorIds.length ? value.collaboratorIds : undefined,
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
      form.setFieldValue("collaboratorIds", existingEntry.collaboratorIds ?? []);
      form.setFieldValue("status", existingEntry.status as any);
    }
  }, [existingEntry, editSlug]);

  const toggleTool = (id: string) => {
    const current = form.getFieldValue("toolsUsed") ?? [];
    const next = current.includes(id)
      ? current.filter((t) => t !== id)
      : [...current, id];
    form.setFieldValue("toolsUsed", next);
  };

  return (
    <div className="mx-auto max-w-2xl">
      <h1 className="mb-8 text-2xl font-medium tracking-tighter">
        {editSlug ? "Edit project" : "Submit a project"}
      </h1>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          form.handleSubmit();
        }}
        className="space-y-6"
      >
        <form.Field name="title">
          {(field) => (
            <Field>
              <FieldLabel required>Title</FieldLabel>
              <Input
                value={field.state.value}
                onChange={(e) => field.handleChange(e.target.value)}
                onBlur={field.handleBlur}
                placeholder="My awesome project"
                maxLength={80}
              />
              <FieldError errors={field.state.meta.errors} />
            </Field>
          )}
        </form.Field>

        <form.Field name="tagline">
          {(field) => (
            <Field>
              <FieldLabel required>Tagline</FieldLabel>
              <Input
                value={field.state.value}
                onChange={(e) => field.handleChange(e.target.value)}
                onBlur={field.handleBlur}
                placeholder="One-liner description"
                maxLength={120}
              />
              <FieldError errors={field.state.meta.errors} />
            </Field>
          )}
        </form.Field>

        <form.Field name="description">
          {(field) => (
            <Field>
              <FieldLabel required>Description</FieldLabel>
              <MarkdownEditor
                value={field.state.value}
                onChange={(v) => field.handleChange(v)}
                maxLength={1500}
                rows={6}
                writeLabel={t.resources?.writeLabel ?? "Write"}
                previewLabel={t.resources?.previewLabel ?? "Preview"}
                emptyPreviewText={t.resources?.previewEmpty ?? "Nothing to preview"}
              />
              <FieldError errors={field.state.meta.errors} />
            </Field>
          )}
        </form.Field>

        <form.Field name="coverImage">
          {(field) => (
            <Field>
              <ShowcaseCoverUpload
                value={field.state.value as { storageId: import("convex/_generated/dataModel").Id<"_storage">; url: string } | null}
                onChange={(v) => field.handleChange(v)}
                label="Cover image"
                uploadCta="Choose image"
                uploading="Uploading…"
                required
              />
              <FieldError errors={field.state.meta.errors} />
            </Field>
          )}
        </form.Field>

        <form.Field name="projectUrl">
          {(field) => (
            <Field>
              <FieldLabel>Project URL</FieldLabel>
              <Input
                type="url"
                value={field.state.value}
                onChange={(e) => field.handleChange(e.target.value)}
                placeholder="https://..."
              />
            </Field>
          )}
        </form.Field>

        <form.Field name="repoUrl">
          {(field) => (
            <Field>
              <FieldLabel>Repository URL</FieldLabel>
              <Input
                type="url"
                value={field.state.value}
                onChange={(e) => field.handleChange(e.target.value)}
                placeholder="https://github.com/..."
              />
            </Field>
          )}
        </form.Field>

        <form.Field name="socialPostUrl">
          {(field) => (
            <Field>
              <FieldLabel>Social post URL</FieldLabel>
              <FieldDescription>
                Link to your X or LinkedIn post about this project
              </FieldDescription>
              <Input
                type="url"
                value={field.state.value}
                onChange={(e) => field.handleChange(e.target.value)}
                placeholder="https://..."
              />
            </Field>
          )}
        </form.Field>

        <form.Field name="event">
          {(field) => (
            <Field>
              <FieldLabel>Event</FieldLabel>
              <Input
                value={field.state.value}
                onChange={(e) => field.handleChange(e.target.value)}
                placeholder="e.g. Café Cursor #5, Hackathon UFG, Independent"
              />
            </Field>
          )}
        </form.Field>

        <form.Field name="toolsUsed">
          {() => (
            <Field>
              <FieldLabel>Tools used</FieldLabel>
              <div className="flex flex-wrap gap-2">
                {TOOL_IDS.map((id) => {
                  const selected = (form.getFieldValue("toolsUsed") ?? []).includes(id);
                  const icon = toolIcons[id];
                  const label = id.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());
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
              </div>
            </Field>
          )}
        </form.Field>

        <form.Field name="status">
          {(field) => (
            <Field>
              <FieldLabel>Status</FieldLabel>
              <div className="flex gap-2">
                {(["shipped", "in_progress", "concept"] as const).map((s) => (
                  <ToggleChip
                    key={s}
                    label={s === "shipped" ? "Shipped" : s === "in_progress" ? "In progress" : "Concept"}
                    selected={field.state.value === s}
                    onToggle={() => form.setFieldValue("status", (() => s) as any)}
                  />
                ))}
              </div>
            </Field>
          )}
        </form.Field>

        <div className="flex gap-3 pt-4">
          <Button type="submit" disabled={form.state.isSubmitting}>
            {form.state.isSubmitting ? "Saving…" : editSlug ? "Save changes" : "Submit"}
          </Button>
            <Button
              type="button"
              variant="outline"
              onClick={() => navigate({ to: "/feed", search: { event: undefined, tool: undefined, status: undefined } })}
            >
            Cancel
          </Button>
        </div>
      </form>
    </div>
  );
}

