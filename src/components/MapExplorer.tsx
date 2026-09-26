"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { allTracks, areas, knowledge, knowledgeName } from "@/data/catalog";
import { coverageForTrack, granularTopicName, topicsForTrack } from "@/data/granular";
import type { AreaSlug, KnowledgeSlug } from "@/lib/types";

type Props = {
  initialArea?: AreaSlug | "todas";
  initialTopic?: KnowledgeSlug | "todos";
};

export function MapExplorer({ initialArea = "todas", initialTopic = "todos" }: Props) {
  const [area, setArea] = useState<AreaSlug | "todas">(initialArea);
  const [topic, setTopic] = useState<KnowledgeSlug | "todos">(initialTopic);
  const [query, setQuery] = useState("");

  const visible = useMemo(() => {
    const normalized = query.trim().toLowerCase();
    return allTracks.filter((item) => {
      const byArea = area === "todas" || item.areas.includes(area);
      const byTopic = topic === "todos" || item.knowledge.includes(topic);
      const haystack = `${item.contest.institution} ${item.name} ${item.locality ?? ""} ${item.contest.organizer}`.toLowerCase();
      const byQuery = !normalized || haystack.includes(normalized);
      return byArea && byTopic && byQuery;
    });
  }, [area, topic, query]);

  return (
    <div className="explorer">
      <div className="filter-bar">
        <label>
          Área
          <select value={area} onChange={(event) => setArea(event.target.value as AreaSlug | "todas")}>
            <option value="todas">Todas as áreas</option>
            {areas.map((item) => <option key={item.slug} value={item.slug}>{item.name}</option>)}
          </select>
        </label>
        <label>
          Conhecimento
          <select value={topic} onChange={(event) => setTopic(event.target.value as KnowledgeSlug | "todos")}>
            <option value="todos">Todos os conhecimentos</option>
            {knowledge.map((item) => <option key={item.slug} value={item.slug}>{item.name}</option>)}
          </select>
        </label>
        <label className="search-field">
          Buscar
          <input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="órgão, perfil, banca ou localidade" />
        </label>
      </div>

      <div className="result-count">
        <strong>{visible.length}</strong> trilha{visible.length === 1 ? "" : "s"} encontrada{visible.length === 1 ? "" : "s"}
      </div>

      <div className="map-grid">
        {visible.map((item) => {
          const extractedTopics = topicsForTrack(item);
          const isGranular = coverageForTrack(item) === "topicos";
          return (
            <article className="track-card" key={item.id}>
              <div className="track-topline">
                <span className="institution">{item.contest.institution}</span>
                <span>{item.contest.year}</span>
              </div>
              <h3>{item.name}</h3>
              <p className="muted">{item.locality ?? "Localidade conforme edital"} · nível {item.level}</p>
              <div className="chips">
                {item.knowledge.map((slug) => (
                  <Link className="chip" key={slug} href={`/conhecimentos/${slug}`}>{knowledgeName(slug)}</Link>
                ))}
              </div>
              {isGranular && extractedTopics.length > 0 && (
                <div className="granular-preview">
                  <span className="coverage-badge">{extractedTopics.length} tópicos decompostos</span>
                  <p>{extractedTopics.slice(0, 6).map(granularTopicName).join(" · ")}{extractedTopics.length > 6 ? " · …" : ""}</p>
                </div>
              )}
              <p className="evidence-note">{item.evidenceNote}</p>
              <div className="track-actions">
                <Link href={`/trilhas/${item.id}`}>Abrir trilha →</Link>
                <a href={item.contest.sourceUrl} target="_blank" rel="noreferrer">Fonte ↗</a>
              </div>
            </article>
          );
        })}
        {visible.length === 0 && (
          <div className="empty-state">
            Nenhuma trilha atende aos filtros atuais. Remova um filtro ou consulte a metodologia para entender a cobertura incremental da base.
          </div>
        )}
      </div>
    </div>
  );
}
