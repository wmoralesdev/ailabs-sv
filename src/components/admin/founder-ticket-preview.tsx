import { forwardRef } from "react";
import QRCode from "react-qr-code";
import type {
  FounderPassVariant,
  FounderWhatsAppVariant,
} from "@/lib/founder-pass-constants";
import {
  FOUNDER_PASS_CARD_BG,
  FOUNDER_PASS_QR_PAD_BG,
  FOUNDER_WHATSAPP_VARIANTS,
  buildFounderPassQrUrl,
} from "@/lib/founder-pass-constants";
import { AilabsLockup } from "@/components/ui/ailabs-lockup";
import { cn } from "@/lib/utils";

function isWhatsAppVariant(v: FounderPassVariant): v is FounderWhatsAppVariant {
  return v === "walter" || v === "daniela";
}

export const FounderTicketPreview = forwardRef<
  HTMLDivElement,
  { className?: string; variant: FounderPassVariant }
>(function FounderTicketPreview({ className, variant }, ref) {
  const qrUrl = buildFounderPassQrUrl(variant);
  const w = FOUNDER_WHATSAPP_VARIANTS.walter;
  const d = FOUNDER_WHATSAPP_VARIANTS.daniela;

  const qrCaption = variant === "links" ? "Enlaces oficiales · ailabs.sv" : "WhatsApp";

  const solo = isWhatsAppVariant(variant) ? FOUNDER_WHATSAPP_VARIANTS[variant] : null;

  return (
    <div
      ref={ref}
      className={cn(
        "w-full max-w-[420px] overflow-hidden rounded-2xl border border-white/10 shadow-lg",
        className,
      )}
      style={{ backgroundColor: FOUNDER_PASS_CARD_BG }}
    >
      <div className="px-3 pb-3 pt-5 sm:px-4 sm:pt-6 md:px-5">
        <div className="flex justify-center [&_svg_.fill-primary]:fill-[#8B7BC7] [&_svg_.fill-foreground]:fill-[#f0f0f0] [&_svg_.stroke-foreground]:stroke-[#f0f0f0]">
          <AilabsLockup
            className="inline-flex h-[1.75rem] max-w-full items-stretch justify-center sm:h-9 md:h-10"
            markClassName="h-full w-auto max-w-full"
          />
        </div>
        <p className="mt-3 text-center font-display text-lg font-medium tracking-tight text-white sm:mt-4">
          Founders
        </p>
        {solo ? (
          <div className="mt-4 text-center">
            <p className="text-[10px] font-medium uppercase tracking-wider text-white/55">
              {solo.roleLabel}
            </p>
            <p className="text-sm font-medium text-white">{solo.fullName}</p>
            <p className="mx-auto mt-1.5 max-w-[17rem] text-[9px] leading-snug text-white/70">
              {solo.titleLine}
            </p>
          </div>
        ) : (
          <div className="mt-4 grid grid-cols-2 gap-3 text-center">
            <div className="flex flex-col items-center text-center">
              <p className="text-[10px] font-medium uppercase tracking-wider text-white/55">
                {w.roleLabel}
              </p>
              <p className="text-sm font-medium text-white">{w.fullName}</p>
              <p className="mt-1.5 max-w-[11.5rem] text-[9px] leading-snug text-white/70">
                {w.titleLine}
              </p>
            </div>
            <div className="flex flex-col items-center text-center">
              <p className="text-[10px] font-medium uppercase tracking-wider text-white/55">
                {d.roleLabel}
              </p>
              <p className="text-sm font-medium text-white">{d.fullName}</p>
              <p className="mt-1.5 max-w-[11.5rem] text-[9px] leading-snug text-white/70">
                {d.titleLine}
              </p>
            </div>
          </div>
        )}
      </div>

      <div className="flex flex-col items-center px-4 pb-6 pt-2">
        <div
          className="rounded-lg p-2 shadow-sm"
          style={{ backgroundColor: FOUNDER_PASS_QR_PAD_BG }}
        >
          <QRCode value={qrUrl} size={168} level="M" className="h-auto max-w-full" />
        </div>
        <p className="mt-3 max-w-[280px] text-center text-[10px] leading-snug text-white/60">
          {qrCaption}
        </p>
      </div>
    </div>
  );
});
