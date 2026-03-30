/** Max length per language for `events.description` (es / en). */
export const MAX_EVENT_DESCRIPTION_LENGTH = 255;

export function assertLocalizedDescriptionWithinLimit(
  d: { es: string; en: string },
  fieldLabel = "description",
): void {
  if (d.es.length > MAX_EVENT_DESCRIPTION_LENGTH) {
    throw new Error(
      `${fieldLabel}.es must be at most ${MAX_EVENT_DESCRIPTION_LENGTH} characters (got ${d.es.length})`,
    );
  }
  if (d.en.length > MAX_EVENT_DESCRIPTION_LENGTH) {
    throw new Error(
      `${fieldLabel}.en must be at most ${MAX_EVENT_DESCRIPTION_LENGTH} characters (got ${d.en.length})`,
    );
  }
}
