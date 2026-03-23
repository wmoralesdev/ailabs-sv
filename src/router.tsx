import { Link, createRouter } from '@tanstack/react-router'

// Import the generated route tree
import { routeTree } from './routeTree.gen'

// Create a new router instance
export const getRouter = () => {
  const router = createRouter({
    routeTree,
    scrollRestoration: true,
    defaultPreloadStaleTime: 0,
    defaultNotFoundComponent: () => (
      <main className="mx-auto flex min-h-screen w-full max-w-2xl items-center justify-center px-6 text-center">
        <div>
          <h1 className="text-2xl font-semibold">Page not found</h1>
          <p className="text-muted-foreground mt-2">
            The page you are looking for does not exist.
          </p>
          <Link
            to="/"
            className="mt-6 inline-flex rounded-md border px-4 py-2 text-sm font-medium transition-colors hover:bg-muted"
          >
            Back to home
          </Link>
        </div>
      </main>
    ),
  })

  return router
}
