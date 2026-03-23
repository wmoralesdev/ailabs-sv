"use client";

import { useMemo, useState } from "react";
import { useQuery, useMutation } from "convex/react";
import { api } from "convex/_generated/api";
import { HugeiconsIcon } from "@hugeicons/react";
import {
  ArrowDown01Icon,
  ArrowUp01Icon,
  Delete01Icon,
  EyeIcon,
  PencilEdit01Icon,
  UnfoldMoreIcon,
  ViewOffIcon,
} from "@hugeicons/core-free-icons";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
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
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { AdminEventForm, type EventDoc } from "./admin-event-form";
import { cn } from "@/lib/utils";

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

export function AdminEventsPage() {
  const events = useQuery(api.admin.listEvents);
  const togglePublished = useMutation(api.admin.togglePublished);
  const toggleVirtual = useMutation(api.admin.toggleVirtual);
  const deleteEvent = useMutation(api.admin.deleteEvent);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingEvent, setEditingEvent] = useState<EventDoc | null>(null);
  const [sortColumn, setSortColumn] = useState<SortColumn | null>("date");
  const [sortDirection, setSortDirection] = useState<SortDirection>("desc");

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

  if (events === undefined) {
    return (
      <div className="flex min-h-[200px] flex-1 items-center justify-center py-12">
        <p className="text-muted-foreground">Loading events…</p>
      </div>
    );
  }

  return (
    <div className="py-8">
      {/* Header */}
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

      {/* Create/Edit Dialog */}
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

      {/* Events table */}
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
              {sortedEvents.map((event) => (
                <TableRow
                  key={event._id}
                  onClick={() => openEdit(event)}
                  className="cursor-pointer"
                >
                  <TableCell className="font-medium">{event.title.en}</TableCell>
                  <TableCell>{event.type}</TableCell>
                  <TableCell>
                    {event.partner ? (
                      <Badge
                        variant="outline"
                        className={cn(
                          "text-[10px]",
                          PARTNER_BADGE_CLASS[event.partner]
                        )}
                      >
                        {event.partner}
                      </Badge>
                    ) : (
                      "—"
                    )}
                  </TableCell>
                  <TableCell>{formatSvDate(event.startAt)}</TableCell>
                  <TableCell>
                    {event.country?.en ?? event.country?.es ? (
                      <Badge
                        variant="outline"
                        className={cn(
                          "text-[10px]",
                          COUNTRY_BADGE_CLASS[
                            event.country?.en ?? event.country?.es ?? ""
                          ]
                        )}
                      >
                        {event.country?.en ?? event.country?.es}
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
                  <TableCell>
                    <Badge
                      variant={event.published ? "default" : "secondary"}
                      className="text-[10px]"
                    >
                      {event.published ? "Published" : "Draft"}
                    </Badge>
                  </TableCell>
                  <TableCell
                    className="text-right"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <div className="flex items-center justify-end gap-1">
                      <Button
                        variant="ghost"
                        size="icon-sm"
                        onClick={() => togglePublished({ id: event._id })}
                        title={event.published ? "Unpublish" : "Publish"}
                        aria-label={event.published ? "Unpublish" : "Publish"}
                      >
                        {event.published ? (
                          <HugeiconsIcon icon={EyeIcon} size={16} />
                        ) : (
                          <HugeiconsIcon icon={ViewOffIcon} size={16} />
                        )}
                      </Button>
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
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      )}
    </div>
  );
}
