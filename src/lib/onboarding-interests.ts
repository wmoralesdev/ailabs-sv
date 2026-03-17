import { content } from "@/content/site-content";

type Option = { id: string; label: string };

function buildLabelToIdMap(opts: Option[]): Map<string, string> {
  const m = new Map<string, string>();
  for (const o of opts) {
    m.set(o.id, o.id);
    m.set(o.label, o.id);
  }
  return m;
}

function normalizeToIds(stored: string[] | undefined, optsEs: Option[], optsEn: Option[]): string[] {
  if (!stored?.length) return [];
  const map = new Map([...buildLabelToIdMap(optsEs), ...buildLabelToIdMap(optsEn)]);
  const seen = new Set<string>();
  return stored
    .map((v) => map.get(v) ?? v)
    .filter((id) => {
      if (seen.has(id)) return false;
      seen.add(id);
      return true;
    });
}

/** Map stored IDs (or legacy labels) to localized labels for display. */
export function idsToLabels(items: string[], opts: Option[]): string[] {
  const byId = new Map(opts.map((o) => [o.id, o.label]));
  return items.map((v) => byId.get(v) ?? v);
}

export function normalizeInterestsFromProfile(profile: {
  interests?: string[];
  tools?: string[];
  lookingFor?: string[];
  availability?: string[];
}): {
  interests: string[];
  tools: string[];
  lookingFor: string[];
  availability: string[];
} {
  const es = content.es.onboarding.interests;
  const en = content.en.onboarding.interests;
  return {
    interests: normalizeToIds(profile.interests, es.interests, en.interests),
    tools: normalizeToIds(profile.tools, es.tools, en.tools),
    lookingFor: normalizeToIds(profile.lookingFor, es.lookingFor, en.lookingFor),
    availability: normalizeToIds(profile.availability, es.availability, en.availability),
  };
}
