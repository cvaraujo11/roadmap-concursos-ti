# Roadmap Concursos TI

Cartografia aberta dos concursos públicos de Tecnologia da Informação no Brasil.

O projeto nasce de uma pergunta recorrente: **“sou de TI e quero estudar para concurso; por onde começo?”**. Em vez de responder com uma lista genérica de disciplinas, o roadmap organiza o espaço de oportunidades por áreas de atuação, famílias institucionais, conhecimentos reaproveitáveis, editais, provas reais e agora também localização territorial normalizada.

## Estado atual — M5

A M5 acrescenta uma terceira dimensão à cartografia: **onde as trilhas já catalogadas aparecem no território brasileiro**.

- percurso guiado para quem ainda não escolheu um concurso;
- mapa conceitual filtrável de perfis/trilhas;
- mapa geográfico do Brasil em `/mapa-geografico`;
- MapLibre GL JS integrado ao Next.js, sem novo backend;
- localização modelada como relação `certame → trilha → território`, e não como simples string;
- filtros geográficos por área, família institucional, macroconhecimento e ano;
- modo de compatibilidade que usa Jaccard entre macroconhecimentos de uma trilha de referência e trilhas geocodificadas;
- cobertura geográfica explícita: total do recorte, trilhas geocodificadas, UFs representadas e itens ainda sem ponto normalizado;
- `múltiplas localidades` e abrangências nacionais não são convertidas artificialmente em coordenadas;
- corpus de editais e corpus de provas continuam metodologicamente separados;
- frequência de edital permanece com denominador explícito e incidência em prova continua reservada para uma métrica própria.

A M5 foi inspirada no padrão cartográfico do projeto MIT [`Comm4nd0/conflict-map`](https://github.com/Comm4nd0/conflict-map), especialmente no uso do mapa como interface, GeoJSON, camadas de preenchimento/pontos e foco territorial. A arquitetura FastAPI/SQLite/pipeline daquele projeto não foi portada: o Roadmap permanece uma aplicação Next.js com dados versionados no Git.

## Stack

- Next.js 15 (App Router)
- TypeScript
- React 19
- MapLibre GL JS
- CSS próprio
- dados tipados e versionados no repositório

A escolha favorece um site majoritariamente estático, SEO, manutenção simples e deploy direto na Vercel. A M5 continua sem banco de dados: ontologia, evidências, localizações, extrações e regras analíticas permanecem versionadas no Git.

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
│   ├── mapa/                       # explorador conceitual filtrável
│   ├── mapa-geografico/            # mapa territorial do Brasil
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
│   ├── ContestGeoMap.tsx           # MapLibre + filtros + agregações territoriais
│   ├── ExamExplorer.tsx
│   ├── FrequencyExplorer.tsx
│   ├── MapExplorer.tsx
│   └── Nav.tsx
├── data/
│   ├── catalog.ts                  # ontologia + base de editais
│   ├── exams.ts                    # corpus de provas reais
│   ├── geography.ts                # localizações normalizadas + proveniência
│   └── granular.ts                 # extrações finas + proveniência
└── lib/
    ├── frequency.ts                # formação de coortes e frequência
    └── types.ts
```

## Três camadas, perguntas diferentes

A cartografia diferencia explicitamente:

1. **Edital/programa** — o universo declarado de assuntos que poderia ser cobrado naquele perfil.
2. **Prova aplicada** — os assuntos efetivamente mobilizados pela banca no caderno observado.
3. **Geografia** — onde a trilha possui localização suficientemente normalizada para ser representada sem inventar precisão.

Essas três camadas não compartilham automaticamente o mesmo denominador.

## Cartografia geográfica

A localização é armazenada em `ContestLocation`, com certame, trilha, escopo, precisão, UF/cidade, coordenadas e nota de proveniência.

O modo padrão de `/mapa-geografico` agrega **trilhas distintas** por UF. Portanto, um estado mais intenso significa apenas que mais trilhas geocodificadas do recorte estão associadas a ele. Não significa mais vagas, maior recorrência histórica de concursos ou maior probabilidade de oportunidade futura.

O modo de compatibilidade permite escolher uma trilha de referência. A visualização usa Jaccard entre macroconhecimentos e mostra, em cada UF, o maior reaproveitamento macro observado entre as trilhas geocodificadas do recorte.

A cobertura incompleta permanece visível. Perfis descritos somente como `múltiplas localidades` ou com abrangência nacional aparecem fora do mapa até uma decomposição documental suficientemente precisa.

## Corpus de provas

A M4 inaugurou a ingestão de cadernos reais. Todos entram inicialmente com `coverage: "parcial"`: já há classificação temática útil, mas ainda não se afirma que cada questão foi exaustivamente rotulada.

Cada prova registra instituição, ciclo, banca, cargo/especialidade, estrutura conhecida, temas observados, fonte e SHA-256 do arquivo usado na curadoria. Os PDFs não são adicionados ao Git.

## Frequência

A página `/frequencia` continua operando apenas sobre o corpus de editais:

- **macro**: todas as trilhas elegíveis do recorte;
- **granular**: somente trilhas cujo programa já foi decomposto em tópicos.

Presença não representa peso, número de questões, dificuldade ou probabilidade futura.

## Próximos marcos

1. decompor as localidades ainda registradas como `múltiplas localidades`;
2. substituir a malha estadual carregada remotamente por uma malha brasileira simplificada e versionada com origem/licença explícitas;
3. separar, quando necessário, local de prova, lotação, exercício e abrangência;
4. classificar o corpus de provas no nível `questão → tópico(s)`;
5. criar uma métrica separada de incidência observada em provas;
6. permitir camada opcional de provas no mapa sem misturá-la ao catálogo de editais;
7. ampliar o corpus com mais regiões, bancas e famílias institucionais;
8. somente depois consolidar infraestrutura e deploy na Vercel.

## Princípio do projeto

> Não existe “estudar para qualquer concurso”. Existe construir uma base de alto reaproveitamento enquanto você aprende a navegar pelo espaço de oportunidades.

A documentação de marcos e fontes fica em [`docs/`](./docs/).
