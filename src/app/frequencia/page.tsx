import { FrequencyExplorer } from "@/components/FrequencyExplorer";

export default function FrequenciaPage() {
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
        <div className="container"><FrequencyExplorer /></div>
      </section>
    </>
  );
}
