import { useEffect } from "react";
import { HeadContent, Scripts, createRootRoute } from '@tanstack/react-router'
import appCss from '../styles.css?url'
import { ClerkProvider } from "@clerk/tanstack-react-start"
import { esES } from "@clerk/localizations"
import { I18nProvider } from '@/lib/i18n'
import { ThemeProvider } from "@/components/theme-provider"
import { LangSync } from "@/components/lang-sync"
import { ConvexProvider } from "@/components/convex-provider"
import { AuthProvider } from "@/components/auth/auth-context"

const clerkPublishableKey = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY as string;

export const Route = createRootRoute({
  head: () => ({
    meta: [
      {
        charSet: 'utf-8',
      },
      {
        name: 'viewport',
        content: 'width=device-width, initial-scale=1',
      },
      {
        title: 'Ai /abs',
      },
      {
        name: 'description',
        content: "A community of curious builders exploring what's possible with AI. Starting in El Salvador.",
      },
    ],
    links: [
      {
        rel: 'icon',
        href: '/favicon.ico',
        type: 'image/x-icon',
      },
      { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
      { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossOrigin: 'anonymous' },
      {
        rel: 'stylesheet',
        href: 'https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600&family=Space+Grotesk:wght@300;400;500;600;700&display=swap',
      },
      {
        rel: 'stylesheet',
        href: appCss,
      },
    ],
  }),

  shellComponent: RootDocument,
})

function RootDocument({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    if (import.meta.env.DEV) {
      void import("react-grab");
    }
  }, []);

  return (
    <html lang="es">
      <head>
        <HeadContent />
      </head>
      <body>
        <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
          <ClerkProvider publishableKey={clerkPublishableKey} localization={esES}>
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
        <Scripts />
      </body>
    </html>
  )
}
