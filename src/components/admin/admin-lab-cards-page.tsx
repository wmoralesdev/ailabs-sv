"use client";

import { useMemo, useState, useTransition } from "react";
import { useMutation, useQuery } from "convex/react";
import { api } from "convex/_generated/api";
import type { Doc, Id } from "convex/_generated/dataModel";
import { HugeiconsIcon } from "@hugeicons/react";
import {
  ArrowDown01Icon,
  ArrowUp01Icon,
  Delete01Icon,
  PencilEdit01Icon,
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
import { Field, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Spinner } from "@/components/ui/spinner";
import { useI18n } from "@/lib/i18n";

type LabCardDoc = Doc<"labCards">;

function LabCardForm({
  card,
  onSuccess,
  onCancel,
}: {
  card?: LabCardDoc | null;
  onSuccess: () => void;
  onCancel: () => void;
}) {
  const upsert = useMutation(api.learning_lab.upsertCard);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [published, setPublished] = useState(card?.published ?? true);
  const [titleEs, setTitleEs] = useState(card?.title.es ?? "");
  const [titleEn, setTitleEn] = useState(card?.title.en ?? "");
  const [descriptionEs, setDescriptionEs] = useState(card?.description.es ?? "");
  const [descriptionEn, setDescriptionEn] = useState(card?.description.en ?? "");
  const [dateLabelEs, setDateLabelEs] = useState(card?.dateLabel.es ?? "");
  const [dateLabelEn, setDateLabelEn] = useState(card?.dateLabel.en ?? "");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      await upsert({
        id: card?._id,
        published,
        title: { es: titleEs, en: titleEn },
        description: { es: descriptionEs, en: descriptionEn },
        dateLabel: { es: dateLabelEs, en: dateLabelEn },
      });
      onSuccess();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Save failed");
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <label className="flex items-center gap-2 text-sm">
        <input
          type="checkbox"
          checked={published}
          onChange={(e) => setPublished(e.target.checked)}
          className="rounded border-border"
        />
        Published
      </label>
      <Field>
        <FieldLabel>Title (ES)</FieldLabel>
        <Input
          value={titleEs}
          onChange={(e) => setTitleEs(e.target.value)}
          required
          maxLength={200}
        />
      </Field>
      <Field>
        <FieldLabel>Title (EN)</FieldLabel>
        <Input
          value={titleEn}
          onChange={(e) => setTitleEn(e.target.value)}
          required
          maxLength={200}
        />
      </Field>
      <Field>
        <FieldLabel>Description (ES)</FieldLabel>
        <Textarea
          value={descriptionEs}
          onChange={(e) => setDescriptionEs(e.target.value)}
          required
          rows={4}
          maxLength={2000}
        />
      </Field>
      <Field>
        <FieldLabel>Description (EN)</FieldLabel>
        <Textarea
          value={descriptionEn}
          onChange={(e) => setDescriptionEn(e.target.value)}
          required
          rows={4}
          maxLength={2000}
        />
      </Field>
      <Field>
        <FieldLabel>Date label (ES)</FieldLabel>
        <Input
          value={dateLabelEs}
          onChange={(e) => setDateLabelEs(e.target.value)}
          required
          maxLength={120}
          placeholder="e.g. Febrero 2026"
        />
      </Field>
      <Field>
        <FieldLabel>Date label (EN)</FieldLabel>
        <Input
          value={dateLabelEn}
          onChange={(e) => setDateLabelEn(e.target.value)}
          required
          maxLength={120}
          placeholder="e.g. February 2026"
        />
      </Field>
      {error ? (
        <p className="text-sm text-destructive" role="alert">
          {error}
        </p>
      ) : null}
      <div className="flex justify-end gap-2 pt-2">
        <Button type="button" variant="outline" onClick={onCancel}>
          Cancel
        </Button>
        <Button type="submit" disabled={loading}>
          {loading ? "Saving…" : "Save"}
        </Button>
      </div>
    </form>
  );
}

export function AdminLabCardsPage() {
  const { language } = useI18n();
  const cards = useQuery(api.learning_lab.listForAdmin);
  const deleteCard = useMutation(api.learning_lab.deleteCard);
  const reorderCards = useMutation(api.learning_lab.reorderCards);

  const [dialogOpen, setDialogOpen] = useState(false);
  const [editing, setEditing] = useState<LabCardDoc | null>(null);
  const [isPending, startTransition] = useTransition();

  const sorted = useMemo(
    () => [...(cards ?? [])].sort((a, b) => a.order - b.order),
    [cards],
  );

  function openCreate() {
    setEditing(null);
    setDialogOpen(true);
  }

  function openEdit(c: LabCardDoc) {
    setEditing(c);
    setDialogOpen(true);
  }

  function closeDialog() {
    setDialogOpen(false);
    setEditing(null);
  }

  function moveUp(id: Id<"labCards">) {
    startTransition(() => {
      void (async () => {
        const idx = sorted.findIndex((c) => c._id === id);
        if (idx <= 0) return;
        const next = [...sorted];
        [next[idx - 1], next[idx]] = [next[idx], next[idx - 1]];
        await reorderCards({
          orderedIds: next.map((c) => c._id),
        });
      })();
    });
  }

  function moveDown(id: Id<"labCards">) {
    startTransition(() => {
      void (async () => {
        const idx = sorted.findIndex((c) => c._id === id);
        if (idx < 0 || idx >= sorted.length - 1) return;
        const next = [...sorted];
        [next[idx], next[idx + 1]] = [next[idx + 1], next[idx]];
        await reorderCards({
          orderedIds: next.map((c) => c._id),
        });
      })();
    });
  }

  function handleDelete(id: Id<"labCards">) {
    startTransition(() => {
      void deleteCard({ id });
    });
  }

  if (cards === undefined) {
    return (
      <div className="flex min-h-[200px] items-center justify-center py-12">
        <Spinner size="lg" />
      </div>
    );
  }

  return (
    <div className="py-8">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h2 className="text-xl font-semibold">From the Lab</h2>
          <p className="text-xs text-muted-foreground">
            {cards.length} card{cards.length !== 1 ? "s" : ""} — shown on the
            landing page under “From the Lab” (copy is localized in site
            content).
          </p>
        </div>
        <Button size="sm" onClick={openCreate}>
          Add card
        </Button>
      </div>

      <Dialog
        open={dialogOpen}
        onOpenChange={(open) => {
          setDialogOpen(open);
          if (!open) setEditing(null);
        }}
      >
        <DialogContent size="lg">
          <DialogHeader>
            <DialogTitle>
              {editing ? "Edit lab card" : "Create lab card"}
            </DialogTitle>
          </DialogHeader>
          <LabCardForm
            key={editing?._id ?? "create"}
            card={editing ?? undefined}
            onSuccess={closeDialog}
            onCancel={closeDialog}
          />
        </DialogContent>
      </Dialog>

      {cards.length === 0 ? (
        <div className="rounded-lg border border-dashed border-border bg-muted/20 p-10 text-center text-muted-foreground">
          No cards yet. Add one to populate the landing section.
        </div>
      ) : (
        <div className="rounded-lg border bg-card overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-12">#</TableHead>
                <TableHead className="w-24">Published</TableHead>
                <TableHead>Title preview</TableHead>
                <TableHead className="w-44 text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {sorted.map((c, i) => (
                <TableRow key={c._id}>
                  <TableCell className="font-mono text-muted-foreground">
                    {i + 1}
                  </TableCell>
                  <TableCell>
                    {c.published ? (
                      <Badge variant="secondary">On</Badge>
                    ) : (
                      <Badge variant="outline">Off</Badge>
                    )}
                  </TableCell>
                  <TableCell className="max-w-md truncate font-medium">
                    {language === "es" ? c.title.es : c.title.en}
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex items-center justify-end gap-1">
                      <Button
                        type="button"
                        size="icon-sm"
                        variant="ghost"
                        aria-label="Move up"
                        disabled={i === 0 || isPending}
                        onClick={() => moveUp(c._id)}
                      >
                        <HugeiconsIcon icon={ArrowUp01Icon} className="size-4" />
                      </Button>
                      <Button
                        type="button"
                        size="icon-sm"
                        variant="ghost"
                        aria-label="Move down"
                        disabled={i === sorted.length - 1 || isPending}
                        onClick={() => moveDown(c._id)}
                      >
                        <HugeiconsIcon
                          icon={ArrowDown01Icon}
                          className="size-4"
                        />
                      </Button>
                      <Button
                        type="button"
                        size="icon-sm"
                        variant="ghost"
                        aria-label="Edit"
                        onClick={() => openEdit(c)}
                      >
                        <HugeiconsIcon
                          icon={PencilEdit01Icon}
                          className="size-4"
                        />
                      </Button>
                      <AlertDialog>
                        <AlertDialogTrigger
                          className="inline-flex size-7 items-center justify-center rounded-md text-destructive hover:bg-destructive/10"
                          aria-label="Delete"
                        >
                          <HugeiconsIcon
                            icon={Delete01Icon}
                            className="size-4"
                          />
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                          <AlertDialogHeader>
                            <AlertDialogTitle>Delete this card?</AlertDialogTitle>
                            <AlertDialogDescription>
                              This cannot be undone.
                            </AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogFooter>
                            <AlertDialogCancel>Cancel</AlertDialogCancel>
                            <AlertDialogAction
                              onClick={() => handleDelete(c._id)}
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
