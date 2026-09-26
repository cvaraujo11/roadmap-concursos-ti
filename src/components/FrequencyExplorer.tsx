"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { areas, knowledge, knowledgeName, orgFamilies } from "@/data/catalog";
import {
  cohortForFrequency,
  cohortSummary,
  frequencyRows,
  observedCore,
  type FrequencyMode,
} from "@/lib/frequency";
import type { AreaSlug, KnowledgeSlug, OrgFamily } from "@/lib/types";

const thresholds = [50, 67, 75, 100] as const;

type Props = {
  initialMode?: FrequencyMode;
  initialArea?: AreaSlug | "todas";
  initialOrgFamily?: OrgFamily | "todas";
  initialKnowledge?: KnowledgeSlug | "todos";
};

export function FrequencyExplorer({
  initialMode = "granular",
  initialArea = "todas",
  initialOrgFamily = "todas",
  initialKnowledge = "todos",
}: Props) {
  const [mode, setMode] = useState<FrequencyMode>(initialMode);
  const [area, setArea] = useState<AreaSlug | "todas">(initialArea);
  const [orgFamily, setOrgFamily] = useState<OrgFamily | "todas">(initialOrgFamily);
  const [knowledgeFilter, setKnowledgeFilter] = useState<KnowledgeSlug | "todos">(initialKnowledge);
  const [threshold, setThreshold] = useState<number>(67);

  const filters = useMemo(
    () => ({ area, orgFamily, knowledge: knowledgeFilter }),
    [area, orgFamily, knowledgeFilter]
  );

  const cohort = useMemo(() => cohortForFrequency(mode, filters), [mode, filters]);
  const rows = useMemo(() => frequencyRows(mode, filters), [mode, filters]);
  const summary = useMemo(() => cohortSummary(cohort), [cohort]);
  const enoughForCore = summary.tracks >= 2;
  const core = useMemo(
    () => (enoughForCore ? observedCore(rows, threshold) : []),
    [rows, threshold, enoughForCore]
  );

  return (
    <div className="frequency-explorer">
      <div className="mode-switch" role="group" aria-label="Nível de análise">
        <button className={mode === "granular" ? "active" : ""} onClick={() => setMode("granular")}>Tópicos granulares</button>
        <button className={mode === "macro" ? "active" : ""} onClick={() => setMode("macro")}>Macroconhecimentos</button>
      </div>

      <div className="filter-bar frequency-filters">
        <label>
          Família de atuação
          <select value={area} onChange={(event) => setArea(event.target.value as AreaSlug | "todas")}>
            <option value="todas">Todas as áreas</option>
            {areas.map((item) => <option value={item.slug} key={item.slug}>{item.name}</option>)}
          </select>
        </label>
        <label>
          Família institucional
          <select value={orgFamily} onChange={(event) => setOrgFamily(event.target.value as OrgFamily | "todas")}>
            <option value="todas">Todas as famílias</option>
            {orgFamilies.map((item) => <option value={item.slug} key={item.slug}>{item.name}</option>)}
          </select>
        </label>
        <label>
          Macroconhecimento
          <select value={knowledgeFilter} onChange={(event) => setKnowledgeFilter(event.target.value as KnowledgeSlug | "todos")}>
            <option value="todos">Todos os conhecimentos</option>
            {knowledge.map((item) => <option value={item.slug} key={item.slug}>{item.name}</option>)}
          </select>
        </label>
        <label>
          Limiar do núcleo observado
          <select value={threshold} onChange={(event) => setThreshold(Number(event.target.value))} disabled={!enoughForCore}>
            {thresholds.map((item) => <option value={item} key={item}>{item}% ou mais</option>)}
          </select>
        </label>
      </div>

      <div className="stats compact-stats frequency-stats">
        <div className="stat"><strong>{summary.tracks}</strong><span>trilhas no denominador</span></div>
        <div className="stat"><strong>{summary.contests}</strong><span>certames representados</span></div>
        <div className="stat"><strong>{summary.institutions}</strong><span>instituições representadas</span></div>
        <div className="stat"><strong>{enoughForCore ? core.length : "—"}</strong><span>{enoughForCore ? `itens no núcleo ≥ ${threshold}%` : "núcleo exige ≥ 2 trilhas"}</span></div>
      </div>

      <div className="denominator-card">
        <div>
          <span className="card-kicker">Denominador explícito</span>
          <h3>{mode === "granular" ? "Somente trilhas já decompostas em tópicos" : "Todas as trilhas do recorte"}</h3>
        </div>
        <p>
          Cada percentual abaixo significa <strong>X de {summary.tracks} trilhas elegíveis</strong>. O filtro de macroconhecimento reduz apenas os itens exibidos; ele não altera o denominador. A unidade estatística é a trilha/cargo-perfil, não a instituição.
        </p>
      </div>

      {summary.tracks === 0 ? (
        <div className="empty-state">Nenhuma trilha atende a este recorte. Remova um filtro para formar um denominador válido.</div>
      ) : (
        <>
          <section className="frequency-core-section">
            <div className="section-heading">
              <div><div className="eyebrow">Núcleo observado</div><h2>{enoughForCore ? `Itens presentes em pelo menos ${threshold}% do recorte` : "Recorte pequeno demais para formar um núcleo"}</h2></div>
              <p>Isto descreve a amostra catalogada. Não é uma recomendação de prioridade, nem uma estimativa da incidência nacional.</p>
            </div>
            {enoughForCore ? (
              <div className="frequency-core-grid">
                {core.slice(0, 12).map((row) => (
                  <article className="frequency-core-card" key={row.slug}>
                    <div className="frequency-score">{row.percentage}%</div>
                    <span className="card-kicker">{knowledgeName(row.knowledge)}</span>
                    <h3>{row.name}</h3>
                    <p>{row.count}/{row.denominator} trilhas · {row.institutions.length} instituição{row.institutions.length === 1 ? "" : "ões"}</p>
                  </article>
                ))}
                {core.length === 0 && <div className="empty-state">Nenhum item alcança o limiar atual neste recorte.</div>}
              </div>
            ) : (
              <div className="empty-state">Com uma única trilha, qualquer item presente teria frequência de 100%. A M3 não chama isso de “núcleo observado”; amplie o recorte para pelo menos duas trilhas.</div>
            )}
          </section>

          <section className="frequency-table-section">
            <div className="section-heading">
              <div><div className="eyebrow">Distribuição completa</div><h2>Frequência na amostra selecionada</h2></div>
              <p>{rows.length} item{rows.length === 1 ? "" : "s"} observados, ordenados pela proporção de trilhas em que aparecem.</p>
            </div>
            <div className="table-wrap">
              <table className="frequency-table">
                <thead>
                  <tr><th>Item</th><th>Macroconhecimento</th><th>Ocorrência</th><th>Frequência</th><th>Instituições</th></tr>
                </thead>
                <tbody>
                  {rows.map((row) => (
                    <tr key={row.slug}>
                      <td><strong>{row.name}</strong></td>
                      <td>{knowledgeName(row.knowledge)}</td>
                      <td>{row.count}/{row.denominator} trilhas</td>
                      <td>
                        <div className="frequency-meter" aria-label={`${row.percentage}%`}>
                          <span style={{ width: `${row.percentage}%` }} />
                        </div>
                        <strong>{row.percentage}%</strong>
                      </td>
                      <td>{row.institutions.join(", ")}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          <section className="cohort-section">
            <div className="section-heading">
              <div><div className="eyebrow">Manifesto do denominador</div><h2>Quais trilhas entram nesta conta?</h2></div>
              <p>O denominador fica auditável: qualquer percentual pode ser reconstruído a partir desta lista.</p>
            </div>
            <div className="cohort-list">
              {cohort.map((track) => (
                <Link href={`/trilhas/${track.id}`} className="cohort-row" key={track.id}>
                  <span><strong>{track.contest.institution}</strong> · {track.contest.year}</span>
                  <span>{track.name}</span>
                  <span className="card-link">Abrir trilha →</span>
                </Link>
              ))}
            </div>
          </section>
        </>
      )}

      <div className="notice">
        Limite metodológico: frequência de presença não mede peso na prova, número de questões, profundidade, dificuldade ou importância relativa. Além disso, certames com vários perfis podem contribuir com mais de uma trilha no modo macro. A M3 torna esse denominador visível em vez de esconder essa escolha metodológica.
      </div>
    </div>
  );
}
