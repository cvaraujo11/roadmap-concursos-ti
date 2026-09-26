import Link from "next/link";
import { notFound } from "next/navigation";
import { areaName, knowledgeName } from "@/data/catalog";
import { examOrgFamilyLabels, exams } from "@/data/exams";
import { granularTopicName, topicDefinition } from "@/data/granular";

export function generateStaticParams() {
  return exams.map((exam) => ({ id: exam.id }));
}

export default async function ExamPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const exam = exams.find((item) => item.id === id);
  if (!exam) notFound();

  const grouped = new Map<string, string[]>();
  exam.observedTopics.forEach((slug) => {
    const knowledge = topicDefinition(slug)?.knowledge ?? "outros";
    const current = grouped.get(knowledge) ?? [];
    current.push(slug);
    grouped.set(knowledge, current);
  });

  return (
    <>
      <section className="page-head">
        <div className="container">
          <div className="eyebrow">Prova real · {exam.institution} · {exam.cycle}</div>
          <h1>{exam.title}</h1>
          <p>{exam.sourceNote}</p>
          <div className="chips">
            {exam.areas.map((slug) => <span className="chip" key={slug}>{areaName(slug)}</span>)}
          </div>
          <div className="stats compact-stats">
            <div className="stat"><strong>{exam.observedTopics.length}</strong><span>tópicos já classificados</span></div>
            <div className="stat"><strong>{exam.knowledge.length}</strong><span>macroconhecimentos</span></div>
            <div className="stat"><strong>{exam.organizer}</strong><span>banca</span></div>
            <div className="stat"><strong>{exam.coverage}</strong><span>cobertura da curadoria</span></div>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="section-heading">
            <div><div className="eyebrow">Cobrança observada</div><h2>Assuntos identificados no caderno</h2></div>
            <p>A taxonomia conecta questões reais a tópicos comparáveis entre bancas e instituições. A lista não afirma frequência nacional nem prioridade de estudo.</p>
          </div>
          <div className="knowledge-tree">
            {[...grouped.entries()].map(([knowledge, topics]) => (
              <article className="knowledge-branch" key={knowledge}>
                <div className="branch-head"><h3>{knowledge === "outros" ? "Outros" : knowledgeName(knowledge)}</h3><span>{topics.length} tópico{topics.length === 1 ? "" : "s"}</span></div>
                <div className="chips">{topics.map((slug) => <span className="chip" key={slug}>{granularTopicName(slug)}</span>)}</div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="method-grid">
            <article className="method-card">
              <div className="eyebrow">Estrutura da prova</div>
              <h3>{exam.scope === "caderno-completo" ? "Caderno completo" : "Recorte de conhecimentos específicos"}</h3>
              <p>{exam.objectiveQuestions ? `${exam.objectiveQuestions} questões objetivas` : "Quantidade total não inferida do recorte"}{exam.discursiveQuestions ? ` · ${exam.discursiveQuestions} discursiva${exam.discursiveQuestions === 1 ? "" : "s"}` : ""}.</p>
              {exam.specificQuestionRange && <p className="muted">Recorte: {exam.specificQuestionRange}.</p>}
              <p>{examOrgFamilyLabels[exam.orgFamily]} · nível {exam.level}.</p>
            </article>
            <article className="method-card">
              <div className="eyebrow">Proveniência</div>
              <h3>{exam.sourceFile}</h3>
              <p className="muted">SHA-256: <code>{exam.sourceSha256}</code></p>
              <p>O PDF não é versionado no repositório. O fingerprint permite reconhecer exatamente o arquivo que sustentou a curadoria.</p>
              {exam.officialUrl && <a className="card-link" href={exam.officialUrl} target="_blank" rel="noreferrer">Abrir página oficial ↗</a>}
            </article>
          </div>
          {exam.relatedTrackId && (
            <div className="actions" style={{ marginTop: 22 }}><Link className="button primary" href={`/trilhas/${exam.relatedTrackId}`}>Comparar com a trilha do edital</Link></div>
          )}
          <div className="notice" style={{ marginTop: 22 }}>
            A M4 registra metadados e classificações temáticas, não reproduz os enunciados das questões. "Cobertura parcial" significa que o caderno já foi útil para a cartografia, mas ainda não passou por classificação exaustiva questão a questão.
          </div>
        </div>
      </section>
    </>
  );
}
