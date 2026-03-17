import { useMemo } from "react";
import { Link } from "@tanstack/react-router";
import { useI18n } from "@/lib/i18n";
import { GithubIcon } from "@/components/ui/github-icon";
import { LinkedinIcon } from "@/components/ui/linkedin-icon";
import { XIcon } from "@/components/ui/x-icon";
import { AilabsLockup } from "@/components/ui/ailabs-lockup";

const FOOTER_WATERMARK_WORDS_EN = [
  "CURIOUS",
  "BUILDERS",
  "WHY?",
  "SHIP IT",
  "EXPLORE",
  "THE LAB",
  "CREATE",
  "LEARN",
];

const FOOTER_WATERMARK_WORDS_ES = [
  "CURIOSOS",
  "CONSTRUIR",
  "¿POR QUÉ?",
  "LANZAR",
  "EXPLORA",
  "EL LAB",
  "CREAR",
  "APRENDER",
];

export function SiteFooter() {
  const { t, language } = useI18n();
  const words = language === "es" ? FOOTER_WATERMARK_WORDS_ES : FOOTER_WATERMARK_WORDS_EN;
  const watermarkWord = useMemo(
    () => words[Math.floor(Math.random() * words.length)],
    [],
  );

  return (
    <footer className="relative overflow-hidden border-t border-border bg-card pb-10 pt-16">
      <span
        aria-hidden
        className="pointer-events-none absolute inset-0 z-0 flex select-none items-center justify-center font-display text-foreground/3"
        style={{
          fontSize: "clamp(10rem, 25vw, 20rem)",
          lineHeight: 1,
        }}
      >
        {watermarkWord}
      </span>
      <div className="container relative z-10 mx-auto px-6">
        <div className="mb-12 grid grid-cols-1 gap-10 md:grid-cols-3">
          {/* Left zone: Brand */}
          <div>
            <Link
              to="/"
              className="mb-4 inline-flex items-center"
              aria-label={t.site.name}
            >
              <AilabsLockup className="text-5xl" />
            </Link>
            <p className="max-w-xs text-sm font-light leading-relaxed text-foreground/60">
              {t.site.description}
            </p>
          </div>

          {/* Center zone: Flat link list */}
          <div>
            <h4 className="mb-4 text-sm font-medium">{t.ui.footer.organization}</h4>
            <ul className="grid grid-cols-2 gap-x-6 gap-y-2">
              <li>
                <Link to="/" hash="overview" className="text-sm font-light text-foreground/60 transition-colors hover:text-primary">
                  {t.ui.footer.overview}
                </Link>
              </li>
              <li>
                <Link to="/" hash="community" className="text-sm font-light text-foreground/60 transition-colors hover:text-primary">
                  {t.ui.footer.community}
                </Link>
              </li>
              <li>
                <Link to="/" hash="events" className="text-sm font-light text-foreground/60 transition-colors hover:text-primary">
                  {t.ui.footer.events}
                </Link>
              </li>
              <li>
                <Link to="/feed" search={{ event: undefined, tool: undefined, status: undefined }} className="text-sm font-light text-foreground/60 transition-colors hover:text-primary">
                  {t.ui.footer.feed}
                </Link>
              </li>
              <li>
                <Link to="/partners" className="text-sm font-light text-foreground/60 transition-colors hover:text-primary">
                  {t.ui.nav.partners}
                </Link>
              </li>
              <li>
                <Link
                  to={t.site.whatsappLink as any}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm font-light text-foreground/60 transition-colors hover:text-primary"
                >
                  {t.ui.footer.whatsapp}
                </Link>
              </li>
            </ul>
          </div>

          {/* Right zone: Newsletter */}
          <div>
            <h4 className="mb-2 text-sm font-medium">{t.ui.footer.stayUpdated}</h4>
            <p className="mb-3 text-sm font-light text-foreground/60">{t.ui.footer.newsletterText}</p>
            <form className="flex flex-col gap-2 sm:flex-row" onSubmit={(event) => event.preventDefault()}>
              <input
                type="email"
                placeholder={t.ui.footer.emailPlaceholder}
                className="h-10 grow rounded-lg border border-border bg-background px-4 text-sm outline-none transition-colors focus:border-primary"
              />
              <button
                type="submit"
                className="h-10 whitespace-nowrap rounded-lg bg-foreground px-4 text-sm font-medium text-background transition-opacity hover:opacity-90"
              >
                {t.ui.footer.subscribe}
              </button>
            </form>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="flex flex-col items-center justify-between gap-4 border-t border-border pt-6 text-xs font-light text-foreground/40 md:flex-row">
          <p>
            © {new Date().getFullYear()}{" "}
            <span className="font-display">ailabs.sv</span>. {t.ui.footer.madeWith}{" "}
            <span className="mx-0.5 inline-block text-primary">♥</span>{" "}
            {t.ui.footer.inSanSalvador}
          </p>
          <div className="flex items-center gap-3">
            {t.founder.socials.twitter ? (
              <Link
                to={t.founder.socials.twitter as any}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={t.ui.founder.x}
                className="flex h-7 w-7 items-center justify-center rounded-full border border-border text-foreground/40 transition-all hover:border-primary hover:text-primary"
              >
                <XIcon className="size-3.5" />
              </Link>
            ) : null}
            {t.founder.socials.github ? (
              <Link
                to={t.founder.socials.github as any}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={t.ui.founder.github}
                className="flex h-7 w-7 items-center justify-center rounded-full border border-border text-foreground/40 transition-all hover:border-primary hover:text-primary"
              >
                <GithubIcon className="size-3.5" />
              </Link>
            ) : null}
            {t.founder.socials.linkedin ? (
              <Link
                to={t.founder.socials.linkedin as any}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
                className="flex h-7 w-7 items-center justify-center rounded-full border border-border text-foreground/40 transition-all hover:border-primary hover:text-primary"
              >
                <LinkedinIcon className="size-3.5" />
              </Link>
            ) : null}
          </div>
          <div className="flex items-center gap-4">
            <a
              href="https://www.lem-design.art/"
              target="_blank"
              rel="noopener noreferrer"
              className="transition-colors hover:text-foreground/70"
            >
              Logo by lem-design.art
            </a>
            <span className="text-border">·</span>
            <Link
              to={`mailto:${t.partner.email}` as any}
              className="transition-colors hover:text-foreground/70"
            >
              {t.ui.footer.contact}
            </Link>
            <span className="text-border">·</span>
            <Link to="/terms" className="transition-colors hover:text-foreground/70">
              {t.ui.footer.terms}
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
