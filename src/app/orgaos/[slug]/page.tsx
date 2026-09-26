import Link from "next/link";
import { notFound } from "next/navigation";
import { allTracks, contests, knowledgeName, orgFamilies } from "@/data/catalog";
import type { OrgFamily } from "@/lib/types";

export function generateStaticParams() {
  return orgFamilies.map((item) => ({ slug: item.slug }));
}

export default async function OrgFamilyPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const family = orgFamilies.find((item) => item.slug === slug);
  if (!family) notFound();

  const familyContests = contests.filter((contest) => contest.orgFamily === (family.slug as OrgFamily));
  const tracks = allTracks.filter((track) => track.contest.orgFamily === family.slug);
  const counts = new Map<string, number>();
  tracks.forEach((track) => track.knowledge.forEach((item) => counts.set(item, (counts.get(item) ?? 0) + 1)));
  const rankedKnowledge = [...counts.entries()].sort((a, b) => b[1] - a[1]);

  return (
    <>
      <section className="page-head">
        <div className="container">
          <div className="eyebrow">Família institucional</div>
          <h1>{family.name}</h1>
          <p>{family.description}</p>
          <div className="stats compact-stats">
            <div className="stat"><strong>{familyContests.length}</strong><span>certames na amostra</span></div>
            <div className="stat"><strong>{tracks.length}</strong><span>trilhas/perfis</span></div>
            <div className="stat"><strong>{new Set(familyContests.map((item) => item.institution)).size}</strong><span>instituições</span></div>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="section-heading">
            <div><div className="eyebrow">Padrões da amostra</div><h2>Conhecimentos conectados</h2></div>
            <p>As contagens são descritivas da base versionada, não uma estimativa de probabilidade de cobrança em futuros concursos.</p>
          </div>
          <div className="link-grid">
            {rankedKnowledge.map(([item, count]) => (
              <Link className="route-card" href={`/conhecimentos/${item}`} key={item}>
                <span className="number">{count} perfil{count === 1 ? "" : "is"}</span>
                <h3>{knowledgeName(item)}</h3>
                <span className="card-link">Ver taxonomia →</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="section-heading">
            <div><div className="eyebrow">Certames</div><h2>Fontes que sustentam esta família</h2></div>
            <Link className="button" href="/concursos">Ver toda a base</Link>
          </div>
          <div className="card-grid">
            {familyContests.map((contest) => (
              <article className="card" key={contest.id}>
                <span className="card-kicker">{contest.year} · {contest.organizer}</span>
                <h3>{contest.institution}</h3>
                <p>{contest.title}</p>
                <p className="muted">{contest.tracks.length} trilha{contest.tracks.length === 1 ? "" : "s"} · verificado em {contest.verifiedAt}</p>
                <a className="card-link" href={contest.sourceUrl} target="_blank" rel="noreferrer">Fonte oficial ↗</a>
              </article>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
