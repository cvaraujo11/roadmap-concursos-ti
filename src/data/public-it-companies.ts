import type { AreaSlug, Contest, ContestLocation, KnowledgeSlug, Track } from "@/lib/types";

export type PublicItCompanyLevel = "estadual" | "municipal";

export interface PublicItCompanyInventoryEntry {
  id: string;
  acronym: string;
  name: string;
  level: PublicItCompanyLevel;
  uf: string;
  municipality?: string;
  legalForm: string;
  officialUrl: string;
  latestRecruitmentContestId?: string;
  auditNote?: string;
}

const VERIFIED_AT = "2026-09-26";

export const publicItCompanies: PublicItCompanyInventoryEntry[] = [
  { id: "prodam-am", acronym: "PRODAM/AM", name: "Processamento de Dados Amazonas S.A.", level: "estadual", uf: "AM", legalForm: "sociedade estatal de tecnologia", officialUrl: "https://prodam.am.gov.br/", latestRecruitmentContestId: "prodam-am-2022" },
  { id: "prodeb", acronym: "PRODEB", name: "Companhia de Processamento de Dados do Estado da Bahia", level: "estadual", uf: "BA", legalForm: "sociedade de economia mista estadual", officialUrl: "https://www.ba.gov.br/prodeb", latestRecruitmentContestId: "prodeb-2018" },
  { id: "etice", acronym: "ETICE", name: "Empresa de Tecnologia da Informação do Ceará", level: "estadual", uf: "CE", legalForm: "empresa pública estadual", officialUrl: "https://www.etice.ce.gov.br/", auditNote: "Há ação no PPA 2024-2027 para contratação de empresa organizadora de concurso, mas nenhum concurso concluído foi localizado até a verificação." },
  { id: "prodemge", acronym: "PRODEMGE", name: "Companhia de Tecnologia da Informação do Estado de Minas Gerais", level: "estadual", uf: "MG", legalForm: "companhia estadual de tecnologia", officialUrl: "https://www.prodemge.gov.br/", latestRecruitmentContestId: "prodemge-2011" },
  { id: "mti-mt", acronym: "MTI/MT", name: "Empresa Mato-Grossense de Tecnologia da Informação", level: "estadual", uf: "MT", legalForm: "empresa pública estadual", officialUrl: "https://www.mti.mt.gov.br/", latestRecruitmentContestId: "mti-2026" },
  { id: "prodepa", acronym: "PRODEPA", name: "Empresa de Tecnologia da Informação e Comunicação do Estado do Pará", level: "estadual", uf: "PA", legalForm: "empresa estadual de TIC", officialUrl: "https://www.prodepa.pa.gov.br/", latestRecruitmentContestId: "prodepa-2023" },
  { id: "codata", acronym: "CODATA", name: "Companhia de Processamento de Dados da Paraíba", level: "estadual", uf: "PB", legalForm: "companhia estadual de processamento de dados", officialUrl: "https://codata.pb.gov.br/", latestRecruitmentContestId: "codata-2022" },
  { id: "etipi", acronym: "ETIPI", name: "Empresa de Tecnologia da Informação do Piauí", level: "estadual", uf: "PI", legalForm: "empresa pública estadual", officialUrl: "https://www.etipi.pi.gov.br/", latestRecruitmentContestId: "etipi-2023" },
  { id: "celepar", acronym: "CELEPAR", name: "Companhia de Tecnologia da Informação e Comunicação do Paraná", level: "estadual", uf: "PR", legalForm: "companhia estadual de TIC", officialUrl: "https://www.celepar.pr.gov.br/", latestRecruitmentContestId: "celepar-2022" },
  { id: "procergs", acronym: "PROCERGS", name: "Centro de Tecnologia da Informação e Comunicação do Estado do Rio Grande do Sul S.A.", level: "estadual", uf: "RS", legalForm: "sociedade anônima estatal", officialUrl: "https://www.procergs.rs.gov.br/", latestRecruitmentContestId: "procergs-2025" },
  { id: "ciasc", acronym: "CIASC", name: "Centro de Informática e Automação de Santa Catarina S.A.", level: "estadual", uf: "SC", legalForm: "sociedade anônima estatal", officialUrl: "https://www.ciasc.sc.gov.br/", latestRecruitmentContestId: "ciasc-2017" },
  { id: "emgetis", acronym: "EMGETIS", name: "Empresa Sergipana de Tecnologia da Informação", level: "estadual", uf: "SE", legalForm: "empresa pública estadual", officialUrl: "https://emgetis.se.gov.br/", latestRecruitmentContestId: "emgetis-prodase-1994" },
  { id: "prodesp", acronym: "PRODESP", name: "Companhia de Processamento de Dados do Estado de São Paulo", level: "estadual", uf: "SP", legalForm: "companhia estadual de processamento de dados", officialUrl: "https://www.prodesp.sp.gov.br/", latestRecruitmentContestId: "prodesp-2013" },

  { id: "emprel", acronym: "EMPREL", name: "Empresa Municipal de Informática", level: "municipal", uf: "PE", municipality: "Recife", legalForm: "empresa pública municipal", officialUrl: "https://www.emprel.gov.br/", latestRecruitmentContestId: "emprel-2023" },
  { id: "prodam-sp", acronym: "PRODAM-SP", name: "Empresa de Tecnologia da Informação e Comunicação do Município de São Paulo", level: "municipal", uf: "SP", municipality: "São Paulo", legalForm: "empresa municipal de TIC", officialUrl: "https://portal.prodam.sp.gov.br/", latestRecruitmentContestId: "prodam-sp-2014" },
  { id: "iplanrio", acronym: "IPLANRIO", name: "Empresa Municipal de Informática", level: "municipal", uf: "RJ", municipality: "Rio de Janeiro", legalForm: "empresa pública municipal", officialUrl: "https://iplanrio.prefeitura.rio/", latestRecruitmentContestId: "iplanrio-2008" },
  { id: "prodabel", acronym: "PRODABEL", name: "Empresa de Informática e Informação do Município de Belo Horizonte S.A.", level: "municipal", uf: "MG", municipality: "Belo Horizonte", legalForm: "empresa municipal de informática", officialUrl: "https://prefeitura.pbh.gov.br/prodabel", latestRecruitmentContestId: "prodabel-2024" },
  { id: "procempa", acronym: "PROCEMPA", name: "Companhia de Processamento de Dados do Município de Porto Alegre", level: "municipal", uf: "RS", municipality: "Porto Alegre", legalForm: "companhia municipal de processamento de dados", officialUrl: "https://prefeitura.poa.br/procempa", latestRecruitmentContestId: "procempa-2022" },
  { id: "belem-digital", acronym: "BELÉM DIGITAL", name: "Companhia de Transformação Digital do Município de Belém", level: "municipal", uf: "PA", municipality: "Belém", legalForm: "companhia municipal de transformação digital", officialUrl: "https://prefeitura.belem.pa.gov.br/secretarias/belem-digital-companhia-de-transformacao-digital-do-municipio-de-belem/", latestRecruitmentContestId: "cinbesa-2017", auditNote: "A companhia se chamava CINBESA no concurso de 2017 e foi renomeada para Belém Digital em 2025." },
  { id: "smart-salvador", acronym: "SMART", name: "Companhia Salvador Cidade Inteligente", level: "municipal", uf: "BA", municipality: "Salvador", legalForm: "sociedade de economia mista municipal", officialUrl: "https://www.salvador.ba.gov.br/", auditNote: "Companhia ativa e voltada a TIC/governo digital; não foi localizado concurso/seleção pública de empregados com documentação suficiente para entrar na cartografia." },
  { id: "ima-campinas", acronym: "IMA", name: "Informática de Municípios Associados S.A.", level: "municipal", uf: "SP", municipality: "Campinas", legalForm: "sociedade anônima controlada pelo Município", officialUrl: "https://www.ima.sp.gov.br/", latestRecruitmentContestId: "ima-campinas-2026" },
  { id: "prodaub", acronym: "PRODAUB", name: "Processamento de Dados de Uberlândia", level: "municipal", uf: "MG", municipality: "Uberlândia", legalForm: "empresa pública municipal", officialUrl: "https://www.uberlandia.mg.gov.br/prefeitura/orgaos-municipais/prodaub/", latestRecruitmentContestId: "prodaub-2023" },
  { id: "cijun", acronym: "CIJUN", name: "Companhia de Informática de Jundiaí", level: "municipal", uf: "SP", municipality: "Jundiaí", legalForm: "sociedade de economia mista municipal", officialUrl: "https://cijun.sp.gov.br/", latestRecruitmentContestId: "cijun-2023" },
  { id: "empro", acronym: "EMPRO", name: "EMPRO Tecnologia e Informação", level: "municipal", uf: "SP", municipality: "São José do Rio Preto", legalForm: "empresa pública municipal", officialUrl: "https://www.empro.com.br/", latestRecruitmentContestId: "empro-2010", auditNote: "O ciclo de 2010 é o último concurso de empregados localizado na pesquisa; a fonte do concurso é arquivística/secundária porque o edital oficial não permaneceu indexado." },
];

const track = (
  id: string,
  name: string,
  areas: AreaSlug[],
  knowledge: KnowledgeSlug[],
  locality: string,
  level: "medio" | "superior" = "superior",
  evidenceNote = "O cargo consta da fonte do certame; macroáreas e conhecimentos são classificação curatorial do Roadmap.",
): Track => ({ id, name, areas, knowledge, coverage: "macro", locality, level, evidenceNote });

export const publicItCompanyContests: Contest[] = [
  {
    id: "prodam-am-2022", institution: "PRODAM/AM", year: 2022, title: "Concurso Público 2022", organizer: "Instituto Quadrix", orgFamily: "empresa-publica", sphere: "estadual", status: "historico",
    sourceUrl: "https://prodam.am.gov.br/acesso-a-informacao/concurso-2022/", sourceLabel: "Página oficial do Concurso 2022", verifiedAt: VERIFIED_AT,
    tracks: [track("prodam-am-2022-ti", "Carreiras de Tecnologia da Informação", ["generalista", "infra-redes", "desenvolvimento"], ["desenvolvimento", "engenharia-software", "infraestrutura", "redes", "banco-dados"], "Amazonas")],
  },
  {
    id: "prodeb-2018", institution: "PRODEB", year: 2018, title: "Processo Seletivo 001/2018", organizer: "Instituto AOCP", orgFamily: "empresa-publica", sphere: "estadual", status: "historico",
    sourceUrl: "https://www.ba.gov.br/administracao/noticia/2024-02/5079/processo-seletivo-com-91-vagas-e-anunciado-pela-prodeb", sourceLabel: "Governo da Bahia / SAEB — processo seletivo de 91 vagas", verifiedAt: VERIFIED_AT,
    tracks: [
      track("prodeb-2018-infra", "Analista/Especialista de TIC — Infraestrutura, Redes, Telecom e Data Center", ["infra-redes", "suporte-operacoes"], ["infraestrutura", "redes", "sistemas-operacionais", "seguranca"], "Bahia"),
      track("prodeb-2018-dev", "Analista/Especialista de TIC — Construção de Software e Web/Mobile", ["desenvolvimento"], ["desenvolvimento", "engenharia-software", "banco-dados"], "Bahia"),
      track("prodeb-2018-requisitos", "Analista/Especialista de TIC — Requisitos, Produto e Processos", ["governanca", "desenvolvimento"], ["processos-negocio", "engenharia-software", "gestao-servicos"], "Bahia"),
      track("prodeb-2018-bi", "Especialista de TIC — Business Intelligence", ["dados"], ["dados-bi", "banco-dados"], "Bahia"),
    ],
  },
  {
    id: "prodemge-2011", institution: "PRODEMGE", year: 2011, title: "Concurso Público 01/2011", organizer: "FUMARC", orgFamily: "empresa-publica", sphere: "estadual", status: "historico",
    sourceUrl: "https://www.prodemge.gov.br/images/EticaPublica/edital.pdf", sourceLabel: "Edital oficial PRODEMGE 01/2011", verifiedAt: VERIFIED_AT,
    tracks: [track("prodemge-2011-analista-tic", "Analista — Tecnologia da Informação e Comunicação (TIC)", ["generalista", "infra-redes", "desenvolvimento"], ["redes", "infraestrutura", "desenvolvimento", "engenharia-software", "banco-dados"], "Minas Gerais")],
  },
  {
    id: "mti-2026", institution: "MTI/MT", year: 2026, title: "Processo Seletivo Simplificado 001/2026", organizer: "MTI", orgFamily: "empresa-publica", sphere: "estadual", status: "homologado",
    sourceUrl: "https://www.mti.mt.gov.br/concursos-e-processos-seletivos", sourceLabel: "Página oficial de concursos e processos seletivos", verifiedAt: VERIFIED_AT,
    tracks: [track("mti-2026-ti", "Contratação temporária — perfis técnicos de TIC", ["generalista"], ["infraestrutura", "redes", "desenvolvimento", "banco-dados", "seguranca"], "Mato Grosso")],
  },
  {
    id: "prodepa-2023", institution: "PRODEPA", year: 2023, title: "Processo Seletivo Simplificado 001/2023", organizer: "PRODEPA / SIPROS", orgFamily: "empresa-publica", sphere: "estadual", status: "historico",
    sourceUrl: "https://www.prodepa.pa.gov.br/node/327", sourceLabel: "Notícia oficial do PSS PRODEPA", verifiedAt: VERIFIED_AT,
    tracks: [
      track("prodepa-2023-seguranca", "Analista de TIC — Segurança da Informação", ["seguranca"], ["seguranca", "redes", "governanca-ti"], "Pará"),
      track("prodepa-2023-dba", "Analista de TIC — Banco de Dados", ["dados"], ["banco-dados", "dados-bi"], "Pará"),
      track("prodepa-2023-suporte", "Analista de TIC — Suporte", ["suporte-operacoes", "infra-redes"], ["infraestrutura", "sistemas-operacionais", "gestao-servicos"], "Pará"),
      track("prodepa-2023-redes", "Analista de TIC — Redes e Comunicação de Dados", ["infra-redes"], ["redes", "infraestrutura", "seguranca"], "Pará"),
    ],
  },
  {
    id: "codata-2022", institution: "CODATA", year: 2022, title: "Concurso Público — Edital 001/2022", organizer: "IDECAN", orgFamily: "empresa-publica", sphere: "estadual", status: "homologado",
    sourceUrl: "https://codata.pb.gov.br/institucional/editais-concursos", sourceLabel: "Página oficial de editais e concursos", verifiedAt: VERIFIED_AT,
    tracks: [track("codata-2022-ti", "Empregos de Tecnologia da Informação", ["generalista"], ["desenvolvimento", "banco-dados", "infraestrutura", "redes", "seguranca"], "Paraíba")],
  },
  {
    id: "etipi-2023", institution: "ETIPI", year: 2023, title: "Processo Seletivo Simplificado — Edital 01/2023", organizer: "ETIPI", orgFamily: "empresa-publica", sphere: "estadual", status: "historico",
    sourceUrl: "https://www.pi.gov.br/etipi-divulga-a-1-convocacao-do-processo-seletivo-simplificado-edital-01-2023/", sourceLabel: "Portal oficial do Governo do Piauí — convocação", verifiedAt: VERIFIED_AT,
    tracks: [
      track("etipi-2023-fullstack", "Especialista — Desenvolvimento Full Stack", ["desenvolvimento"], ["desenvolvimento", "engenharia-software", "banco-dados"], "Piauí"),
      track("etipi-2023-infra", "Especialista — Infraestrutura e Redes", ["infra-redes", "suporte-operacoes"], ["infraestrutura", "redes", "sistemas-operacionais"], "Piauí"),
      track("etipi-2023-dba", "Especialista — Banco de Dados (DBA)", ["dados"], ["banco-dados"], "Piauí"),
      track("etipi-2023-seguranca", "Especialista — Segurança da Informação", ["seguranca"], ["seguranca", "redes", "governanca-ti"], "Piauí"),
      track("etipi-2023-requisitos", "Especialista — Análise de Requisitos", ["desenvolvimento", "governanca"], ["engenharia-software", "processos-negocio"], "Piauí"),
      track("etipi-2023-processos", "Especialista — Análise de Processo de Negócio", ["governanca"], ["processos-negocio", "governanca-ti"], "Piauí"),
      track("etipi-2023-suporte", "Técnico de Suporte", ["suporte-operacoes"], ["infraestrutura", "sistemas-operacionais", "redes"], "Piauí", "medio"),
    ],
  },
  {
    id: "celepar-2022", institution: "CELEPAR", year: 2022, title: "Concurso Público 2022 — Edital 01/2022", organizer: "Instituto Access", orgFamily: "empresa-publica", sphere: "estadual", status: "historico",
    sourceUrl: "https://www.celepar.pr.gov.br/Pagina/Concursos-Celepar", sourceLabel: "Página oficial de concursos da Celepar", verifiedAt: VERIFIED_AT,
    tracks: [track("celepar-2022-ti", "Carreiras de Tecnologia da Informação e Comunicação", ["generalista"], ["desenvolvimento", "engenharia-software", "banco-dados", "infraestrutura", "redes", "seguranca"], "Paraná")],
  },
  {
    id: "procergs-2025", institution: "PROCERGS", year: 2025, title: "Concurso Público 2025 — Edital 17/2025", organizer: "Fundatec", orgFamily: "empresa-publica", sphere: "estadual", status: "homologado",
    sourceUrl: "https://www.procergs.rs.gov.br/concurso-publico-2025", sourceLabel: "Página oficial do Concurso Público 2025", verifiedAt: VERIFIED_AT,
    tracks: [track("procergs-2025-ti", "Carreiras técnicas de Tecnologia da Informação e Comunicação", ["generalista", "desenvolvimento", "infra-redes"], ["desenvolvimento", "engenharia-software", "banco-dados", "infraestrutura", "redes", "seguranca"], "Rio Grande do Sul")],
  },
  {
    id: "ciasc-2017", institution: "CIASC", year: 2017, title: "Concurso Público — Edital 001/2017", organizer: "FEPESE", orgFamily: "empresa-publica", sphere: "estadual", status: "historico",
    sourceUrl: "https://www.ciasc.sc.gov.br/concursos/", sourceLabel: "Página oficial de concursos do CIASC", verifiedAt: VERIFIED_AT,
    tracks: [track("ciasc-2017-ti", "Carreiras de Tecnologia da Informação", ["generalista"], ["desenvolvimento", "infraestrutura", "redes", "banco-dados", "seguranca"], "Santa Catarina")],
  },
  {
    id: "emgetis-prodase-1994", institution: "PRODASE / EMGETIS", year: 1994, title: "Concurso Público SEAD 04/1994 — quadro efetivo da atual EMGETIS", organizer: "SEAD/SE", orgFamily: "empresa-publica", sphere: "estadual", status: "historico",
    sourceUrl: "https://emgetis.se.gov.br/concurso-publico/", sourceLabel: "Página oficial da EMGETIS sobre o último concurso efetivo", verifiedAt: VERIFIED_AT,
    tracks: [track("emgetis-1994-ti", "Quadro efetivo de processamento de dados/TI", ["generalista"], ["desenvolvimento", "infraestrutura", "redes", "banco-dados"], "Sergipe", "superior", "A EMGETIS informa oficialmente que seu último concurso efetivo foi o SEAD 04/1994 da antecessora PRODASE, transformada na atual empresa em 2008 com o mesmo CNPJ. A decomposição temática não foi recuperada.")],
  },
  {
    id: "prodesp-2013", institution: "PRODESP", year: 2013, title: "Concurso Público 001/2013", organizer: "Instituto Zambini", orgFamily: "empresa-publica", sphere: "estadual", status: "historico",
    sourceUrl: "https://www.prodesp.sp.gov.br/concurso-001-2013", sourceLabel: "Página oficial do Concurso 001/2013", verifiedAt: VERIFIED_AT,
    tracks: [track("prodesp-2013-ti", "Carreiras técnicas de processamento de dados e suporte", ["generalista", "infra-redes", "desenvolvimento"], ["desenvolvimento", "infraestrutura", "redes", "banco-dados", "gestao-servicos"], "São Paulo")],
  },
  {
    id: "emprel-2023", institution: "EMPREL", year: 2023, title: "Concurso Público 2023", organizer: "Cebraspe", orgFamily: "empresa-publica", sphere: "municipal", status: "historico",
    sourceUrl: "https://www.emprel.gov.br/abertas-inscricoes-para-concurso-publico-na-emprel", sourceLabel: "Página oficial da EMPREL", verifiedAt: VERIFIED_AT,
    tracks: [
      track("emprel-2023-db", "Analista de Infraestrutura e Suporte — Banco de Dados", ["dados", "suporte-operacoes"], ["banco-dados", "infraestrutura"], "Recife / PE"),
      track("emprel-2023-redes", "Analista de Infraestrutura e Suporte — Redes", ["infra-redes", "suporte-operacoes"], ["redes", "infraestrutura", "seguranca"], "Recife / PE"),
      track("emprel-2023-software-basico", "Analista de Infraestrutura e Suporte — Softwares Básicos", ["suporte-operacoes", "infra-redes"], ["sistemas-operacionais", "infraestrutura"], "Recife / PE"),
      track("emprel-2023-sistemas", "Analista de Sistemas", ["desenvolvimento"], ["desenvolvimento", "engenharia-software", "banco-dados"], "Recife / PE"),
    ],
  },
  {
    id: "prodam-sp-2014", institution: "PRODAM-SP", year: 2014, title: "Seleção Pública 001/2014", organizer: "PRODAM-SP", orgFamily: "empresa-publica", sphere: "municipal", status: "historico",
    sourceUrl: "https://portal.prodam.sp.gov.br/carreiras", sourceLabel: "Página oficial de carreiras e seleções públicas", verifiedAt: VERIFIED_AT,
    tracks: [track("prodam-sp-2014-ti", "Carreiras da empresa municipal de TIC", ["generalista"], ["desenvolvimento", "infraestrutura", "redes", "banco-dados", "gestao-servicos"], "São Paulo / SP", "superior", "A página oficial confirma que a Seleção Pública 001/2014 é a mais recente listada e está expirada. O ciclo foi mantido em nível macro até decomposição do edital.")],
  },
  {
    id: "iplanrio-2008", institution: "IPLANRIO", year: 2008, title: "Concurso Público IPLANRIO 2008", organizer: "Prefeitura do Rio de Janeiro", orgFamily: "empresa-publica", sphere: "municipal", status: "historico",
    sourceUrl: "https://www.rio.rj.gov.br/web/portaldeconcursos/listas/-/asset_publisher/Sv7O/content/iplanrio-2008", sourceLabel: "Portal de Concursos da Prefeitura do Rio — concursos expirados", verifiedAt: VERIFIED_AT,
    tracks: [track("iplanrio-2008-analista", "Analista de Sistemas", ["desenvolvimento", "generalista"], ["desenvolvimento", "engenharia-software", "banco-dados"], "Rio de Janeiro / RJ")],
  },
  {
    id: "prodabel-2024", institution: "PRODABEL", year: 2024, title: "Concurso Público — Edital 1/2024", organizer: "Instituto Consulplan", orgFamily: "empresa-publica", sphere: "municipal", status: "homologado",
    sourceUrl: "https://prefeitura.pbh.gov.br/prodabel/oportunidades-de-trabalho/concurso-publico-1-2024", sourceLabel: "Página oficial da Prefeitura de Belo Horizonte", verifiedAt: VERIFIED_AT,
    tracks: [track("prodabel-2024-tic", "Analista de Tecnologia da Informação — TIC", ["generalista"], ["desenvolvimento", "engenharia-software", "banco-dados", "infraestrutura", "redes", "seguranca"], "Belo Horizonte / MG")],
  },
  {
    id: "procempa-2022", institution: "PROCEMPA", year: 2022, title: "Concurso Público 01/2022", organizer: "Objetiva Concursos", orgFamily: "empresa-publica", sphere: "municipal", status: "homologado",
    sourceUrl: "https://dopaonlineupload.procempa.com.br/dopaonlineupload/4449_ce_369010_1.pdf", sourceLabel: "Edital oficial publicado no DOPA", verifiedAt: VERIFIED_AT,
    tracks: [
      track("procempa-2022-sistemas", "Analista de Tecnologia da Informação e Comunicação — Sistemas", ["desenvolvimento"], ["desenvolvimento", "engenharia-software", "banco-dados"], "Porto Alegre / RS"),
      track("procempa-2022-infra-app", "Analista de TIC — Infraestrutura de Aplicações", ["infra-redes", "suporte-operacoes"], ["infraestrutura", "sistemas-operacionais", "cloud-virtualizacao"], "Porto Alegre / RS"),
    ],
  },
  {
    id: "cinbesa-2017", institution: "CINBESA / BELÉM DIGITAL", year: 2017, title: "Concurso Público PMB-002/2017", organizer: "AOCP", orgFamily: "empresa-publica", sphere: "municipal", status: "historico",
    sourceUrl: "https://www.ioepa.com.br/pages/2017/2017.11.20.DOE.pdf", sourceLabel: "Diário Oficial do Estado do Pará — concurso da CINBESA", verifiedAt: VERIFIED_AT,
    tracks: [
      track("cinbesa-2017-sistemas", "Analista de Sistemas", ["desenvolvimento"], ["desenvolvimento", "engenharia-software", "banco-dados"], "Belém / PA"),
      track("cinbesa-2017-redes", "Administrador/Analista de Redes", ["infra-redes"], ["redes", "infraestrutura", "seguranca"], "Belém / PA"),
      track("cinbesa-2017-seguranca", "Analista de Segurança", ["seguranca"], ["seguranca", "redes", "governanca-ti"], "Belém / PA"),
    ],
  },
  {
    id: "ima-campinas-2026", institution: "IMA Campinas", year: 2026, title: "Concurso Público IMA 01/2026", organizer: "CONSESP", orgFamily: "empresa-publica", sphere: "municipal", status: "homologado",
    sourceUrl: "https://portal-adm.campinas.sp.gov.br/sites/default/files/publicacoes-dom/dom/1864071392330313923318640731.pdf", sourceLabel: "Diário Oficial de Campinas — Concurso IMA 01/2026", verifiedAt: VERIFIED_AT,
    tracks: [
      track("ima-2026-tecnico-atendimento", "Técnico em TI I — Atendimento ao Usuário", ["suporte-operacoes"], ["gestao-servicos", "sistemas-operacionais", "infraestrutura"], "Campinas / SP", "medio"),
      track("ima-2026-tecnico-dev", "Técnico em TI I — Desenvolvimento", ["desenvolvimento"], ["desenvolvimento", "engenharia-software"], "Campinas / SP", "medio"),
      track("ima-2026-devops", "Analista em TI Jr. — DevOps", ["desenvolvimento", "infra-redes"], ["engenharia-software", "cloud-virtualizacao", "infraestrutura"], "Campinas / SP"),
      track("ima-2026-so", "Analista em TI Jr. — Serviços e Sistemas Operacionais", ["infra-redes", "suporte-operacoes"], ["sistemas-operacionais", "infraestrutura", "redes"], "Campinas / SP"),
      track("ima-2026-sistemas", "Analista em TI Jr. — Sistemas", ["desenvolvimento"], ["desenvolvimento", "engenharia-software", "banco-dados"], "Campinas / SP"),
    ],
  },
  {
    id: "prodaub-2023", institution: "PRODAUB", year: 2023, title: "Concurso Público 01/2023", organizer: "Fundep", orgFamily: "empresa-publica", sphere: "municipal", status: "homologado",
    sourceUrl: "https://www.uberlandia.mg.gov.br/prefeitura/orgaos-municipais/prodaub/concurso-prodaub-2023/", sourceLabel: "Página oficial do concurso PRODAUB", verifiedAt: VERIFIED_AT,
    tracks: [track("prodaub-2023-negocios", "Analista de Negócios Júnior", ["governanca", "generalista"], ["processos-negocio", "engenharia-software", "banco-dados", "gestao-servicos"], "Uberlândia / MG")],
  },
  {
    id: "cijun-2023", institution: "CIJUN", year: 2023, title: "Concurso Público 1/2023", organizer: "VUNESP", orgFamily: "empresa-publica", sphere: "municipal", status: "homologado",
    sourceUrl: "https://www.vunesp.com.br/CIJU2301", sourceLabel: "Página da organizadora VUNESP", verifiedAt: VERIFIED_AT,
    tracks: [
      track("cijun-2023-tecnico-infra", "Técnico de TI Jr. — Infraestrutura", ["infra-redes", "suporte-operacoes"], ["infraestrutura", "redes", "sistemas-operacionais"], "Jundiaí / SP", "medio"),
      track("cijun-2023-dev", "Analista de TI Jr. — Desenvolvimento", ["desenvolvimento"], ["desenvolvimento", "engenharia-software", "banco-dados"], "Jundiaí / SP"),
      track("cijun-2023-infra", "Analista de TI Jr. — Infraestrutura e Serviços de Rede", ["infra-redes", "suporte-operacoes"], ["infraestrutura", "redes", "sistemas-operacionais", "seguranca"], "Jundiaí / SP"),
      track("cijun-2023-dados", "Analista de Dados Pleno", ["dados"], ["dados-bi", "banco-dados"], "Jundiaí / SP"),
      track("cijun-2023-seguranca", "Analista de Segurança da Informação Pleno", ["seguranca"], ["seguranca", "redes", "governanca-ti"], "Jundiaí / SP"),
      track("cijun-2023-arq-redes", "Arquiteto de Redes Pleno", ["infra-redes"], ["redes", "infraestrutura", "seguranca"], "Jundiaí / SP"),
      track("cijun-2023-arq-sistemas", "Arquiteto de Sistemas Pleno", ["desenvolvimento"], ["engenharia-software", "desenvolvimento", "banco-dados"], "Jundiaí / SP"),
    ],
  },
  {
    id: "empro-2010", institution: "EMPRO", year: 2010, title: "Concurso Público 2010", organizer: "VUNESP", orgFamily: "empresa-publica", sphere: "municipal", status: "historico",
    sourceUrl: "https://www.pciconcursos.com.br/provas/empro-pref-sao-jose-do-rio-preto-sp", sourceLabel: "Arquivo público de provas do concurso EMPRO/VUNESP 2010", verifiedAt: VERIFIED_AT,
    tracks: [
      track("empro-2010-sistemas", "Analista de Sistemas I", ["desenvolvimento"], ["desenvolvimento", "engenharia-software", "banco-dados"], "São José do Rio Preto / SP"),
      track("empro-2010-suporte", "Analista de Suporte I", ["infra-redes", "suporte-operacoes"], ["infraestrutura", "redes", "sistemas-operacionais"], "São José do Rio Preto / SP"),
      track("empro-2010-tecnico", "Técnico em Suporte I", ["suporte-operacoes"], ["infraestrutura", "sistemas-operacionais", "redes"], "São José do Rio Preto / SP", "medio"),
    ],
  },
];

type GeographySeed = {
  scope: "estado" | "municipio";
  uf: string;
  city?: string;
  latitude: number;
  longitude: number;
  label: string;
};

const contestGeography: Record<string, GeographySeed> = {
  "prodam-am-2022": { scope: "estado", uf: "AM", latitude: -3.119, longitude: -60.0217, label: "Amazonas" },
  "prodeb-2018": { scope: "estado", uf: "BA", latitude: -12.9777, longitude: -38.5016, label: "Bahia" },
  "prodemge-2011": { scope: "estado", uf: "MG", latitude: -19.9167, longitude: -43.9345, label: "Minas Gerais" },
  "mti-2026": { scope: "estado", uf: "MT", latitude: -15.6014, longitude: -56.0979, label: "Mato Grosso" },
  "prodepa-2023": { scope: "estado", uf: "PA", latitude: -1.4558, longitude: -48.4902, label: "Pará" },
  "codata-2022": { scope: "estado", uf: "PB", latitude: -7.1195, longitude: -34.845, label: "Paraíba" },
  "etipi-2023": { scope: "estado", uf: "PI", latitude: -5.0919, longitude: -42.8034, label: "Piauí" },
  "celepar-2022": { scope: "estado", uf: "PR", latitude: -25.4284, longitude: -49.2733, label: "Paraná" },
  "procergs-2025": { scope: "estado", uf: "RS", latitude: -30.0346, longitude: -51.2177, label: "Rio Grande do Sul" },
  "ciasc-2017": { scope: "estado", uf: "SC", latitude: -27.5949, longitude: -48.5482, label: "Santa Catarina" },
  "emgetis-prodase-1994": { scope: "estado", uf: "SE", latitude: -10.9472, longitude: -37.0731, label: "Sergipe" },
  "prodesp-2013": { scope: "estado", uf: "SP", latitude: -23.5505, longitude: -46.6333, label: "São Paulo" },
  "emprel-2023": { scope: "municipio", uf: "PE", city: "Recife", latitude: -8.0476, longitude: -34.877, label: "Recife / PE" },
  "prodam-sp-2014": { scope: "municipio", uf: "SP", city: "São Paulo", latitude: -23.5505, longitude: -46.6333, label: "São Paulo / SP" },
  "iplanrio-2008": { scope: "municipio", uf: "RJ", city: "Rio de Janeiro", latitude: -22.9068, longitude: -43.1729, label: "Rio de Janeiro / RJ" },
  "prodabel-2024": { scope: "municipio", uf: "MG", city: "Belo Horizonte", latitude: -19.9167, longitude: -43.9345, label: "Belo Horizonte / MG" },
  "procempa-2022": { scope: "municipio", uf: "RS", city: "Porto Alegre", latitude: -30.0346, longitude: -51.2177, label: "Porto Alegre / RS" },
  "cinbesa-2017": { scope: "municipio", uf: "PA", city: "Belém", latitude: -1.4558, longitude: -48.4902, label: "Belém / PA" },
  "ima-campinas-2026": { scope: "municipio", uf: "SP", city: "Campinas", latitude: -22.9056, longitude: -47.0608, label: "Campinas / SP" },
  "prodaub-2023": { scope: "municipio", uf: "MG", city: "Uberlândia", latitude: -18.9186, longitude: -48.2772, label: "Uberlândia / MG" },
  "cijun-2023": { scope: "municipio", uf: "SP", city: "Jundiaí", latitude: -23.1857, longitude: -46.8978, label: "Jundiaí / SP" },
  "empro-2010": { scope: "municipio", uf: "SP", city: "São José do Rio Preto", latitude: -20.8113, longitude: -49.3758, label: "São José do Rio Preto / SP" },
};

export const publicItCompanyLocations: ContestLocation[] = publicItCompanyContests.flatMap((contest) => {
  const geography = contestGeography[contest.id];
  if (!geography) return [];
  return contest.tracks.map((item) => ({
    id: `${contest.id}-${item.id}-geo`,
    contestId: contest.id,
    trackId: item.id,
    scope: geography.scope,
    precision: geography.scope === "estado" ? "estado" : "cidade",
    uf: geography.uf,
    city: geography.city,
    latitude: geography.latitude,
    longitude: geography.longitude,
    label: geography.label,
    sourceNote: geography.scope === "estado"
      ? "A âncora visual representa a abrangência estadual do empregador público e não uma lotação municipal específica."
      : "A localização representa a sede/abrangência municipal da empresa pública de TIC e o certame associado.",
  }));
});
