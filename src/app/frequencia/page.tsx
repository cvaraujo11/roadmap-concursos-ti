import { FrequencyExplorer } from "@/components/FrequencyExplorer";
import { areas, knowledge, orgFamilies } from "@/data/catalog";
import type { AreaSlug, KnowledgeSlug, OrgFamily } from "@/lib/types";
import type { FrequencyMode } from "@/lib/frequency";

type SearchParams = Record<string, string | string[] | undefined>;

function first(value: string | string[] | undefined) {
  return Array.isArray(value) ? value[0] : value;
}

export default async function FrequenciaPage({ searchParams }: { searchParams: Promise<SearchParams> }) {
  const params = await searchParams;
  const rawMode = first(params.modo);
  const rawArea = first(params.area);
  const rawFamily = first(params.familia);
  const rawKnowledge = first(params.conhecimento);

  const initialMode: FrequencyMode = rawMode === "macro" ? "macro" : "granular";
  const initialArea: AreaSlug | "todas" = areas.some((item) => item.slug === rawArea) ? rawArea as AreaSlug : "todas";
  const initialOrgFamily: OrgFamily | "todas" = orgFamilies.some((item) => item.slug === rawFamily) ? rawFamily as OrgFamily : "todas";
  const initialKnowledge: KnowledgeSlug | "todos" = knowledge.some((item) => item.slug === rawKnowledge) ? rawKnowledge as KnowledgeSlug : "todos";

  return (
    <>
      <section className="page-head">
        <div className="container">
          <div className="eyebrow">M3 · frequência e reaproveitamento</div>
          <h1>O que realmente se repete no recorte que você escolheu?</h1>
          <p>
            A frequência só é exibida junto do denominador que a produz. Compare macroconhecimentos em toda a base ou tópicos finos apenas entre trilhas já decompostas, sempre sabendo exatamente quais perfis entraram na conta.
          </p>
        </div>
      </section>
      <section className="section">
        <div className="container">
          <FrequencyExplorer
            initialMode={initialMode}
            initialArea={initialArea}
            initialOrgFamily={initialOrgFamily}
            initialKnowledge={initialKnowledge}
          />
        </div>
      </section>
    </>
  );
}
