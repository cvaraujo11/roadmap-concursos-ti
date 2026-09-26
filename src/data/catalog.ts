import type { Area, Contest, Knowledge, OrgFamilyMeta } from "@/lib/types";

export const areas: Area[] = [
  {
    slug: "infra-redes",
    name: "Infraestrutura e Redes",
    shortName: "Infra & Redes",
    description: "Redes, servidores, sistemas operacionais, virtualização, nuvem e sustentação de ambientes.",
    starterTopics: ["redes", "infraestrutura", "sistemas-operacionais", "cloud-virtualizacao", "seguranca"],
  },
  {
    slug: "desenvolvimento",
    name: "Desenvolvimento e Engenharia de Software",
    shortName: "Desenvolvimento",
    description: "Programação, arquitetura de software, APIs, testes, DevOps e engenharia de software.",
    starterTopics: ["desenvolvimento", "engenharia-software", "banco-dados", "seguranca"],
  },
  {
    slug: "dados",
    name: "Dados e Banco de Dados",
    shortName: "Dados",
    description: "Modelagem, SQL, SGBDs, engenharia e análise de dados, BI e ecossistemas de dados.",
    starterTopics: ["banco-dados", "dados-bi", "desenvolvimento"],
  },
  {
    slug: "seguranca",
    name: "Segurança da Informação",
    shortName: "Segurança",
    description: "Segurança de redes e sistemas, gestão de riscos, controles, resposta a incidentes e proteção de dados.",
    starterTopics: ["seguranca", "redes", "sistemas-operacionais", "governanca-ti"],
  },
  {
    slug: "governanca",
    name: "Governança, Gestão e Processos de TI",
    shortName: "Governança",
    description: "Governança de TI, gestão de serviços, processos, contratação, projetos e alinhamento ao negócio.",
    starterTopics: ["governanca-ti", "gestao-servicos", "processos-negocio"],
  },
  {
    slug: "suporte-operacoes",
    name: "Suporte, Operações e Datacenter",
    shortName: "Operações",
    description: "Operação de ambientes, monitoramento, atendimento, datacenter, continuidade e sustentação.",
    starterTopics: ["infraestrutura", "sistemas-operacionais", "redes", "gestao-servicos"],
  },
  {
    slug: "generalista",
    name: "Analista de TI Generalista",
    shortName: "Generalista",
    description: "Perfis que cobram um núcleo amplo de TI e misturam desenvolvimento, dados, infraestrutura, segurança e gestão.",
    starterTopics: ["redes", "desenvolvimento", "banco-dados", "seguranca", "governanca-ti"],
  },
];

export const knowledge: Knowledge[] = [
  { slug: "redes", name: "Redes de Computadores", description: "Modelos em camadas, Ethernet, TCP/IP, roteamento, switching, serviços e protocolos." },
  { slug: "infraestrutura", name: "Infraestrutura", description: "Servidores, armazenamento, datacenter, alta disponibilidade, backup e continuidade." },
  { slug: "sistemas-operacionais", name: "Sistemas Operacionais", description: "Administração, processos, memória, arquivos, Linux/Windows e serviços de sistema." },
  { slug: "cloud-virtualizacao", name: "Cloud e Virtualização", description: "Máquinas virtuais, contêineres, nuvem, orquestração e infraestrutura como código." },
  { slug: "seguranca", name: "Segurança da Informação", description: "Controles, criptografia, identidade, redes seguras, riscos e incidentes." },
  { slug: "desenvolvimento", name: "Desenvolvimento", description: "Linguagens, APIs, web, orientação a objetos, estruturas e práticas de implementação." },
  { slug: "engenharia-software", name: "Engenharia de Software", description: "Requisitos, arquitetura, testes, qualidade, métodos ágeis, DevOps e ciclo de vida." },
  { slug: "banco-dados", name: "Banco de Dados", description: "Modelagem, SQL, normalização, transações, índices e administração de SGBDs." },
  { slug: "dados-bi", name: "Dados, BI e Analytics", description: "ETL/ELT, data warehouse, BI, análise e fundamentos de engenharia de dados." },
  { slug: "governanca-ti", name: "Governança de TI", description: "Estruturas de governança, controles, riscos, planejamento e conformidade." },
  { slug: "gestao-servicos", name: "Gestão de Serviços", description: "Operação, suporte, catálogo, incidentes, mudanças, níveis de serviço e melhoria contínua." },
  { slug: "processos-negocio", name: "Processos de Negócio", description: "Modelagem de processos, requisitos, análise de negócio e integração entre TI e organização." },
];

export const orgFamilies: OrgFamilyMeta[] = [
  { slug: "empresa-publica", name: "Empresas públicas e estatais", description: "Empresas de tecnologia, energia, logística, bancos e outras estatais com carreiras próprias de TI." },
  { slug: "universidade-if", name: "Universidades e Institutos Federais", description: "Cargos técnico-administrativos, especialmente Analista de TI e Técnico de TI, com perfis generalistas ou especializados." },
  { slug: "judiciario", name: "Judiciário", description: "Tribunais e conselhos, com especialidades como infraestrutura, desenvolvimento, segurança e suporte." },
  { slug: "controle", name: "Controle", description: "TCEs, TCMs e órgãos de controle com cobrança forte de tecnologia, dados, auditoria e governança." },
  { slug: "mp-dpe", name: "MPs e Defensorias", description: "Carreiras de apoio técnico com perfis de TI generalistas e especializados." },
  { slug: "executivo", name: "Executivo e autarquias", description: "Órgãos da administração direta, agências e autarquias com carreiras transversais ou próprias de TI." },
];

export const contests: Contest[] = [
  {
    id: "dataprev-2024",
    institution: "DATAPREV",
    year: 2024,
    title: "Concurso Público 2024",
    organizer: "FGV",
    orgFamily: "empresa-publica",
    sphere: "federal",
    sourceUrl: "https://portal.dataprev.gov.br/conheca-dataprev-faca-parte-da-dataprev-concursos/concurso-publico-2024",
    sourceLabel: "Página oficial do concurso",
    verifiedAt: "2026-09-26",
    tracks: [
      {
        id: "dataprev-arquitetura-sustentacao",
        name: "Analista de TI — Arquitetura, Engenharia e Sustentação Tecnológica",
        areas: ["infra-redes", "suporte-operacoes"],
        knowledge: ["redes", "infraestrutura", "sistemas-operacionais", "cloud-virtualizacao", "seguranca"],
        locality: "múltiplas localidades",
        level: "superior",
        evidenceNote: "O enquadramento em áreas e macrotemas é curatorial; a existência do perfil e das localidades é verificada no edital oficial.",
      },
      {
        id: "dataprev-desenvolvimento",
        name: "Analista de TI — Desenvolvimento de Software",
        areas: ["desenvolvimento"],
        knowledge: ["desenvolvimento", "engenharia-software", "banco-dados", "seguranca"],
        locality: "múltiplas localidades",
        level: "superior",
        evidenceNote: "Macrotemas usados para navegação; consulte o edital para o conteúdo programático integral.",
      },
      {
        id: "dataprev-inteligencia",
        name: "Analista de TI — Inteligência da Informação",
        areas: ["dados"],
        knowledge: ["banco-dados", "dados-bi", "desenvolvimento"],
        locality: "múltiplas localidades",
        level: "superior",
        evidenceNote: "Macrotemas usados para navegação; consulte o edital para o conteúdo programático integral.",
      },
      {
        id: "dataprev-seguranca",
        name: "Analista de TI — Segurança Cibernética e Proteção de Dados",
        areas: ["seguranca"],
        knowledge: ["seguranca", "redes", "sistemas-operacionais", "governanca-ti"],
        locality: "múltiplas localidades",
        level: "superior",
        evidenceNote: "Macrotemas usados para navegação; consulte o edital para o conteúdo programático integral.",
      },
      {
        id: "dataprev-servicos",
        name: "Analista de TI — Gestão de Serviços de TIC",
        areas: ["governanca", "suporte-operacoes"],
        knowledge: ["gestao-servicos", "governanca-ti", "processos-negocio", "infraestrutura"],
        locality: "Brasília, Rio de Janeiro e São Paulo",
        level: "superior",
        evidenceNote: "Macrotemas usados para navegação; consulte o edital para o conteúdo programático integral.",
      },
    ],
  },
  {
    id: "serpro-2023",
    institution: "SERPRO",
    year: 2023,
    title: "Concurso Público — Analista, Especialização Tecnologia",
    organizer: "Cebraspe",
    orgFamily: "empresa-publica",
    sphere: "federal",
    sourceUrl: "https://www.transparencia.serpro.gov.br/acesso-a-informacao/servidores/concurso-publico/concurso-publico-2023",
    sourceLabel: "Portal oficial do SERPRO",
    verifiedAt: "2026-09-26",
    tracks: [
      {
        id: "serpro-tecnologia",
        name: "Analista — Especialização: Tecnologia",
        areas: ["generalista", "desenvolvimento", "dados", "infra-redes"],
        knowledge: ["desenvolvimento", "engenharia-software", "banco-dados", "redes", "seguranca", "governanca-ti"],
        locality: "múltiplas localidades",
        level: "superior",
        evidenceNote: "O edital oficial confirma o cargo e a especialização; os macrotemas são uma síntese navegacional do escopo de TI.",
      },
    ],
  },
  {
    id: "transpetro-2023-2",
    institution: "TRANSPETRO",
    year: 2023,
    title: "PSP Terra — Nível Superior 2023.2",
    organizer: "Fundação Cesgranrio",
    orgFamily: "empresa-publica",
    sphere: "federal",
    sourceUrl: "https://transpetro.com.br/lumis/portal/file/fileDownload.jsp?fileId=4028908D88A1B53B018AE286A4C73E3F",
    sourceLabel: "Edital/anexo oficial da Transpetro",
    verifiedAt: "2026-09-26",
    tracks: [
      {
        id: "transpetro-infra",
        name: "Profissional Transpetro NS Júnior — Análise de Sistemas: Infraestrutura",
        areas: ["infra-redes", "suporte-operacoes"],
        knowledge: ["redes", "infraestrutura", "sistemas-operacionais", "cloud-virtualizacao", "seguranca"],
        locality: "Rio de Janeiro",
        level: "superior",
        evidenceNote: "A ênfase e o polo constam do documento oficial; os macrotemas servem como classificação curatorial.",
      },
      {
        id: "transpetro-seguranca",
        name: "Profissional Transpetro NS Júnior — Segurança Cibernética e da Informação",
        areas: ["seguranca"],
        knowledge: ["seguranca", "redes", "sistemas-operacionais", "governanca-ti"],
        locality: "Rio de Janeiro",
        level: "superior",
        evidenceNote: "A ênfase e o polo constam do documento oficial; os macrotemas servem como classificação curatorial.",
      },
      {
        id: "transpetro-processos",
        name: "Profissional Transpetro NS Júnior — Análise de Sistemas: Processos de Negócios",
        areas: ["governanca"],
        knowledge: ["processos-negocio", "governanca-ti", "gestao-servicos", "engenharia-software"],
        locality: "Rio de Janeiro",
        level: "superior",
        evidenceNote: "A ênfase e o polo constam do documento oficial; os macrotemas servem como classificação curatorial.",
      },
    ],
  },
];

export const allTracks = contests.flatMap((contest) =>
  contest.tracks.map((track) => ({ ...track, contest }))
);

export function knowledgeName(slug: string) {
  return knowledge.find((item) => item.slug === slug)?.name ?? slug;
}

export function areaName(slug: string) {
  return areas.find((item) => item.slug === slug)?.name ?? slug;
}
