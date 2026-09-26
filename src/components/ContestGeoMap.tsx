"use client";

import Link from "next/link";
import { useEffect, useMemo, useRef, useState } from "react";
import maplibregl, { type GeoJSONSource } from "maplibre-gl";
import { allTracks, areaName, areas, knowledge, knowledgeName, orgFamilies, orgFamilyName } from "@/data/catalog";
import { BRAZIL_STATES_GEOJSON, contestLocations, geocodedLocations, stateNameToUf, ufToStateName } from "@/data/geography";

const emptyFeatureCollection = { type: "FeatureCollection", features: [] } as const;

type ViewMode = "cobertura" | "compatibilidade";
type AnyGeoJSON = {
  type: "FeatureCollection";
  features: Array<{
    type: "Feature";
    geometry: unknown;
    properties?: Record<string, unknown> | null;
  }>;
};

type PointGroup = {
  key: string;
  uf: string;
  label: string;
  latitude: number;
  longitude: number;
  trackIds: string[];
  contestIds: string[];
  maxCompatibility: number;
};

function overlapScore(a: string[], b: string[]) {
  const left = new Set(a);
  const right = new Set(b);
  const intersection = [...left].filter((item) => right.has(item)).length;
  const union = new Set([...a, ...b]).size;
  return union === 0 ? 0 : Math.round((intersection / union) * 100);
}

function normalizeStateGeoJSON(input: unknown): AnyGeoJSON {
  const collection = input as AnyGeoJSON;
  if (!collection || collection.type !== "FeatureCollection" || !Array.isArray(collection.features)) {
    throw new Error("A malha de UFs não retornou um FeatureCollection válido.");
  }

  return {
    type: "FeatureCollection",
    features: collection.features.map((feature) => {
      const props = feature.properties ?? {};
      const name = String(
        props.name ?? props.nome ?? props.NM_UF ?? props.NAME_1 ?? props.state ?? "",
      );
      const uf = String(props.uf ?? props.sigla ?? stateNameToUf[name] ?? "");
      return {
        ...feature,
        properties: {
          ...props,
          stateName: name,
          uf,
          trackCount: 0,
          contestCount: 0,
          compatibility: 0,
        },
      };
    }),
  };
}

export function ContestGeoMap() {
  const mapContainer = useRef<HTMLDivElement | null>(null);
  const mapRef = useRef<maplibregl.Map | null>(null);
  const statesTemplateRef = useRef<AnyGeoJSON | null>(null);

  const [mapReady, setMapReady] = useState(false);
  const [mapError, setMapError] = useState<string | null>(null);
  const [mode, setMode] = useState<ViewMode>("cobertura");
  const [area, setArea] = useState("");
  const [family, setFamily] = useState("");
  const [knowledgeSlug, setKnowledgeSlug] = useState("");
  const [year, setYear] = useState("");
  const [referenceId, setReferenceId] = useState("dataprev-2026-gestao-servicos");
  const [selectedUf, setSelectedUf] = useState<string | null>(null);
  const [selectedPointKey, setSelectedPointKey] = useState<string | null>(null);

  const reference = allTracks.find((track) => track.id === referenceId) ?? allTracks[0];

  const filteredTracks = useMemo(() => {
    return allTracks.filter((track) => {
      if (area && !track.areas.includes(area as never)) return false;
      if (family && track.contest.orgFamily !== family) return false;
      if (knowledgeSlug && !track.knowledge.includes(knowledgeSlug as never)) return false;
      if (year && String(track.contest.year) !== year) return false;
      return true;
    });
  }, [area, family, knowledgeSlug, year]);

  const filteredTrackIds = useMemo(() => new Set(filteredTracks.map((track) => track.id)), [filteredTracks]);
  const trackById = useMemo(() => new Map(allTracks.map((track) => [track.id, track])), []);

  const locationRows = useMemo(
    () => geocodedLocations.filter((location) => filteredTrackIds.has(location.trackId)),
    [filteredTrackIds],
  );

  const locatedTrackIds = useMemo(
    () => new Set(locationRows.map((location) => location.trackId)),
    [locationRows],
  );

  const pointGroups = useMemo<PointGroup[]>(() => {
    const groups = new Map<string, PointGroup>();
    for (const location of locationRows) {
      if (location.latitude === undefined || location.longitude === undefined || !location.uf) continue;
      const key = `${location.latitude.toFixed(4)}:${location.longitude.toFixed(4)}:${location.uf}:${location.label}`;
      const current = groups.get(key) ?? {
        key,
        uf: location.uf,
        label: location.label,
        latitude: location.latitude,
        longitude: location.longitude,
        trackIds: [],
        contestIds: [],
        maxCompatibility: 0,
      };
      if (!current.trackIds.includes(location.trackId)) current.trackIds.push(location.trackId);
      if (!current.contestIds.includes(location.contestId)) current.contestIds.push(location.contestId);
      const track = trackById.get(location.trackId);
      if (track) current.maxCompatibility = Math.max(current.maxCompatibility, overlapScore(reference.knowledge, track.knowledge));
      groups.set(key, current);
    }
    return [...groups.values()].sort((a, b) => b.trackIds.length - a.trackIds.length);
  }, [locationRows, reference.knowledge, trackById]);

  const stateStats = useMemo(() => {
    const map = new Map<string, { trackIds: Set<string>; contestIds: Set<string>; maxCompatibility: number }>();
    for (const location of locationRows) {
      if (!location.uf) continue;
      const current = map.get(location.uf) ?? {
        trackIds: new Set<string>(),
        contestIds: new Set<string>(),
        maxCompatibility: 0,
      };
      current.trackIds.add(location.trackId);
      current.contestIds.add(location.contestId);
      const track = trackById.get(location.trackId);
      if (track) current.maxCompatibility = Math.max(current.maxCompatibility, overlapScore(reference.knowledge, track.knowledge));
      map.set(location.uf, current);
    }
    return map;
  }, [locationRows, reference.knowledge, trackById]);

  const unresolvedTrackIds = useMemo(() => {
    const relevantLocations = contestLocations.filter((location) => filteredTrackIds.has(location.trackId));
    const trackIdsWithAnyLocation = new Set(relevantLocations.map((location) => location.trackId));
    return filteredTracks
      .filter((track) => !locatedTrackIds.has(track.id) || !trackIdsWithAnyLocation.has(track.id))
      .map((track) => track.id);
  }, [filteredTracks, filteredTrackIds, locatedTrackIds]);

  const availableYears = useMemo(
    () => [...new Set(allTracks.map((track) => track.contest.year))].sort((a, b) => b - a),
    [],
  );

  useEffect(() => {
    if (!mapContainer.current || mapRef.current) return;

    const map = new maplibregl.Map({
      container: mapContainer.current,
      style: {
        version: 8,
        sources: {},
        layers: [
          { id: "background", type: "background", paint: { "background-color": "#07101f" } },
        ],
      },
      center: [-52.6, -15.3],
      zoom: 3.15,
      minZoom: 2.2,
      maxZoom: 9,
      attributionControl: false,
    });

    mapRef.current = map;
    map.addControl(new maplibregl.NavigationControl({ showCompass: false }), "top-right");

    map.on("load", async () => {
      try {
        const response = await fetch(BRAZIL_STATES_GEOJSON);
        if (!response.ok) throw new Error(`HTTP ${response.status}`);
        const normalized = normalizeStateGeoJSON(await response.json());
        statesTemplateRef.current = normalized;

        map.addSource("states", { type: "geojson", data: normalized as never });
        map.addSource("contest-points", { type: "geojson", data: emptyFeatureCollection as never });

        map.addLayer({
          id: "state-fill",
          type: "fill",
          source: "states",
          paint: {
            "fill-color": "#15213a",
            "fill-opacity": 0.86,
          },
        });
        map.addLayer({
          id: "state-line",
          type: "line",
          source: "states",
          paint: { "line-color": "rgba(198,220,255,.34)", "line-width": 0.9 },
        });
        map.addLayer({
          id: "state-selected",
          type: "line",
          source: "states",
          filter: ["==", ["get", "uf"], "__none__"],
          paint: { "line-color": "#ffffff", "line-width": 2.5 },
        });
        map.addLayer({
          id: "contest-points",
          type: "circle",
          source: "contest-points",
          paint: {
            "circle-radius": ["interpolate", ["linear"], ["get", "count"], 1, 7, 4, 11, 10, 16],
            "circle-color": "#69e6b1",
            "circle-stroke-color": "#07101f",
            "circle-stroke-width": 2,
            "circle-opacity": 0.94,
          },
        });
        map.addLayer({
          id: "contest-point-selected",
          type: "circle",
          source: "contest-points",
          filter: ["==", ["get", "groupKey"], "__none__"],
          paint: {
            "circle-radius": ["+", ["interpolate", ["linear"], ["get", "count"], 1, 7, 4, 11, 10, 16], 5],
            "circle-color": "rgba(0,0,0,0)",
            "circle-stroke-color": "#ffffff",
            "circle-stroke-width": 2,
          },
        });

        map.on("mouseenter", "state-fill", () => { map.getCanvas().style.cursor = "pointer"; });
        map.on("mouseleave", "state-fill", () => { map.getCanvas().style.cursor = ""; });
        map.on("mouseenter", "contest-points", () => { map.getCanvas().style.cursor = "pointer"; });
        map.on("mouseleave", "contest-points", () => { map.getCanvas().style.cursor = ""; });

        map.on("click", "state-fill", (event) => {
          const uf = String(event.features?.[0]?.properties?.uf ?? "");
          if (uf) {
            setSelectedUf(uf);
            setSelectedPointKey(null);
          }
        });
        map.on("click", "contest-points", (event) => {
          const properties = event.features?.[0]?.properties;
          const key = String(properties?.groupKey ?? "");
          const uf = String(properties?.uf ?? "");
          if (key) setSelectedPointKey(key);
          if (uf) setSelectedUf(uf);
        });

        map.fitBounds([[-74.3, -34.8], [-33.5, 5.7]], { padding: 34, duration: 0 });
        setMapReady(true);
      } catch (error) {
        setMapError(`Não foi possível carregar a malha das UFs: ${error instanceof Error ? error.message : "erro desconhecido"}.`);
      }
    });

    return () => {
      map.remove();
      mapRef.current = null;
    };
  }, []);

  useEffect(() => {
    const map = mapRef.current;
    const template = statesTemplateRef.current;
    if (!mapReady || !map || !template) return;

    const statesData: AnyGeoJSON = {
      type: "FeatureCollection",
      features: template.features.map((feature) => {
        const uf = String(feature.properties?.uf ?? "");
        const stat = stateStats.get(uf);
        return {
          ...feature,
          properties: {
            ...(feature.properties ?? {}),
            trackCount: stat?.trackIds.size ?? 0,
            contestCount: stat?.contestIds.size ?? 0,
            compatibility: stat?.maxCompatibility ?? 0,
          },
        };
      }),
    };

    const pointData = {
      type: "FeatureCollection",
      features: pointGroups.map((point) => ({
        type: "Feature",
        geometry: { type: "Point", coordinates: [point.longitude, point.latitude] },
        properties: {
          groupKey: point.key,
          uf: point.uf,
          label: point.label,
          count: point.trackIds.length,
          contestCount: point.contestIds.length,
          compatibility: point.maxCompatibility,
        },
      })),
    };

    (map.getSource("states") as GeoJSONSource | undefined)?.setData(statesData as never);
    (map.getSource("contest-points") as GeoJSONSource | undefined)?.setData(pointData as never);

    if (mode === "compatibilidade") {
      map.setPaintProperty("state-fill", "fill-color", [
        "interpolate", ["linear"], ["get", "compatibility"],
        0, "#111a2e", 25, "#223757", 50, "#5b5964", 75, "#a88b54", 100, "#69e6b1",
      ]);
      map.setPaintProperty("contest-points", "circle-color", [
        "interpolate", ["linear"], ["get", "compatibility"],
        0, "#566179", 40, "#7bb6ff", 70, "#ffd36a", 100, "#69e6b1",
      ]);
    } else {
      map.setPaintProperty("state-fill", "fill-color", [
        "interpolate", ["linear"], ["get", "trackCount"],
        0, "#111a2e", 1, "#183047", 3, "#205267", 6, "#2e7d76", 10, "#69e6b1",
      ]);
      map.setPaintProperty("contest-points", "circle-color", "#7bb6ff");
    }
  }, [mapReady, mode, pointGroups, stateStats]);

  useEffect(() => {
    const map = mapRef.current;
    if (!mapReady || !map) return;
    map.setFilter("state-selected", ["==", ["get", "uf"], selectedUf ?? "__none__"]);
    map.setFilter("contest-point-selected", ["==", ["get", "groupKey"], selectedPointKey ?? "__none__"]);
  }, [mapReady, selectedPointKey, selectedUf]);

  useEffect(() => {
    if (selectedPointKey && !pointGroups.some((point) => point.key === selectedPointKey)) setSelectedPointKey(null);
    if (selectedUf && !stateStats.has(selectedUf)) setSelectedUf(null);
  }, [pointGroups, selectedPointKey, selectedUf, stateStats]);

  const selectedPoint = pointGroups.find((point) => point.key === selectedPointKey) ?? null;
  const selectedTrackIds = selectedPoint
    ? selectedPoint.trackIds
    : selectedUf
      ? [...new Set(locationRows.filter((location) => location.uf === selectedUf).map((location) => location.trackId))]
      : [];
  const selectedTracks = selectedTrackIds
    .map((id) => trackById.get(id))
    .filter((item): item is NonNullable<typeof item> => Boolean(item))
    .sort((a, b) => b.contest.year - a.contest.year || a.contest.institution.localeCompare(b.contest.institution));

  return (
    <div className="geo-explorer">
      <div className="geo-controls">
        <label>
          Visualização
          <select value={mode} onChange={(event) => setMode(event.target.value as ViewMode)}>
            <option value="cobertura">Cobertura catalogada</option>
            <option value="compatibilidade">Compatibilidade com uma trilha</option>
          </select>
        </label>
        <label>
          Área
          <select value={area} onChange={(event) => setArea(event.target.value)}>
            <option value="">Todas</option>
            {areas.map((item) => <option key={item.slug} value={item.slug}>{item.shortName}</option>)}
          </select>
        </label>
        <label>
          Família institucional
          <select value={family} onChange={(event) => setFamily(event.target.value)}>
            <option value="">Todas</option>
            {orgFamilies.map((item) => <option key={item.slug} value={item.slug}>{item.name}</option>)}
          </select>
        </label>
        <label>
          Conhecimento
          <select value={knowledgeSlug} onChange={(event) => setKnowledgeSlug(event.target.value)}>
            <option value="">Todos</option>
            {knowledge.map((item) => <option key={item.slug} value={item.slug}>{item.name}</option>)}
          </select>
        </label>
        <label>
          Ano
          <select value={year} onChange={(event) => setYear(event.target.value)}>
            <option value="">Todos</option>
            {availableYears.map((item) => <option key={item} value={item}>{item}</option>)}
          </select>
        </label>
        {mode === "compatibilidade" && (
          <label className="geo-reference-control">
            Trilha de referência
            <select value={referenceId} onChange={(event) => setReferenceId(event.target.value)}>
              {allTracks.map((track) => (
                <option key={track.id} value={track.id}>{track.contest.institution} · {track.name}</option>
              ))}
            </select>
          </label>
        )}
      </div>

      <div className="geo-stats">
        <div><strong>{filteredTracks.length}</strong><span>trilhas no recorte</span></div>
        <div><strong>{locatedTrackIds.size}</strong><span>trilhas geocodificadas</span></div>
        <div><strong>{stateStats.size}</strong><span>UFs representadas</span></div>
        <div><strong>{unresolvedTrackIds.length}</strong><span>trilhas sem ponto normalizado</span></div>
      </div>

      {mode === "compatibilidade" && (
        <div className="geo-mode-note">
          <strong>Referência:</strong> {reference.contest.institution} · {reference.name}. A cor representa o maior Jaccard entre macroconhecimentos encontrado entre as trilhas geocodificadas de cada UF — não peso de prova nem chance de aprovação.
        </div>
      )}

      <div className="geo-layout">
        <div className="geo-map-shell">
          <div ref={mapContainer} className="geo-map" aria-label="Mapa do Brasil com concursos de TI catalogados" />
          {mapError && <div className="geo-map-error">{mapError}</div>}
          <div className="geo-legend">
            <span>{mode === "compatibilidade" ? "0%" : "0 trilhas"}</span>
            <i className={mode === "compatibilidade" ? "legend-gradient compatibility" : "legend-gradient coverage"} />
            <span>{mode === "compatibilidade" ? "100%" : "mais trilhas"}</span>
          </div>
        </div>

        <aside className="geo-panel">
          {selectedUf ? (
            <>
              <div className="eyebrow">{selectedPoint ? selectedPoint.label : ufToStateName[selectedUf] ?? selectedUf}</div>
              <h2>{selectedTracks.length} trilha{selectedTracks.length === 1 ? "" : "s"} no recorte</h2>
              <p className="muted">
                {selectedPoint
                  ? `${selectedPoint.contestIds.length} certame(s) neste ponto cartográfico.`
                  : `${stateStats.get(selectedUf)?.contestIds.size ?? 0} certame(s) com localização normalizada nesta UF.`}
              </p>
              <div className="geo-track-list">
                {selectedTracks.map((track) => (
                  <article key={track.id} className="geo-track-item">
                    <div className="geo-track-meta">
                      <span>{track.contest.institution}</span>
                      <span>{track.contest.year}</span>
                    </div>
                    <h3>{track.name}</h3>
                    <p>{orgFamilyName(track.contest.orgFamily)} · {track.areas.map(areaName).join(" · ")}</p>
                    {mode === "compatibilidade" && (
                      <strong className="geo-score">{overlapScore(reference.knowledge, track.knowledge)}% macro em comum</strong>
                    )}
                    <Link href={`/trilhas/${track.id}`}>Abrir trilha →</Link>
                  </article>
                ))}
              </div>
            </>
          ) : (
            <>
              <div className="eyebrow">M5 · cartografia geográfica</div>
              <h2>Selecione uma UF ou um ponto.</h2>
              <p className="muted">O preenchimento dos estados descreve somente a base atualmente geocodificada. Um estado mais intenso significa mais trilhas catalogadas no recorte — não maior oferta real de concursos.</p>
              <div className="geo-panel-hints">
                <span>● pontos agrupam trilhas na mesma localização</span>
                <span>▧ UFs agregam somente registros com geografia normalizada</span>
                <span>↗ cada resultado abre a trilha conceitual existente</span>
              </div>
            </>
          )}
        </aside>
      </div>

      <div className="geo-audit">
        <div>
          <span className="card-kicker">Cobertura geográfica</span>
          <strong>{locatedTrackIds.size}/{filteredTracks.length} trilhas do recorte possuem pelo menos um ponto normalizado.</strong>
        </div>
        <p>Localidades nacionais ou descritas apenas como “múltiplas localidades” permanecem fora do mapa até serem decompostas. Isso evita converter ausência de dado geográfico em uma localização inventada.</p>
      </div>

      {unresolvedTrackIds.length > 0 && (
        <details className="geo-unresolved">
          <summary>{unresolvedTrackIds.length} trilha(s) ainda sem ponto geográfico normalizado</summary>
          <div className="geo-track-list compact">
            {unresolvedTrackIds.map((id) => {
              const track = trackById.get(id);
              if (!track) return null;
              return (
                <article key={id} className="geo-track-item">
                  <div className="geo-track-meta"><span>{track.contest.institution}</span><span>{track.contest.year}</span></div>
                  <h3>{track.name}</h3>
                  <p>{track.locality ?? "localidade ainda não catalogada"}</p>
                </article>
              );
            })}
          </div>
        </details>
      )}

      <p className="geo-source-note">
        Motor cartográfico: MapLibre GL. Limites estaduais usados como substrato visual: <a href="https://github.com/codeforgermany/click_that_hood" target="_blank" rel="noreferrer">click_that_hood</a> (MIT). A M5 não redistribui essa malha no repositório; o próximo endurecimento de dados deve substituir o carregamento remoto por uma malha brasileira versionada e auditada.
      </p>
    </div>
  );
}
