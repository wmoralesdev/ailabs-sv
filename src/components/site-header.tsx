import { useEffect, useState } from "react";
import { Link } from "@tanstack/react-router";
import { HugeiconsIcon } from "@hugeicons/react";
import { Cancel01Icon, Menu01Icon } from "@hugeicons/core-free-icons";
import { cn } from "@/lib/utils";
import { useI18n } from "@/lib/i18n";
import { LanguageToggle } from "@/components/language-toggle";
import { ThemeToggle } from "@/components/theme-toggle";
import { AuthHeaderActions } from "@/components/auth/auth-header-actions";
import { JoinCtaButton } from "@/components/join-cta-button";
import { AilabsLockup } from "@/components/ui/ailabs-lockup";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetTrigger,
} from "@/components/ui/sheet";

export function SiteHeader() {
  const { t } = useI18n();
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const navLinks = [
    { to: "/partners" as const, hash: undefined, label: t.ui.nav.partners },
    { to: "/showcase" as const, hash: undefined, label: t.ui.nav.feed },
    {
      to: "/hackathon-groups" as const,
      hash: undefined,
      label: t.ui.nav.hackathonGroups,
    },
  ] as const;

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-4 z-50 mx-auto pt-[env(safe-area-inset-top)] transition-all duration-300",
        scrolled ? "w-[calc(100%-2rem)] max-w-3xl" : "w-[calc(100%-2rem)] max-w-5xl",
      )}
    >
      <div
        className={cn(
          "flex h-14 items-center transition-all duration-300 ease-out",
          scrolled
            ? "justify-between gap-4 rounded-full border border-background/10 bg-foreground px-5 text-background shadow-xl shadow-black/15"
            : "justify-between gap-0 border border-transparent bg-transparent px-5 shadow-none",
        )}
      >
        <div className="flex h-full items-center justify-start transition-all duration-300">
          <Link
            to="/"
            className={cn(
              "group flex items-center gap-2 transition-all duration-300",
              scrolled && "[--foreground:var(--background)] [--muted-foreground:var(--background)]",
            )}
            aria-label={t.site.name}
          >
            <AilabsLockup compact={scrolled} className="text-2xl transition-all duration-300" />
          </Link>
        </div>

        <nav className="ml-4 hidden h-full flex-1 items-center justify-start gap-1 transition-all duration-300 md:flex">
          {navLinks.map((link) => (
            <Link
              key={link.label}
              to={link.to}
              hash={link.hash}
              className={cn(
                "inline-flex h-9 items-center justify-center px-4 text-sm font-medium leading-none transition-colors",
                scrolled
                  ? "text-background/70 hover:text-background aria-[current=page]:text-background"
                  : "text-foreground/70 hover:text-primary aria-[current=page]:text-primary"
              )}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div
          className={cn(
            "flex h-full items-center justify-end gap-2 transition-all duration-300",
            scrolled && "[&_button]:text-background [&_button:hover]:bg-background/15 [&_button:hover]:text-background",
          )}
        >
          <div className="hidden md:flex md:items-center md:gap-2">
            <LanguageToggle />
            <ThemeToggle />
          </div>
          {!scrolled && (
            <div className="hidden h-4 w-px bg-border opacity-0 transition-opacity duration-300 md:block" />
          )}
          <AuthHeaderActions />
          <JoinCtaButton inverted={scrolled} />

          <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
            <SheetTrigger
              className={cn(
                "flex size-9 items-center justify-center rounded-full transition-colors md:hidden",
                scrolled
                  ? "text-background hover:bg-background/20"
                  : "text-foreground hover:bg-accent",
              )}
              aria-label="Open menu"
            >
              <HugeiconsIcon icon={Menu01Icon} className="size-5" />
            </SheetTrigger>
            <SheetContent side="right">
              <SheetHeader className="border-b">
                <AilabsLockup className="text-xl" />
                <SheetClose
                  className="flex size-9 items-center justify-center rounded-full text-foreground hover:bg-accent"
                  aria-label="Close menu"
                >
                  <HugeiconsIcon icon={Cancel01Icon} className="size-5" />
                </SheetClose>
              </SheetHeader>

              <nav className="flex flex-col gap-1 p-4">
                {navLinks.map((link) => (
                  <Link
                    key={link.label}
                    to={link.to}
                    hash={link.hash}
                    onClick={() => setMobileMenuOpen(false)}
                    className="rounded-lg px-3 py-2.5 text-base font-medium text-foreground/80 transition-colors hover:bg-accent hover:text-foreground"
                  >
                    {link.label}
                  </Link>
                ))}
              </nav>

              <div className="mt-auto border-t p-4">
                <div className="mb-4 flex items-center gap-2">
                  <LanguageToggle />
                  <ThemeToggle />
                </div>
                <Link
                  to="/sign-in"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex h-10 w-full items-center justify-center rounded-full bg-foreground text-sm font-medium text-background transition-opacity hover:opacity-90"
                >
                  {t.signIn.title}
                </Link>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
