import React from "react";
import { useQuery, gql } from "@apollo/client";
import { LoadError, LoadSpinner } from "./LFLoad";
import MedicHitSummary from "./MedicHitSummary";

const GET_SOCIAL_MEDIC_HIT_STATS = gql`
  query GetSocialMedicHitStats(
    $centers: [bigint!]
    $startDate: timestamptz
    $endDate: timestamptz
  ) {
    players(
      where: {
        scorecards: {
          game: {
            _and: {
              center_id: { _in: $centers }
              game_datetime: { _lte: $endDate, _gte: $startDate }
              type: { _eq: "social" }
            }
          }
        }
      }
    ) {
      id
      active_player_name
      all: scorecards_aggregate(
        where: {
          game: {
            _and: {
              center_id: { _in: $centers }
              game_datetime: { _lte: $endDate, _gte: $startDate }
              type: { _eq: "social" }
            }
          }
        }
      ) {
        aggregate {
          avg {
            medic_hits
          }
          sum {
            medic_hits
          }
          count
        }
      }
      nonresup: scorecards_aggregate(
        where: {
          game: {
            _and: {
              center_id: { _in: $centers }
              game_datetime: { _lte: $endDate, _gte: $startDate }
              type: { _eq: "social" }
            }
          }
          position: { _nin: ["Ammo Carrier", "Medic"] }
        }
      ) {
        aggregate {
          avg {
            medic_hits
          }
          sum {
            medic_hits
          }
          count
        }
      }
    }
  }
`;

export default ({ centerFilter, startDateFilter, endDateFilter }) => {
  const { data, loading, error } = useQuery(GET_SOCIAL_MEDIC_HIT_STATS, {
    variables: {
      centers: centerFilter,
      startDate: startDateFilter,
      endDate: endDateFilter,
    },
  });

  if (loading) return <LoadSpinner />;
  if (error) return <LoadError />;

  const medic_hits = data.players.map((item) => {
    return {
      player_id: item.id,
      player_name: item.active_player_name,
      sum_all_medic_hits: item.all.aggregate.sum.medic_hits,
      avg_all_medic_hits: item.all.aggregate.avg.medic_hits,
      sum_all_games_played: item.all.aggregate.count,
      sum_nonresup_medic_hits:
        item.nonresup.aggregate.sum.medic_hits === null
          ? 0
          : item.nonresup.aggregate.sum.medic_hits,
      avg_nonresup_medic_hits:
        item.nonresup.aggregate.avg.medic_hits === null
          ? 0
          : item.nonresup.aggregate.avg.medic_hits,
      sum_nonresup_games_played: item.nonresup.aggregate.count,
    };
  });

  return <MedicHitSummary data={medic_hits} />;
};
