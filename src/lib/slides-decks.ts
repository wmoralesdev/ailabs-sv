import type { ComponentType } from "react";
import { brandDeckSlides } from "@/content/slides-brand-deck";

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
};

export function getSlideDeck(deckId: string): SlideDeckDefinition | null {
  return Object.hasOwn(DECKS, deckId) ? DECKS[deckId] : null;
}
