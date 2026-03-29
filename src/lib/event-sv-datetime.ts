export const EVENT_TYPES = [
  "Meetup",
  "Workshop",
  "Social",
  "Conference",
  "Hackathon",
] as const;

export type EventType = (typeof EVENT_TYPES)[number];

/** El Salvador — always UTC-6 (no DST) for `svLocalToUtc`. */
export const SV_TZ = "America/El_Salvador";

/** `YYYY-MM-DDTHH:mm` in SV wall time, for datetime-local-style inputs. */
export function utcToSvLocal(ms: number): string {
  const parts = new Intl.DateTimeFormat("en-CA", {
    timeZone: SV_TZ,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  }).formatToParts(new Date(ms));
  const get = (type: string) =>
    parts.find((p) => p.type === type)?.value ?? "00";
  const hour = get("hour") === "24" ? "00" : get("hour");
  return `${get("year")}-${get("month")}-${get("day")}T${hour}:${get("minute")}`;
}

export function svLocalToUtc(svLocalDatetime: string): number {
  return new Date(svLocalDatetime + "-06:00").getTime();
}

export function splitSvLocalString(svLocal: string): {
  datePart: string;
  hour: number;
  minute: number;
} {
  const [datePart = "", timePart = "00:00"] = svLocal.split("T");
  const [hStr = "0", mStr = "0"] = timePart.split(":");
  const hour = Number.parseInt(hStr, 10);
  const minute = Number.parseInt(mStr, 10);
  return {
    datePart,
    hour: Number.isFinite(hour) ? hour : 0,
    minute: Number.isFinite(minute) ? minute : 0,
  };
}

export function joinSvLocalString(
  datePart: string,
  hour: number,
  minute: number
): string {
  const hh = String(hour).padStart(2, "0");
  const mm = String(minute).padStart(2, "0");
  return `${datePart}T${hh}:${mm}`;
}

/** Normalize partner list: trim segments, drop empties, join with ", ". */
export function normalizePartnerCsv(raw: string): string | undefined {
  const s = raw
    .split(",")
    .map((x) => x.trim())
    .filter(Boolean)
    .join(", ");
  return s || undefined;
}
