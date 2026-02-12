import { createFileRoute } from "@tanstack/react-router";
import { useQuery } from "convex/react";
import { api } from "convex/_generated/api";
import { useState, useEffect } from "react";
import { Link } from "@tanstack/react-router";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { HugeiconsIcon } from "@hugeicons/react";
import { Search01Icon } from "@hugeicons/core-free-icons";

export const Route = createFileRoute("/community")({
  component: CommunityPage,
});

function CommunityPage() {
  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [cursor, setCursor] = useState<string | null>(null);

  const result = useQuery(api.profiles.list, {
    search: debouncedSearch || undefined,
    limit: 12,
    cursor: cursor ?? undefined,
  });

  useEffect(() => {
    const t = setTimeout(() => setDebouncedSearch(search), 300);
    return () => clearTimeout(t);
  }, [search]);

  const handleSearchChange = (value: string) => {
    setSearch(value);
    setCursor(null);
  };

  return (
    <div className="min-h-dvh bg-background text-foreground font-sans">
      <SiteHeader />
      <main className="pt-24 pb-16">
        <div className="container mx-auto px-4">
          <div className="mb-12">
            <h1 className="text-3xl font-bold tracking-tight md:text-4xl">
              Community
            </h1>
            <p className="mt-2 text-muted-foreground">
              Explore builders in the AI Labs SV community.
            </p>
          </div>

          <div className="mb-8 flex gap-4">
            <div className="relative flex-1">
              <HugeiconsIcon
                icon={Search01Icon}
                className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground"
              />
              <Input
                type="search"
                placeholder="Search by name, title, or bio…"
                value={search}
                onChange={(e) => handleSearchChange(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>

          {result === undefined ? (
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {[1, 2, 3].map((i) => (
                <Card key={i} className="animate-pulse">
                  <CardHeader>
                    <div className="h-12 w-12 rounded-full bg-muted" />
                    <div className="h-4 w-32 bg-muted" />
                  </CardHeader>
                  <CardContent>
                    <div className="h-3 w-full bg-muted" />
                    <div className="mt-2 h-3 w-3/4 bg-muted" />
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : result.profiles.length === 0 ? (
            <div className="rounded-2xl border border-dashed border-border bg-card/40 p-12 text-center text-muted-foreground">
              No profiles yet. Be the first to add yours!
            </div>
          ) : (
            <>
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {result.profiles.map((profile) => (
                  <Link
                    key={profile._id}
                    to="/community/$slug"
                    params={{ slug: profile.slug }}
                  >
                    <Card className="h-full transition-colors hover:border-primary/40">
                      <CardHeader className="flex flex-row items-center gap-4">
                        {profile.avatarUrl ? (
                          <img
                            src={profile.avatarUrl}
                            alt={profile.name}
                            className="size-12 rounded-full object-cover"
                          />
                        ) : (
                          <div className="flex size-12 items-center justify-center rounded-full border border-primary/20 bg-primary/10 text-lg font-bold text-primary">
                            {profile.name.charAt(0)}
                          </div>
                        )}
                        <div className="min-w-0 flex-1">
                          <p className="truncate font-semibold">{profile.name}</p>
                          <p className="truncate text-sm text-muted-foreground">
                            {profile.title}
                          </p>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <p className="line-clamp-2 text-sm text-muted-foreground">
                          {profile.bio}
                        </p>
                      </CardContent>
                    </Card>
                  </Link>
                ))}
              </div>
              {result.nextCursor && (
                <div className="mt-8 flex justify-center">
                  <Button
                    variant="outline"
                    onClick={() => setCursor(result.nextCursor)}
                  >
                    Load more
                  </Button>
                </div>
              )}
            </>
          )}
        </div>
      </main>
      <SiteFooter />
    </div>
  );
}
