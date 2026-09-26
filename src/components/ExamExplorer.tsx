"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { areas, knowledgeName } from "@/data/catalog";
import { examOrgFamilyLabels, examOrganizers, exams } from "@/data/exams";
import { granularTopicName } from "@/data/granular";
import type { AreaSlug, OrgFamily } from "@/lib/types";

export function ExamExplorer() {
  const [area, setArea] = useState<AreaSlug | "todas">("todas");
  const [family, setFamily] = useState<OrgFamily | "todas">("todas");
  const [organizer, setOrganizer] = useState("todas");
  const [query, setQuery] = useState("");

  const visible = useMemo(() => {
    const normalized = query.trim().toLowerCase();
    return exams.filter((exam) => {
      const byArea = area === "todas" || exam.areas.includes(area);
      const byFamily = family === "todas" || exam.orgFamily === family;
      const byOrganizer = organizer === "todas" || exam.organizer === organizer;
      const haystack = `${exam.institution} ${exam.title} ${exam.cycle} ${exam.organizer}`.toLowerCase();
      return byArea && byFamily && byOrganizer && (!normalized || haystack.includes(normalized));
    });
  }, [area, family, organizer, query]);

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
          Família institucional
          <select value={family} onChange={(event) => setFamily(event.target.value as OrgFamily | "todas")}>
            <option value="todas">Todas as famílias</option>
            {Object.entries(examOrgFamilyLabels).map(([slug, label]) => <option key={slug} value={slug}>{label}</option>)}
          </select>
        </label>
        <label>
          Banca
          <select value={organizer} onChange={(event) => setOrganizer(event.target.value)}>
            <option value="todas">Todas as bancas</option>
            {examOrganizers.map((item) => <option key={item} value={item}>{item}</option>)}
          </select>
        </label>
        <label className="search-field">
          Buscar
          <input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="órgão, cargo, ciclo ou banca" />
        </label>
      </div>

      <div className="result-count"><strong>{visible.length}</strong> prova{visible.length === 1 ? "" : "s"} no recorte</div>

      <div className="map-grid">
        {visible.map((exam) => (
          <article className="track-card" key={exam.id}>
            <div className="track-topline"><span className="institution">{exam.institution}</span><span>{exam.cycle}</span></div>
            <h3>{exam.title}</h3>
            <p className="muted">{exam.organizer} · {examOrgFamilyLabels[exam.orgFamily]} · {exam.scope === "caderno-completo" ? "caderno completo" : "recorte de específicos"}</p>
            <div className="chips">
              {exam.knowledge.map((slug) => <span className="chip" key={slug}>{knowledgeName(slug)}</span>)}
            </div>
            <div className="granular-preview">
              <span className="coverage-badge">{exam.observedTopics.length} tópicos observados · cobertura {exam.coverage}</span>
              <p>{exam.observedTopics.slice(0, 6).map(granularTopicName).join(" · ")}{exam.observedTopics.length > 6 ? " · …" : ""}</p>
            </div>
            <p className="evidence-note">{exam.sourceNote}</p>
            <div className="track-actions">
              <Link href={`/provas/${exam.id}`}>Abrir evidência →</Link>
              {exam.officialUrl && <a href={exam.officialUrl} target="_blank" rel="noreferrer">Fonte oficial ↗</a>}
            </div>
          </article>
        ))}
        {visible.length === 0 && <div className="empty-state">Nenhuma prova atende aos filtros atuais.</div>}
      </div>
    </div>
  );
}
