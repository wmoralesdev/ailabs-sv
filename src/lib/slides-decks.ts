import type { ComponentType } from "react";
import { brandDeckSlides } from "@/content/slides-brand-deck";
import { brandStudentsDeckSlides } from "@/content/slides-brand-students-deck";
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
  "brand-students": {
    id: "brand-students",
    label: "Brand students",
    slides: brandStudentsDeckSlides,
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

export type SlideDeckListItem = {
  id: string;
  label: string;
  slideCount: number;
};

export function listSlideDecks(): ReadonlyArray<SlideDeckListItem> {
  return Object.values(DECKS).map((d) => ({
    id: d.id,
    label: d.label,
    slideCount: d.slides.length,
  }));
}
