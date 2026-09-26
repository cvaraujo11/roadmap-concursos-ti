import { ExamExplorer } from "@/components/ExamExplorer";
import { exams } from "@/data/exams";

export default function ProvasPage() {
  const institutions = new Set(exams.map((exam) => exam.institution)).size;
  const organizers = new Set(exams.map((exam) => exam.organizer)).size;
  const complete = exams.filter((exam) => exam.scope === "caderno-completo").length;

  return (
    <>
      <section className="page-head">
        <div className="container">
          <div className="eyebrow">M4 · evidência observada</div>
          <h1>Edital diz o que pode cair. A prova mostra o que efetivamente foi cobrado.</h1>
          <p>Este corpus é uma camada separada da frequência de editais. Ele registra cadernos reais de concursos de TI, normaliza os assuntos observados e preserva a proveniência sem redistribuir os PDFs.</p>
          <div className="stats compact-stats">
            <div className="stat"><strong>{exams.length}</strong><span>provas/recortes catalogados</span></div>
            <div className="stat"><strong>{institutions}</strong><span>instituições</span></div>
            <div className="stat"><strong>{organizers}</strong><span>bancas</span></div>
            <div className="stat"><strong>{complete}</strong><span>cadernos completos</span></div>
          </div>
        </div>
      </section>
      <section className="section">
        <div className="container">
          <div className="notice" style={{ marginBottom: 22 }}><strong>Separação metodológica:</strong> os tópicos desta página são evidência de cobrança observada. Eles ainda não entram na frequência de editais, que continua descrevendo o corpus de editais/trilhas. A incidência em provas terá denominador próprio quando a classificação questão a questão estiver revisada.</div>
          <ExamExplorer />
        </div>
      </section>
    </>
  );
}
