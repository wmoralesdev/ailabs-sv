"use client";

import { useMemo, useState } from "react";
import { Link } from "@tanstack/react-router";
import { Turnstile } from "@marsidev/react-turnstile";
import type { FormEvent } from "react";
import { useI18n } from "@/lib/i18n";
import { SocialLinks } from "@/components/social-links";
import { AilabsLockup } from "@/components/ui/ailabs-lockup";
import { BrandText } from "@/components/brand-text";
import { isTurnstileConfigured } from "@/lib/turnstile-config";
import { subscribeToNewsletterFn } from "@/lib/newsletter-subscribe-server";
import { cn } from "@/lib/utils";

export function SiteFooter() {
  const { t, language } = useI18n();
  const f = t.ui.footer;
  const [email, setEmail] = useState("");
  const [turnstileToken, setTurnstileToken] = useState<string | null>(null);
  const [turnstileKey, setTurnstileKey] = useState(0);
  const [pending, setPending] = useState(false);
  const [formMessage, setFormMessage] = useState<{
    kind: "success" | "error";
    key: "subscribed" | "already" | "invalid" | "captcha" | "generic";
  } | null>(null);

  const needsTurnstile = isTurnstileConfigured();
  const siteKey = import.meta.env.VITE_TURNSTILE_SITE_KEY as string | undefined;

  const submitBlocked = needsTurnstile && !turnstileToken;
  const watermarkWord = useMemo(() => {
    const words = t.ui.footer.watermarkWords;
    return words[Math.floor(Math.random() * words.length)];
  }, [language, t.ui.footer.watermarkWords]);

  async function onNewsletterSubmit(e: FormEvent) {
    e.preventDefault();
    setFormMessage(null);
    if (submitBlocked) {
      setFormMessage({ kind: "error", key: "captcha" });
      return;
    }
    setPending(true);
    try {
      const result = await subscribeToNewsletterFn({
        data: {
          email,
          turnstileToken: turnstileToken ?? undefined,
        },
      });
      if (result.success) {
        if (result.kind === "alreadySubscribed") {
          setFormMessage({ kind: "success", key: "already" });
        } else {
          setFormMessage({ kind: "success", key: "subscribed" });
        }
        setEmail("");
        setTurnstileToken(null);
        setTurnstileKey((k) => k + 1);
        return;
      }
      setTurnstileKey((k) => k + 1);
      setTurnstileToken(null);
      if (result.error === "invalidEmail") {
        setFormMessage({ kind: "error", key: "invalid" });
        return;
      }
      if (result.error === "turnstileRequired") {
        setFormMessage({ kind: "error", key: "captcha" });
        return;
      }
      setFormMessage({ kind: "error", key: "generic" });
    } catch {
      setTurnstileKey((k) => k + 1);
      setTurnstileToken(null);
      setFormMessage({ kind: "error", key: "generic" });
    } finally {
      setPending(false);
    }
  }

  const messageText =
    formMessage === null
      ? null
      : formMessage.key === "subscribed"
        ? f.newsletterSubscribed
        : formMessage.key === "already"
          ? f.newsletterAlreadyOnList
          : formMessage.key === "invalid"
            ? f.newsletterInvalidEmail
            : formMessage.key === "captcha"
              ? f.newsletterCompleteCaptcha
              : f.newsletterGenericError;

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
        <div className="mb-12 grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-3">
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
                <Link to="/showcase" search={{ event: undefined, tool: undefined, status: undefined }} className="text-sm font-light text-foreground/60 transition-colors hover:text-primary">
                  {t.ui.footer.feed}
                </Link>
              </li>
              <li>
                <Link to="/partners" className="text-sm font-light text-foreground/60 transition-colors hover:text-primary">
                  {t.ui.nav.partners}
                </Link>
              </li>
              <li>
                <Link to="/links" className="text-sm font-light text-foreground/60 transition-colors hover:text-primary">
                  {t.ui.footer.links}
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
          <div className="md:col-span-2 lg:col-span-1">
            <h4 className="mb-2 text-sm font-medium">{f.stayUpdated}</h4>
            <p className="mb-3 text-sm font-light text-foreground/60">{f.newsletterText}</p>
            {needsTurnstile && siteKey ? (
              <div className="mb-2 flex min-h-10 justify-start sm:justify-end">
                <Turnstile
                  key={turnstileKey}
                  siteKey={siteKey}
                  options={{ size: "compact" }}
                  onSuccess={(token) => {
                    setTurnstileToken(token);
                  }}
                  onExpire={() => setTurnstileToken(null)}
                />
              </div>
            ) : null}
            <form className="flex flex-col gap-2 sm:flex-row" onSubmit={onNewsletterSubmit} noValidate>
              <input
                type="email"
                name="footer-newsletter-email"
                autoComplete="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={pending}
                placeholder={f.emailPlaceholder}
                className="h-10 grow rounded-lg border border-border bg-background px-4 text-sm outline-none transition-colors focus:border-primary disabled:opacity-60"
              />
              <button
                type="submit"
                disabled={pending || submitBlocked}
                className="h-10 whitespace-nowrap rounded-lg bg-foreground px-4 text-sm font-medium text-background transition-opacity hover:opacity-90 disabled:pointer-events-none disabled:opacity-50"
              >
                {pending ? f.newsletterSubscribing : f.subscribe}
              </button>
            </form>
            {messageText ? (
              <p
                role="status"
                aria-live="polite"
                className={cn(
                  "mt-2 text-sm",
                  formMessage?.kind === "success" ? "text-foreground/80" : "text-destructive"
                )}
              >
                {messageText}
              </p>
            ) : null}
          </div>
        </div>

        {/* Bottom bar */}
        <div className="flex flex-col items-center justify-between gap-4 border-t border-border pt-6 text-xs font-light text-foreground/40 lg:flex-row">
          <p className="text-center lg:text-left">
            © {new Date().getFullYear()}{" "}
            <BrandText />. {t.ui.footer.madeWith}{" "}
            <span className="mx-0.5 inline-block text-primary">♥</span>{" "}
            {t.ui.footer.inSanSalvador}
          </p>
          <SocialLinks
            socials={t.site.socials}
            variant="minimal"
            compact
            className="gap-3 text-foreground/40 [&_a]:border-border [&_a]:transition-all hover:[&_a]:border-primary hover:[&_a]:text-primary"
          />
          <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-2 lg:justify-end">
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
