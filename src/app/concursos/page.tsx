import { contests } from "@/data/catalog";

export default function ConcursosPage() {
  return (
    <>
      <section className="page-head">
        <div className="container">
          <div className="eyebrow">Base de evidências</div>
          <h1>Editais reais, não listas soltas de matérias.</h1>
          <p>A base inicial é pequena de propósito. Cada certame deve ter fonte oficial, data de verificação e separação entre fatos do edital e classificações curatoriais usadas pelo mapa.</p>
        </div>
      </section>
      <section className="section">
        <div className="container">
          <div className="table-wrap">
            <table>
              <thead>
                <tr><th>Instituição</th><th>Certame</th><th>Banca</th><th>Perfis mapeados</th><th>Fonte</th><th>Verificado</th></tr>
              </thead>
              <tbody>
                {contests.map((contest) => (
                  <tr key={contest.id}>
                    <td><strong>{contest.institution}</strong><br/><span className="muted">{contest.orgFamily}</span></td>
                    <td>{contest.title}<br/><span className="muted">{contest.year} · esfera {contest.sphere}</span></td>
                    <td>{contest.organizer}</td>
                    <td>{contest.tracks.length}</td>
                    <td><a href={contest.sourceUrl} target="_blank" rel="noreferrer">{contest.sourceLabel} ↗</a></td>
                    <td>{contest.verifiedAt}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="muted" style={{ marginTop: 18 }}>
            Próxima expansão prevista: universidades/IFs, tribunais, TCE/TCM, MPs, DPEs e mais empresas públicas. A unidade de análise poderá chegar até cargo/perfil/localidade quando isso for útil.
          </p>
        </div>
      </section>
    </>
  );
}
