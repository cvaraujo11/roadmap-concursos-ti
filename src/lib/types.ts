export type AreaSlug =
  | "infra-redes"
  | "desenvolvimento"
  | "dados"
  | "seguranca"
  | "governanca"
  | "suporte-operacoes"
  | "generalista";

export type OrgFamily =
  | "empresa-publica"
  | "universidade-if"
  | "judiciario"
  | "controle"
  | "mp-dpe"
  | "executivo";

export type KnowledgeSlug =
  | "redes"
  | "infraestrutura"
  | "sistemas-operacionais"
  | "cloud-virtualizacao"
  | "seguranca"
  | "desenvolvimento"
  | "engenharia-software"
  | "banco-dados"
  | "dados-bi"
  | "governanca-ti"
  | "gestao-servicos"
  | "processos-negocio";

export type TopicSlug = string;

export interface Area {
  slug: AreaSlug;
  name: string;
  shortName: string;
  description: string;
  starterTopics: KnowledgeSlug[];
}

export interface Knowledge {
  slug: KnowledgeSlug;
  name: string;
  description: string;
}

export interface Topic {
  slug: TopicSlug;
  name: string;
  knowledge: KnowledgeSlug;
  description?: string;
}

export interface Track {
  id: string;
  name: string;
  areas: AreaSlug[];
  knowledge: KnowledgeSlug[];
  topics?: TopicSlug[];
  coverage?: "macro" | "topicos";
  locality?: string;
  level: "medio" | "superior";
  requirements?: string;
  statusNote?: string;
  evidenceNote: string;
}

export interface Contest {
  id: string;
  institution: string;
  year: number;
  title: string;
  organizer: string;
  orgFamily: OrgFamily;
  sphere: "federal" | "estadual" | "municipal";
  status?: "em-andamento" | "realizado" | "homologado" | "historico";
  sourceUrl: string;
  sourceLabel: string;
  verifiedAt: string;
  tracks: Track[];
}

export interface OrgFamilyMeta {
  slug: OrgFamily;
  name: string;
  description: string;
}
