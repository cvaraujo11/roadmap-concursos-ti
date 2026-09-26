import Link from "next/link";
import { allTracks, areas, contests, knowledge, orgFamilies } from "@/data/catalog";
import { exams } from "@/data/exams";
import { geocodedLocations } from "@/data/geography";
import { granularTrackCount, topicCatalog } from "@/data/granular";

export default function HomePage() {
  const granularTracks = granularTrackCount(allTracks);
  const geocodedTracks = new Set(geocodedLocations.map((location) => location.trackId)).size;

  return (
    <>
      <section className="hero">
        <div className="container">
          <div className="eyebrow">Cartografia aberta · concursos públicos de TI</div>
          <h1>Não estude para “qualquer concurso”. Primeiro, enxergue o mapa.</h1>
          <p className="lead">
            Descubra famílias de cargos, áreas de atuação, conhecimentos reaproveitáveis, editais, provas reais e agora também a distribuição territorial já normalizada da base.
          </p>
          <div className="actions">
            <Link className="button primary" href="/comecar">Quero começar do zero</Link>
            <Link className="button" href="/mapa">Explorar a cartografia</Link>
            <Link className="button" href="/mapa-geografico">Abrir mapa do Brasil</Link>
            <Link className="button" href="/frequencia">Ver o que se repete</Link>
            <Link className="button" href="/provas">Explorar provas reais</Link>
          </div>
          <div className="stats">
            <div className="stat"><strong>{areas.length}</strong><span>famílias de atuação</span></div>
            <div className="stat"><strong>{contests.length}</strong><span>certames documentados</span></div>
            <div className="stat"><strong>{exams.length}</strong><span>provas/recortes observados</span></div>
            <div className="stat"><strong>{geocodedTracks}</strong><span>trilhas com geografia normalizada</span></div>
          </div>
          <p className="hero-footnote">{orgFamilies.length} famílias institucionais no catálogo de editais · {knowledge.length} macroconhecimentos · {topicCatalog.length} tópicos na taxonomia · {granularTracks} trilhas já decompostas em nível fino · {allTracks.length} perfis mapeados</p>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="section-heading">
            <div><div className="eyebrow">Três portas de entrada</div><h2>Comece pelo que você já sabe.</h2></div>
            <p>Você não precisa escolher um edital antes de começar. A cartografia serve para adiar decisões caras e preservar o reaproveitamento do estudo.</p>
          </div>
          <div className="card-grid">
            <article className="card">
              <span className="card-kicker">Ainda estou perdido</span>
              <h3>Quero entender quais caminhos existem</h3>
              <p>Veja um núcleo inicial, conheça as famílias de cargos e só depois estreite o alvo.</p>
              <Link className="card-link" href="/comecar">Percurso guiado →</Link>
            </article>
            <article className="card">
              <span className="card-kicker">Já conheço minha afinidade</span>
              <h3>Quero uma área de TI</h3>
              <p>Infra, desenvolvimento, dados, segurança, governança, operações ou um perfil generalista.</p>
              <Link className="card-link" href="/mapa">Filtrar por área →</Link>
            </article>
            <article className="card">
              <span className="card-kicker">Quero enxergar o território</span>
              <h3>Onde essas trilhas aparecem no Brasil?</h3>
              <p>Veja UFs e localidades já normalizadas e use uma trilha como referência de compatibilidade.</p>
              <Link className="card-link" href="/mapa-geografico">Abrir mapa BR →</Link>
            </article>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="section-heading">
            <div><div className="eyebrow">M5 · território</div><h2>Da ontologia para o mapa do Brasil.</h2></div>
            <p>A localização virou uma camada normalizada e auditável. Estados mais intensos significam apenas mais trilhas geocodificadas no recorte atual — não maior oferta real de oportunidades.</p>
          </div>
          <div className="route-grid">
            <article className="route-card">
              <span className="number">01 · geografia normalizada</span>
              <h3>Filtre o mapa por área, família institucional, conhecimento e ano</h3>
              <p className="muted">Trilhas nacionais ou descritas apenas como “múltiplas localidades” permanecem explicitamente fora do mapa até serem decompostas.</p>
              <Link className="card-link" href="/mapa-geografico">Explorar território →</Link>
            </article>
            <article className="route-card">
              <span className="number">02 · mobilidade entre concursos</span>
              <h3>Use uma trilha como referência e veja onde existe reaproveitamento macro</h3>
              <p className="muted">A cor de compatibilidade usa Jaccard entre macroconhecimentos já catalogados e mantém o denominador conceitual separado de vagas e incidência de prova.</p>
              <Link className="card-link" href="/comparar">Entender a comparação →</Link>
            </article>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="section-heading">
            <div><div className="eyebrow">M4 · prova real</div><h2>Separe escopo declarado de cobrança observada.</h2></div>
            <p>Editais dizem o universo potencial. Cadernos de prova mostram a realização concreta desse universo por uma banca, em um cargo e ciclo específicos.</p>
          </div>
          <div className="route-grid">
            <article className="route-card">
              <span className="number">01 · corpus observado</span>
              <h3>Navegue por provas de controle, Judiciário, MPs/Defensorias, Legislativo, estatais e Executivo</h3>
              <p className="muted">Cada registro guarda banca, estrutura, tópicos observados e fingerprint do arquivo usado na curadoria.</p>
              <Link className="card-link" href="/provas">Abrir provas →</Link>
            </article>
            <article className="route-card">
              <span className="number">02 · duas métricas, sem mistura</span>
              <h3>Frequência de edital continua separada de incidência em prova</h3>
              <p className="muted">A M4 prepara a futura métrica de incidência observada sem contaminar o denominador metodológico construído na M3.</p>
              <Link className="card-link" href="/metodologia">Ver metodologia →</Link>
            </article>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="section-heading">
            <div><div className="eyebrow">M3 · frequência</div><h2>Do “isso cai muito” para uma conta auditável.</h2></div>
            <p>O projeto calcula frequência apenas junto do recorte e do denominador que sustentam o percentual.</p>
          </div>
          <div className="route-grid">
            <article className="route-card">
              <span className="number">01 · núcleo observado</span>
              <h3>Veja quais conhecimentos reaparecem dentro de um recorte explícito</h3>
              <p className="muted">Filtre por família de atuação e família institucional e escolha o limiar de recorrência que deseja inspecionar.</p>
              <Link className="card-link" href="/frequencia">Abrir frequência →</Link>
            </article>
            <article className="route-card">
              <span className="number">02 · denominador visível</span>
              <h3>Saiba exatamente quais trilhas entraram em cada percentual</h3>
              <p className="muted">A página mostra o manifesto do denominador e separa frequência macro de frequência granular, evitando misturar editais ainda não decompostos.</p>
              <Link className="card-link" href="/metodologia">Ver metodologia →</Link>
            </article>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="section-heading">
            <div><div className="eyebrow">Famílias de atuação</div><h2>O espaço de TI é maior que um edital.</h2></div>
            <p>Estas categorias não substituem a nomenclatura oficial. Elas formam uma camada comum para conectar cargos que recebem nomes diferentes em órgãos diferentes.</p>
          </div>
          <div className="card-grid">
            {areas.map((area) => (
              <article className="card" key={area.slug}>
                <span className="card-kicker">{area.shortName}</span>
                <h3>{area.name}</h3>
                <p>{area.description}</p>
                <Link className="card-link" href={`/areas/${area.slug}`}>Abrir família →</Link>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="section-heading">
            <div><div className="eyebrow">Onde os cargos vivem</div><h2>Navegue também pela família institucional.</h2></div>
            <p>Empresas públicas, universidades, tribunais, controle, MPs/Defensorias e Executivo têm estruturas de carreira e combinações de conteúdo diferentes. A camada de provas já adiciona também exemplos do Legislativo.</p>
          </div>
          <div className="card-grid">
            {orgFamilies.map((family) => (
              <article className="card" key={family.slug}>
                <span className="card-kicker">Instituições</span>
                <h3>{family.name}</h3>
                <p>{family.description}</p>
                <Link className="card-link" href={`/orgaos/${family.slug}`}>Explorar família →</Link>
              </article>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
