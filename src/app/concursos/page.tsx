import Link from "next/link";
import { contests, orgFamilyName } from "@/data/catalog";

const statusLabel = {
  "em-andamento": "Em andamento",
  realizado: "Realizado",
  homologado: "Homologado",
  historico: "Histórico",
} as const;

export default function ConcursosPage() {
  return (
    <>
      <section className="page-head">
        <div className="container">
          <div className="eyebrow">Base de evidências</div>
          <h1>Editais reais, não listas soltas de matérias.</h1>
          <p>A M1 amplia a amostra para todas as famílias institucionais da primeira ontologia. Cada certame mantém fonte, data de verificação e nível de granularidade já catalogado.</p>
        </div>
      </section>
      <section className="section">
        <div className="container">
          <div className="table-wrap">
            <table>
              <thead>
                <tr><th>Instituição</th><th>Certame</th><th>Banca</th><th>Perfis</th><th>Cobertura</th><th>Fonte</th><th>Verificado</th></tr>
              </thead>
              <tbody>
                {contests.map((contest) => {
                  const granular = contest.tracks.filter((track) => track.coverage === "topicos").length;
                  return (
                    <tr key={contest.id}>
                      <td>
                        <strong>{contest.institution}</strong><br/>
                        <Link className="muted" href={`/orgaos/${contest.orgFamily}`}>{orgFamilyName(contest.orgFamily)}</Link>
                      </td>
                      <td>{contest.title}<br/><span className="muted">{contest.year} · {contest.status ? statusLabel[contest.status] : "situação não catalogada"}</span></td>
                      <td>{contest.organizer}</td>
                      <td>{contest.tracks.length}</td>
                      <td>{granular > 0 ? `${granular} granular / ${contest.tracks.length}` : "macro"}</td>
                      <td><a href={contest.sourceUrl} target="_blank" rel="noreferrer">{contest.sourceLabel} ↗</a></td>
                      <td>{contest.verifiedAt}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
          <p className="muted" style={{ marginTop: 18 }}>
            A ausência de uma instituição não significa ausência de concursos de TI: significa apenas que ela ainda não entrou na base versionada. A cobertura cresce por fontes verificáveis, não por listas copiadas da web.
          </p>
        </div>
      </section>
    </>
  );
}
