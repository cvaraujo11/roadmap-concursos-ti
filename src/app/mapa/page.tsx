import { MapExplorer } from "@/components/MapExplorer";

export default function MapaPage() {
  return (
    <>
      <section className="page-head">
        <div className="container">
          <div className="eyebrow">Mapa navegável</div>
          <h1>Perfis, áreas e conhecimentos no mesmo espaço.</h1>
          <p>Use os filtros para enxergar relações entre especialidades de concursos diferentes. A M0 trabalha com macrotemas curatoriais e sempre preserva o link para a fonte oficial.</p>
        </div>
      </section>
      <section className="section">
        <div className="container"><MapExplorer /></div>
      </section>
    </>
  );
}
