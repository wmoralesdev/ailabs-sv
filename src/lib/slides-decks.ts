import type { ComponentType } from "react";
import { brandDeckSlides } from "@/content/slides-brand-deck";
import { ufgEventsDeckSlides } from "@/content/slides-ufg-events-deck";

export type SlideDeckDefinition = {
  id: string;
  label: string;
  slides: ReadonlyArray<ComponentType>;
};

const DECKS: Record<string, SlideDeckDefinition> = {
  brand: {
    id: "brand",
    label: "Brand",
    slides: brandDeckSlides,
  },
  "ufg-events": {
    id: "ufg-events",
    label: "UFG",
    slides: ufgEventsDeckSlides,
  },
};

export function getSlideDeck(deckId: string): SlideDeckDefinition | null {
  return Object.hasOwn(DECKS, deckId) ? DECKS[deckId] : null;
}
