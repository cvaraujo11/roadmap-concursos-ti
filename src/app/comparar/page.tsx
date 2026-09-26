import { CompareExplorer } from "@/components/CompareExplorer";

export default function CompararPage() {
  return (
    <>
      <section className="page-head">
        <div className="container">
          <div className="eyebrow">Reaproveitamento</div>
          <h1>Compare duas trilhas e veja onde o estudo se encontra.</h1>
          <p>
            A M1 separa duas escalas: macroconhecimentos, disponíveis para toda a base, e tópicos granulares, disponíveis nos editais que já foram decompostos em detalhe.
          </p>
        </div>
      </section>
      <section className="section">
        <div className="container">
          <CompareExplorer />
        </div>
      </section>
    </>
  );
}
