import { allTracks } from "@/data/catalog";

const selectedIds = [
  "dataprev-arquitetura-sustentacao",
  "dataprev-desenvolvimento",
  "dataprev-servicos",
  "serpro-tecnologia",
  "transpetro-infra",
  "transpetro-processos",
];

const selected = selectedIds.map((id) => allTracks.find((item) => item.id === id)).filter(Boolean) as typeof allTracks;

function overlap(a: string[], b: string[]) {
  const setA = new Set(a);
  const setB = new Set(b);
  const intersection = [...setA].filter((item) => setB.has(item)).length;
  const union = new Set([...a, ...b]).size;
  return union === 0 ? 0 : Math.round((intersection / union) * 100);
}

function classFor(value: number) {
  if (value >= 60) return "matrix-dot high";
  if (value >= 30) return "matrix-dot medium";
  return "matrix-dot";
}

export default function CompararPage() {
  return (
    <>
      <section className="page-head">
        <div className="container">
          <div className="eyebrow">Reaproveitamento</div>
          <h1>Quanto duas trilhas se parecem?</h1>
          <p>Esta primeira matriz usa a sobreposição de macrotemas curatoriais. Ela não mede dificuldade, peso na prova nem equivalência integral de conteúdo — serve para orientar onde investigar reaproveitamento.</p>
        </div>
      </section>
      <section className="section">
        <div className="container">
          <div className="table-wrap">
            <table>
              <thead>
                <tr>
                  <th>Trilha</th>
                  {selected.map((item) => <th key={item.id}>{item.contest.institution}<br/>{item.name.split("—").pop()?.trim()}</th>)}
                </tr>
              </thead>
              <tbody>
                {selected.map((row) => (
                  <tr key={row.id}>
                    <td><strong>{row.contest.institution}</strong><br/><span className="muted">{row.name}</span></td>
                    {selected.map((col) => {
                      const value = overlap(row.knowledge, col.knowledge);
                      return <td key={col.id}><span className={classFor(value)}>{value}%</span></td>;
                    })}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="notice" style={{ marginTop: 18 }}>
            Na próxima etapa, a comparação deve evoluir de macrotemas para tópicos extraídos do conteúdo programático de cada edital, permitindo frequências e sobreposições mais granulares.
          </div>
        </div>
      </section>
    </>
  );
}
