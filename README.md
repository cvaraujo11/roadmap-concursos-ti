# Roadmap Concursos TI

Cartografia aberta dos concursos públicos de Tecnologia da Informação no Brasil.

O projeto nasce de uma pergunta recorrente: **“sou de TI e quero estudar para concurso; por onde começo?”**. Em vez de responder com uma lista genérica de disciplinas, o roadmap organiza o espaço de oportunidades por áreas de atuação, famílias institucionais, conhecimentos reaproveitáveis, editais e provas reais usados como evidência.

## Estado atual — M4

A M4 acrescenta uma segunda camada empírica: **cadernos de prova efetivamente aplicados**, mantidos metodologicamente separados do corpus de editais.

- percurso guiado para quem ainda não escolheu um concurso;
- mapa filtrável de perfis/trilhas;
- 7 famílias de atuação em TI;
- base versionada de certames com fonte oficial e data de verificação;
- taxonomia com macroconhecimentos e tópicos finos;
- comparação interativa entre duas trilhas;
- frequência de editais com denominador explícito e núcleo observado;
- corpus inicial com 16 provas/recortes reais de FGV, FCC e Cebraspe;
- nova rota `/provas`, filtrável por área, família institucional e banca;
- páginas `/provas/[id]` com estrutura, tópicos observados e proveniência;
- fingerprint SHA-256 dos PDFs usados na curadoria, sem redistribuir os binários;
- presença em edital e presença em prova tratadas como evidências diferentes.

A camada de provas inclui exemplos de controle, Judiciário, MPs/Defensorias, Legislativo, empresas públicas e Executivo, com perfis de Banco de Dados, Ciência de Dados, Engenharia/Arquitetura de Dados, Redes e Infraestrutura.

## Stack

- Next.js 15 (App Router)
- TypeScript
- React 19
- CSS próprio, sem biblioteca de componentes nesta fase
- dados tipados e versionados no repositório

A escolha favorece um site majoritariamente estático, SEO, manutenção simples e deploy direto na Vercel. A M4 continua sem banco de dados: ontologia, evidência, extrações e regras analíticas permanecem versionadas no Git.

## Rodando localmente

```bash
npm install
npm run dev
```

Depois abra `http://localhost:3000`.

Para validar o build de produção:

```bash
npm run build
```

## Estrutura

```text
src/
├── app/
│   ├── page.tsx                    # entrada da cartografia
│   ├── comecar/                    # percurso para iniciantes
│   ├── mapa/                       # explorador filtrável
│   ├── concursos/                  # evidências de editais/certames
│   ├── provas/                     # corpus de cadernos reais
│   ├── provas/[id]/                # evidência de uma prova + fingerprint
│   ├── comparar/                   # comparação interativa de trilhas
│   ├── frequencia/                 # frequência de edital + denominador
│   ├── metodologia/                # critérios e limites
│   ├── areas/[slug]/               # visão por família de atuação
│   ├── orgaos/[slug]/              # visão por família institucional
│   ├── conhecimentos/[slug]/       # macrotema + taxonomia fina
│   └── trilhas/[id]/               # árvore de um perfil + proveniência
├── components/
│   ├── CompareExplorer.tsx
│   ├── ExamExplorer.tsx
│   ├── FrequencyExplorer.tsx
│   ├── MapExplorer.tsx
│   └── Nav.tsx
├── data/
│   ├── catalog.ts                  # ontologia + base de editais
│   ├── exams.ts                    # corpus de provas reais
│   └── granular.ts                 # extrações finas + proveniência
└── lib/
    ├── frequency.ts                # formação de coortes e frequência
    └── types.ts
```

## Dois corpora, duas perguntas

A cartografia agora diferencia explicitamente:

1. **Edital/programa** — o universo declarado de assuntos que poderia ser cobrado naquele perfil.
2. **Prova aplicada** — os assuntos efetivamente mobilizados pela banca no caderno observado.

A página `/frequencia` continua calculando presença em **trilhas de edital**. O corpus de `/provas` ainda não entra nesses percentuais.

Isso evita um erro metodológico importante: concluir que um assunto teve alta incidência em questões apenas porque apareceu em muitos programas — ou, no sentido inverso, inferir o escopo completo de um cargo a partir de uma única aplicação.

## Corpus de provas

A M4 inaugura a ingestão com 16 cadernos/recortes. Todos entram inicialmente com `coverage: "parcial"`: já há classificação temática útil, mas ainda não se afirma que cada questão foi exaustivamente rotulada.

Cada prova registra:

- instituição, ciclo, banca e cargo/especialidade;
- família institucional e áreas de TI;
- estrutura conhecida da aplicação;
- macroconhecimentos e tópicos observados;
- página oficial quando confirmada;
- nome do arquivo usado como fonte;
- SHA-256 do arquivo;
- nota sobre a cobertura da curadoria.

Os PDFs não são adicionados ao Git. O hash identifica exatamente o arquivo utilizado sem transformar o repositório em espelho de cadernos protegidos por direitos autorais.

## Frequência

A página `/frequencia` possui dois modos para o corpus de editais:

- **macro**: usa todas as trilhas do recorte e conta presença de macroconhecimentos;
- **granular**: usa somente trilhas já decompostas em tópicos e conta presença de tópicos normalizados.

A unidade estatística é a **trilha/cargo-perfil** e o denominador é sempre exibido. Presença não representa peso, número de questões, dificuldade ou probabilidade futura.

## Próximos marcos

1. classificar o corpus de provas no nível `questão → tópico(s)`;
2. criar uma métrica separada de incidência observada em provas, sempre com denominador explícito;
3. ampliar o corpus com mais bancas, regiões e famílias institucionais;
4. decompor mais editais em tópicos finos para aproximar as duas camadas de evidência;
5. registrar requisitos de formação, região, remuneração e estrutura objetiva da prova de forma normalizada;
6. permitir comparação de mais de duas trilhas e construção de uma trilha pré-edital personalizada;
7. definir pipeline de curadoria e contribuição colaborativa;
8. somente depois consolidar a estratégia de infraestrutura e deploy na Vercel.

## Princípio do projeto

> Não existe “estudar para qualquer concurso”. Existe construir uma base de alto reaproveitamento enquanto você aprende a navegar pelo espaço de oportunidades.

A documentação de marcos e fontes fica em [`docs/`](./docs/).
