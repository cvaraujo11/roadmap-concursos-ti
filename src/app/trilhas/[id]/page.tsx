import Link from "next/link";
import { notFound } from "next/navigation";
import { allTracks, areaName, knowledgeName } from "@/data/catalog";
import { coverageForTrack, extractionForTrack, topicsByKnowledge, topicsForTrack } from "@/data/granular";

export function generateStaticParams() {
  return allTracks.map((track) => ({ id: track.id }));
}

export default async function TrackPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const track = allTracks.find((item) => item.id === id);
  if (!track) notFound();

  const topicSlugs = topicsForTrack(track);
  const grouped = topicsByKnowledge(topicSlugs);
  const extraction = extractionForTrack(track.id);
  const isGranular = coverageForTrack(track) === "topicos";

  return (
    <>
      <section className="page-head">
        <div className="container">
          <div className="eyebrow">{track.contest.institution} · {track.contest.year}</div>
          <h1>{track.name}</h1>
          <p>{track.evidenceNote}</p>
          <div className="chips">
            {track.areas.map((slug) => <Link className="chip" key={slug} href={`/areas/${slug}`}>{areaName(slug)}</Link>)}
          </div>
          <div className="stats compact-stats">
            <div className="stat"><strong>{track.knowledge.length}</strong><span>macroconhecimentos</span></div>
            <div className="stat"><strong>{topicSlugs.length}</strong><span>tópicos decompostos</span></div>
            <div className="stat"><strong>{isGranular ? "fina" : "macro"}</strong><span>cobertura atual</span></div>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="section-heading">
            <div><div className="eyebrow">Cartografia da trilha</div><h2>Do macrotema ao tópico</h2></div>
            <p>{isGranular ? "Os tópicos abaixo foram normalizados a partir do conteúdo programático para permitir comparação entre editais." : "Esta trilha ainda possui apenas classificação macro. A decomposição fina será adicionada quando o conteúdo programático for curado."}</p>
          </div>

          {isGranular ? (
            <div className="knowledge-tree">
              {[...grouped.entries()].map(([knowledgeSlug, topicItems]) => (
                <article className="knowledge-branch" key={knowledgeSlug}>
                  <div className="branch-head">
                    <Link href={`/conhecimentos/${knowledgeSlug}`}><h3>{knowledgeName(knowledgeSlug)}</h3></Link>
                    <span>{topicItems.length} tópico{topicItems.length === 1 ? "" : "s"}</span>
                  </div>
                  <div className="chips">
                    {topicItems.map((topic) => <span className="chip" key={topic.slug}>{topic.name}</span>)}
                  </div>
                </article>
              ))}
            </div>
          ) : (
            <div className="link-grid">
              {track.knowledge.map((slug) => (
                <Link className="route-card" href={`/conhecimentos/${slug}`} key={slug}>
                  <span className="number">Macroconhecimento</span>
                  <h3>{knowledgeName(slug)}</h3>
                  <span className="card-link">Abrir taxonomia →</span>
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="method-grid">
            <article className="method-card">
              <div className="eyebrow">Fonte</div>
              <h3>{extraction?.sourceLabel ?? track.contest.sourceLabel}</h3>
              <p>{extraction?.sourceLocation ?? "Fonte geral do certame; consulte o documento oficial para o conteúdo integral."}</p>
              <a className="card-link" href={extraction?.sourceUrl ?? track.contest.sourceUrl} target="_blank" rel="noreferrer">Abrir fonte oficial ↗</a>
            </article>
            <article className="method-card">
              <div className="eyebrow">Proveniência</div>
              <h3>O que significa esta decomposição?</h3>
              <p>{extraction?.note ?? "Os macroconhecimentos são uma classificação curatorial do projeto e não reproduzem necessariamente os títulos usados no edital."}</p>
              <p className="muted">Verificado em {extraction?.verifiedAt ?? track.contest.verifiedAt}.</p>
            </article>
          </div>
          <div className="actions" style={{ marginTop: 22 }}>
            <Link className="button primary" href="/comparar">Comparar com outra trilha</Link>
            <Link className="button" href="/mapa">Voltar ao mapa</Link>
          </div>
        </div>
      </section>
    </>
  );
}
