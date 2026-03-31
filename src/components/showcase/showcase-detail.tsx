"use client";

import { useState } from "react";
import { Link, useNavigate } from "@tanstack/react-router";
import { useMutation } from "convex/react";
import { HugeiconsIcon } from "@hugeicons/react";
import {
  CodeIcon,
  Delete01Icon,
  Link01Icon,
  PencilEdit01Icon,
} from "@hugeicons/core-free-icons";
import { api } from "convex/_generated/api";
import { ShowcaseSharePrompt } from "./showcase-share-prompt";
import type { Id } from "convex/_generated/dataModel";
import { DisplayChip } from "@/components/ui/toggle-chip";
import { MarkdownPreview } from "@/components/ui/markdown-editor";
import { toolIcons } from "@/components/onboarding/tool-icons";
import { idsToLabels } from "@/lib/onboarding-interests";
import { useI18n } from "@/lib/i18n";
import { useAuthState } from "@/components/auth/auth-context";
import { Button } from "@/components/ui/button";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

const STATUS_LABELS: Record<string, string> = {
  shipped: "Shipped",
  in_progress: "In progress",
  concept: "Concept",
};

export type ShowcaseDetailEntry = {
  _id: string;
  ownerId: string;
  slug: string;
  title: string;
  tagline: string;
  description: string;
  coverImageUrl: string;
  projectUrl?: string;
  repoUrl?: string;
  socialPostUrl?: string;
  event?: string;
  toolsUsed?: Array<string>;
  status: "shipped" | "in_progress" | "concept";
  createdAt: number;
  author: { name: string; slug: string; avatarUrl?: string } | null;
  collaborators: Array<{ name: string; slug: string; avatarUrl?: string }>;
};

interface ShowcaseDetailProps {
  entry: ShowcaseDetailEntry;
}

export function ShowcaseDetail({ entry }: ShowcaseDetailProps) {
  const { t } = useI18n();
  const d = t.showcaseDetail;
  const navigate = useNavigate();
  const removeEntry = useMutation(api.showcase.remove);
  const { user } = useAuthState();
  const isOwner = !!user && user.id === entry.ownerId;
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [deleteTitleConfirm, setDeleteTitleConfirm] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const titleMatches =
    deleteTitleConfirm.trim().length > 0 &&
    deleteTitleConfirm.trim() === entry.title.trim();
  const toolsLabels = idsToLabels(
    entry.toolsUsed ?? [],
    t.onboarding.interests.tools
  );
  const entryUrl = typeof window !== "undefined"
    ? `${window.location.origin}/showcase/${entry.slug}`
    : "";

  const handleDelete = async () => {
    if (!titleMatches || isDeleting) return;
    setIsDeleting(true);
    try {
      await removeEntry({ id: entry._id as Id<"showcaseEntries"> });
      setDeleteOpen(false);
      setDeleteTitleConfirm("");
      navigate({
        to: "/showcase",
        search: { event: undefined, tool: undefined, status: undefined },
      });
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <article className="mx-auto max-w-4xl">
      {/* Cover */}
      <div className="mb-8 overflow-hidden rounded-2xl border border-border/60 bg-muted">
        <img
          src={entry.coverImageUrl}
          alt=""
          className="aspect-[1200/630] w-full object-cover"
        />
      </div>

      {/* Header */}
      <div className="mb-8">
        <div className="mb-4 flex flex-wrap items-center gap-2">
          <span
            className={cn(
              "rounded-full px-2.5 py-0.5 text-xs font-medium",
              entry.status === "shipped" && "bg-green-500/10 text-green-600 dark:text-green-400",
              entry.status === "in_progress" && "bg-amber-500/10 text-amber-600 dark:text-amber-400",
              entry.status === "concept" && "bg-muted text-muted-foreground"
            )}
          >
            {STATUS_LABELS[entry.status] ?? entry.status}
          </span>
          {entry.event && (
            <span className="text-xs text-muted-foreground">{entry.event}</span>
          )}
        </div>
        <h1 className="mb-2 text-3xl font-medium tracking-tighter md:text-4xl">
          {entry.title}
        </h1>
        <p className="mb-4 text-lg text-muted-foreground">{entry.tagline}</p>
        <div className="flex flex-wrap items-center gap-4">
          {entry.author && (
            <Link
              to="/community/$slug"
              params={{ slug: entry.author.slug }}
              className="flex items-center gap-2 text-sm font-medium text-foreground hover:text-primary"
            >
              <div className="flex size-9 shrink-0 overflow-hidden rounded-full bg-muted">
                {entry.author.avatarUrl ? (
                  <img
                    src={entry.author.avatarUrl}
                    alt=""
                    className="size-full object-cover"
                  />
                ) : (
                  <span className="flex size-full items-center justify-center text-sm font-medium text-muted-foreground">
                    {entry.author.name.charAt(0).toUpperCase()}
                  </span>
                )}
              </div>
              {entry.author.name}
            </Link>
          )}
          <time
            dateTime={new Date(entry.createdAt).toISOString()}
            className="text-sm text-muted-foreground"
          >
            {new Date(entry.createdAt).toLocaleDateString()}
          </time>
          {isOwner && (
            <>
              <Button
                variant="outline"
                size="sm"
                render={
                  <Link
                    to="/showcase/submit"
                    search={{ edit: entry.slug }}
                  />
                }
              >
                <HugeiconsIcon icon={PencilEdit01Icon} size={14} data-icon="inline-start" />
                Edit
              </Button>
              <Button
                type="button"
                variant="destructiveOutline"
                size="sm"
                onClick={() => setDeleteOpen(true)}
              >
                <HugeiconsIcon icon={Delete01Icon} size={14} />
                {d.deleteProject}
              </Button>
            </>
          )}
        </div>
      </div>

      {/* Content + Sidebar */}
      <div className="grid gap-8 lg:grid-cols-[1fr,280px]">
        <div>
          <MarkdownPreview
            content={entry.description}
            className="prose prose-neutral dark:prose-invert max-w-none"
          />
        </div>
        <aside className="space-y-6">
          {(entry.projectUrl || entry.repoUrl || entry.socialPostUrl) && (
            <div className="rounded-2xl border border-border/60 bg-card/80 p-5">
              <span className="mb-3 block text-xs font-semibold uppercase tracking-wider text-primary">
                Links
              </span>
              <div className="flex flex-col gap-2">
                {entry.projectUrl && (
                  <a
                    href={entry.projectUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 rounded-lg border border-primary bg-primary/10 px-4 py-2.5 text-sm font-medium text-primary transition-colors hover:bg-primary/20"
                  >
                    <HugeiconsIcon icon={Link01Icon} size={16} />
                    View project
                  </a>
                )}
                {entry.repoUrl && (
                  <a
                    href={entry.repoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 rounded-lg border border-border px-4 py-2.5 text-sm font-medium text-foreground transition-colors hover:border-primary/30 hover:bg-muted/50"
                  >
                    <HugeiconsIcon icon={CodeIcon} size={16} />
                    Repository
                  </a>
                )}
                {entry.socialPostUrl && (
                  <a
                    href={entry.socialPostUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-muted-foreground underline hover:text-primary"
                  >
                    Share on social
                  </a>
                )}
              </div>
            </div>
          )}
          {entry.toolsUsed && entry.toolsUsed.length > 0 && (
            <div className="rounded-2xl border border-border/60 bg-card/80 p-5">
              <span className="mb-3 block text-xs font-semibold uppercase tracking-wider text-primary">
                Tools
              </span>
              <div className="flex flex-wrap gap-2">
                {toolsLabels.map((label, i) => {
                  const toolId = entry.toolsUsed?.[i];
                  const icon = toolId ? toolIcons[toolId] : undefined;
                  return <DisplayChip key={label} label={label} icon={icon} />;
                })}
              </div>
            </div>
          )}
          {entry.collaborators.length > 0 && (
            <div className="rounded-2xl border border-border/60 bg-card/80 p-5">
              <span className="mb-3 block text-xs font-semibold uppercase tracking-wider text-primary">
                Collaborators
              </span>
              <div className="flex flex-wrap gap-2">
                {entry.collaborators.map((c) => (
                  <Link
                    key={c.slug}
                    to="/community/$slug"
                    params={{ slug: c.slug }}
                    className="flex items-center gap-2 rounded-full border border-border px-3 py-1.5 text-sm transition-colors hover:border-primary/30 hover:bg-muted/50"
                  >
                    <div className="flex size-6 shrink-0 overflow-hidden rounded-full bg-muted">
                      {c.avatarUrl ? (
                        <img src={c.avatarUrl} alt="" className="size-full object-cover" />
                      ) : (
                        <span className="flex size-full items-center justify-center text-xs font-medium text-muted-foreground">
                          {c.name.charAt(0).toUpperCase()}
                        </span>
                      )}
                    </div>
                    {c.name}
                  </Link>
                ))}
              </div>
            </div>
          )}
        </aside>
      </div>

      {isOwner && (
        <div className="mt-12">
          <ShowcaseSharePrompt
            title={entry.title}
            tagline={entry.tagline}
            url={entryUrl}
          />
        </div>
      )}

      <AlertDialog
        open={deleteOpen}
        onOpenChange={(open) => {
          setDeleteOpen(open);
          if (!open) setDeleteTitleConfirm("");
        }}
      >
        <AlertDialogContent className="sm:max-w-md">
          <AlertDialogHeader>
            <AlertDialogTitle>{d.deleteDialogTitle}</AlertDialogTitle>
            <AlertDialogDescription>
              {d.deleteDialogDescription}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <div className="grid gap-2 py-2 text-left">
            <label
              htmlFor="showcase-delete-title-confirm"
              className="text-sm font-medium text-foreground"
            >
              {d.deleteTypeTitleLabel}
            </label>
            <Input
              id="showcase-delete-title-confirm"
              value={deleteTitleConfirm}
              onChange={(e) => setDeleteTitleConfirm(e.target.value)}
              autoComplete="off"
              placeholder={entry.title}
              aria-invalid={deleteTitleConfirm.length > 0 && !titleMatches}
            />
          </div>
          <AlertDialogFooter>
            <AlertDialogCancel disabled={isDeleting}>
              {d.deleteCancel}
            </AlertDialogCancel>
            <AlertDialogAction
              disabled={!titleMatches || isDeleting}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
              onClick={(e) => {
                e.preventDefault();
                void handleDelete();
              }}
            >
              {isDeleting ? d.deleting : d.deleteConfirm}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </article>
  );
}
