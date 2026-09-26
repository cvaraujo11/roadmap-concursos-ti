import Link from "next/link";
import { allTracks, areas, contests, knowledge } from "@/data/catalog";

export default function HomePage() {
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
            <div className="stat"><strong>{knowledge.length}</strong><span>macroconhecimentos</span></div>
            <div className="stat"><strong>{contests.length}</strong><span>certames na amostra inicial</span></div>
            <div className="stat"><strong>{allTracks.length}</strong><span>trilhas/perfis mapeados</span></div>
          </div>
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
              <p>Observe a sobreposição de macrotemas para entender o que pode ser reaproveitado entre perfis.</p>
              <Link className="card-link" href="/comparar">Ver matriz inicial →</Link>
            </article>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="section-heading">
            <div><div className="eyebrow">Famílias</div><h2>O espaço de TI é maior que um edital.</h2></div>
            <p>Estas categorias não pretendem substituir a nomenclatura oficial dos órgãos. Elas são uma camada curatorial para permitir comparação entre editais diferentes.</p>
          </div>
          <div className="card-grid">
            {areas.map((area) => (
              <article className="card" key={area.slug}>
                <span className="card-kicker">{area.shortName}</span>
                <h3>{area.name}</h3>
                <p>{area.description}</p>
                <Link className="card-link" href={`/mapa?area=${area.slug}`}>Explorar perfis →</Link>
              </article>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
