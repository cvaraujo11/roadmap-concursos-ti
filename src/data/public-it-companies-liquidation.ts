import type { Contest, ContestLocation } from "@/lib/types";
import type { PublicItCompanyInventoryEntry } from "./public-it-companies";

export const publicItCompaniesInLiquidation: PublicItCompanyInventoryEntry[] = [
  {
    id: "coderp",
    acronym: "CODERP",
    name: "Companhia de Desenvolvimento Econômico de Ribeirão Preto",
    level: "municipal",
    uf: "SP",
    municipality: "Ribeirão Preto",
    legalForm: "sociedade de economia mista municipal em liquidação",
    officialUrl: "https://www.ribeiraopreto.sp.gov.br/portal/coderp/",
    latestRecruitmentContestId: "coderp-2009",
    auditNote: "A Prefeitura informa que a companhia está em liquidação desde 23/02/2022, mas ela continuava executando serviços essenciais de TIC durante o processo; por isso permanece no inventário com status explícito, sem ser tratada como empresa em operação ordinária.",
  },
];

export const publicItCompanyLiquidationContests: Contest[] = [
  {
    id: "coderp-2009",
    institution: "CODERP",
    year: 2009,
    title: "Concurso Público 1/2009",
    organizer: "CODERP / Município de Ribeirão Preto",
    orgFamily: "empresa-publica",
    sphere: "municipal",
    status: "historico",
    sourceUrl: "https://www.ribeiraopreto.sp.gov.br/concurso/coderp",
    sourceLabel: "Portal oficial de concursos e processos seletivos da CODERP",
    verifiedAt: "2026-09-26",
    tracks: [
      {
        id: "coderp-2009-java",
        name: "Programador de Sistemas — Java",
        areas: ["desenvolvimento"],
        knowledge: ["desenvolvimento", "engenharia-software", "banco-dados"],
        coverage: "macro",
        locality: "Ribeirão Preto / SP",
        level: "superior",
        evidenceNote: "O portal oficial lista o Concurso Público 1/2009 como ciclo mais recente da CODERP e identifica o emprego Programador Sistemas Java. Os macroconhecimentos são classificação curatorial do Roadmap.",
      },
    ],
  },
];

export const publicItCompanyLiquidationLocations: ContestLocation[] = [
  {
    id: "coderp-2009-java-ribeirao-preto",
    contestId: "coderp-2009",
    trackId: "coderp-2009-java",
    scope: "municipio",
    precision: "cidade",
    uf: "SP",
    city: "Ribeirão Preto",
    latitude: -21.1699,
    longitude: -47.8099,
    label: "Ribeirão Preto / SP",
    sourceNote: "A localização representa o município controlador. A empresa está em liquidação desde 2022, condição preservada no inventário institucional.",
  },
];
