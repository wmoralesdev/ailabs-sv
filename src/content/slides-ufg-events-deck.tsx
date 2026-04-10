/**
 * Deck interno UFG: copy alineado con ailabs-events.
 * Restricciones de marca (no logos extra en UI): Zero to Agent con lineamientos v0/Vercel;
 * Cursor Buildathon con uso de marca Cursor como en Luma. Ver carpetas en ailabs-events.
 */
import { SlideLayout } from "@/components/slides/slide-layout";
import { cn } from "@/lib/utils";

type EventCardProps = {
  title: string;
  meta: string;
  description: string;
  href: string;
  linkLabel: string;
};

function EventCard({ title, meta, description, href, linkLabel }: EventCardProps) {
  return (
    <article className="flex flex-col rounded-2xl border border-border/50 bg-card/25 p-6">
      <h3 className="font-display text-xl font-semibold leading-snug text-foreground md:text-2xl">{title}</h3>
      <p className="mt-2 font-mono text-[11px] uppercase tracking-widest text-primary">{meta}</p>
      <p className="mt-3 flex-1 text-sm leading-relaxed text-muted-foreground">{description}</p>
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className="mt-4 text-sm font-medium text-primary underline-offset-4 hover:underline"
      >
        {linkLabel}
      </a>
    </article>
  );
}

function UfgEventsSlide() {
  const events: Array<EventCardProps> = [
    {
      title: "Zero to Agent: San Salvador",
      meta: "25 abr 2026 · 15:00 a 18:00 · UFG",
      description:
        "Mini taller y workshop. Pensado para perfiles de computación, marketing, diseño y comunicación. Cupo referencia: alrededor de 100 personas.",
      href: "https://luma.com/dbltbg80",
      linkLabel: "Registro en Luma",
    },
    {
      title: "hack@latam (hub San Salvador)",
      meta: "15 may 2026 · 16:00 a 18:00 · UFG",
      description:
        "Hub local del kick off regional: espacio presencial con pizza, alrededor de 20 personas. El hackathon regional y la postulación viven en el sitio oficial (Ai Labs distribuye comms, no organiza el hack global).",
      href: "https://hack.indies.la/",
      linkLabel: "hack.indies.la",
    },
    {
      title: "Cursor Buildathon (24h)",
      meta: "4 y 5 jul 2026 · sáb 08:00 a dom 09:00 · UFG",
      description:
        "Veinticuatro horas para buildar en persona, con demos al cierre. Capacidad final según aula en UFG; referencia de audiencia en materiales de partners: alrededor de 200 builders.",
      href: "https://luma.com/tm16k0kj",
      linkLabel: "Registro en Luma",
    },
  ];

  return (
    <SlideLayout
      eyebrow="Universidad Francisco Gavidia (UFG) · San Salvador"
      title="Eventos 2026 con Ai Labs"
      staggerChildren
      contentClassName="space-y-8"
    >
      <div className={cn("grid gap-6", "slides-stagger-children lg:grid-cols-3")}>
        {events.map((e) => (
          <EventCard key={e.title} {...e} />
        ))}
      </div>
      <p className="text-center text-sm text-muted-foreground">
        <a
          href="https://build.cursorelsalvador.com/"
          target="_blank"
          rel="noopener noreferrer"
          className="font-medium text-primary underline-offset-4 hover:underline"
        >
          build.cursorelsalvador.com
        </a>
        {" · "}
        sitio del Cursor Buildathon (24h)
      </p>
      <p className="text-center text-sm">
        <a href="https://ailabs.sv" className="text-muted-foreground underline-offset-4 hover:underline">
          Powered by Ai /abs
        </a>
      </p>
    </SlideLayout>
  );
}

export const ufgEventsDeckSlides = [UfgEventsSlide] as const;
