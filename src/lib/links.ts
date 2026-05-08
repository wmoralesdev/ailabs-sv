/**
 * Single source of truth for outbound URLs and contact endpoints used across
 * ailabs-web. CTAs in routes and components import from here so swapping a URL
 * (e.g. the Cal.com booking link) is a one-line change.
 *
 * See docs/brand-spine.md, "External links policy".
 */

export const WHATSAPP_LINK =
  'https://chat.whatsapp.com/Ga8mG1fqDM9C0ryxAw1eIj' as const

/**
 * Cal.com booking link for B2B and partner conversations.
 *
 * NOTE: placeholder URL. Founders will generate the real link; this is the
 * one place that needs to be updated. Tracked in the Phase 3 cleanup todo.
 */
export const BOOKING_LINK = 'https://cal.com/ailabs-sv/30min' as const

export const CONTACT_EMAIL = 'hello@ailabs.sv' as const

export const SOCIAL_LINKS = {
  linkedin: 'https://www.linkedin.com/company/ai-labs-sv',
  instagram: 'https://www.instagram.com/ailabs_sv/',
  tiktok: 'https://www.tiktok.com/@ailabs_sv',
  twitter: 'https://x.com/ailabs_sv',
} as const

/**
 * Build a mailto link with a subject line. Reserved for contexts that genuinely
 * need a human reply (terms questions, errata). Primary CTAs use
 * BOOKING_LINK or WHATSAPP_LINK instead, per the brand-spine commitment to
 * concrete next steps over abstract "contáctanos" mailtos.
 */
export function mailtoWithSubject(subject: string): string {
  return `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(subject)}`
}

/**
 * Build a Cal.com booking link with a metadata subject. Used so the booking
 * page can prefill notes about why the visitor reached out.
 */
export function bookingWithIntent(intent: string): string {
  const url = new URL(BOOKING_LINK)
  url.searchParams.set('notes', intent)
  return url.toString()
}
