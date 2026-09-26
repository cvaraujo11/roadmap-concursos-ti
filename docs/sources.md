# Fontes da cartografia

As URLs oficiais usadas por cada certame ficam versionadas junto dos dados em `src/data/catalog.ts`. Extrações finas também registram documento, localização e nota de normalização em `src/data/granular.ts`.

## Fontes institucionais

- DATAPREV 2026 — FGV Conhecimento: https://conhecimento.fgv.br/concursos/dataprev26
- UFPE TAE 2023 — PROGEPE/UFPE: https://www.neppag.ufpe.br/progepe/concurso-de-tecnicos-administrativos
- STJ 2024 — portal institucional de concursos: https://www.stj.jus.br/sites/portalp/Institucional/Concursos
- TCE-PE 2025/2026 — portal institucional do concurso: https://www.tcepe.tc.br/internet/index.php/portal-da-transparencia/212-transparencia/concursos
- MPES 2026 — FGV Conhecimento: https://conhecimento.fgv.br/concursos/mpes26
- CPNU 2024 / ATI — MGI: https://www.gov.br/gestao/pt-br/concursonacional/editais/edital-cpnu-bloco-2-10jan2024.pdf/view

## Extrações granulares usadas pela M3

A frequência granular só considera trilhas com tópicos efetivamente decompostos. Na M3, o conjunto inicial elegível é formado pelas trilhas abaixo; os filtros da interface podem reduzir esse denominador.

### DATAPREV 2026 — Perfil 6: Gestão de Serviços de TIC

- fonte: página oficial do concurso na FGV e edital retificado;
- localização: conteúdo programático específico do Perfil 6;
- URL: https://conhecimento.fgv.br/concursos/dataprev26

A decomposição está versionada no catálogo-base. A taxonomia normaliza os itens do edital em tópicos comparáveis; ela não reproduz necessariamente os títulos literais da fonte.

### UFPE 2023 — Analista de Tecnologia da Informação, Área: Sistemas

- fonte: página oficial do concurso TAE 2023 da UFPE, Edital 10/2023 e retificações;
- localização: conteúdo programático de Analista de Tecnologia da Informação — Área: Sistemas;
- URL: https://www.neppag.ufpe.br/progepe/concurso-de-tecnicos-administrativos

A decomposição está versionada no catálogo-base e usa a taxonomia do projeto para permitir comparação com outros cargos de desenvolvimento e sistemas.

### Transpetro 2023.2 — Análise de Sistemas: Infraestrutura

- fonte: edital/anexo oficial do PSP Terra 2023.2;
- documento: `TRANSPETRO/PSP/TERRA/NÍVEL SUPERIOR 2023.2`, Anexo IV;
- localização usada na extração: páginas 36–37 do PDF;
- URL: https://transpetro.com.br/lumis/portal/file/fileDownload.jsp?fileId=4028908D88A1B53B018AE286A4C73E3F

A extração foi convertida em tópicos comuns da cartografia para permitir comparações com outros editais. Sempre que um rótulo do projeto condensar mais de um item do edital, a fonte oficial prevalece como referência.

## Leitura das frequências

As fontes acima sustentam a presença dos tópicos nas trilhas decompostas, mas **não** transformam a amostra em uma estimativa de incidência nacional. A página `/frequencia` mostra o denominador efetivo de cada recorte e o manifesto das trilhas que entram no cálculo.
