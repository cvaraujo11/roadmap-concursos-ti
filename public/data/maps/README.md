# Malha territorial usada no mapa

O arquivo `ibge-ufs-min.geojson` é um **snapshot local e versionado** da malha mínima das 27 Unidades da Federação retornada pelo Serviço de Dados do IBGE.

## Fonte primária

- Provedor: Instituto Brasileiro de Geografia e Estatística — IBGE.
- Malha: `https://servicodados.ibge.gov.br/api/v4/malhas/paises/BR?formato=application/vnd.geo+json&qualidade=minima&intrarregiao=UF`
- Metadados de UFs: `https://servicodados.ibge.gov.br/api/v1/localidades/estados`
- Documentação da API de Malhas: `https://servicodados.ibge.gov.br/api/docs/malhas?versao=3`

A opção `qualidade=minima` é fornecida pela própria API do IBGE para uma representação simplificada e adequada ao uso em aplicações web. O Roadmap não simplifica nem redesenha as geometrias depois da resposta: apenas associa a cada feature o código da UF, o nome e a sigla obtidos pela API de Localidades.

## Artefatos

- `ibge-ufs-min.geojson`: malha servida pelo próprio domínio da aplicação em `/data/maps/ibge-ufs-min.geojson`.
- `ibge-ufs-min.manifest.json`: origem, parâmetros, instante da coleta e SHA-256 do snapshot.

O manifesto é gerado junto do GeoJSON e o build executa `npm run check:data`, que falha se não houver exatamente 27 UFs, se os identificadores esperados não estiverem presentes, se houver geometrias incompatíveis ou se o SHA-256 divergir.

## Atualização reproduzível

Para atualizar deliberadamente o snapshot:

```bash
npm run data:update:ufs
npm run check:data
```

O gerador está em `scripts/update-ibge-states.mjs`. A atualização exige rede somente no momento explícito de regenerar o dado. **Navegação, build normal e execução do mapa não dependem do IBGE nem de um repositório de terceiros em tempo de execução.**

O arquivo deve ser revisado em PR como qualquer outra mudança de dados: alteração da malha implica alteração do hash e do manifesto.

## Uso e atribuição

A fonte geográfica é identificada como IBGE no manifesto e nesta documentação. O projeto preserva a referência ao provedor e aos endpoints que produziram o snapshot; nenhuma afirmação territorial do catálogo é inferida a partir da malha — ela serve apenas como geometria de visualização das UFs.
