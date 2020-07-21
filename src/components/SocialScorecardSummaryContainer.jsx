import React from "react";
import { useQuery, gql } from "@apollo/client";
import { EuiLoadingSpinner } from "@elastic/eui";
import LoadError from "./LoadError";
import ScorecardSummary from "./ScorecardSummary";

const GET_SOCIAL_SUMMARY_STATS = gql`
  query GetSocialSummaryStats(
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
      scorecards_aggregate(
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
            accuracy
            mvp_points
            score
            hit_diff
          }
          sum {
            medic_hits
          }
          count
        }
      }
      overall: scorecards_aggregate(
        where: {
          game: {
            _and: { center_id: { _in: $centers }, type: { _eq: "social" } }
          }
        }
      ) {
        aggregate {
          avg {
            accuracy
            mvp_points
            score
            hit_diff
          }
        }
      }
      elims: scorecards_aggregate(
        where: {
          game: {
            _and: {
              center_id: { _in: $centers }
              game_datetime: { _lte: $endDate, _gte: $startDate }
              type: { _eq: "social" }
            }
          }
          elim_other_team: { _eq: "1" }
        }
      ) {
        aggregate {
          count
        }
      }
    }
  }
`;

export default ({ centerFilter, startDateFilter, endDateFilter }) => {
  const { data, loading, error } = useQuery(GET_SOCIAL_SUMMARY_STATS, {
    variables: {
      centers: centerFilter.length > 0 ? centerFilter : null,
      startDate: startDateFilter.format("YYYY-MM-DD"),
      endDate: endDateFilter.format("YYYY-MM-DD"),
    },
  });

  if (loading) return <EuiLoadingSpinner size="xl" />;
  if (error) return <LoadError />;

  const scorecards = data.players.map((item) => {
    return {
      player_id: item.id,
      player_name: item.active_player_name,
      avg_score: item.scorecards_aggregate.aggregate.avg.score,
      overall_avg_score: item.overall.aggregate.avg.score,
      avg_mvp: item.scorecards_aggregate.aggregate.avg.mvp_points,
      overall_avg_mvp: item.overall.aggregate.avg.mvp_points,
      avg_accuracy: item.scorecards_aggregate.aggregate.avg.accuracy,
      overall_avg_accuracy: item.overall.aggregate.avg.accuracy,
      hit_diff: item.scorecards_aggregate.aggregate.avg.hit_diff,
      overall_hit_diff: item.overall.aggregate.avg.hit_diff,
      medic_hits: item.scorecards_aggregate.aggregate.sum.medic_hits,
      elim_rate:
        Number.parseFloat(item.elims.aggregate.count) /
        Number.parseFloat(item.scorecards_aggregate.aggregate.count),
    };
  });

  return <ScorecardSummary data={scorecards} />;
};
