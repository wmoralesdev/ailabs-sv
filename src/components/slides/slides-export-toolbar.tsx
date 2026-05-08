import { useCallback } from 'react'
import { Button } from '@/components/ui/button'

type SlidesExportToolbarProps = {
  exportingPng?: boolean
  onExportPng: () => void
}

export function SlidesExportToolbar({
  exportingPng,
  onExportPng,
}: SlidesExportToolbarProps) {
  const onPrint = useCallback(() => {
    window.print()
  }, [])

  return (
    <div className="border-border/50 bg-background/80 flex flex-wrap items-center gap-2 rounded-full border px-2 py-1.5 shadow-sm backdrop-blur-md">
      <Button
        type="button"
        variant="outline"
        size="sm"
        shape="pill"
        className="border-border/70"
        onClick={onPrint}
      >
        PDF / print
      </Button>
      <Button
        type="button"
        variant="outline"
        size="sm"
        shape="pill"
        className="border-border/70"
        disabled={exportingPng}
        onClick={onExportPng}
      >
        {exportingPng ? 'Exporting...' : 'Figma PNG'}
      </Button>
    </div>
  )
}
