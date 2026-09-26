import Link from "next/link";
import { notFound } from "next/navigation";
import { allTracks, areas, knowledgeName } from "@/data/catalog";
import { coverageForTrack, topicsForTrack } from "@/data/granular";
import type { AreaSlug } from "@/lib/types";

export function generateStaticParams() {
  return areas.map((area) => ({ slug: area.slug }));
}

export default async function AreaPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const area = areas.find((item) => item.slug === slug);
  if (!area) notFound();

  const tracks = allTracks.filter((item) => item.areas.includes(area.slug as AreaSlug));
  const counts = new Map<string, number>();
  tracks.forEach((track) => track.knowledge.forEach((item) => counts.set(item, (counts.get(item) ?? 0) + 1)));
  const rankedKnowledge = [...counts.entries()].sort((a, b) => b[1] - a[1]);

  return (
    <>
      <section className="page-head">
        <div className="container">
          <div className="eyebrow">Família de atuação</div>
          <h1>{area.name}</h1>
          <p>{area.description}</p>
          <div className="stats compact-stats">
            <div className="stat"><strong>{tracks.length}</strong><span>trilhas mapeadas</span></div>
            <div className="stat"><strong>{new Set(tracks.map((item) => item.contest.institution)).size}</strong><span>instituições</span></div>
            <div className="stat"><strong>{rankedKnowledge.length}</strong><span>macroconhecimentos conectados</span></div>
          </div>
          <div className="actions" style={{ marginTop: 20 }}>
            <Link className="button primary" href={`/frequencia?area=${area.slug}`}>Calcular frequência nesta área</Link>
            <Link className="button" href={`/mapa?area=${area.slug}`}>Abrir no mapa</Link>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="section-heading">
            <div><div className="eyebrow">Núcleo observado</div><h2>Conhecimentos que aparecem nesta família</h2></div>
            <p>As contagens refletem apenas a base já catalogada e não devem ser lidas como incidência nacional definitiva. A página de frequência transforma essas contagens em proporções com denominador explícito.</p>
          </div>
          <div className="link-grid">
            {rankedKnowledge.map(([item, count]) => (
              <Link className="route-card" href={`/conhecimentos/${item}`} key={item}>
                <span className="number">{count} trilha{count === 1 ? "" : "s"}</span>
                <h3>{knowledgeName(item)}</h3>
                <span className="card-link">Abrir conhecimento →</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="section-heading">
            <div><div className="eyebrow">Evidência</div><h2>Perfis ligados à área</h2></div>
            <Link className="button" href={`/mapa?area=${area.slug}`}>Abrir no mapa filtrável</Link>
          </div>
          <div className="map-grid">
            {tracks.map((track) => {
              const topicCount = topicsForTrack(track).length;
              const granular = coverageForTrack(track) === "topicos";
              return (
                <article className="track-card" key={track.id}>
                  <div className="track-topline"><span>{track.contest.institution}</span><span>{track.contest.year}</span></div>
                  <h3>{track.name}</h3>
                  <p className="muted">{track.locality} · {granular ? `${topicCount} tópicos decompostos` : "cobertura macro"}</p>
                  <div className="chips">{track.knowledge.map((item) => <span className="chip" key={item}>{knowledgeName(item)}</span>)}</div>
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
