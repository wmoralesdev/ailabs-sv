import { useState } from "react";
import { Button } from "@/components/ui/button";
import { HugeiconsIcon } from "@hugeicons/react";
import { Copy01Icon } from "@hugeicons/core-free-icons";

interface ShowcaseSharePromptProps {
  title: string;
  tagline: string;
  url: string;
}

const SHARE_TEMPLATE = (title: string, tagline: string, url: string) =>
  `🚀 Just shipped ${title} — ${tagline}

Built with the @ailaboratorio community

${url}`;

export function ShowcaseSharePrompt({
  title,
  tagline,
  url,
}: ShowcaseSharePromptProps) {
  const [copied, setCopied] = useState(false);
  const text = SHARE_TEMPLATE(title, tagline, url);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // ignore
    }
  };

  return (
    <div className="rounded-2xl border border-primary/20 bg-primary/5 p-6">
      <h3 className="mb-2 text-sm font-semibold uppercase tracking-wider text-primary">
        Share on social
      </h3>
      <p className="mb-4 text-sm text-muted-foreground">
        Copy this template and post it on X or LinkedIn to drive traffic back to
        your showcase entry.
      </p>
      <pre className="mb-4 whitespace-pre-wrap rounded-lg border border-border/60 bg-muted/50 p-4 text-sm">
        {text}
      </pre>
      <Button
        variant="outline"
        size="sm"
        onClick={handleCopy}
        className="gap-2"
      >
        <HugeiconsIcon icon={Copy01Icon} size={16} />
        {copied ? "Copied!" : "Copy to clipboard"}
      </Button>
    </div>
  );
}
