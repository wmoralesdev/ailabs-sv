import { createFileRoute, redirect, useRouter } from '@tanstack/react-router'
import { useEffect, useState } from 'react'
import { SignUp } from '@clerk/tanstack-react-start'
import { dark } from '@clerk/themes'
import { useConvexAuth, useQuery } from 'convex/react'
import { api } from 'convex/_generated/api'
import { authStateFn } from '@/lib/auth-server'
import { TurnstileGate } from '@/components/auth/turnstile-gate'
import { SiteHeader } from '@/components/site-header'
import { SiteFooter } from '@/components/site-footer'
import { useTheme } from '@/components/theme-provider'
import { isTurnstileConfigured } from '@/lib/turnstile-config'
import { seoCopyEs } from '@/content/seo-copy'
import { buildSeoMeta } from '@/lib/seo-meta'

export const Route = createFileRoute('/sign-up')({
  head: () => {
    const { meta, links } = buildSeoMeta({
      path: '/sign-up',
      title: seoCopyEs.signUp.title,
      description: seoCopyEs.signUp.description,
      noIndex: true,
    })
    return { meta, links }
  },
  beforeLoad: async () => {
    const { isAuthenticated } = await authStateFn()
    if (isAuthenticated) {
      throw redirect({ to: '/' })
    }
  },
  component: SignUpPage,
})

function SignUpPage() {
  const [turnstileOk, setTurnstileOk] = useState(() => !isTurnstileConfigured())
  const { theme } = useTheme()
  const router = useRouter()
  const { isAuthenticated } = useConvexAuth()
  const myProfile = useQuery(api.profiles.me)

  useEffect(() => {
    if (!isAuthenticated || myProfile === undefined) return
    const to = myProfile ? '/' : '/onboarding'
    router.navigate({ to }).catch(() => {})
  }, [isAuthenticated, myProfile, router])

  const isDarkTheme =
    theme === 'dark' ||
    (theme === 'system' &&
      typeof document !== 'undefined' &&
      document.documentElement.classList.contains('dark'))

  const clerkAppearance = {
    baseTheme: isDarkTheme ? dark : undefined,
    variables: {
      colorPrimary: '#8B7BC7',
      borderRadius: '0.75rem',
    },
    elements: {
      rootBox: 'w-full',
      card: 'shadow-none border-0 bg-transparent',
      headerTitle: 'text-2xl md:text-3xl font-medium tracking-tight',
      headerSubtitle: 'text-sm text-muted-foreground',
      socialButtonsBlockButton:
        'rounded-lg border border-border bg-muted/50 hover:bg-muted transition-colors',
      formButtonPrimary:
        'rounded-lg bg-primary text-primary-foreground hover:opacity-90',
      formFieldInput:
        'rounded-lg border border-border bg-muted/50 text-foreground',
      footerActionLink: 'text-primary hover:opacity-90',
      dividerLine: 'bg-border',
      dividerText: 'text-muted-foreground',
    },
  }

  return (
    <>
      <SiteHeader />
      <div className="bg-background text-foreground selection:bg-primary selection:text-primary-foreground motion-safe:animate-page-in flex min-h-dvh flex-col overflow-x-hidden font-sans">
        <main className="flex flex-1 flex-col pt-20 md:pt-24">
          <section className="border-border relative flex w-full flex-1 items-center overflow-hidden border-b py-12 md:py-16">
            <div className="bg-grid-pattern motion-safe:animate-grid-drift pointer-events-none absolute inset-0 mask-[radial-gradient(ellipse_at_center,black_30%,transparent_70%)] opacity-[0.24]" />

            <div className="relative z-10 container mx-auto px-6">
              <div className="mx-auto max-w-md">
                <div className="glass border-border/60 rounded-2xl border p-6 shadow-lg shadow-black/5 md:p-8">
                  <TurnstileGate onVerified={() => setTurnstileOk(true)} />
                  {turnstileOk ? (
                    <SignUp
                      appearance={clerkAppearance}
                      signInUrl="/sign-in"
                      fallbackRedirectUrl="/"
                    />
                  ) : null}
                </div>
              </div>
            </div>
          </section>
        </main>

        <SiteFooter />
      </div>
    </>
  )
}
