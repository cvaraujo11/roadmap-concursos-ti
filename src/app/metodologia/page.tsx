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
            <article className="method-card"><h3>3. Macroconhecimentos</h3><p>Toda trilha pode ser ligada a blocos amplos como Redes, Banco de Dados ou Governança. Essa camada permite navegar mesmo antes de um edital ser decomposto integralmente.</p></article>
            <article className="method-card"><h3>4. Tópicos granulares</h3><p>Quando o conteúdo programático é analisado em detalhe, itens como VLAN, IPv6, normalização, COBIT 2019 ou ITIL 4 são associados a uma taxonomia comum. O rótulo da taxonomia continua sendo uma síntese, não uma citação literal.</p></article>
            <article className="method-card"><h3>5. Reaproveitamento</h3><p>A comparação usa interseção de conjuntos. Macroconhecimentos oferecem um sinal amplo; a comparação granular só aparece quando os dois editais possuem tópicos decompostos. Nenhum percentual mede dificuldade, peso ou chance de aprovação.</p></article>
            <article className="method-card"><h3>6. Versionamento</h3><p>Dados, fontes e taxonomia vivem no repositório e mudam por commit. Isso permite revisar classificações, corrigir fontes e discutir contribuições por pull request.</p></article>
            <article className="method-card"><h3>7. Cobertura</h3><p>“Macro” significa que o perfil foi catalogado em blocos amplos. “Tópicos” significa que já houve decomposição do conteúdo programático. Ausência de granularidade não significa ausência daquele assunto no edital.</p></article>
            <article className="method-card"><h3>8. Limites</h3><p>A amostra não representa automaticamente todo o universo de concursos brasileiros. Frequências exibidas descrevem a base atual e devem ser interpretadas como pistas para investigação, não como previsão.</p></article>
          </div>
          <div className="notice" style={{ marginTop: 22 }}>
            Princípio editorial: quando uma afirmação puder ser lida como fato do concurso, ela deve ser rastreável a uma fonte oficial. Quando for síntese do projeto, deve aparecer como síntese.
          </div>
        </div>
      </section>
    </>
  );
}
