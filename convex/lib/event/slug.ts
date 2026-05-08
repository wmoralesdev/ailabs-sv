export const MONTH_YEAR_RE =
  /^(jan|feb|mar|apr|may|jun|jul|aug|sep|oct|nov|dec|ene|abr|ago|dic)-(20\d{2})$/

export function isMonthArchiveSlug(slug: string): boolean {
  return MONTH_YEAR_RE.test(slug.trim().toLowerCase())
}

export function assertNotMonthArchiveSlug(slug: string): void {
  if (isMonthArchiveSlug(slug)) {
    throw new Error('Event slug cannot use reserved month archive format')
  }
}
