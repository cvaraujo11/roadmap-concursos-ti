#!/usr/bin/env node

// Reexecutável: consulta as APIs oficiais do IBGE, valida as 27 UFs e grava um snapshot local.
import { createHash } from "node:crypto";
import { mkdir, writeFile } from "node:fs/promises";
import { dirname, resolve } from "node:path";

const OUTPUT = resolve("public/data/maps/ibge-ufs-min.geojson");
const MANIFEST = resolve("public/data/maps/ibge-ufs-min.manifest.json");

const MESH_URL =
  "https://servicodados.ibge.gov.br/api/v4/malhas/paises/BR?formato=application/vnd.geo+json&qualidade=minima&intrarregiao=UF";
const STATES_URL = "https://servicodados.ibge.gov.br/api/v1/localidades/estados";
const DOCS_URL = "https://servicodados.ibge.gov.br/api/docs/malhas?versao=3";
const OPEN_DATA_URL = "https://www.ibge.gov.br/acesso-informacao/dados-abertos.html";

const EXPECTED_UFS = [
  "AC", "AL", "AP", "AM", "BA", "CE", "DF", "ES", "GO",
  "MA", "MT", "MS", "MG", "PA", "PB", "PR", "PE", "PI",
  "RJ", "RN", "RS", "RO", "RR", "SC", "SP", "SE", "TO",
].sort();

async function fetchJson(url) {
  const response = await fetch(url, {
    headers: {
      accept: "application/json, application/geo+json, application/vnd.geo+json",
      "user-agent": "roadmap-concursos-ti/ibge-snapshot",
    },
  });

  if (!response.ok) {
    throw new Error(`IBGE respondeu ${response.status} para ${url}`);
  }

  return response.json();
}

function stateCode(feature) {
  return String(feature.id ?? feature.properties?.codarea ?? feature.properties?.id ?? "");
}

function assertValidFeatureCollection(collection) {
  if (collection?.type !== "FeatureCollection" || !Array.isArray(collection.features)) {
    throw new Error("A resposta da malha não é um FeatureCollection válido.");
  }

  if (collection.features.length !== 27) {
    throw new Error(`Esperadas 27 UFs; recebidas ${collection.features.length}.`);
  }

  const siglas = collection.features
    .map((feature) => feature.properties?.sigla)
    .filter(Boolean)
    .sort();

  if (JSON.stringify(siglas) !== JSON.stringify(EXPECTED_UFS)) {
    throw new Error(`Conjunto de UFs inesperado: ${siglas.join(", ")}`);
  }

  for (const feature of collection.features) {
    const geometryType = feature.geometry?.type;
    if (!["Polygon", "MultiPolygon"].includes(geometryType)) {
      throw new Error(`Geometria inesperada em ${feature.properties?.sigla}: ${geometryType}`);
    }
  }
}

async function main() {
  const [mesh, states] = await Promise.all([fetchJson(MESH_URL), fetchJson(STATES_URL)]);

  if (!Array.isArray(states) || states.length !== 27) {
    throw new Error(`A API de Localidades retornou ${Array.isArray(states) ? states.length : "formato inválido"} estados.`);
  }

  const metadata = new Map(states.map((state) => [String(state.id), state]));

  const features = mesh.features.map((feature) => {
    const code = stateCode(feature);
    const state = metadata.get(code);
    if (!state) throw new Error(`Não foi possível resolver a UF de código ${code || "vazio"}.`);

    return {
      type: "Feature",
      id: code,
      geometry: feature.geometry,
      properties: {
        cd_geocuf: code,
        nome: state.nome,
        sigla: state.sigla,
      },
    };
  }).sort((a, b) => a.properties.sigla.localeCompare(b.properties.sigla));

  const collection = { type: "FeatureCollection", features };
  assertValidFeatureCollection(collection);

  const serialized = `${JSON.stringify(collection)}\n`;
  const sha256 = createHash("sha256").update(serialized).digest("hex");
  const retrievedAt = new Date().toISOString();

  const manifest = {
    dataset: "Malha mínima das Unidades da Federação do Brasil",
    provider: "Instituto Brasileiro de Geografia e Estatística (IBGE)",
    artifact: "/data/maps/ibge-ufs-min.geojson",
    format: "GeoJSON",
    crs: "coordenadas geográficas fornecidas pela API de Malhas do IBGE",
    featureCount: features.length,
    quality: "minima",
    intraregion: "UF",
    retrievedAt,
    sha256,
    sources: {
      mesh: MESH_URL,
      stateMetadata: STATES_URL,
      documentation: DOCS_URL,
      openDataPolicy: OPEN_DATA_URL,
    },
    rights: {
      status: "Dados públicos disponibilizados pelo IBGE no contexto de sua Política de Dados Abertos.",
      licenseIdentifier: null,
      licenseNote: "O endpoint consumido não declara no payload um identificador de licença SPDX ou Creative Commons específico para esta malha; o projeto preserva a atribuição ao IBGE e registra a política oficial de dados abertos sem inventar uma licença mais específica.",
      attribution: "Fonte: Instituto Brasileiro de Geografia e Estatística (IBGE).",
    },
    generation: {
      script: "scripts/update-ibge-states.mjs",
      transformation: "Junção da malha mínima oficial com nome/sigla da API de Localidades; sem alteração das geometrias retornadas pelo IBGE.",
    },
    note: "O arquivo é versionado no repositório para que o mapa não dependa de uma origem geográfica externa em tempo de execução.",
  };

  await mkdir(dirname(OUTPUT), { recursive: true });
  await writeFile(OUTPUT, serialized, "utf8");
  await writeFile(MANIFEST, `${JSON.stringify(manifest, null, 2)}\n`, "utf8");

  console.log(`Gravado ${OUTPUT} (${features.length} UFs, sha256 ${sha256}).`);
  console.log(`Manifesto: ${MANIFEST}.`);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
