import { content } from "@/content/site-content";

type Option = { id: string; label: string };

function buildLabelToIdMap(opts: Array<Option>): Map<string, string> {
  const m = new Map<string, string>();
  for (const o of opts) {
    m.set(o.id, o.id);
    m.set(o.label, o.id);
  }
  return m;
}

function normalizeToIds(stored: Array<string> | undefined, optsEs: Array<Option>, optsEn: Array<Option>): Array<string> {
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
export function idsToLabels(items: Array<string>, opts: Array<Option>): Array<string> {
  const byId = new Map(opts.map((o) => [o.id, o.label]));
  return items.map((v) => byId.get(v) ?? v);
}

export function normalizeInterestsFromProfile(profile: {
  interests?: Array<string>;
  tools?: Array<string>;
  lookingFor?: Array<string>;
  availability?: Array<string>;
}): {
  interests: Array<string>;
  tools: Array<string>;
  lookingFor: Array<string>;
  availability: Array<string>;
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
