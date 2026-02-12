import { Link } from "@tanstack/react-router";
import { HugeiconsIcon } from "@hugeicons/react";
import { CodeIcon } from "@hugeicons/core-free-icons";
import { useI18n } from "@/lib/i18n";
import { GithubIcon } from "@/components/ui/github-icon";
import { LinkedinIcon } from "@/components/ui/linkedin-icon";
import { XIcon } from "@/components/ui/x-icon";

export function SiteFooter() {
  const { t } = useI18n();

  return (
    <footer className="border-t border-border bg-card pb-10 pt-16">
      <div className="container mx-auto px-6">
        <div className="mb-16 grid grid-cols-1 gap-10 md:grid-cols-12">
          <div className="md:col-span-4">
            <Link
              to="/"
              className="mb-6 flex items-center gap-2"
              aria-label={t.site.name}
            >
              <div className="flex h-6 w-6 items-center justify-center rounded bg-foreground text-background">
                <HugeiconsIcon icon={CodeIcon} size={14} />
              </div>
              <span className="text-lg font-semibold tracking-tight">
                <span className="text-primary">AI</span>
                <span className="text-foreground">Labs</span>
                <span className="text-muted-foreground">.sv</span>
              </span>
            </Link>
            <p className="mb-6 max-w-xs text-sm font-light leading-relaxed text-foreground/60">
              {t.site.description}
            </p>
            <div className="flex gap-4">
              {t.ambassador.socials.twitter ? (
                <a
                  href={t.ambassador.socials.twitter}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={t.ui.ambassador.x}
                  className="flex h-8 w-8 items-center justify-center rounded-full border border-border text-foreground/60 transition-all hover:border-primary hover:text-primary hover:opacity-100"
                >
                  <XIcon className="size-4" />
                </a>
              ) : null}
              {t.ambassador.socials.github ? (
                <a
                  href={t.ambassador.socials.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={t.ui.ambassador.github}
                  className="flex h-8 w-8 items-center justify-center rounded-full border border-border text-foreground/60 transition-all hover:border-primary hover:text-primary hover:opacity-100"
                >
                  <GithubIcon className="size-4" />
                </a>
              ) : null}
              {t.ambassador.socials.linkedin ? (
                <a
                  href={t.ambassador.socials.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="LinkedIn"
                  className="flex h-8 w-8 items-center justify-center rounded-full border border-border text-foreground/60 transition-all hover:border-primary hover:text-primary hover:opacity-100"
                >
                  <LinkedinIcon className="size-4" />
                </a>
              ) : null}
            </div>
          </div>

          <div className="md:col-span-2">
            <h4 className="mb-6 text-sm font-medium">{t.ui.footer.organization}</h4>
            <ul className="space-y-3">
              <li>
                <a href="/#overview" className="text-sm font-light text-foreground/60 transition-colors hover:text-primary hover:opacity-100">
                  {t.ui.footer.overview}
                </a>
              </li>
              <li>
                <a href="/#community" className="text-sm font-light text-foreground/60 transition-colors hover:text-primary hover:opacity-100">
                  {t.ui.footer.community}
                </a>
              </li>
              <li>
                <a href="/#events" className="text-sm font-light text-foreground/60 transition-colors hover:text-primary hover:opacity-100">
                  {t.ui.footer.events}
                </a>
              </li>
              <li>
                <a href="/#partners" className="text-sm font-light text-foreground/60 transition-colors hover:text-primary hover:opacity-100">
                  Partners
                </a>
              </li>
            </ul>
          </div>

          <div className="md:col-span-2">
            <h4 className="mb-6 text-sm font-medium">{t.ui.footer.resources}</h4>
            <ul className="space-y-3">
              <li>
                <Link to="/sponsor-kit" className="text-sm font-light text-foreground/60 transition-colors hover:text-primary hover:opacity-100">
                  {t.sponsorKit.title}
                </Link>
              </li>
              <li>
                <a
                  href={t.site.whatsappLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm font-light text-foreground/60 transition-colors hover:text-primary hover:opacity-100"
                >
                  {t.ui.footer.whatsapp}
                </a>
              </li>
              <li>
                <a
                  href={`mailto:${t.partner.email}`}
                  className="text-sm font-light text-foreground/60 transition-colors hover:text-primary hover:opacity-100"
                >
                  {t.ui.footer.contact}
                </a>
              </li>
            </ul>
          </div>

          <div className="md:col-span-4">
            <h4 className="mb-4 text-sm font-medium">{t.ui.footer.stayUpdated}</h4>
            <p className="mb-4 text-sm font-light text-foreground/60">{t.ui.footer.newsletterText}</p>
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

        <div className="flex flex-col items-center justify-between gap-4 border-t border-border pt-8 md:flex-row">
          <p className="text-xs font-light text-foreground/40">
            © {new Date().getFullYear()} AI Labs SV. {t.ui.footer.madeWith}{" "}
            <span className="mx-0.5 inline-block text-primary">♥</span>{" "}
            {t.ui.footer.inSanSalvador}
          </p>
          <div className="flex items-center gap-6">
            <a
              href={`mailto:${t.partner.email}`}
              className="text-xs font-light text-foreground/40 transition-opacity hover:opacity-100"
            >
              {t.ui.footer.contact}
            </a>
            <Link to="/sponsor-kit" className="text-xs font-light text-foreground/40 transition-opacity hover:opacity-100">
              {t.sponsorKit.title}
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
