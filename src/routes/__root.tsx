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
import { postDebugLog } from "@/lib/debug-log"

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
        title: 'ailabs.sv',
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

  useEffect(() => {
    if (typeof window === "undefined") return;

    // #region agent log
    postDebugLog({
      runId: "initial",
      hypothesisId: "H1",
      location: "src/routes/__root.tsx",
      message: "root document boot",
      data: {
        path: window.location.pathname,
        mode: import.meta.env.MODE,
        hasClerkPublishableKey: Boolean(clerkPublishableKey),
      },
    });
    // #endregion

    const onError = (event: ErrorEvent) => {
      const stack =
        typeof event.error?.stack === "string"
          ? event.error.stack.split("\n").slice(0, 4).join("\n")
          : null;

      // #region agent log
      postDebugLog({
        runId: "initial",
        hypothesisId: "H4",
        location: "src/routes/__root.tsx",
        message: "window error",
        data: {
          path: window.location.pathname,
          source: event.filename ?? null,
          errorMessage: event.message ?? null,
          stack,
        },
      });
      // #endregion
    };

    const onUnhandledRejection = (event: PromiseRejectionEvent) => {
      const reason =
        event.reason instanceof Error
          ? {
              message: event.reason.message,
              stack: event.reason.stack?.split("\n").slice(0, 4).join("\n") ?? null,
            }
          : {
              message:
                typeof event.reason === "string" ? event.reason : JSON.stringify(event.reason ?? null),
            };

      // #region agent log
      postDebugLog({
        runId: "initial",
        hypothesisId: "H4",
        location: "src/routes/__root.tsx",
        message: "window unhandled rejection",
        data: {
          path: window.location.pathname,
          reason,
        },
      });
      // #endregion
    };

    window.addEventListener("error", onError);
    window.addEventListener("unhandledrejection", onUnhandledRejection);
    return () => {
      window.removeEventListener("error", onError);
      window.removeEventListener("unhandledrejection", onUnhandledRejection);
    };
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
