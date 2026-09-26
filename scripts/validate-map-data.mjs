#!/usr/bin/env node

import { createHash } from "node:crypto";
import { readFile } from "node:fs/promises";
import { resolve } from "node:path";

const GEOJSON = resolve("public/data/maps/ibge-ufs-min.geojson");
const MANIFEST = resolve("public/data/maps/ibge-ufs-min.manifest.json");

const EXPECTED_UFS = [
  "AC", "AL", "AP", "AM", "BA", "CE", "DF", "ES", "GO",
  "MA", "MT", "MS", "MG", "PA", "PB", "PR", "PE", "PI",
  "RJ", "RN", "RS", "RO", "RR", "SC", "SP", "SE", "TO",
].sort();

function fail(message) {
  console.error(`map-data: ${message}`);
  process.exit(1);
}

const [raw, manifestRaw] = await Promise.all([
  readFile(GEOJSON, "utf8"),
  readFile(MANIFEST, "utf8"),
]);

const geojson = JSON.parse(raw);
const manifest = JSON.parse(manifestRaw);

if (geojson.type !== "FeatureCollection" || !Array.isArray(geojson.features)) {
  fail("o artefato não é um FeatureCollection GeoJSON válido");
}

if (geojson.features.length !== 27) {
  fail(`esperadas 27 UFs; encontradas ${geojson.features.length}`);
}

const ufs = geojson.features.map((feature) => feature.properties?.sigla).sort();
if (JSON.stringify(ufs) !== JSON.stringify(EXPECTED_UFS)) {
  fail(`conjunto de UFs inesperado: ${ufs.join(", ")}`);
}

for (const feature of geojson.features) {
  if (!["Polygon", "MultiPolygon"].includes(feature.geometry?.type)) {
    fail(`geometria inválida para ${feature.properties?.sigla}: ${feature.geometry?.type}`);
  }
  if (!feature.properties?.cd_geocuf || !feature.properties?.nome) {
    fail(`metadados IBGE incompletos para ${feature.properties?.sigla ?? "UF desconhecida"}`);
  }
}

const sha256 = createHash("sha256").update(raw).digest("hex");
if (manifest.sha256 !== sha256) {
  fail(`SHA-256 divergente: manifesto=${manifest.sha256}, arquivo=${sha256}`);
}

if (manifest.provider !== "Instituto Brasileiro de Geografia e Estatística (IBGE)") {
  fail("o manifesto não identifica o IBGE como provedor");
}

if (manifest.featureCount !== 27 || manifest.quality !== "minima" || manifest.intraregion !== "UF") {
  fail("o manifesto não corresponde ao recorte territorial esperado");
}

console.log(`map-data: OK — 27 UFs, sha256 ${sha256}`);
