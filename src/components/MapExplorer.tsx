"use client";

import { useMemo, useState } from "react";
import { allTracks, areas, knowledge, knowledgeName } from "@/data/catalog";
import type { AreaSlug, KnowledgeSlug } from "@/lib/types";

export function MapExplorer() {
  const [area, setArea] = useState<AreaSlug | "todas">("todas");
  const [topic, setTopic] = useState<KnowledgeSlug | "todos">("todos");
  const [query, setQuery] = useState("");

  const visible = useMemo(() => {
    const normalized = query.trim().toLowerCase();
    return allTracks.filter((item) => {
      const byArea = area === "todas" || item.areas.includes(area);
      const byTopic = topic === "todos" || item.knowledge.includes(topic);
      const haystack = `${item.contest.institution} ${item.name} ${item.locality ?? ""}`.toLowerCase();
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
          <input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="órgão, perfil ou localidade" />
        </label>
      </div>

      <div className="result-count">
        <strong>{visible.length}</strong> trilha{visible.length === 1 ? "" : "s"} encontrada{visible.length === 1 ? "" : "s"}
      </div>

      <div className="map-grid">
        {visible.map((item) => (
          <article className="track-card" key={item.id}>
            <div className="track-topline">
              <span className="institution">{item.contest.institution}</span>
              <span>{item.contest.year}</span>
            </div>
            <h3>{item.name}</h3>
            <p className="muted">{item.locality ?? "Localidade conforme edital"} · nível {item.level}</p>
            <div className="chips">
              {item.knowledge.map((slug) => <span className="chip" key={slug}>{knowledgeName(slug)}</span>)}
            </div>
            <p className="evidence-note">{item.evidenceNote}</p>
            <a href={item.contest.sourceUrl} target="_blank" rel="noreferrer">Abrir fonte oficial ↗</a>
          </article>
        ))}
        {visible.length === 0 && (
          <div className="empty-state">
            Nenhuma trilha desta amostra atende aos filtros. A base é incremental: experimente remover um filtro ou contribuir com um edital.
          </div>
        )}
      </div>
    </div>
  );
}
