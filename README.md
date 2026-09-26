# Roadmap Concursos TI

Cartografia aberta dos concursos públicos de Tecnologia da Informação no Brasil.

O projeto nasce de uma pergunta recorrente: **“sou de TI e quero estudar para concurso; por onde começo?”**. Em vez de responder com uma lista genérica de disciplinas, o roadmap organiza o espaço de oportunidades por áreas de atuação, famílias institucionais, conhecimentos reaproveitáveis e editais reais usados como evidência.

## Estado atual — M2

A M2 consolida três camadas da cartografia: **cobertura institucional**, **taxonomia de conhecimento** e **proveniência de extrações granulares**.

- percurso guiado para quem ainda não escolheu um concurso;
- mapa filtrável de perfis/trilhas;
- 7 famílias de atuação em TI;
- 6 famílias institucionais;
- base versionada de certames com fonte oficial e data de verificação;
- taxonomia com macroconhecimentos e tópicos finos;
- comparação interativa entre duas trilhas;
- páginas próprias para áreas, famílias institucionais, conhecimentos e trilhas;
- indicação explícita de cobertura `macro` ou `topicos`;
- overlays de extração granular com documento, localização na fonte e data de verificação;
- metodologia que distingue fatos do edital de classificações curatoriais.

A amostra inclui, entre outros, DATAPREV 2026 e 2024, SERPRO 2023, Transpetro 2023.2, UFPE 2023, STJ 2024, TCE-PE 2025, MPES 2026, DPE-RS 2023 e o cargo de ATI no CPNU 2024.

## Stack

- Next.js 15 (App Router)
- TypeScript
- React 19
- CSS próprio, sem biblioteca de componentes nesta fase
- dados tipados e versionados no repositório

A escolha favorece um site majoritariamente estático, SEO, manutenção simples e deploy direto na Vercel. A M2 continua sem banco de dados: primeiro consolidamos ontologia, evidência e experiência de navegação.

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
│   ├── concursos/                  # evidências e fontes
│   ├── comparar/                   # comparação interativa
│   ├── metodologia/                # critérios e limites
│   ├── areas/[slug]/               # visão por família de atuação
│   ├── orgaos/[slug]/              # visão por família institucional
│   ├── conhecimentos/[slug]/       # macrotema + taxonomia fina
│   └── trilhas/[id]/               # árvore de um perfil + proveniência
├── components/
│   ├── CompareExplorer.tsx
│   ├── MapExplorer.tsx
│   └── Nav.tsx
├── data/
│   ├── catalog.ts                  # ontologia + base empírica
│   └── granular.ts                 # extrações finas incrementais
└── lib/
    └── types.ts
```

## Modelo editorial

A cartografia trabalha com camadas diferentes:

1. **Evidência** — instituição, ano, cargo/perfil, banca, localidade, situação e outras informações verificáveis em fonte oficial.
2. **Famílias curatoriais** — categorias como `Infraestrutura e Redes`, `Dados`, `Generalista` e famílias institucionais usadas para conectar nomenclaturas diferentes.
3. **Macroconhecimentos** — blocos como Redes, Banco de Dados, Segurança e Governança, úteis para navegar por toda a base.
4. **Tópicos granulares** — itens como VLAN, IPv6, normalização, COBIT ou ITIL, adicionados quando o conteúdo programático foi efetivamente decomposto.
5. **Proveniência da extração** — quando uma trilha é decomposta, o projeto registra a fonte, a localização aproximada no documento, a data de verificação e uma nota sobre a normalização.

Uma classificação curatorial nunca deve ser apresentada como se fosse texto literal do edital. Cada registro mantém um caminho de volta para a fonte usada como evidência.

## Comparação

A página `/comparar` usa similaridade de Jaccard entre conjuntos de conhecimentos. Há dois níveis:

- **macro**: disponível para toda a base;
- **granular**: aparece somente quando as duas trilhas já possuem tópicos decompostos.

A M2 adiciona uma decomposição granular da ênfase **Transpetro 2023.2 — Análise de Sistemas: Infraestrutura**, tornando possível compará-la no nível de tópicos com o **DATAPREV 2026 — Perfil 6: Gestão de Serviços de TIC**.

Os percentuais não representam dificuldade, importância na prova, peso de disciplina ou chance de aprovação. Eles respondem apenas: **quanto da taxonomia atualmente catalogada é compartilhada por estas duas trilhas?**

## Próximos marcos

1. decompor mais editais em tópicos finos, priorizando concursos com alta utilidade transversal;
2. ampliar universidades/IFs, tribunais, TCE/TCM, MPs, DPEs, Legislativo, bancos e empresas públicas;
3. registrar requisitos de formação, região, remuneração e estrutura objetiva da prova de forma normalizada;
4. introduzir frequência por tópico com denominador explícito e filtros por família de concursos;
5. permitir comparação de mais de duas trilhas e construção de uma trilha pré-edital personalizada;
6. definir pipeline de curadoria e contribuição colaborativa;
7. somente depois consolidar a estratégia de infraestrutura e deploy na Vercel.

## Princípio do projeto

> Não existe “estudar para qualquer concurso”. Existe construir uma base de alto reaproveitamento enquanto você aprende a navegar pelo espaço de oportunidades.

A documentação de marcos e fontes fica em [`docs/`](./docs/).