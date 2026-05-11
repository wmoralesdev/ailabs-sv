import { buttonVariants } from '@/components/ui/button'

type SlidesExportToolbarProps = {
  figmaCaptureHref: string
}

export function SlidesExportToolbar({ figmaCaptureHref }: SlidesExportToolbarProps) {
  return (
    <div className="border-border/50 bg-background/80 flex flex-wrap items-center gap-2 rounded-full border px-2 py-1.5 shadow-sm backdrop-blur-md">
      <a
        href={figmaCaptureHref}
        target="_blank"
        rel="noreferrer"
        title="Open the clean 1920x1080 slide frames for Figma Code to Canvas capture."
        className={buttonVariants({
          variant: 'outline',
          size: 'sm',
          shape: 'pill',
          className: 'border-border/70',
        })}
      >
        Open Figma capture
      </a>
    </div>
  )
}
