# M5 — Geodados auditáveis

Este documento registra o fechamento da dívida técnica da primeira versão da M5: a aplicação não depende mais de uma malha estadual hospedada por um repositório de terceiros em tempo de execução.

## Estado atual

- **Fonte da geometria:** API de Malhas do Instituto Brasileiro de Geografia e Estatística (IBGE).
- **Recorte:** Brasil, 27 Unidades da Federação.
- **Qualidade:** `minima`, opção de simplificação oferecida pela própria API do IBGE.
- **Metadados:** API de Localidades do IBGE.
- **Artefato servido:** `public/data/maps/ibge-ufs-min.geojson`.
- **Proveniência:** `public/data/maps/ibge-ufs-min.manifest.json`.
- **Integridade:** SHA-256 do GeoJSON registrado no manifesto e conferido antes do build.
- **Runtime:** o navegador consulta somente `/data/maps/ibge-ufs-min.geojson` no próprio domínio da aplicação.

## Pipeline deliberado de atualização

```text
APIs oficiais do IBGE
        │
        ▼
scripts/update-ibge-states.mjs
        │
        ├── valida 27 UFs
        ├── associa código + nome + sigla
        ├── preserva as geometrias retornadas
        ├── calcula SHA-256
        ▼
public/data/maps/
        ├── ibge-ufs-min.geojson
        └── ibge-ufs-min.manifest.json
        │
        ▼
scripts/validate-map-data.mjs
        │
        ├── confere UFs e geometrias
        ├── confere proveniência/direitos
        └── confere SHA-256
        ▼
next build
```

A atualização do snapshot não ocorre implicitamente durante deploy ou build. Ela exige a execução deliberada de:

```bash
npm run data:update:ufs
npm run check:data
```

Isso faz a mudança da malha aparecer como diff versionado e revisável em PR.

## Direitos e atribuição

O manifesto registra a Política de Dados Abertos do IBGE e a atribuição ao órgão. Como o endpoint utilizado não declara no payload um identificador SPDX ou Creative Commons específico, o projeto registra `licenseIdentifier: null` em vez de presumir uma licença. Essa ausência explícita é validada no build para evitar que uma licença não sustentada seja introduzida acidentalmente.

## Critério de aceite

A dívida é considerada encerrada quando:

1. não existe URL remota de malha no código de runtime;
2. o mapa usa o snapshot local versionado;
3. o snapshot possui origem, parâmetros, data de coleta e hash;
4. o build falha se o snapshot ou o manifesto forem inconsistentes;
5. a atualização pode ser reproduzida usando somente os endpoints oficiais documentados;
6. a documentação não atribui ao IBGE uma licença específica que a fonte consumida não declare.
