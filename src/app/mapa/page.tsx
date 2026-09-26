import { MapExplorer } from "@/components/MapExplorer";
import { areas, knowledge } from "@/data/catalog";
import type { AreaSlug, KnowledgeSlug } from "@/lib/types";

export default async function MapaPage({ searchParams }: { searchParams: Promise<{ area?: string; conhecimento?: string }> }) {
  const query = await searchParams;
  const initialArea = areas.some((item) => item.slug === query.area) ? query.area as AreaSlug : "todas";
  const initialTopic = knowledge.some((item) => item.slug === query.conhecimento) ? query.conhecimento as KnowledgeSlug : "todos";

  return (
    <>
      <section className="page-head">
        <div className="container">
          <div className="eyebrow">Mapa navegável</div>
          <h1>Perfis, áreas e conhecimentos no mesmo espaço.</h1>
          <p>Use os filtros para enxergar relações entre especialidades de concursos diferentes. A cartografia preserva a fonte oficial e distingue cobertura macro de editais já decompostos em tópicos.</p>
        </div>
      </section>
      <section className="section">
        <div className="container"><MapExplorer initialArea={initialArea} initialTopic={initialTopic} /></div>
      </section>
    </>
  );
}
