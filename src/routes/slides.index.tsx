import { Link, createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { HugeiconsIcon } from "@hugeicons/react";
import { ArrowRightIcon } from "@hugeicons/core-free-icons";
import type { Language } from "@/content/site-content";
import type { SlidesGateState } from "@/lib/slides-gate-server";
import { seoCopyEs } from "@/content/seo-copy";
import { buildSeoMeta } from "@/lib/seo-meta";
import { useI18n } from "@/lib/i18n";
import { listSlideDecks } from "@/lib/slides-decks";
import { setSlidesGateUnlocked } from "@/lib/slides-gate-local-storage";
import { getSlidesGateStateFn, verifySlidesPasswordFn } from "@/lib/slides-gate-server";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/slides/")({
  head: () => {
    const { meta, links } = buildSeoMeta({
      path: "/slides",
      title: seoCopyEs.slidesIndex.title,
      description: seoCopyEs.slidesIndex.description,
      noIndex: true,
    });
    return { meta, links };
  },
  component: SlidesIndexPage,
});

function deckTitle(deckId: string, baseLabel: string, language: Language): string {
  if (deckId === "brand") {
    return language === "es" ? "Marca" : "Brand";
  }
  if (deckId === "ufg-events") {
    return "UFG";
  }
  return baseLabel;
}

function SlidesIndexPage() {
  const { language } = useI18n();
  const decks = listSlideDecks();
  const [gate, setGate] = useState<SlidesGateState | null>(null);
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [pending, setPending] = useState(false);

  useEffect(() => {
    let cancelled = false;
    void getSlidesGateStateFn().then((state) => {
      if (!cancelled) setGate(state);
    });
    return () => {
      cancelled = true;
    };
  }, []);

  if (gate === null) {
    return (
      <div className="flex min-h-dvh flex-col items-center justify-center bg-background px-6 text-center text-foreground">
        <p className="text-sm text-muted-foreground">Cargando…</p>
      </div>
    );
  }

  const state = gate;

  if (!state.configured) {
    return (
      <div className="flex min-h-dvh flex-col items-center justify-center bg-background px-6 text-center text-foreground">
        <p className="font-display text-xl font-semibold">Presentaciones no disponibles</p>
        <p className="mt-2 max-w-md text-sm text-muted-foreground">
          No hay configuración de acceso para presentaciones en este entorno. Define{" "}
          <code className="rounded bg-muted px-1 py-0.5 font-mono text-xs">SLIDES_PASSWORD</code>{" "}
          en el servidor.
        </p>
      </div>
    );
  }

  if (!state.allowed) {
    return (
      <div className="flex min-h-dvh flex-col items-center justify-center bg-background px-6 text-foreground">
        <form
          className="w-full max-w-sm"
          onSubmit={(e) => {
            e.preventDefault();
            setError(null);
            setPending(true);
            void (async () => {
              try {
                const result = await verifySlidesPasswordFn({ data: { password } });
                if (result.success) {
                  setSlidesGateUnlocked();
                  const next = await getSlidesGateStateFn();
                  setGate(next);
                  setPassword("");
                } else {
                  setError("Contraseña incorrecta.");
                }
              } catch {
                setError("No se pudo verificar. Intenta de nuevo.");
              } finally {
                setPending(false);
              }
            })();
          }}
        >
          <p className="mb-8 text-center font-display text-xl font-semibold">Presentaciones</p>
          <label
            htmlFor="slides-gate-password"
            className="mb-2 block text-sm font-medium text-muted-foreground"
          >
            Contraseña
          </label>
          <input
            id="slides-gate-password"
            className="mb-4 w-full rounded-md border border-border bg-background px-3 py-2 text-sm outline-none ring-offset-background focus-visible:ring-2 focus-visible:ring-ring"
            type="password"
            name="password"
            autoComplete="current-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            disabled={pending}
          />
          {error ? <p className="mb-4 text-sm text-destructive">{error}</p> : null}
          <Button type="submit" className="w-full" disabled={pending || password.length === 0}>
            {pending ? "Entrando…" : "Continuar"}
          </Button>
        </form>
      </div>
    );
  }

  return (
    <div className="flex min-h-dvh flex-col bg-background px-6 py-16 text-foreground">
      <div className="mx-auto w-full max-w-lg">
        <h1 className="font-display text-2xl font-semibold tracking-tight">Presentaciones</h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Elige un deck. Navegación con flechas o espacio dentro de cada presentación.
        </p>
        <ul className="mt-10 flex flex-col gap-3">
          {decks.map((d) => (
            <li key={d.id}>
              <Link
                to="/slides/$deckId"
                params={{ deckId: d.id }}
                className="flex items-center justify-between gap-4 rounded-lg border border-border bg-card px-4 py-4 text-left transition-colors hover:border-primary/30 hover:bg-accent/50"
              >
                <div>
                  <p className="font-medium">{deckTitle(d.id, d.label, language)}</p>
                  <p className="text-xs text-muted-foreground">
                    {d.slideCount} {d.slideCount === 1 ? "diapositiva" : "diapositivas"}
                  </p>
                </div>
                <HugeiconsIcon icon={ArrowRightIcon} size={20} className="shrink-0 text-muted-foreground" />
              </Link>
            </li>
          ))}
        </ul>
        <p className="mt-10 text-center text-xs text-muted-foreground">
          <Link to="/" className="font-medium text-primary underline-offset-4 hover:underline">
            Volver al inicio
          </Link>
        </p>
      </div>
    </div>
  );
}
