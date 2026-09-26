# ADR 0001 — Malha territorial local derivada das APIs do IBGE

- Status: aceito
- Contexto: M5 — Cartografia geográfica

## Contexto

A primeira versão do mapa geográfico carregava a malha das UFs de um arquivo hospedado em um repositório GitHub de terceiros. Isso criava dependência de disponibilidade, estabilidade de URL, proveniência e política de uso fora do controle do Roadmap.

## Decisão

Versionar no próprio repositório um snapshot GeoJSON das 27 UFs obtido diretamente das APIs oficiais do IBGE, usando `qualidade=minima`, e manter:

- script reproduzível de atualização;
- manifesto de proveniência e direitos;
- SHA-256 do artefato;
- validação automática antes do build;
- atualização deliberada, nunca automática durante deploy.

## Consequências

### Positivas

- runtime independente de host externo para a geometria;
- builds e deploys reproduzem exatamente a malha versionada;
- alterações territoriais aparecem em diff/PR;
- proveniência e integridade ficam auditáveis;
- a aplicação continua compatível com hospedagem estática/Next.js na Vercel.

### Custos

- o repositório passa a armazenar o GeoJSON;
- atualizações do IBGE precisam ser incorporadas deliberadamente;
- o projeto precisa revisar mudanças no snapshot e no manifesto.

## Alternativas rejeitadas

1. **Manter a URL GitHub de terceiros:** menor esforço, mas preserva a dívida de runtime e proveniência.
2. **Consultar o IBGE diretamente no navegador:** melhora a origem, mas mantém dependência externa em runtime e torna a visualização sensível a indisponibilidade/CORS/mudanças da API.
3. **Atualizar a malha em todo build:** reduz trabalho manual, mas torna deploys não determinísticos e permite mudanças geográficas sem revisão.
