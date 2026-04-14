"use client";

import { useState } from "react";
import { Link, useNavigate } from "@tanstack/react-router";
import { useMutation } from "convex/react";
import { HugeiconsIcon } from "@hugeicons/react";
import {
  Clock01Icon,
  CodeIcon,
  Delete01Icon,
  Link01Icon,
  PencilEdit01Icon,
} from "@hugeicons/core-free-icons";
import { api } from "convex/_generated/api";
import type { Id } from "convex/_generated/dataModel";
import { DisplayChip } from "@/components/ui/toggle-chip";
import { MarkdownPreview } from "@/components/ui/markdown-editor";
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
import { toolIcons } from "@/components/onboarding/tool-icons";
import { idsToLabels } from "@/lib/onboarding-interests";
import { useI18n } from "@/lib/i18n";
import { useAuthState } from "@/components/auth/auth-context";
import { cn } from "@/lib/utils";

const STATUS_LABELS: Record<string, string> = {
  shipped: "Shipped",
  in_progress: "In progress",
  concept: "Concept",
};

type HackathonHistoryEntry = {
  _id: string;
  action: "created" | "updated";
  note?: string;
  createdAt: number;
};

export type HackathonGroupsDetailEntry = {
  _id: string;
  ownerId: string;
  slug: string;
  groupName: string;
  title: string;
  tagline: string;
  description: string;
  coverImageUrl: string;
  projectUrl?: string;
  repoUrl?: string;
  socialPostUrl?: string;
  toolsUsed?: Array<string>;
  status: "shipped" | "in_progress" | "concept";
  createdAt: number;
  author: { name: string; slug: string; avatarUrl?: string } | null;
  history: Array<HackathonHistoryEntry>;
};

interface HackathonGroupsDetailProps {
  entry: HackathonGroupsDetailEntry;
}

export function HackathonGroupsDetail({ entry }: HackathonGroupsDetailProps) {
  const { t } = useI18n();
  const navigate = useNavigate();
  const removeEntry = useMutation(api.hackathon_groups.remove);
  const { user } = useAuthState();
  const isOwner = !!user && user.id === entry.ownerId;
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [deleteTitleConfirm, setDeleteTitleConfirm] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const titleMatches =
    deleteTitleConfirm.trim().length > 0 &&
    deleteTitleConfirm.trim() === entry.title.trim();
  const toolsLabels = idsToLabels(entry.toolsUsed ?? [], t.onboarding.interests.tools);

  const handleDelete = async () => {
    if (!titleMatches || isDeleting) return;
    setIsDeleting(true);
    try {
      await removeEntry({ id: entry._id as Id<"hackathonGroupProjects"> });
      setDeleteOpen(false);
      setDeleteTitleConfirm("");
      navigate({
        to: "/hackathon-groups",
        search: { status: undefined },
      });
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <article className="mx-auto max-w-4xl">
      <div className="mb-8 overflow-hidden rounded-2xl border border-border/60 bg-muted">
        <img src={entry.coverImageUrl} alt="" className="aspect-[1200/630] w-full object-cover" />
      </div>

      <div className="mb-8">
        <div className="mb-4 flex flex-wrap items-center gap-2">
          <span
            className={cn(
              "rounded-full px-2.5 py-0.5 text-xs font-medium",
              entry.status === "shipped" && "bg-green-500/10 text-green-600 dark:text-green-400",
              entry.status === "in_progress" &&
                "bg-amber-500/10 text-amber-600 dark:text-amber-400",
              entry.status === "concept" && "bg-muted text-muted-foreground"
            )}
          >
            {STATUS_LABELS[entry.status] ?? entry.status}
          </span>
          <span className="text-xs text-muted-foreground">{entry.groupName}</span>
        </div>
        <h1 className="mb-2 text-balance text-3xl font-medium md:text-4xl">{entry.title}</h1>
        <p className="mb-4 text-pretty text-lg text-muted-foreground">{entry.tagline}</p>
        <div className="flex flex-wrap items-center gap-4">
          {entry.author && (
            <Link
              to="/community/$slug"
              params={{ slug: entry.author.slug }}
              className="flex items-center gap-2 text-sm font-medium text-foreground hover:text-primary"
            >
              <div className="flex size-9 shrink-0 overflow-hidden rounded-full bg-muted">
                {entry.author.avatarUrl ? (
                  <img src={entry.author.avatarUrl} alt="" className="size-full object-cover" />
                ) : (
                  <span className="flex size-full items-center justify-center text-sm font-medium text-muted-foreground">
                    {entry.author.name.charAt(0).toUpperCase()}
                  </span>
                )}
              </div>
              {entry.author.name}
            </Link>
          )}
          <time dateTime={new Date(entry.createdAt).toISOString()} className="text-sm text-muted-foreground">
            {new Date(entry.createdAt).toLocaleDateString()}
          </time>
          {isOwner ? (
            <>
              <Button
                variant="outline"
                size="sm"
                render={<Link to="/hackathon-groups/submit" search={{ edit: entry.slug }} />}
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
                Delete
              </Button>
            </>
          ) : null}
        </div>
      </div>

      <div className="grid gap-8 lg:grid-cols-[1fr,300px]">
        <div>
          <MarkdownPreview
            content={entry.description}
            className="prose prose-neutral dark:prose-invert max-w-none"
          />
        </div>
        <aside className="space-y-6">
          {(entry.projectUrl || entry.repoUrl || entry.socialPostUrl) && (
            <div className="rounded-2xl border border-border/60 bg-card/80 p-5">
              <span className="mb-3 block text-xs font-semibold uppercase text-primary">Links</span>
              <div className="flex flex-col gap-2">
                {entry.projectUrl ? (
                  <a
                    href={entry.projectUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 rounded-lg border border-primary bg-primary/10 px-4 py-2.5 text-sm font-medium text-primary hover:bg-primary/20"
                  >
                    <HugeiconsIcon icon={Link01Icon} size={16} />
                    View project
                  </a>
                ) : null}
                {entry.repoUrl ? (
                  <a
                    href={entry.repoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 rounded-lg border border-border px-4 py-2.5 text-sm font-medium text-foreground hover:border-primary/30 hover:bg-muted/50"
                  >
                    <HugeiconsIcon icon={CodeIcon} size={16} />
                    Repository
                  </a>
                ) : null}
                {entry.socialPostUrl ? (
                  <a
                    href={entry.socialPostUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-muted-foreground underline hover:text-primary"
                  >
                    Share on social
                  </a>
                ) : null}
              </div>
            </div>
          )}
          {entry.toolsUsed && entry.toolsUsed.length > 0 ? (
            <div className="rounded-2xl border border-border/60 bg-card/80 p-5">
              <span className="mb-3 block text-xs font-semibold uppercase text-primary">Tools</span>
              <div className="flex flex-wrap gap-2">
                {toolsLabels.map((label, i) => {
                  const toolId = entry.toolsUsed?.[i];
                  const icon = toolId ? toolIcons[toolId] : undefined;
                  return <DisplayChip key={label} label={label} icon={icon} />;
                })}
              </div>
            </div>
          ) : null}
          <div className="rounded-2xl border border-border/60 bg-card/80 p-5">
            <span className="mb-3 flex items-center gap-2 text-xs font-semibold uppercase text-primary">
              <HugeiconsIcon icon={Clock01Icon} size={14} />
              History
            </span>
            <ul className="space-y-3">
              {entry.history.map((item) => (
                <li key={item._id} className="rounded-lg border border-border/60 p-3">
                  <p className="text-sm font-medium text-foreground">
                    {item.action === "created" ? "Project created" : "Project updated"}
                  </p>
                  {item.note ? <p className="mt-1 text-sm text-muted-foreground">{item.note}</p> : null}
                  <p className="mt-1 text-xs text-muted-foreground">
                    {new Date(item.createdAt).toLocaleString()}
                  </p>
                </li>
              ))}
            </ul>
          </div>
        </aside>
      </div>

      <AlertDialog
        open={deleteOpen}
        onOpenChange={(open) => {
          setDeleteOpen(open);
          if (!open) setDeleteTitleConfirm("");
        }}
      >
        <AlertDialogContent className="sm:max-w-md">
          <AlertDialogHeader>
            <AlertDialogTitle>Delete this project?</AlertDialogTitle>
            <AlertDialogDescription>
              This permanently removes your hackathon group project.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <div className="grid gap-2 py-2 text-left">
            <label htmlFor="hackathon-project-delete-confirm" className="text-sm font-medium text-foreground">
              Type the project title
            </label>
            <Input
              id="hackathon-project-delete-confirm"
              value={deleteTitleConfirm}
              onChange={(e) => setDeleteTitleConfirm(e.target.value)}
              autoComplete="off"
              placeholder={entry.title}
              aria-invalid={deleteTitleConfirm.length > 0 && !titleMatches}
            />
          </div>
          <AlertDialogFooter>
            <AlertDialogCancel disabled={isDeleting}>Cancel</AlertDialogCancel>
            <AlertDialogAction
              disabled={!titleMatches || isDeleting}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
              onClick={(e) => {
                e.preventDefault();
                void handleDelete();
              }}
            >
              {isDeleting ? "Deleting..." : "Delete permanently"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </article>
  );
}
