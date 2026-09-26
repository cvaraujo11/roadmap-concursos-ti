import { topics as baseTopics } from "@/data/catalog";
import type { KnowledgeSlug, Topic } from "@/lib/types";

export type TrackLike = {
  id: string;
  topics?: string[];
  coverage?: "macro" | "topicos";
};

export interface GranularExtraction {
  trackId: string;
  topics: string[];
  sourceUrl: string;
  sourceLabel: string;
  sourceLocation: string;
  verifiedAt: string;
  note: string;
}

export const extraTopics: Topic[] = [
  { slug: "qos", name: "Qualidade de Serviço (QoS)", knowledge: "redes" },
  { slug: "snmp-nat", name: "SNMP e NAT", knowledge: "redes" },
  { slug: "active-directory", name: "Active Directory", knowledge: "sistemas-operacionais" },
  { slug: "apache-iis", name: "Apache e IIS", knowledge: "sistemas-operacionais" },
  { slug: "shell-scripting", name: "Linguagens de script", knowledge: "sistemas-operacionais" },
  { slug: "gestao-projetos", name: "Gestão de projetos", knowledge: "processos-negocio" },

  { slug: "seguranca-fisica-logica", name: "Segurança física e lógica", knowledge: "seguranca" },
  { slug: "operacao-seguranca", name: "Operação e monitoramento de segurança", knowledge: "seguranca" },
  { slug: "malware", name: "Malware", knowledge: "seguranca" },
  { slug: "ataques-aplicacao", name: "Ataques a aplicações web", knowledge: "seguranca" },
  { slug: "sast-dast-iast", name: "SAST, DAST e IAST", knowledge: "seguranca" },
  { slug: "vpn", name: "VPN", knowledge: "seguranca" },
  { slug: "mfa", name: "Autenticação multifator (MFA)", knowledge: "seguranca" },
  { slug: "rbac-abac", name: "RBAC e ABAC", knowledge: "seguranca" },
  { slug: "nist-800-61", name: "NIST SP 800-61", knowledge: "seguranca" },
  { slug: "threat-intel-hunting", name: "Threat intelligence e threat hunting", knowledge: "seguranca" },
  { slug: "mitre-attck", name: "MITRE ATT&CK", knowledge: "seguranca" },
  { slug: "iso-27002", name: "ISO/IEC 27002", knowledge: "seguranca" },
  { slug: "seguranca-iot", name: "Segurança em IoT", knowledge: "seguranca" },

  { slug: "computacao-distribuida", name: "Concorrência e computação distribuída", knowledge: "infraestrutura" },
  { slug: "balanceamento-carga", name: "Balanceamento de carga", knowledge: "infraestrutura" },
  { slug: "containers", name: "Contêineres", knowledge: "cloud-virtualizacao" },
  { slug: "devops", name: "DevOps", knowledge: "engenharia-software" },
  { slug: "cloud-fundamentos", name: "Fundamentos de computação em nuvem", knowledge: "cloud-virtualizacao" },

  { slug: "itil-v3", name: "ITIL v3", knowledge: "gestao-servicos" },
  { slug: "cobit-41", name: "COBIT 4.1", knowledge: "governanca-ti" },

  { slug: "stored-procedures-triggers", name: "Stored procedures e triggers", knowledge: "banco-dados" },
  { slug: "transacoes-bloqueios", name: "Transações e bloqueios", knowledge: "banco-dados" },
  { slug: "desempenho-banco", name: "Desempenho de banco de dados", knowledge: "banco-dados" },

  { slug: "java-ee", name: "Java EE / J2EE", knowledge: "desenvolvimento" },
  { slug: "html-xml", name: "HTML e XML", knowledge: "desenvolvimento" },
  { slug: "fundamentos-engenharia-software", name: "Fundamentos de engenharia de software", knowledge: "engenharia-software" },
];

export const topicCatalog: Topic[] = [...baseTopics, ...extraTopics];

export const granularExtractions: GranularExtraction[] = [
  {
    trackId: "transpetro-infra",
    sourceUrl: "https://transpetro.com.br/lumis/portal/file/fileDownload.jsp?fileId=4028908D88A1B53B018AE286A4C73E3F",
    sourceLabel: "TRANSPETRO/PSP/TERRA/NÍVEL SUPERIOR 2023.2 — Anexo IV",
    sourceLocation: "páginas 36–37 do PDF, Ênfase 4: Análise de Sistemas — Infraestrutura",
    verifiedAt: "2026-09-26",
    note: "A lista abaixo é uma normalização curatorial do conteúdo programático oficial. Um tópico pode condensar vários subitens do edital e não substitui a leitura da fonte.",
    topics: [
      "modelos-osi-tcpip", "qos", "ipv4-ipv6", "dns-dhcp", "protocolos-aplicacao", "snmp-nat",
      "linux", "windows-server", "active-directory", "apache-iis", "shell-scripting",
      "gestao-projetos",
      "seguranca-fisica-logica", "firewall-ids-ips", "operacao-seguranca", "malware", "ataques-aplicacao", "sast-dast-iast", "vpn", "identidade-acesso", "mfa", "rbac-abac",
      "armazenamento-san", "virtualizacao", "computacao-distribuida", "alta-disponibilidade-cluster", "balanceamento-carga", "devops", "containers", "arquitetura-microservicos", "infraestrutura-como-codigo", "cloud-fundamentos",
      "itil-v3", "cobit-41",
      "nist-800-61", "threat-intel-hunting", "vulnerabilidades-pentest", "mitre-attck", "gestao-riscos-seguranca", "continuidade-servicos", "iso-27002", "criptografia-pki", "seguranca-iot",
      "modelagem-dados", "sgbd-relacional", "stored-procedures-triggers", "sql-ddl-dml", "transacoes-bloqueios", "desempenho-banco",
      "estruturas-dados", "fundamentos-engenharia-software", "html-xml", "java", "java-ee"
    ],
  },
];

const extractionsByTrack = new Map(granularExtractions.map((item) => [item.trackId, item]));

export function topicsForTrack(track: TrackLike): string[] {
  return extractionsByTrack.get(track.id)?.topics ?? track.topics ?? [];
}

export function coverageForTrack(track: TrackLike): "macro" | "topicos" {
  return topicsForTrack(track).length > 0 ? "topicos" : (track.coverage ?? "macro");
}

export function extractionForTrack(trackId: string) {
  return extractionsByTrack.get(trackId);
}

export function granularTopicName(slug: string) {
  return topicCatalog.find((item) => item.slug === slug)?.name ?? slug;
}

export function topicDefinition(slug: string) {
  return topicCatalog.find((item) => item.slug === slug);
}

export function topicsByKnowledge(topicSlugs: string[]) {
  const grouped = new Map<KnowledgeSlug, Topic[]>();
  topicSlugs.forEach((slug) => {
    const topic = topicDefinition(slug);
    if (!topic) return;
    const current = grouped.get(topic.knowledge) ?? [];
    current.push(topic);
    grouped.set(topic.knowledge, current);
  });
  return grouped;
}

export function granularTrackCount(tracks: TrackLike[]) {
  return tracks.filter((track) => coverageForTrack(track) === "topicos").length;
}
