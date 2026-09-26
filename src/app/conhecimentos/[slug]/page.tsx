import Link from "next/link";
import { notFound } from "next/navigation";
import { allTracks, knowledge } from "@/data/catalog";
import { coverageForTrack, topicCatalog, topicsForTrack } from "@/data/granular";
import type { KnowledgeSlug } from "@/lib/types";

export function generateStaticParams() {
  return knowledge.map((item) => ({ slug: item.slug }));
}

export default async function KnowledgePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const item = knowledge.find((entry) => entry.slug === slug);
  if (!item) notFound();

  const tracks = allTracks.filter((track) => track.knowledge.includes(item.slug as KnowledgeSlug));
  const taxonomy = topicCatalog.filter((topic) => topic.knowledge === item.slug);
  const granularTracks = tracks.filter((track) => coverageForTrack(track) === "topicos");

  return (
    <>
      <section className="page-head">
        <div className="container">
          <div className="eyebrow">Macroconhecimento</div>
          <h1>{item.name}</h1>
          <p>{item.description}</p>
          <div className="stats compact-stats">
            <div className="stat"><strong>{tracks.length}</strong><span>trilhas relacionadas</span></div>
            <div className="stat"><strong>{taxonomy.length}</strong><span>tópicos na taxonomia</span></div>
            <div className="stat"><strong>{granularTracks.length}</strong><span>trilhas já decompostas</span></div>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="section-heading">
            <div><div className="eyebrow">Árvore de conhecimento</div><h2>Tópicos abaixo deste macrotema</h2></div>
            <p>A taxonomia cresce quando novos editais são decompostos. A contagem abaixo usa apenas trilhas que já possuem extração granular.</p>
          </div>
          <div className="topic-grid">
            {taxonomy.map((topic) => {
              const count = tracks.filter((track) => topicsForTrack(track).includes(topic.slug)).length;
              return (
                <article className="topic-card" key={topic.slug}>
                  <span className="topic-count">{count} ocorrência{count === 1 ? "" : "s"} granular{count === 1 ? "" : "es"}</span>
                  <h3>{topic.name}</h3>
                  {topic.description && <p>{topic.description}</p>}
                </article>
              );
            })}
          </div>
          {taxonomy.length === 0 && <div className="empty-state">A taxonomia fina deste conhecimento ainda não foi aberta.</div>}
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="section-heading">
            <div><div className="eyebrow">Onde aparece</div><h2>Trilhas ligadas a {item.name}</h2></div>
            <Link className="button" href={`/mapa?conhecimento=${item.slug}`}>Abrir no mapa filtrável</Link>
          </div>
          <div className="map-grid">
            {tracks.map((track) => {
              const trackTopics = topicsForTrack(track);
              return (
                <article className="track-card" key={track.id}>
                  <div className="track-topline"><span>{track.contest.institution}</span><span>{track.contest.year}</span></div>
                  <h3>{track.name}</h3>
                  <p className="muted">{track.locality} · {coverageForTrack(track) === "topicos" ? "cobertura granular" : "cobertura macro"}</p>
                  {trackTopics.length > 0 && (
                    <div className="chips">
                      {taxonomy.filter((topic) => trackTopics.includes(topic.slug)).map((topic) => <span className="chip" key={topic.slug}>{topic.name}</span>)}
                    </div>
                  )}
                  <div className="track-actions">
                    <Link href={`/trilhas/${track.id}`}>Abrir trilha →</Link>
                    <a href={track.contest.sourceUrl} target="_blank" rel="noreferrer">Fonte ↗</a>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </section>
    </>
  );
}
