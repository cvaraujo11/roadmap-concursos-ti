export default function MetodologiaPage() {
  return (
    <>
      <section className="page-head">
        <div className="container">
          <div className="eyebrow">Metodologia</div>
          <h1>Fonte oficial primeiro. Síntese depois.</h1>
          <p>A cartografia só é útil se deixar claro o que veio do edital, o que foi normalizado pelo projeto e qual conjunto de dados sustenta cada comparação.</p>
        </div>
      </section>
      <section className="section">
        <div className="container">
          <div className="method-grid">
            <article className="method-card"><h3>1. Evidência</h3><p>Certames entram na base com URL oficial, instituição, ano, banca, cargo/perfil e data de verificação. O objetivo é sempre permitir voltar à fonte.</p></article>
            <article className="method-card"><h3>2. Camada curatorial</h3><p>Nomes como “Infraestrutura e Redes” ou “Generalista” são categorias do projeto. Elas conectam nomenclaturas diferentes sem fingir que os editais são idênticos.</p></article>
            <article className="method-card"><h3>3. Macroconhecimentos</h3><p>Toda trilha pode ser ligada a blocos amplos como Redes, Banco de Dados ou Governança. Essa camada permite navegar mesmo antes de um edital ser decomposto integralmente.</p></article>
            <article className="method-card"><h3>4. Tópicos granulares</h3><p>Quando o conteúdo programático é analisado em detalhe, itens como VLAN, IPv6, normalização, COBIT 2019 ou ITIL 4 são associados a uma taxonomia comum. O rótulo da taxonomia continua sendo uma síntese, não uma citação literal.</p></article>
            <article className="method-card"><h3>5. Reaproveitamento</h3><p>A comparação usa interseção de conjuntos. Macroconhecimentos oferecem um sinal amplo; a comparação granular só aparece quando os dois editais possuem tópicos decompostos. Nenhum percentual mede dificuldade, peso ou chance de aprovação.</p></article>
            <article className="method-card"><h3>6. Frequência</h3><p>A frequência usa a trilha/cargo-perfil como unidade de análise. No modo macro, o denominador contém todas as trilhas do recorte. No modo granular, contém apenas trilhas já decompostas em tópicos. O denominador e seu manifesto são sempre exibidos.</p></article>
            <article className="method-card"><h3>7. Núcleo observado</h3><p>O “núcleo” é apenas o conjunto de itens que alcança um limiar escolhido dentro de um recorte. Ele descreve a amostra catalogada; não é uma lista universal de prioridades de estudo.</p></article>
            <article className="method-card"><h3>8. Versionamento</h3><p>Dados, fontes, taxonomia e extrações vivem no repositório e mudam por commit. Isso permite revisar classificações, corrigir fontes e discutir contribuições por pull request.</p></article>
            <article className="method-card"><h3>9. Cobertura</h3><p>“Macro” significa que o perfil foi catalogado em blocos amplos. “Tópicos” significa que já houve decomposição do conteúdo programático. Ausência de granularidade não significa ausência daquele assunto no edital.</p></article>
            <article className="method-card"><h3>10. Viés da unidade</h3><p>Um certame com vários perfis pode contribuir com mais de uma trilha no modo macro. Por isso a página de frequência também mostra quantos certames e instituições estão representados. Futuras versões poderão oferecer outras unidades de agregação.</p></article>
            <article className="method-card"><h3>11. Presença não é peso</h3><p>Uma frequência de 80% significa presença em 80% das trilhas elegíveis daquele recorte. Não significa 80% da prova, 80% das questões, nem 80% do esforço de estudo.</p></article>
            <article className="method-card"><h3>12. Limites</h3><p>A amostra não representa automaticamente todo o universo de concursos brasileiros. Frequências exibidas descrevem a base atual e devem ser interpretadas como evidência exploratória, não como estimativa populacional.</p></article>
          </div>
          <div className="notice" style={{ marginTop: 22 }}>
            Princípio editorial: quando uma afirmação puder ser lida como fato do concurso, ela deve ser rastreável a uma fonte oficial. Quando for síntese do projeto, deve aparecer como síntese. Quando for estatística, o denominador deve ser auditável.
          </div>
        </div>
      </section>
    </>
  );
}
