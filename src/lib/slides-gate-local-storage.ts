export const SLIDES_GATE_LOCAL_STORAGE_KEY = "ailabs-slides-gate-unlocked";

export function setSlidesGateUnlocked(): void {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(SLIDES_GATE_LOCAL_STORAGE_KEY, "1");
  } catch {
    // ignore quota / private mode
  }
}

export function readSlidesGateUnlocked(): boolean {
  if (typeof window === "undefined") return false;
  try {
    return localStorage.getItem(SLIDES_GATE_LOCAL_STORAGE_KEY) === "1";
  } catch {
    return false;
  }
}
