import { ContestGeoMap } from "@/components/ContestGeoMap";

export default function MapaGeograficoPage() {
  return (
    <>
      <section className="page-head geo-page-head">
        <div className="container">
          <div className="eyebrow">M5 · Brasil</div>
          <h1>Onde a cartografia de concursos de TI toca o território.</h1>
          <p>
            Navegue pelas trilhas com localização já normalizada, filtre por área, família institucional,
            conhecimento e ano e use uma trilha como referência para enxergar reaproveitamento geográfico.
          </p>
        </div>
      </section>
      <section className="section geo-section">
        <div className="container geo-container">
          <ContestGeoMap />
        </div>
      </section>
    </>
  );
}
