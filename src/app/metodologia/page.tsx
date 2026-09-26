export default function MetodologiaPage() {
  return (
    <>
      <section className="page-head">
        <div className="container">
          <div className="eyebrow">Metodologia</div>
          <h1>Fonte primeiro. Síntese depois. Denominador sempre visível.</h1>
          <p>A cartografia só é útil se deixar claro o que veio do edital, o que foi efetivamente observado em prova, o que foi normalizado pelo projeto e qual conjunto de dados sustenta cada comparação.</p>
        </div>
      </section>
      <section className="section">
        <div className="container">
          <div className="method-grid">
            <article className="method-card"><h3>1. Evidência de edital</h3><p>Certames entram na base com URL oficial, instituição, ano, banca, cargo/perfil e data de verificação. O edital descreve o universo declarado de cobrança, não aquilo que necessariamente apareceu no caderno aplicado.</p></article>
            <article className="method-card"><h3>2. Evidência de prova</h3><p>A M4 mantém um corpus separado de cadernos efetivamente aplicados. Cada registro guarda estrutura da prova, temas observados, nome do arquivo e SHA-256. Os PDFs não são redistribuídos pelo repositório.</p></article>
            <article className="method-card"><h3>3. Camada curatorial</h3><p>Nomes como “Infraestrutura e Redes” ou “Generalista” são categorias do projeto. Elas conectam nomenclaturas diferentes sem fingir que editais ou provas são idênticos.</p></article>
            <article className="method-card"><h3>4. Macroconhecimentos</h3><p>Toda trilha pode ser ligada a blocos amplos como Redes, Banco de Dados ou Governança. Essa camada permite navegar mesmo antes de uma fonte ser decomposta integralmente.</p></article>
            <article className="method-card"><h3>5. Tópicos granulares</h3><p>Itens como VLAN, IPv6, normalização, COBIT 2019 ou ITIL 4 são associados a uma taxonomia comum. O rótulo da taxonomia continua sendo uma síntese, não uma citação literal do documento.</p></article>
            <article className="method-card"><h3>6. Reaproveitamento</h3><p>A comparação de editais usa interseção de conjuntos. Macroconhecimentos oferecem um sinal amplo; a comparação granular só aparece quando os dois editais possuem tópicos decompostos. Nenhum percentual mede dificuldade, peso ou chance de aprovação.</p></article>
            <article className="method-card"><h3>7. Frequência de edital</h3><p>A frequência da M3 usa a trilha/cargo-perfil como unidade de análise. No modo macro, o denominador contém todas as trilhas do recorte. No granular, apenas trilhas de edital já decompostas. Provas reais não entram nessa conta.</p></article>
            <article className="method-card"><h3>8. Incidência em prova</h3><p>A M4 prepara uma métrica distinta: presença ou quantidade de questões observadas em cadernos reais. Ela só será agregada quando a classificação questão a questão tiver denominador próprio e cobertura revisada.</p></article>
            <article className="method-card"><h3>9. Núcleo observado</h3><p>O “núcleo” é apenas o conjunto de itens que alcança um limiar escolhido dentro de um recorte. Ele descreve a amostra catalogada; não é uma lista universal de prioridades de estudo.</p></article>
            <article className="method-card"><h3>10. Versionamento e fingerprint</h3><p>Dados, fontes, taxonomia e extrações vivem no repositório e mudam por commit. Para provas recebidas como arquivo, o SHA-256 identifica exatamente o caderno que sustentou a curadoria sem exigir que o PDF seja versionado.</p></article>
            <article className="method-card"><h3>11. Cobertura</h3><p>Em editais, “macro” e “tópicos” indicam o nível de decomposição do programa. Em provas, “parcial” significa que já existem temas classificados, mas o caderno ainda não passou por classificação exaustiva questão a questão.</p></article>
            <article className="method-card"><h3>12. Presença não é peso</h3><p>Frequência de presença não significa percentual da prova, número de questões, dificuldade ou esforço de estudo. Edital e prova respondem perguntas diferentes e permanecem em corpora separados.</p></article>
            <article className="method-card"><h3>13. Limites</h3><p>A amostra não representa automaticamente todo o universo de concursos brasileiros. Frequências e observações descrevem a base atual e devem ser interpretadas como evidência exploratória, não como estimativa populacional.</p></article>
          </div>
          <div className="notice" style={{ marginTop: 22 }}>
            Princípio editorial: quando uma afirmação puder ser lida como fato do concurso, ela deve ser rastreável à fonte. Quando for síntese do projeto, deve aparecer como síntese. Quando for estatística, o corpus, a unidade e o denominador devem ser auditáveis.
          </div>
        </div>
      </section>
    </>
  );
}
