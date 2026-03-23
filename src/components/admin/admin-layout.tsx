import { Link, Outlet, useRouterState } from "@tanstack/react-router";
import { cn } from "@/lib/utils";

function AdminTabLink({
  to,
  pathname,
  children,
}: {
  to: "/admin/events" | "/admin/lab";
  pathname: string;
  children: React.ReactNode;
}) {
  const active = pathname === to || pathname.startsWith(`${to}/`);

  return (
    <Link
      to={to}
      className={cn(
        "inline-flex items-center rounded-md border border-transparent px-3 py-1.5 text-sm font-medium transition-colors",
        active
          ? "border-border bg-background text-foreground shadow-sm"
          : "text-muted-foreground hover:bg-muted/60 hover:text-foreground",
      )}
    >
      {children}
    </Link>
  );
}

export function AdminLayout() {
  const pathname = useRouterState({ select: (s) => s.location.pathname });

  return (
    <div className="container mx-auto max-w-6xl px-4 pb-16">
      <h1 className="mb-2 text-2xl font-semibold tracking-tight">Admin</h1>
      <p className="mb-6 text-sm text-muted-foreground">
        Manage events and landing content.
      </p>
      <nav
        className="mb-8 flex flex-wrap gap-2 rounded-lg bg-muted p-1"
        aria-label="Admin sections"
      >
        <AdminTabLink to="/admin/events" pathname={pathname}>
          Events
        </AdminTabLink>
        <AdminTabLink to="/admin/lab" pathname={pathname}>
          From the Lab
        </AdminTabLink>
      </nav>
      <Outlet />
    </div>
  );
}
