import { allTracks, knowledgeName } from "@/data/catalog";
import { coverageForTrack, granularTopicName, topicDefinition, topicsForTrack } from "@/data/granular";
import type { AreaSlug, KnowledgeSlug, OrgFamily } from "@/lib/types";

export type FrequencyMode = "macro" | "granular";

export interface FrequencyFilters {
  area: AreaSlug | "todas";
  orgFamily: OrgFamily | "todas";
  knowledge: KnowledgeSlug | "todos";
}

export interface FrequencyRow {
  slug: string;
  name: string;
  knowledge: KnowledgeSlug;
  count: number;
  denominator: number;
  percentage: number;
  trackIds: string[];
  contestIds: string[];
  institutions: string[];
}

export type CartographyTrack = (typeof allTracks)[number];

export function cohortForFrequency(mode: FrequencyMode, filters: FrequencyFilters): CartographyTrack[] {
  return allTracks.filter((track) => {
    if (filters.area !== "todas" && !track.areas.includes(filters.area)) return false;
    if (filters.orgFamily !== "todas" && track.contest.orgFamily !== filters.orgFamily) return false;
    if (mode === "granular" && coverageForTrack(track) !== "topicos") return false;
    return true;
  });
}

function percentage(count: number, denominator: number) {
  if (denominator === 0) return 0;
  return Math.round((count / denominator) * 100);
}

function collectMetadata(trackIds: string[]) {
  const selected = allTracks.filter((track) => trackIds.includes(track.id));
  return {
    contestIds: [...new Set(selected.map((track) => track.contest.id))],
    institutions: [...new Set(selected.map((track) => track.contest.institution))].sort(),
  };
}

export function macroFrequency(filters: FrequencyFilters): FrequencyRow[] {
  const cohort = cohortForFrequency("macro", filters);
  const occurrences = new Map<KnowledgeSlug, Set<string>>();

  cohort.forEach((track) => {
    new Set(track.knowledge).forEach((slug) => {
      const current = occurrences.get(slug) ?? new Set<string>();
      current.add(track.id);
      occurrences.set(slug, current);
    });
  });

  return [...occurrences.entries()]
    .filter(([slug]) => filters.knowledge === "todos" || slug === filters.knowledge)
    .map(([slug, ids]) => {
      const trackIds = [...ids];
      const metadata = collectMetadata(trackIds);
      return {
        slug,
        name: knowledgeName(slug),
        knowledge: slug,
        count: trackIds.length,
        denominator: cohort.length,
        percentage: percentage(trackIds.length, cohort.length),
        trackIds,
        ...metadata,
      };
    })
    .sort((a, b) => b.percentage - a.percentage || b.count - a.count || a.name.localeCompare(b.name, "pt-BR"));
}

export function granularFrequency(filters: FrequencyFilters): FrequencyRow[] {
  const cohort = cohortForFrequency("granular", filters);
  const occurrences = new Map<string, Set<string>>();

  cohort.forEach((track) => {
    new Set(topicsForTrack(track)).forEach((slug) => {
      const definition = topicDefinition(slug);
      if (!definition) return;
      if (filters.knowledge !== "todos" && definition.knowledge !== filters.knowledge) return;
      const current = occurrences.get(slug) ?? new Set<string>();
      current.add(track.id);
      occurrences.set(slug, current);
    });
  });

  return [...occurrences.entries()]
    .map(([slug, ids]) => {
      const trackIds = [...ids];
      const definition = topicDefinition(slug);
      const metadata = collectMetadata(trackIds);
      return {
        slug,
        name: granularTopicName(slug),
        knowledge: definition?.knowledge ?? "infraestrutura",
        count: trackIds.length,
        denominator: cohort.length,
        percentage: percentage(trackIds.length, cohort.length),
        trackIds,
        ...metadata,
      } as FrequencyRow;
    })
    .sort((a, b) => b.percentage - a.percentage || b.count - a.count || a.name.localeCompare(b.name, "pt-BR"));
}

export function frequencyRows(mode: FrequencyMode, filters: FrequencyFilters) {
  return mode === "macro" ? macroFrequency(filters) : granularFrequency(filters);
}

export function observedCore(rows: FrequencyRow[], minimumPercentage: number) {
  return rows.filter((row) => row.percentage >= minimumPercentage);
}

export function cohortSummary(cohort: CartographyTrack[]) {
  return {
    tracks: cohort.length,
    contests: new Set(cohort.map((track) => track.contest.id)).size,
    institutions: new Set(cohort.map((track) => track.contest.institution)).size,
  };
}
