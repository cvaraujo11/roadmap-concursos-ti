# Malha territorial usada no mapa

O arquivo `ibge-ufs-min.geojson` é um **snapshot local e versionado** da malha mínima das 27 Unidades da Federação retornada pelo Serviço de Dados do IBGE.

## Fonte primária

- Provedor: Instituto Brasileiro de Geografia e Estatística — IBGE.
- Malha: `https://servicodados.ibge.gov.br/api/v4/malhas/paises/BR?formato=application/vnd.geo+json&qualidade=minima&intrarregiao=UF`
- Metadados de UFs: `https://servicodados.ibge.gov.br/api/v1/localidades/estados`
- Documentação da API de Malhas: `https://servicodados.ibge.gov.br/api/docs/malhas?versao=3`
- Política de Dados Abertos: `https://www.ibge.gov.br/acesso-informacao/dados-abertos.html`

A opção `qualidade=minima` é fornecida pela própria API do IBGE para uma representação simplificada e adequada ao uso em aplicações web. O Roadmap não simplifica nem redesenha as geometrias depois da resposta: apenas associa a cada feature o código da UF, o nome e a sigla obtidos pela API de Localidades.

## Artefatos

- `ibge-ufs-min.geojson`: malha servida pelo próprio domínio da aplicação em `/data/maps/ibge-ufs-min.geojson`.
- `ibge-ufs-min.manifest.json`: origem, parâmetros, instante da coleta, regime de reutilização documentado e SHA-256 do snapshot.

O manifesto é gerado junto do GeoJSON e o build executa `npm run check:data`, que falha se não houver exatamente 27 UFs, se os identificadores esperados não estiverem presentes, se houver geometrias incompatíveis, se a proveniência/direitos esperados estiverem ausentes ou se o SHA-256 divergir.

## Atualização reproduzível

Para atualizar deliberadamente o snapshot:

```bash
npm run data:update:ufs
npm run check:data
```

O gerador está em `scripts/update-ibge-states.mjs`. A atualização exige rede somente no momento explícito de regenerar o dado. **Navegação, build normal e execução do mapa não dependem do IBGE nem de um repositório de terceiros em tempo de execução.**

O arquivo deve ser revisado em PR como qualquer outra mudança de dados: alteração da malha implica alteração do hash e do manifesto.

## Uso, regime de reutilização e atribuição

O snapshot provém de dados públicos disponibilizados pelo IBGE no contexto de sua Política de Dados Abertos. O endpoint consumido pela geração da malha não declara no próprio payload um identificador de licença SPDX ou Creative Commons específico. Por isso, o Roadmap **não inventa nem atribui uma licença mais específica do que a fonte declara**: registra no manifesto a política oficial de dados abertos, mantém a origem auditável e preserva a atribuição `Fonte: Instituto Brasileiro de Geografia e Estatística (IBGE)`.

Essa distinção é deliberada: “dado aberto” descreve o regime de disponibilização do órgão, enquanto um identificador como `CC0-1.0` ou `CC-BY-4.0` só seria registrado caso fosse explicitamente associado pela fonte ao artefato utilizado.

Nenhuma afirmação territorial do catálogo é inferida a partir da malha — ela serve apenas como geometria de visualização das UFs.
