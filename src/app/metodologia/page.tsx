export default function MetodologiaPage() {
  return (
    <>
      <section className="page-head">
        <div className="container">
          <div className="eyebrow">Metodologia</div>
          <h1>Fonte oficial primeiro. Síntese depois.</h1>
          <p>A cartografia só é útil se deixar claro o que veio do edital e o que foi criado como camada de comparação entre concursos.</p>
        </div>
      </section>
      <section className="section">
        <div className="container">
          <div className="method-grid">
            <article className="method-card"><h3>1. Evidência</h3><p>Certames entram na base com URL oficial, instituição, ano, banca, cargo/perfil e data de verificação. O objetivo é sempre permitir voltar à fonte.</p></article>
            <article className="method-card"><h3>2. Camada curatorial</h3><p>Nomes como “Infraestrutura e Redes” ou “Generalista” são categorias do projeto. Elas conectam nomenclaturas diferentes sem fingir que os editais são idênticos.</p></article>
            <article className="method-card"><h3>3. Macrotemas</h3><p>Na M0, conhecimentos são classificados em blocos amplos. Eles servem para navegação e comparação inicial, não para substituir o conteúdo programático integral.</p></article>
            <article className="method-card"><h3>4. Reaproveitamento</h3><p>A matriz atual calcula similaridade por conjuntos de macrotemas. Etapas futuras deverão trabalhar com tópicos finos, pesos, incidência e histórico de questões.</p></article>
            <article className="method-card"><h3>5. Versionamento</h3><p>Os dados vivem no repositório e mudam por commit. Isso permite revisar classificações, registrar fontes e discutir contribuições por pull request.</p></article>
            <article className="method-card"><h3>6. Limites</h3><p>Uma alta sobreposição não significa mesma prova, mesma banca, mesma profundidade ou mesma chance de aprovação. O mapa apoia a decisão; não produz uma “receita universal”.</p></article>
          </div>
          <div className="notice" style={{ marginTop: 22 }}>
            Princípio editorial: quando uma afirmação puder ser lida como fato do concurso, ela deve ser rastreável a uma fonte oficial. Quando for síntese do projeto, deve aparecer como síntese.
          </div>
        </div>
      </section>
    </>
  );
}
