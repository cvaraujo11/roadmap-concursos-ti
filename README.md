# Roadmap Concursos TI

Cartografia aberta dos concursos públicos de Tecnologia da Informação no Brasil.

O projeto nasce de uma pergunta recorrente: **“sou de TI e quero estudar para concurso; por onde começo?”**. Em vez de responder com uma lista genérica de disciplinas, o roadmap organiza o espaço de oportunidades por áreas de atuação, famílias institucionais, conhecimentos reaproveitáveis e editais reais usados como evidência.

## M0 — o que já existe

- percurso guiado para quem ainda não escolheu um concurso;
- mapa filtrável de perfis/trilhas;
- famílias de atuação em TI;
- base inicial de certames com fonte oficial e data de verificação;
- matriz experimental de sobreposição entre trilhas;
- página de metodologia distinguindo **fatos do edital** de **classificações curatoriais**.

A amostra inicial inclui DATAPREV 2024, SERPRO 2023 e Transpetro 2023.2. Ela é pequena de propósito: primeiro consolidamos o modelo de dados e a experiência de navegação; depois ampliamos a cobertura.

## Stack

- Next.js (App Router)
- TypeScript
- React
- CSS próprio, sem biblioteca de componentes nesta fase
- dados tipados no repositório (`src/data/catalog.ts`)

A escolha favorece um site majoritariamente estático, SEO, manutenção simples e deploy direto na Vercel. Não há banco de dados na M0.

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
│   ├── page.tsx            # entrada da cartografia
│   ├── comecar/            # percurso para iniciantes
│   ├── mapa/               # explorador filtrável
│   ├── concursos/          # evidências e fontes
│   ├── comparar/           # sobreposição de macrotemas
│   └── metodologia/        # critérios e limites
├── components/
│   ├── MapExplorer.tsx
│   └── Nav.tsx
├── data/
│   └── catalog.ts
└── lib/
    └── types.ts
```

## Modelo editorial

A cartografia trabalha com duas camadas diferentes:

1. **Evidência** — instituição, ano, cargo/perfil, banca, localidade e outras informações verificáveis em fonte oficial.
2. **Síntese curatorial** — categorias como `Infraestrutura e Redes`, `Dados`, `Generalista` e os macrotemas usados para conectar editais que utilizam nomenclaturas diferentes.

Uma classificação curatorial nunca deve ser apresentada como se fosse texto literal do edital. Sempre que possível, cada registro mantém um caminho de volta para a fonte oficial.

## Próximos marcos

1. ampliar a base com universidades/IFs, Judiciário, TCE/TCM, MPs, DPEs e outras empresas públicas;
2. decompor conteúdos programáticos em tópicos finos;
3. calcular frequência e sobreposição a partir dos tópicos extraídos dos editais;
4. criar páginas próprias para áreas, órgãos e conhecimentos;
5. adicionar busca por requisitos/formação, região e banca;
6. definir pipeline de curadoria/contribuição;
7. configurar CI e deploy na Vercel.

## Princípio do projeto

> Não existe “estudar para qualquer concurso”. Existe construir uma base de alto reaproveitamento enquanto você aprende a navegar pelo espaço de oportunidades.

Veja também a [Issue #1](https://github.com/cvaraujo11/roadmap-concursos-ti/issues/1), que descreve o escopo da M0.
