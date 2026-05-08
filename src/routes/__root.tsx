import { useEffect } from 'react'
import { HeadContent, Scripts, createRootRoute } from '@tanstack/react-router'
import { ClerkProvider } from '@clerk/tanstack-react-start'
import { esES } from '@clerk/localizations'
import { Analytics } from '@vercel/analytics/react'
import appCss from '../styles.css?url'
import { I18nProvider } from '@/lib/i18n'
import { ThemeProvider } from '@/components/theme-provider'
import { LangSync } from '@/components/lang-sync'
import { ConvexProvider } from '@/components/convex-provider'
import { AuthProvider } from '@/components/auth/auth-context'
import { ClarityAnalytics } from '@/components/analytics/clarity-analytics'
import { getSiteOrigin } from '@/lib/site-url'
import { seoCopyEs } from '@/content/seo-copy'

const clerkPublishableKey = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY as string

const defaultDescription = seoCopyEs.home.description
const defaultTitle = seoCopyEs.home.title

export const Route = createRootRoute({
  head: () => {
    const ogImageUrl = `${getSiteOrigin()}/og.png`
    return {
      meta: [
        {
          charSet: 'utf-8',
        },
        {
          name: 'viewport',
          content: 'width=device-width, initial-scale=1',
        },
        {
          title: defaultTitle,
        },
        {
          name: 'description',
          content: defaultDescription,
        },
        {
          property: 'og:type',
          content: 'website',
        },
        {
          property: 'og:title',
          content: defaultTitle,
        },
        {
          property: 'og:description',
          content: defaultDescription,
        },
        {
          property: 'og:image',
          content: ogImageUrl,
        },
        {
          property: 'og:image:alt',
          content: 'Ai /abs — comunidad de builders de IA en El Salvador',
        },
        {
          name: 'twitter:card',
          content: 'summary_large_image',
        },
        {
          name: 'twitter:title',
          content: defaultTitle,
        },
        {
          name: 'twitter:description',
          content: defaultDescription,
        },
        {
          name: 'twitter:image',
          content: ogImageUrl,
        },
      ],
      links: [
        {
          rel: 'icon',
          href: '/favicon.ico',
          type: 'image/x-icon',
        },
        { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
        {
          rel: 'preconnect',
          href: 'https://fonts.gstatic.com',
          crossOrigin: 'anonymous',
        },
        {
          rel: 'stylesheet',
          href: 'https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600&family=Space+Grotesk:wght@300;400;500;600;700&display=swap',
        },
        {
          rel: 'stylesheet',
          href: appCss,
        },
      ],
    }
  },

  shellComponent: RootDocument,
})

function RootDocument({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    if (import.meta.env.DEV) {
      void import('react-grab')
    }
  }, [])

  return (
    <html lang="es">
      <head>
        <HeadContent />
      </head>
      <body>
        <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
          <ClerkProvider
            publishableKey={clerkPublishableKey}
            localization={esES}
          >
            <ConvexProvider>
              <AuthProvider>
                <I18nProvider>
                  <LangSync />
                  {children}
                </I18nProvider>
              </AuthProvider>
            </ConvexProvider>
          </ClerkProvider>
        </ThemeProvider>
        {/* <TanStackDevtools
          config={{
            position: 'bottom-right',
            openHotkey: [],
          }}
          plugins={[
            {
              name: 'Tanstack Router',
              render: <TanStackRouterDevtoolsPanel />,
            },
          ]}
        /> */}
        <Analytics mode={import.meta.env.PROD ? 'production' : 'development'} />
        <ClarityAnalytics />
        <Scripts />
      </body>
    </html>
  )
}
