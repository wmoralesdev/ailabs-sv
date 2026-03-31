import { useCallback, useRef, useState } from "react";
import { useAction } from "convex/react";
import { toPng } from "html-to-image";
import { api } from "convex/_generated/api";
import type { FounderPassVariant } from "@/lib/founder-pass-constants";
import {
  buildFounderPassQrUrl,
  founderPassVariantShortLabel,
} from "@/lib/founder-pass-constants";
import { FounderTicketPreview } from "@/components/admin/founder-ticket-preview";
import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";

function downloadBase64Pkpass(base64: string, filename: string) {
  const binary = atob(base64);
  const bytes = new Uint8Array(binary.length);
  for (let i = 0; i < binary.length; i++) {
    bytes[i] = binary.charCodeAt(i);
  }
  const blob = new Blob([bytes], { type: "application/vnd.apple.pkpass" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  a.click();
  URL.revokeObjectURL(url);
}

function FounderPassColumn({
  variant,
}: {
  variant: FounderPassVariant;
}) {
  const previewRef = useRef<HTMLDivElement>(null);
  const generatePass = useAction(api.founder_pass.generateFounderPassPkpass);
  const [loading, setLoading] = useState(false);
  const [exportingPng, setExportingPng] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const label = founderPassVariantShortLabel(variant);

  const onDownloadPkpass = useCallback(async () => {
    setError(null);
    setLoading(true);
    try {
      const { base64, filename } = await generatePass({ variant });
      downloadBase64Pkpass(base64, filename);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Could not generate pass");
    } finally {
      setLoading(false);
    }
  }, [generatePass, variant]);

  const onExportPreviewPng = useCallback(async () => {
    const el = previewRef.current;
    if (!el) return;
    setExportingPng(true);
    setError(null);
    try {
      const dataUrl = await toPng(el, {
        pixelRatio: 2,
        cacheBust: true,
      });
      const a = document.createElement("a");
      a.href = dataUrl;
      a.download = `ailabs-founder-ticket-${variant}-preview.png`;
      a.click();
    } catch (e) {
      setError(e instanceof Error ? e.message : "Could not export PNG");
    } finally {
      setExportingPng(false);
    }
  }, [variant]);

  return (
    <div className="flex flex-col items-center gap-4">
      <p className="text-center font-medium text-foreground">
        {variant === "links" ? "Pase de enlaces" : `Pase de ${label}`}{" "}
        <span className="text-muted-foreground font-normal text-sm">
          {variant === "links"
            ? `(QR → ${buildFounderPassQrUrl(variant).replace(/^https:\/\//, "").split("?")[0]})`
            : "(WhatsApp)"}
        </span>
      </p>
      <FounderTicketPreview ref={previewRef} variant={variant} />
      <div className="flex w-full max-w-[280px] flex-col gap-2">
        <Button type="button" disabled={loading} onClick={() => void onDownloadPkpass()}>
          {loading ? (
            <>
              <Spinner className="mr-2" size="sm" />
              Generating…
            </>
          ) : (
            `Download .pkpass (${label})`
          )}
        </Button>
        <Button
          type="button"
          variant="outline"
          disabled={exportingPng}
          onClick={() => void onExportPreviewPng()}
        >
          {exportingPng ? (
            <>
              <Spinner className="mr-2" size="sm" />
              Exporting…
            </>
          ) : (
            "Export preview as PNG"
          )}
        </Button>
        {error ? (
          <p className="text-center text-sm text-destructive" role="alert">
            {error}
          </p>
        ) : null}
      </div>
    </div>
  );
}

export function AdminFounderPassPage() {
  return (
    <div className="mx-auto max-w-6xl">
      <div className="mb-8">
        <h2 className="font-display text-xl font-medium tracking-tight text-foreground">
          Founder ticket (Apple Wallet)
        </h2>
        <p className="mt-2 text-pretty text-sm text-muted-foreground">
          Tres pases con el mismo diseño (fondo gris, QR sobre blanco): uno abre{" "}
          <code className="rounded bg-muted px-1 py-0.5 text-xs">ailabs.sv/links</code> y dos abren
          WhatsApp con mensaje en español. Descarga el{" "}
          <code className="rounded bg-muted px-1 py-0.5 text-xs">.pkpass</code> correcto y envíalo
          por AirDrop al iPhone. URLs configurables con{" "}
          <code className="rounded bg-muted px-1 py-0.5 text-xs">PASS_LINKS_QR_URL</code> /{" "}
          <code className="rounded bg-muted px-1 py-0.5 text-xs">VITE_PASS_LINKS_QR_URL</code> (Convex
          / Vite). Requiere certificados Apple Pass en Convex (ver{" "}
          <code className="rounded bg-muted px-1 py-0.5 text-xs">.env.example</code>).
        </p>
      </div>

      <div className="grid gap-12 sm:grid-cols-2 xl:grid-cols-3 xl:gap-8">
        <FounderPassColumn variant="links" />
        <FounderPassColumn variant="walter" />
        <FounderPassColumn variant="daniela" />
      </div>
    </div>
  );
}
