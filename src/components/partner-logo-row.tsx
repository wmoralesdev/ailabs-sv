import type { ComponentType, SVGProps } from 'react'
import {
  CODEX_PARTNER_IMG,
  CURSOR_PARTNER_IMG,
  V0_PARTNER_IMG,
  partnerRasterMarkClasses,
} from '@/lib/partner-image-paths'
import { cn } from '@/lib/utils'
import { Convex } from '@/components/ui/svgs/convex'
import { Supabase } from '@/components/ui/svgs/supabase'
import { Vercel } from '@/components/ui/svgs/vercel'

type Partner = {
  name: string
  url: string
}

interface PartnerLogoRowProps {
  partners: Array<Partner>
  className?: string
  showSvgMarks?: boolean
}

const PARTNER_ICONS: Record<string, ComponentType<SVGProps<SVGSVGElement>>> = {
  Vercel,
  Supabase,
  Convex,
}

export function PartnerLogoRow({
  partners,
  className,
  showSvgMarks = false,
}: PartnerLogoRowProps) {
  return (
    <div
      className={cn(
        'flex w-full max-w-5xl flex-col items-center justify-center gap-8 sm:flex-row sm:flex-wrap sm:gap-x-8 sm:gap-y-0 md:gap-x-10 lg:gap-x-12',
        className,
      )}
    >
      {partners.map((partner) => (
        <PartnerLogoLink
          key={partner.name}
          partner={partner}
          showSvgMarks={showSvgMarks}
        />
      ))}
    </div>
  )
}

function PartnerLogoLink({
  partner,
  showSvgMarks,
}: {
  partner: Partner
  showSvgMarks: boolean
}) {
  const linkClassName =
    'group flex shrink-0 items-center justify-center grayscale text-muted-foreground transition-all duration-300 hover:grayscale-0 hover:text-primary'

  if (partner.name === 'Cursor') {
    return (
      <a
        href={partner.url}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={partner.name}
        className={linkClassName}
      >
        <img
          src={CURSOR_PARTNER_IMG.light}
          alt=""
          aria-hidden
          className={cn(
            partnerRasterMarkClasses.base,
            partnerRasterMarkClasses.cursorLight,
          )}
        />
        <img
          src={CURSOR_PARTNER_IMG.dark}
          alt=""
          aria-hidden
          className={cn(
            partnerRasterMarkClasses.base,
            partnerRasterMarkClasses.cursorDark,
          )}
        />
      </a>
    )
  }

  if (partner.name === 'v0') {
    return (
      <a
        href={partner.url}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={partner.name}
        className={linkClassName}
      >
        <img
          src={V0_PARTNER_IMG.light}
          alt=""
          aria-hidden
          className={cn(
            partnerRasterMarkClasses.base,
            partnerRasterMarkClasses.v0Light,
          )}
        />
        <img
          src={V0_PARTNER_IMG.dark}
          alt=""
          aria-hidden
          className={cn(
            partnerRasterMarkClasses.base,
            partnerRasterMarkClasses.v0Dark,
          )}
        />
      </a>
    )
  }

  if (partner.name === 'Codex') {
    return (
      <a
        href={partner.url}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={partner.name}
        className={cn(linkClassName, 'ml-5 sm:ml-6 md:ml-8 lg:ml-10')}
      >
        <img
          src={CODEX_PARTNER_IMG.light}
          alt=""
          aria-hidden
          className={cn(
            partnerRasterMarkClasses.base,
            partnerRasterMarkClasses.codexLight,
          )}
        />
        <img
          src={CODEX_PARTNER_IMG.dark}
          alt=""
          aria-hidden
          className={cn(
            partnerRasterMarkClasses.base,
            partnerRasterMarkClasses.codexDark,
          )}
        />
      </a>
    )
  }

  const Icon = showSvgMarks ? PARTNER_ICONS[partner.name] : undefined

  return (
    <a
      href={partner.url}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={partner.name}
      className={linkClassName}
    >
      {Icon ? (
        <Icon
          aria-hidden
          className="size-10 opacity-80 transition-opacity group-hover:opacity-100 md:size-12"
        />
      ) : (
        <span className="text-lg font-semibold opacity-80 transition-opacity group-hover:opacity-100 md:text-xl">
          {partner.name}
        </span>
      )}
    </a>
  )
}
