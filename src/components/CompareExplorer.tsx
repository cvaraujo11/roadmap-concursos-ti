"use client";

import { useMemo, useState } from "react";
import { allTracks, knowledgeName, topicName } from "@/data/catalog";

function overlap(a: string[], b: string[]) {
  const setA = new Set(a);
  const setB = new Set(b);
  const intersection = [...setA].filter((item) => setB.has(item));
  const union = new Set([...a, ...b]);
  return {
    value: union.size === 0 ? 0 : Math.round((intersection.length / union.size) * 100),
    intersection,
    onlyA: a.filter((item) => !setB.has(item)),
    onlyB: b.filter((item) => !setA.has(item)),
  };
}

const label = (id: string) => {
  const item = allTracks.find((track) => track.id === id);
  return item ? `${item.contest.institution} · ${item.name}` : id;
};

export function CompareExplorer() {
  const [leftId, setLeftId] = useState("dataprev-2026-gestao-servicos");
  const [rightId, setRightId] = useState("transpetro-infra");

  const left = allTracks.find((item) => item.id === leftId) ?? allTracks[0];
  const right = allTracks.find((item) => item.id === rightId) ?? allTracks[1];

  const macro = useMemo(() => overlap(left.knowledge, right.knowledge), [left, right]);
  const hasGranular = Boolean(left.topics?.length && right.topics?.length);
  const granular = useMemo(() => overlap(left.topics ?? [], right.topics ?? []), [left, right]);

  return (
    <div className="compare-explorer">
      <div className="compare-controls">
        <label>
          Trilha A
          <select value={leftId} onChange={(event) => setLeftId(event.target.value)}>
            {allTracks.map((item) => <option key={item.id} value={item.id}>{label(item.id)}</option>)}
          </select>
        </label>
        <label>
          Trilha B
          <select value={rightId} onChange={(event) => setRightId(event.target.value)}>
            {allTracks.map((item) => <option key={item.id} value={item.id}>{label(item.id)}</option>)}
          </select>
        </label>
      </div>

      <div className="metric-grid">
        <div className="metric">
          <span>Sobreposição macro</span>
          <strong>{macro.value}%</strong>
          <p>Jaccard entre macroconhecimentos curatoriais.</p>
        </div>
        <div className="metric">
          <span>Sobreposição granular</span>
          <strong>{hasGranular ? `${granular.value}%` : "—"}</strong>
          <p>{hasGranular ? "Jaccard entre tópicos já decompostos dos dois editais." : "Disponível quando as duas trilhas tiverem cobertura por tópicos."}</p>
        </div>
      </div>

      <section className="compare-block">
        <div className="eyebrow">Em comum</div>
        <h2>Macroconhecimentos compartilhados</h2>
        <div className="chips">
          {macro.intersection.map((slug) => <span className="chip" key={slug}>{knowledgeName(slug)}</span>)}
          {macro.intersection.length === 0 && <span className="muted">Nenhum macroconhecimento em comum na classificação atual.</span>}
        </div>
      </section>

      {hasGranular && (
        <section className="compare-block">
          <div className="eyebrow">Nível fino</div>
          <h2>Tópicos compartilhados</h2>
          <div className="chips">
            {granular.intersection.map((slug) => <span className="chip" key={slug}>{topicName(slug)}</span>)}
            {granular.intersection.length === 0 && <span className="muted">Nenhum tópico em comum na taxonomia atual.</span>}
          </div>
        </section>
      )}

      <div className="compare-columns">
        <article className="method-card">
          <span className="card-kicker">Só em A</span>
          <h3>{left.contest.institution}</h3>
          <div className="chips">{macro.onlyA.map((slug) => <span className="chip" key={slug}>{knowledgeName(slug)}</span>)}</div>
        </article>
        <article className="method-card">
          <span className="card-kicker">Só em B</span>
          <h3>{right.contest.institution}</h3>
          <div className="chips">{macro.onlyB.map((slug) => <span className="chip" key={slug}>{knowledgeName(slug)}</span>)}</div>
        </article>
      </div>

      <div className="notice">
        Percentuais não representam dificuldade, peso na prova ou probabilidade de aprovação. Eles medem apenas interseção da taxonomia já catalogada e ficam mais informativos conforme a cobertura granular cresce.
      </div>
    </div>
  );
}
