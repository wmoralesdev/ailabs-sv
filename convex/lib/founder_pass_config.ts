/**
 * Mirror of founder pass copy / QR URLs for Node signer (keep in sync with
 * src/lib/founder-pass-constants.ts).
 */

export type FounderWhatsAppVariant = "walter" | "daniela";

export type FounderPassVariant = "links" | FounderWhatsAppVariant;

export const DEFAULT_PASS_LINKS_QR_URL = "https://ailabs.sv/links";

export const FOUNDER_WHATSAPP_VARIANTS: Record<
  FounderWhatsAppVariant,
  {
    phoneLocal: string;
    fullName: string;
    roleLabel: string;
    titleLine: string;
    whatsappPrefill: string;
  }
> = {
  walter: {
    phoneLocal: "71320261",
    fullName: "Walter Morales",
    roleLabel: "Founder",
    titleLine: "Cursor Ambassador, Software Engineer",
    whatsappPrefill: "Hola Walter, mi nombre es ",
  },
  daniela: {
    phoneLocal: "70956453",
    fullName: "Daniela Huezo",
    roleLabel: "Co-Founder",
    titleLine: "Cursor Ambassador, Software Engineer",
    whatsappPrefill: "Hola Daniela, mi nombre es ",
  },
};

export function getPassLinksQrUrl(): string {
  const raw = process.env.PASS_LINKS_QR_URL?.trim();
  return raw && raw.length > 0 ? raw.replace(/\/$/, "") : DEFAULT_PASS_LINKS_QR_URL;
}

export function buildFounderWhatsAppUrl(variant: FounderWhatsAppVariant): string {
  const cc = process.env.PASS_WHATSAPP_CC?.trim() || "503";
  const v = FOUNDER_WHATSAPP_VARIANTS[variant];
  const digits = `${cc}${v.phoneLocal}`.replace(/\D/g, "");
  const text = encodeURIComponent(v.whatsappPrefill);
  return `https://wa.me/${digits}?text=${text}`;
}

export function buildFounderPassBarcodeUrl(variant: FounderPassVariant): string {
  if (variant === "links") {
    return getPassLinksQrUrl();
  }
  return buildFounderWhatsAppUrl(variant);
}

/** Pass.json colors — gray card, light labels */
export const PASS_JSON_COLORS = {
  backgroundColor: "rgb(64, 64, 64)",
  foregroundColor: "rgb(250, 250, 250)",
  labelColor: "rgb(180, 180, 184)",
} as const;
