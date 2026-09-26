import Link from "next/link";
import { allTracks, areas, contests, knowledge, orgFamilies } from "@/data/catalog";
import { granularTrackCount, topicCatalog } from "@/data/granular";

export default function HomePage() {
  const granularTracks = granularTrackCount(allTracks);

  return (
    <>
      <section className="hero">
        <div className="container">
          <div className="eyebrow">Cartografia aberta · concursos públicos de TI</div>
          <h1>Não estude para “qualquer concurso”. Primeiro, enxergue o mapa.</h1>
          <p className="lead">
            Descubra famílias de cargos, áreas de atuação, conhecimentos reaproveitáveis e editais reais usados como evidência. A ideia é transformar “por onde começo?” em uma decisão navegável.
          </p>
          <div className="actions">
            <Link className="button primary" href="/comecar">Quero começar do zero</Link>
            <Link className="button" href="/mapa">Explorar a cartografia</Link>
          </div>
          <div className="stats">
            <div className="stat"><strong>{areas.length}</strong><span>famílias de atuação</span></div>
            <div className="stat"><strong>{orgFamilies.length}</strong><span>famílias institucionais</span></div>
            <div className="stat"><strong>{contests.length}</strong><span>certames documentados</span></div>
            <div className="stat"><strong>{allTracks.length}</strong><span>trilhas/perfis mapeados</span></div>
          </div>
          <p className="hero-footnote">{knowledge.length} macroconhecimentos · {topicCatalog.length} tópicos na taxonomia · {granularTracks} trilhas já decompostas em nível fino</p>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="section-heading">
            <div><div className="eyebrow">Três portas de entrada</div><h2>Comece pelo que você já sabe.</h2></div>
            <p>Você não precisa escolher um edital antes de começar. O mapa serve para adiar decisões caras e preservar o reaproveitamento do estudo.</p>
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
              <span className="card-kicker">Já tenho referências</span>
              <h3>Quero comparar concursos</h3>
              <p>Compare duas trilhas no nível macro e, quando os editais já foram decompostos, também no nível de tópicos.</p>
              <Link className="card-link" href="/comparar">Comparar duas trilhas →</Link>
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
            <p>Empresas públicas, universidades, tribunais, controle, MPs/Defensorias e Executivo têm estruturas de carreira e combinações de conteúdo diferentes.</p>
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