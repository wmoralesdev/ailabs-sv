export type FounderWhatsAppVariant = "walter" | "daniela";

export type FounderPassVariant = "links" | FounderWhatsAppVariant;

/** Single gray background for the whole ticket (preview + pass.json) */
export const FOUNDER_PASS_CARD_BG = "#404040";
/** Padding behind the QR only */
export const FOUNDER_PASS_QR_PAD_BG = "#ffffff";

export const DEFAULT_PASS_LINKS_QR_URL = "https://ailabs.sv/links";

/** Primary mark on gray */
export const FOUNDER_PASS_ACCENT = "#8B7BC7";

const WHATSAPP_CC = import.meta.env.VITE_PASS_WHATSAPP_CC ?? "503";
const passLinksFromEnv = import.meta.env.VITE_PASS_LINKS_QR_URL?.trim();
const PASS_LINKS_QR_URL =
  passLinksFromEnv && passLinksFromEnv.length > 0
    ? passLinksFromEnv.replace(/\/$/, "")
    : DEFAULT_PASS_LINKS_QR_URL;

export const FOUNDER_WHATSAPP_VARIANTS: Record<
  FounderWhatsAppVariant,
  {
    phoneLocal: string;
    firstName: string;
    fullName: string;
    roleLabel: string;
    titleLine: string;
    whatsappPrefill: string;
  }
> = {
  walter: {
    phoneLocal: "71320261",
    firstName: "Walter",
    fullName: "Walter Morales",
    roleLabel: "Founder",
    titleLine: "Cursor Ambassador, Software Engineer",
    whatsappPrefill: "Hola Walter, mi nombre es ",
  },
  daniela: {
    phoneLocal: "70956453",
    firstName: "Daniela",
    fullName: "Daniela Huezo",
    roleLabel: "Co-Founder",
    titleLine: "Cursor Ambassador, Software Engineer",
    whatsappPrefill: "Hola Daniela, mi nombre es ",
  },
};

export function buildFounderWhatsAppUrl(variant: FounderWhatsAppVariant): string {
  const v = FOUNDER_WHATSAPP_VARIANTS[variant];
  const digits = `${WHATSAPP_CC}${v.phoneLocal}`.replace(/\D/g, "");
  const text = encodeURIComponent(v.whatsappPrefill);
  return `https://wa.me/${digits}?text=${text}`;
}

export function buildFounderPassQrUrl(variant: FounderPassVariant): string {
  if (variant === "links") {
    return PASS_LINKS_QR_URL.replace(/\/$/, "");
  }
  return buildFounderWhatsAppUrl(variant);
}

export function founderPassVariantShortLabel(variant: FounderPassVariant): string {
  if (variant === "links") return "Links";
  return FOUNDER_WHATSAPP_VARIANTS[variant].firstName;
}
