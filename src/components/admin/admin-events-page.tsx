"use client";

import { useCallback, useMemo, useState } from "react";
import { useMutation, useQuery } from "convex/react";
import { api } from "convex/_generated/api";
import { format, isValid, parse } from "date-fns";
import { HugeiconsIcon } from "@hugeicons/react";
import {
  ArrowDown01Icon,
  ArrowUp01Icon,
  Delete01Icon,
  PencilEdit01Icon,
  UnfoldMoreIcon,
} from "@hugeicons/core-free-icons";
import { AdminEventForm } from "./admin-event-form";
import type { EventDoc } from "./admin-event-form";
import type { Id } from "convex/_generated/dataModel";
import type { EventType } from "@/lib/event-sv-datetime";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Calendar } from "@/components/ui/calendar";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { cn } from "@/lib/utils";
import {
  EVENT_TYPES,
  joinSvLocalString,
  normalizePartnerCsv,
  splitSvLocalString,
  svLocalToUtc,
  utcToSvLocal,
} from "@/lib/event-sv-datetime";

const SV_TZ = "America/El_Salvador";

const PARTNER_BADGE_CLASS: Record<string, string> = {
  Cursor:
    "border-primary/40 bg-primary/10 text-primary dark:bg-primary/20 dark:text-primary",
  v0: "border-blue-500/40 bg-blue-500/10 text-blue-600 dark:bg-blue-500/20 dark:text-blue-400",
};

const COUNTRY_BADGE_CLASS: Record<string, string> = {
  "El Salvador":
    "border-emerald-500/40 bg-emerald-500/10 text-emerald-700 dark:bg-emerald-500/20 dark:text-emerald-400",
  Guatemala:
    "border-sky-500/40 bg-sky-500/10 text-sky-600 dark:bg-sky-500/20 dark:text-sky-400",
};

type SortColumn = "title" | "type" | "partner" | "date";
type SortDirection = "asc" | "desc";

type RowOverrides = Partial<{
  titleEn: string;
  type: EventType;
  partner: string;
  published: boolean;
  startSvLocal: string;
}>;

function formatSvDate(ms: number): string {
  return new Date(ms).toLocaleString("en-US", {
    timeZone: SV_TZ,
    month: "short",
    day: "numeric",
    year: "numeric",
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  });
}

function effectiveRow(event: EventDoc, d: RowOverrides | undefined) {
  const startSvLocal = d?.startSvLocal ?? utcToSvLocal(event.startAt);
  return {
    titleEn: d?.titleEn ?? event.title.en,
    type: d?.type ?? event.type,
    partner: d?.partner ?? (event.partner ?? ""),
    published: d?.published ?? event.published,
    startSvLocal,
  };
}

function partnerCsvEqual(a: string, b: string): boolean {
  return (normalizePartnerCsv(a) ?? "") === (normalizePartnerCsv(b) ?? "");
}

function isRowDirty(event: EventDoc, d: RowOverrides | undefined): boolean {
  if (!d) return false;
  const e = effectiveRow(event, d);
  return (
    e.titleEn !== event.title.en ||
    e.type !== event.type ||
    !partnerCsvEqual(e.partner, event.partner ?? "") ||
    e.published !== event.published ||
    e.startSvLocal !== utcToSvLocal(event.startAt)
  );
}

function SortableHeader({
  label,
  sortColumn,
  sortDirection,
  currentColumn,
  onSort,
}: {
  label: string;
  sortColumn: SortColumn | null;
  sortDirection: SortDirection;
  currentColumn: SortColumn;
  onSort: () => void;
}) {
  const isActive = sortColumn === currentColumn;
  return (
    <TableHead>
      <button
        type="button"
        onClick={onSort}
        className={cn(
          "flex items-center gap-1.5 font-medium transition-colors",
          isActive ? "text-foreground" : "text-muted-foreground hover:text-foreground"
        )}
      >
        {label}
        {isActive ? (
          sortDirection === "asc" ? (
            <HugeiconsIcon icon={ArrowUp01Icon} className="size-3.5 shrink-0" />
          ) : (
            <HugeiconsIcon icon={ArrowDown01Icon} className="size-3.5 shrink-0" />
          )
        ) : (
          <HugeiconsIcon
            icon={UnfoldMoreIcon}
            className="size-3.5 shrink-0 opacity-50"
          />
        )}
      </button>
    </TableHead>
  );
}

function EventStartPicker({
  svLocal,
  onChange,
}: {
  svLocal: string;
  onChange: (next: string) => void;
}) {
  const { datePart, hour, minute } = splitSvLocalString(svLocal);
  const selectedDate = useMemo(() => {
    const d = parse(datePart, "yyyy-MM-dd", new Date());
    return isValid(d) ? d : new Date();
  }, [datePart]);
  const [open, setOpen] = useState(false);

  const setTime = (h: number, m: number) => {
    onChange(joinSvLocalString(datePart, h, m));
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger
        type="button"
        className={cn(
          "flex h-8 w-full min-w-[10rem] items-center justify-start gap-1 rounded-md border border-input bg-background px-2 text-left text-xs shadow-xs",
          "hover:bg-accent/50"
        )}
        onClick={(e) => e.stopPropagation()}
      >
        <span className="truncate">{formatSvDate(svLocalToUtc(svLocal))}</span>
      </PopoverTrigger>
      <PopoverContent
        className="w-auto p-0"
        align="start"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex flex-col gap-2 p-2">
          <Calendar
            mode="single"
            selected={selectedDate}
            onSelect={(date) => {
              if (!date) return;
              const nextPart = format(date, "yyyy-MM-dd");
              onChange(joinSvLocalString(nextPart, hour, minute));
            }}
            captionLayout="dropdown"
            className="rounded-md"
          />
          <div className="flex items-center gap-2 border-t border-border px-2 pb-2">
            <span className="text-[10px] text-muted-foreground">SV time</span>
            <Input
              type="number"
              min={0}
              max={23}
              className="h-8 w-14 px-1 text-center text-xs"
              value={hour}
              onChange={(e) => {
                const v = Number.parseInt(e.target.value, 10);
                setTime(Number.isFinite(v) ? Math.min(23, Math.max(0, v)) : 0, minute);
              }}
              aria-label="Hour"
            />
            <span className="text-muted-foreground">:</span>
            <Input
              type="number"
              min={0}
              max={59}
              className="h-8 w-14 px-1 text-center text-xs"
              value={minute}
              onChange={(e) => {
                const v = Number.parseInt(e.target.value, 10);
                setTime(hour, Number.isFinite(v) ? Math.min(59, Math.max(0, v)) : 0);
              }}
              aria-label="Minute"
            />
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
}

export function AdminEventsPage() {
  const events = useQuery(api.admin.listEvents);
  const toggleVirtual = useMutation(api.admin.toggleVirtual);
  const deleteEvent = useMutation(api.admin.deleteEvent);
  const upsertEvent = useMutation(api.admin.upsertEvent);

  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingEvent, setEditingEvent] = useState<EventDoc | null>(null);
  const [sortColumn, setSortColumn] = useState<SortColumn | null>("date");
  const [sortDirection, setSortDirection] = useState<SortDirection>("desc");

  const [drafts, setDrafts] = useState<Record<string, RowOverrides>>({});
  const [savingId, setSavingId] = useState<Id<"events"> | null>(null);
  const [rowError, setRowError] = useState<Record<string, string>>({});

  const updateDraft = useCallback(
    (id: Id<"events">, patch: RowOverrides) => {
      const key = id as string;
      setDrafts((prev) => ({
        ...prev,
        [key]: { ...prev[key], ...patch },
      }));
      setRowError((r) => {
        const { [key]: _, ...rest } = r;
        return rest;
      });
    },
    []
  );

  function openCreate() {
    setEditingEvent(null);
    setDialogOpen(true);
  }

  function openEdit(event: EventDoc) {
    setEditingEvent(event);
    setDialogOpen(true);
  }

  function closeDialog() {
    setDialogOpen(false);
    setEditingEvent(null);
  }

  function handleSort(column: SortColumn) {
    if (sortColumn === column) {
      setSortDirection((d) => (d === "asc" ? "desc" : "asc"));
    } else {
      setSortColumn(column);
      setSortDirection(column === "date" ? "desc" : "asc");
    }
  }

  const sortedEvents = useMemo(() => {
    if (!events) return [];
    const copy = [...events];
    if (sortColumn === "title") {
      copy.sort((a, b) => {
        const cmp = a.title.en.localeCompare(b.title.en);
        return sortDirection === "asc" ? cmp : -cmp;
      });
    } else if (sortColumn === "type") {
      copy.sort((a, b) => {
        const cmp = a.type.localeCompare(b.type);
        return sortDirection === "asc" ? cmp : -cmp;
      });
    } else if (sortColumn === "partner") {
      copy.sort((a, b) => {
        const pa = a.partner ?? "";
        const pb = b.partner ?? "";
        const cmp = pa.localeCompare(pb);
        return sortDirection === "asc" ? cmp : -cmp;
      });
    } else if (sortColumn === "date") {
      copy.sort((a, b) => {
        const cmp = a.startAt - b.startAt;
        return sortDirection === "asc" ? cmp : -cmp;
      });
    }
    return copy;
  }, [events, sortColumn, sortDirection]);

  async function saveRow(event: EventDoc) {
    const key = event._id as string;
    const d = drafts[key];
    if (!isRowDirty(event, d)) return;

    setSavingId(event._id);
    setRowError((r) => {
      const { [key]: _, ...rest } = r;
      return rest;
    });

    try {
      const e = effectiveRow(event, d);
      const titleEn = e.titleEn.trim();
      if (!titleEn) {
        setRowError((r) => ({ ...r, [key]: "Title is required" }));
        return;
      }

      const startAt = svLocalToUtc(e.startSvLocal);
      if (Number.isNaN(startAt)) {
        setRowError((r) => ({ ...r, [key]: "Invalid date" }));
        return;
      }

      await upsertEvent({
        id: event._id,
        slug: event.slug,
        published: e.published,
        isVirtual: event.isVirtual ?? false,
        type: e.type,
        tags: event.tags,
        partner: normalizePartnerCsv(e.partner),
        country: event.country,
        startAt,
        endAt: event.endAt,
        timezone: event.timezone,
        title: { es: event.title.es, en: titleEn },
        description: event.description,
        location: event.location,
        dateLabel: event.dateLabel,
        rsvpUrl: event.rsvpUrl,
        coverImageId: event.coverImageId,
        imageUrl: event.imageUrl,
        recapUrl: event.recapUrl,
        photoAlbumUrl: event.photoAlbumUrl,
        galleryDateLabel: event.galleryDateLabel,
      });

      setDrafts((prev) => {
        const next = { ...prev };
        delete next[key];
        return next;
      });
    } catch (err) {
      setRowError((r) => ({
        ...r,
        [key]: err instanceof Error ? err.message : "Save failed",
      }));
    } finally {
      setSavingId(null);
    }
  }

  if (events === undefined) {
    return (
      <div className="flex min-h-[200px] flex-1 items-center justify-center py-12">
        <p className="text-muted-foreground">Loading events…</p>
      </div>
    );
  }

  return (
    <div className="py-8">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-xl font-semibold">Events</h1>
          <p className="text-xs text-muted-foreground">
            {events.length} event{events.length !== 1 ? "s" : ""}
          </p>
        </div>
        <Button size="sm" onClick={openCreate}>
          Create event
        </Button>
      </div>

      <Dialog
        open={dialogOpen}
        onOpenChange={(open) => {
          setDialogOpen(open);
          if (!open) setEditingEvent(null);
        }}
      >
        <DialogContent size="lg">
          <DialogHeader>
            <DialogTitle>
              {editingEvent ? "Edit event" : "Create event"}
            </DialogTitle>
          </DialogHeader>
          <AdminEventForm
            event={editingEvent ?? undefined}
            onSuccess={closeDialog}
            onCancel={closeDialog}
          />
        </DialogContent>
      </Dialog>

      {events.length === 0 ? (
        <div className="rounded-lg border border-dashed border-border bg-muted/20 p-10 text-center text-muted-foreground">
          No events yet. Use the button above to create one.
        </div>
      ) : (
        <div className="rounded-lg border bg-card overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <SortableHeader
                  label="Title"
                  sortColumn={sortColumn}
                  sortDirection={sortDirection}
                  currentColumn="title"
                  onSort={() => handleSort("title")}
                />
                <SortableHeader
                  label="Type"
                  sortColumn={sortColumn}
                  sortDirection={sortDirection}
                  currentColumn="type"
                  onSort={() => handleSort("type")}
                />
                <SortableHeader
                  label="Partner"
                  sortColumn={sortColumn}
                  sortDirection={sortDirection}
                  currentColumn="partner"
                  onSort={() => handleSort("partner")}
                />
                <SortableHeader
                  label="Date (SV)"
                  sortColumn={sortColumn}
                  sortDirection={sortDirection}
                  currentColumn="date"
                  onSort={() => handleSort("date")}
                />
                <TableHead>Country</TableHead>
                <TableHead className="text-center">Virtual</TableHead>
                <TableHead className="text-center">Image</TableHead>
                <TableHead className="text-center">Album</TableHead>
                <TableHead className="text-center">Luma</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {sortedEvents.map((event) => {
                const countryLabel =
                  event.country != null ? event.country.en : undefined;
                const key = event._id as string;
                const d = drafts[key];
                const eff = effectiveRow(event, d);
                const dirty = isRowDirty(event, d);
                const err = rowError[key];

                return (
                  <TableRow key={event._id}>
                    <TableCell
                      className="min-w-[140px] max-w-[220px]"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <Input
                        value={eff.titleEn}
                        onChange={(e) =>
                          updateDraft(event._id, { titleEn: e.target.value })
                        }
                        className="h-8 text-sm"
                        aria-label="Title (EN)"
                      />
                    </TableCell>
                    <TableCell onClick={(e) => e.stopPropagation()}>
                      <Select
                        value={eff.type}
                        onValueChange={(v) =>
                          updateDraft(event._id, { type: v as EventType })
                        }
                      >
                        <SelectTrigger className="h-8 w-[130px] text-xs">
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
                    </TableCell>
                    <TableCell
                      className="min-w-[120px] max-w-[200px]"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <Input
                        value={eff.partner}
                        onChange={(e) =>
                          updateDraft(event._id, { partner: e.target.value })
                        }
                        placeholder="Partner1, Partner2"
                        className="h-8 text-xs"
                        aria-label="Partners (comma-separated)"
                      />
                      {eff.partner ? (
                        <div className="mt-1 flex flex-wrap gap-0.5">
                          {eff.partner
                            .split(",")
                            .map((s) => s.trim())
                            .filter(Boolean)
                            .map((seg) => (
                              <Badge
                                key={seg}
                                variant="outline"
                                className={cn(
                                  "text-[10px]",
                                  PARTNER_BADGE_CLASS[seg]
                                )}
                              >
                                {seg}
                              </Badge>
                            ))}
                        </div>
                      ) : null}
                    </TableCell>
                    <TableCell
                      className="min-w-[11rem]"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <EventStartPicker
                        svLocal={eff.startSvLocal}
                        onChange={(next) =>
                          updateDraft(event._id, { startSvLocal: next })
                        }
                      />
                    </TableCell>
                    <TableCell>
                      {countryLabel ? (
                        <Badge
                          variant="outline"
                          className={cn(
                            "text-[10px]",
                            COUNTRY_BADGE_CLASS[countryLabel]
                          )}
                        >
                          {countryLabel}
                        </Badge>
                      ) : (
                        "—"
                      )}
                    </TableCell>
                    <TableCell
                      className="text-center"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <input
                        type="checkbox"
                        checked={event.isVirtual ?? false}
                        onChange={() => toggleVirtual({ id: event._id })}
                        className="size-4 rounded border-border"
                        aria-label="Virtual"
                      />
                    </TableCell>
                    <TableCell className="text-center">
                      {event.coverImageId || event.imageUrl ? "✓" : "—"}
                    </TableCell>
                    <TableCell className="text-center">
                      {event.photoAlbumUrl ? "✓" : "—"}
                    </TableCell>
                    <TableCell className="text-center">
                      {event.rsvpUrl ? "✓" : "—"}
                    </TableCell>
                    <TableCell onClick={(e) => e.stopPropagation()}>
                      <button
                        type="button"
                        className={cn(
                          "rounded-full border px-2.5 py-0.5 text-[10px] font-medium transition-colors",
                          eff.published
                            ? "border-primary/50 bg-primary/15 text-primary"
                            : "border-border bg-muted/50 text-muted-foreground hover:bg-muted"
                        )}
                        onClick={() =>
                          updateDraft(event._id, {
                            published: !eff.published,
                          })
                        }
                      >
                        {eff.published ? "Published" : "Draft"}
                      </button>
                    </TableCell>
                    <TableCell
                      className="text-right"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <div className="flex flex-col items-end gap-1">
                        {err ? (
                          <p className="max-w-[12rem] text-[10px] text-destructive">
                            {err}
                          </p>
                        ) : null}
                        <div className="flex items-center justify-end gap-1">
                          <Button
                            variant="ghost"
                            size="icon-sm"
                            onClick={() => openEdit(event)}
                            title="Edit"
                            aria-label="Edit"
                          >
                            <HugeiconsIcon icon={PencilEdit01Icon} size={16} />
                          </Button>
                          <AlertDialog>
                            <AlertDialogTrigger
                              className="inline-flex size-7 items-center justify-center rounded-md text-destructive hover:bg-destructive/10"
                              title="Delete"
                              aria-label="Delete"
                            >
                              <HugeiconsIcon icon={Delete01Icon} size={16} />
                            </AlertDialogTrigger>
                            <AlertDialogContent>
                              <AlertDialogHeader>
                                <AlertDialogTitle>Delete event?</AlertDialogTitle>
                                <AlertDialogDescription>
                                  This will permanently remove &ldquo;
                                  {event.title.en}&rdquo;. This action cannot be
                                  undone.
                                </AlertDialogDescription>
                              </AlertDialogHeader>
                              <AlertDialogFooter>
                                <AlertDialogCancel>Cancel</AlertDialogCancel>
                                <AlertDialogAction
                                  onClick={() => deleteEvent({ id: event._id })}
                                  className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                                >
                                  Delete
                                </AlertDialogAction>
                              </AlertDialogFooter>
                            </AlertDialogContent>
                          </AlertDialog>
                          {dirty ? (
                            <Button
                              type="button"
                              size="sm"
                              disabled={savingId === event._id}
                              onClick={() => saveRow(event)}
                            >
                              {savingId === event._id ? "Saving…" : "Save"}
                            </Button>
                          ) : null}
                        </div>
                      </div>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </div>
      )}
    </div>
  );
}
