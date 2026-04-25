import { Outlet, createFileRoute } from '@tanstack/react-router'
import { SiteHeader } from '@/components/site-header'
import { SiteFooter } from '@/components/site-footer'

export const Route = createFileRoute('/showcase')({
  component: ShowcaseLayout,
})

function ShowcaseLayout() {
  return (
    <div className="bg-background text-foreground selection:bg-primary selection:text-primary-foreground min-h-dvh overflow-x-hidden font-sans">
      <SiteHeader />
      <main className="pt-24 pb-16">
        <Outlet />
      </main>
      <SiteFooter />
    </div>
  )
}
