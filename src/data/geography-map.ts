import {
  BRAZIL_STATES_GEOJSON,
  BRAZIL_STATES_GEOJSON_MANIFEST,
  stateNameToUf,
  ufToStateName,
  contestLocations as baseContestLocations,
} from "./geography";
import { publicItCompanyLocations } from "./public-it-companies";
import { publicItCompanyLiquidationLocations } from "./public-it-companies-liquidation";

export {
  BRAZIL_STATES_GEOJSON,
  BRAZIL_STATES_GEOJSON_MANIFEST,
  stateNameToUf,
  ufToStateName,
};

export const contestLocations = [
  ...baseContestLocations,
  ...publicItCompanyLocations,
  ...publicItCompanyLiquidationLocations,
];

export const geocodedLocations = contestLocations.filter(
  (location) =>
    location.latitude !== undefined &&
    location.longitude !== undefined &&
    location.uf,
);

export const unresolvedLocations = contestLocations.filter(
  (location) =>
    location.latitude === undefined || location.longitude === undefined,
);
