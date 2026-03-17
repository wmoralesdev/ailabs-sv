"use client";

import { useState, useEffect } from "react";
import { useMutation } from "convex/react";
import { api } from "convex/_generated/api";
import type { Id } from "convex/_generated/dataModel";
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import {
  ShowcaseCoverUpload,
  type CoverImageValue,
} from "@/components/showcase/showcase-cover-upload";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const EVENT_TYPES = [
  "Meetup",
  "Workshop",
  "Social",
  "Conference",
  "Hackathon",
] as const;

const SV_TZ = "America/El_Salvador";

function utcToSvLocal(ms: number): string {
  const parts = new Intl.DateTimeFormat("en-CA", {
    timeZone: SV_TZ,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  }).formatToParts(new Date(ms));
  const get = (type: string) =>
    parts.find((p) => p.type === type)?.value ?? "00";
  const hour = get("hour") === "24" ? "00" : get("hour");
  return `${get("year")}-${get("month")}-${get("day")}T${hour}:${get("minute")}`;
}

// El Salvador is always UTC-6 (no DST)
function svLocalToUtc(str: string): number {
  return new Date(str + "-06:00").getTime();
}

export type EventDoc = {
  _id: Id<"events">;
  slug: string;
  published: boolean;
  type: (typeof EVENT_TYPES)[number];
  tags: string[];
  isVirtual?: boolean;
  partner?: string;
  country?: { es: string; en: string };
  startAt: number;
  endAt?: number;
  timezone?: string;
  title: { es: string; en: string };
  description: { es: string; en: string };
  location: { es: string; en: string };
  dateLabel: { es: string; en: string };
  rsvpUrl: string;
  coverImageId?: Id<"_storage">;
  imageUrl?: string;
  recapUrl?: string;
  photoAlbumUrl?: string;
  galleryDateLabel?: { es: string; en: string };
};

interface AdminEventFormProps {
  event?: EventDoc | null;
  onSuccess?: () => void;
  onCancel?: () => void;
}

function SectionHeading({ children }: { children: React.ReactNode }) {
  return (
    <div className="border-b border-border pb-1 pt-2">
      <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
        {children}
      </p>
    </div>
  );
}

export function AdminEventForm({
  event,
  onSuccess,
  onCancel,
}: AdminEventFormProps) {
  const upsertEvent = useMutation(api.admin.upsertEvent);
  const getStorageUrl = useMutation(api.storage.getStorageUrl);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [slug, setSlug] = useState("");
  const [published, setPublished] = useState(false);
  const [isVirtual, setIsVirtual] = useState(false);
  const [type, setType] = useState<(typeof EVENT_TYPES)[number]>("Meetup");
  const [partner, setPartner] = useState("");

  const [startAtStr, setStartAtStr] = useState("");
  const [endAtStr, setEndAtStr] = useState("");
  const [timezone, setTimezone] = useState(SV_TZ);

  const [titleEs, setTitleEs] = useState("");
  const [titleEn, setTitleEn] = useState("");
  const [descriptionEs, setDescriptionEs] = useState("");
  const [descriptionEn, setDescriptionEn] = useState("");
  const [locationEs, setLocationEs] = useState("");
  const [locationEn, setLocationEn] = useState("");
  const [dateLabelEs, setDateLabelEs] = useState("");
  const [dateLabelEn, setDateLabelEn] = useState("");
  const [countryEs, setCountryEs] = useState("");
  const [countryEn, setCountryEn] = useState("");

  const [rsvpUrl, setRsvpUrl] = useState("");
  const [coverImage, setCoverImage] = useState<CoverImageValue | null>(null);
  const [recapUrl, setRecapUrl] = useState("");
  const [photoAlbumUrl, setPhotoAlbumUrl] = useState("");
  const [galleryDateLabelEs, setGalleryDateLabelEs] = useState("");
  const [galleryDateLabelEn, setGalleryDateLabelEn] = useState("");
  const [tagsStr, setTagsStr] = useState("");

  useEffect(() => {
    if (event) {
      setSlug(event.slug);
      setPublished(event.published);
      setIsVirtual(event.isVirtual ?? false);
      setType(event.type);
      setPartner(event.partner ?? "");
      setStartAtStr(utcToSvLocal(event.startAt));
      setEndAtStr(event.endAt ? utcToSvLocal(event.endAt) : "");
      setTimezone(event.timezone ?? SV_TZ);
      setTitleEs(event.title.es);
      setTitleEn(event.title.en);
      setDescriptionEs(event.description.es);
      setDescriptionEn(event.description.en);
      setLocationEs(event.location.es);
      setLocationEn(event.location.en);
      setDateLabelEs(event.dateLabel.es);
      setDateLabelEn(event.dateLabel.en);
      setCountryEs(event.country?.es ?? "");
      setCountryEn(event.country?.en ?? "");
      setRsvpUrl(event.rsvpUrl);
      setRecapUrl(event.recapUrl ?? "");
      setPhotoAlbumUrl(event.photoAlbumUrl ?? "");
      setGalleryDateLabelEs(event.galleryDateLabel?.es ?? "");
      if (event.coverImageId) {
        getStorageUrl({ storageId: event.coverImageId }).then((url) => {
          if (url) setCoverImage({ storageId: event.coverImageId!, url });
        });
      } else {
        setCoverImage(null);
      }
      setGalleryDateLabelEn(event.galleryDateLabel?.en ?? "");
      setTagsStr(event.tags.join(", "));
    } else {
      setStartAtStr(utcToSvLocal(Date.now()));
      setTimezone(SV_TZ);
      setCoverImage(null);
    }
  }, [event, getStorageUrl]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      const startAt = svLocalToUtc(startAtStr);
      if (isNaN(startAt)) {
        setError("Invalid start date");
        return;
      }
      const endAt = endAtStr ? svLocalToUtc(endAtStr) : undefined;
      if (endAt !== undefined && isNaN(endAt)) {
        setError("Invalid end date");
        return;
      }

      const tags = tagsStr
        .split(",")
        .map((s) => s.trim())
        .filter(Boolean);

      await upsertEvent({
        id: event?._id,
        slug: slug.trim(),
        published,
        isVirtual,
        type,
        tags,
        partner: partner.trim() || undefined,
        country:
          countryEs || countryEn
            ? { es: countryEs.trim(), en: countryEn.trim() }
            : undefined,
        startAt,
        endAt,
        timezone: timezone.trim() || undefined,
        title: { es: titleEs.trim(), en: titleEn.trim() },
        description: { es: descriptionEs.trim(), en: descriptionEn.trim() },
        location: { es: locationEs.trim(), en: locationEn.trim() },
        dateLabel: { es: dateLabelEs.trim(), en: dateLabelEn.trim() },
        rsvpUrl: rsvpUrl.trim(),
        coverImageId: coverImage?.storageId,
        imageUrl: coverImage ? undefined : event?.imageUrl,
        recapUrl: recapUrl.trim() || undefined,
        photoAlbumUrl: photoAlbumUrl.trim() || undefined,
        galleryDateLabel:
          galleryDateLabelEs || galleryDateLabelEn
            ? {
                es: galleryDateLabelEs.trim(),
                en: galleryDateLabelEn.trim(),
              }
            : undefined,
      });

      onSuccess?.();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to save");
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      {error && (
        <p className="rounded-md bg-destructive/10 px-3 py-2 text-sm text-destructive" role="alert">
          {error}
        </p>
      )}

      {/* Basics */}
      <SectionHeading>Basics</SectionHeading>
      <FieldGroup className="grid gap-4 sm:grid-cols-2">
        <Field>
          <FieldLabel>Slug</FieldLabel>
          <Input
            value={slug}
            onChange={(e) => setSlug(e.target.value)}
            placeholder="ai-workflow-deep-dive"
            required
          />
        </Field>
        <Field>
          <FieldLabel>Type</FieldLabel>
          <Select
            value={type}
            onValueChange={(v) => setType(v as (typeof EVENT_TYPES)[number])}
          >
            <SelectTrigger className="w-full">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {EVENT_TYPES.map((t) => (
                <SelectItem key={t} value={t}>
                  {t}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </Field>
      </FieldGroup>
      <FieldGroup className="grid gap-4 sm:grid-cols-2">
        <Field>
          <FieldLabel>Partner</FieldLabel>
          <Input
            value={partner}
            onChange={(e) => setPartner(e.target.value)}
            placeholder="Cursor, v0, etc."
          />
        </Field>
        <Field>
          <label className="flex items-center gap-2 pt-5">
            <input
              type="checkbox"
              checked={published}
              onChange={(e) => setPublished(e.target.checked)}
              className="rounded border-border"
            />
            <span className="text-sm">Published</span>
          </label>
        </Field>
        <Field>
          <label className="flex items-center gap-2 pt-5">
            <input
              type="checkbox"
              checked={isVirtual}
              onChange={(e) => setIsVirtual(e.target.checked)}
              className="rounded border-border"
            />
            <span className="text-sm">Virtual</span>
          </label>
        </Field>
      </FieldGroup>

      {/* Schedule */}
      <SectionHeading>Schedule</SectionHeading>
      <FieldGroup className="grid gap-4 sm:grid-cols-2">
        <Field>
          <FieldLabel>Start</FieldLabel>
          <Input
            type="datetime-local"
            value={startAtStr}
            onChange={(e) => setStartAtStr(e.target.value)}
            required
          />
          <p className="mt-1 text-xs text-muted-foreground">SV time (UTC-6)</p>
        </Field>
        <Field>
          <FieldLabel>End <span className="text-muted-foreground font-normal">(optional)</span></FieldLabel>
          <Input
            type="datetime-local"
            value={endAtStr}
            onChange={(e) => setEndAtStr(e.target.value)}
          />
          <p className="mt-1 text-xs text-muted-foreground">SV time (UTC-6)</p>
        </Field>
      </FieldGroup>
      <Field>
        <FieldLabel>Timezone</FieldLabel>
        <Input
          value={timezone}
          onChange={(e) => setTimezone(e.target.value)}
          placeholder="America/El_Salvador"
        />
      </Field>

      {/* Content */}
      <SectionHeading>Content</SectionHeading>
      <FieldGroup className="grid gap-4 sm:grid-cols-2">
        <Field>
          <FieldLabel>Title (ES)</FieldLabel>
          <Input
            value={titleEs}
            onChange={(e) => setTitleEs(e.target.value)}
            required
          />
        </Field>
        <Field>
          <FieldLabel>Title (EN)</FieldLabel>
          <Input
            value={titleEn}
            onChange={(e) => setTitleEn(e.target.value)}
            required
          />
        </Field>
      </FieldGroup>
      <FieldGroup className="grid gap-4 sm:grid-cols-2">
        <Field>
          <FieldLabel>Description (ES)</FieldLabel>
          <Textarea
            value={descriptionEs}
            onChange={(e) => setDescriptionEs(e.target.value)}
            rows={3}
            required
          />
        </Field>
        <Field>
          <FieldLabel>Description (EN)</FieldLabel>
          <Textarea
            value={descriptionEn}
            onChange={(e) => setDescriptionEn(e.target.value)}
            rows={3}
            required
          />
        </Field>
      </FieldGroup>
      <FieldGroup className="grid gap-4 sm:grid-cols-2">
        <Field>
          <FieldLabel>Location (ES)</FieldLabel>
          <Input
            value={locationEs}
            onChange={(e) => setLocationEs(e.target.value)}
            required
          />
        </Field>
        <Field>
          <FieldLabel>Location (EN)</FieldLabel>
          <Input
            value={locationEn}
            onChange={(e) => setLocationEn(e.target.value)}
            required
          />
        </Field>
      </FieldGroup>
      <FieldGroup className="grid gap-4 sm:grid-cols-2">
        <Field>
          <FieldLabel>Date label (ES)</FieldLabel>
          <Input
            value={dateLabelEs}
            onChange={(e) => setDateLabelEs(e.target.value)}
            placeholder="Sábado 15 de marzo, 10:00 AM"
            required
          />
        </Field>
        <Field>
          <FieldLabel>Date label (EN)</FieldLabel>
          <Input
            value={dateLabelEn}
            onChange={(e) => setDateLabelEn(e.target.value)}
            placeholder="Saturday, March 15th, 10:00 AM"
            required
          />
        </Field>
      </FieldGroup>
      <FieldGroup className="grid gap-4 sm:grid-cols-2">
        <Field>
          <FieldLabel>Country (ES)</FieldLabel>
          <Input
            value={countryEs}
            onChange={(e) => setCountryEs(e.target.value)}
            placeholder="El Salvador"
          />
        </Field>
        <Field>
          <FieldLabel>Country (EN)</FieldLabel>
          <Input
            value={countryEn}
            onChange={(e) => setCountryEn(e.target.value)}
            placeholder="El Salvador"
          />
        </Field>
      </FieldGroup>
      <p className="-mt-2 text-xs text-muted-foreground">
        Leave empty for El Salvador (default)
      </p>

      {/* Links & Media */}
      <SectionHeading>Links &amp; Media</SectionHeading>
      <Field>
        <FieldLabel>RSVP URL (Luma)</FieldLabel>
        <Input
          type="url"
          value={rsvpUrl}
          onChange={(e) => setRsvpUrl(e.target.value)}
          placeholder="https://lu.ma/..."
          required
        />
      </Field>
      <Field>
        <ShowcaseCoverUpload
          value={coverImage}
          onChange={setCoverImage}
          label="Cover image"
          uploadCta="Upload cover"
          uploading="Uploading…"
          noMaxSize
          fileSizeHint="JPG, PNG, WebP. 1200×630 recommended for social previews."
        />
      </Field>
      <FieldGroup className="grid gap-4 sm:grid-cols-2">
        <Field>
          <FieldLabel>Recap URL</FieldLabel>
          <Input
            type="url"
            value={recapUrl}
            onChange={(e) => setRecapUrl(e.target.value)}
            placeholder="https://..."
          />
        </Field>
        <Field>
          <FieldLabel>Photo album URL (Google Photos)</FieldLabel>
          <Input
            type="url"
            value={photoAlbumUrl}
            onChange={(e) => setPhotoAlbumUrl(e.target.value)}
            placeholder="https://photos.app.goo.gl/..."
          />
        </Field>
      </FieldGroup>
      <FieldGroup className="grid gap-4 sm:grid-cols-2">
        <Field>
          <FieldLabel>Gallery date label (ES)</FieldLabel>
          <Input
            value={galleryDateLabelEs}
            onChange={(e) => setGalleryDateLabelEs(e.target.value)}
          />
        </Field>
        <Field>
          <FieldLabel>Gallery date label (EN)</FieldLabel>
          <Input
            value={galleryDateLabelEn}
            onChange={(e) => setGalleryDateLabelEn(e.target.value)}
          />
        </Field>
      </FieldGroup>
      <Field>
        <FieldLabel>Tags</FieldLabel>
        <Input
          value={tagsStr}
          onChange={(e) => setTagsStr(e.target.value)}
          placeholder="AI, Workflow, Networking"
        />
        <p className="mt-1 text-xs text-muted-foreground">Comma-separated</p>
      </Field>

      {/* Actions */}
      <div className="flex gap-2 pt-2">
        <Button type="submit" disabled={loading}>
          {loading ? "Saving…" : event ? "Update event" : "Create event"}
        </Button>
        {onCancel && (
          <Button type="button" variant="outline" onClick={onCancel}>
            Cancel
          </Button>
        )}
      </div>
    </form>
  );
}
