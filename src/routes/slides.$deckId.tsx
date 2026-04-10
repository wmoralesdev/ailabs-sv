import { Link, createFileRoute } from "@tanstack/react-router";
import { SlidesShell } from "@/components/slides/slides-shell";
import { seoCopyEs } from "@/content/seo-copy";
import { useI18n } from "@/lib/i18n";
import { buildSeoMeta } from "@/lib/seo-meta";
import { getSlideDeck } from "@/lib/slides-decks";

export const Route = createFileRoute("/slides/$deckId")({
  head: ({ params }) => {
    const copy = seoCopyEs.slidesDeck(params.deckId);
    const { meta, links } = buildSeoMeta({
      path: `/slides/${params.deckId}`,
      title: copy.title,
      description: copy.description,
      noIndex: true,
    });
    return { meta, links };
  },
  component: SlidesDeckPage,
});

function SlidesDeckPage() {
  const { deckId } = Route.useParams();
  const { language } = useI18n();
  const deck = getSlideDeck(deckId);

  if (!deck) {
    return (
      <div className="flex min-h-dvh flex-col items-center justify-center bg-background px-6 text-center text-foreground">
        <p className="font-display text-xl font-semibold">Deck no encontrado</p>
        <p className="mt-2 max-w-sm text-sm text-muted-foreground">
          No hay una presentación con este identificador.
        </p>
        <Link to="/" className="mt-8 text-sm font-medium text-primary underline-offset-4 hover:underline">
          Volver al inicio
        </Link>
      </div>
    );
  }

  const deckLabel =
    deck.id === "brand"
      ? language === "es"
        ? "Marca"
        : "Brand"
      : deck.id === "ufg-events"
        ? "UFG"
        : deck.label;

  return <SlidesShell slides={[...deck.slides]} deckLabel={deckLabel} />;
}
