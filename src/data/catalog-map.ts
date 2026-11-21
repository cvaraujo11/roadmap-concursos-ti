import {
  areas,
  knowledge,
  topics,
  orgFamilies,
  contests as baseContests,
  knowledgeName,
  areaName,
  topicName,
  orgFamilyName,
  topicsForKnowledge,
} from "./catalog";
import { publicItCompanyContests } from "./public-it-companies";
import { publicItCompanyLiquidationContests } from "./public-it-companies-liquidation";

export {
  areas,
  knowledge,
  topics,
  orgFamilies,
  knowledgeName,
  areaName,
  topicName,
  orgFamilyName,
  topicsForKnowledge,
};

export const contests = [
  ...baseContests,
  ...publicItCompanyContests,
  ...publicItCompanyLiquidationContests,
];

export const allTracks = contests.flatMap((contest) =>
  contest.tracks.map((track) => ({ ...track, contest })),
);
