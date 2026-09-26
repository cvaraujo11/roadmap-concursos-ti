import Link from "next/link";

const steps = [
  ["Pare de procurar um “concurso genérico”", "Concursos de TI variam muito. Comece identificando famílias de atuação e instituições, não uma lista aleatória de disciplinas."],
  ["Construa um núcleo reaproveitável", "Redes, banco de dados, segurança, engenharia de software e governança aparecem em combinações diferentes. O objetivo inicial é aprender fundamentos que não morrem quando o edital muda."],
  ["Escolha duas ou três famílias de oportunidade", "Exemplo: empresas públicas + universidades/IFs + Judiciário. Isso reduz dispersão sem te prender a um único órgão."],
  ["Use editais anteriores como dados", "Leia requisitos, banca, conteúdo programático, pesos e formato da prova. O edital é evidência; cursos e opiniões são interpretações."],
  ["Especialize quando o padrão aparecer", "Se suas oportunidades convergirem para infraestrutura, desenvolvimento, dados, segurança ou gestão, aprofunde a trilha sem abandonar o núcleo comum."],
  ["Resolva questões e revise a rota", "Questões mostram como a banca transforma conceitos em cobrança. Ajuste o plano a partir dos erros e dos editais realmente compatíveis com sua formação."],
];

export default function ComecarPage() {
  return (
    <>
      <section className="page-head">
        <div className="container">
          <div className="eyebrow">Percurso para iniciantes</div>
          <h1>“Sou de TI. Por onde eu começo?”</h1>
          <p>Você não precisa descobrir hoje qual será seu concurso definitivo. Precisa apenas sair da intenção genérica e chegar a um conjunto pequeno de caminhos verificáveis.</p>
        </div>
      </section>
      <section className="section">
        <div className="container">
          <div className="steps">
            {steps.map(([title, description], index) => (
              <article className="step" key={title}>
                <div className="step-index">{index + 1}</div>
                <div><h3>{title}</h3><p>{description}</p></div>
              </article>
            ))}
          </div>
          <div className="notice" style={{ marginTop: 22 }}>
            Regra prática: se você ainda não escolheu uma área, evite começar por tecnologias extremamente específicas. Prefira fundamentos com alto reaproveitamento e use a cartografia para observar onde eles reaparecem.
          </div>
          <div className="actions" style={{ marginTop: 22 }}>
            <Link className="button primary" href="/mapa">Abrir mapa</Link>
            <Link className="button" href="/concursos">Ver evidências</Link>
          </div>
        </div>
      </section>
    </>
  );
}
