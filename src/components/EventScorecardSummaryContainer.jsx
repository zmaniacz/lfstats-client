import React from "react";
import { useQuery, gql } from "@apollo/client";
import { LoadError, LoadSpinner } from "./LFLoad";
import ScorecardSummary from "./ScorecardSummary";

const GET_SUMMARY_STATS = gql`
  query GetSummaryStats($id: bigint) {
    events(where: { id: { _eq: $id } }) {
      scorecards(distinct_on: player_id) {
        player {
          id
          player_name
          scorecards_aggregate(where: { event_id: { _eq: $id } }) {
            aggregate {
              avg {
                accuracy
                mvp_points
                score
                hit_diff
              }
              min {
                mvp_points
                score
              }
              max {
                mvp_points
                score
              }
              sum {
                shot_opponent
                times_zapped
                medic_hits
              }
              count
            }
          }
          elims: scorecards_aggregate(
            where: { event_id: { _eq: $id }, _and: { team_elim: { _eq: 1 } } }
          ) {
            aggregate {
              count
            }
          }
        }
      }
    }
  }
`;

export default function EventScorecardSummaryContainer({ eventId }) {
  const { data, loading, error } = useQuery(GET_SUMMARY_STATS, {
    variables: { id: eventId * 1 },
  });

  if (loading) return <LoadSpinner />;
  if (error) return <LoadError />;

  const scorecards = data.events[0].scorecards.map((item) => {
    return {
      player_id: item.player.id,
      player_name: item.player.player_name,
      avg_score: item.player.scorecards_aggregate.aggregate.avg.score,
      avg_mvp: item.player.scorecards_aggregate.aggregate.avg.mvp_points,
      avg_accuracy: item.player.scorecards_aggregate.aggregate.avg.accuracy,
      hit_diff: item.player.scorecards_aggregate.aggregate.avg.hit_diff,
      medic_hits: item.player.scorecards_aggregate.aggregate.sum.medic_hits,
      elim_rate:
        Number.parseFloat(item.player.elims.aggregate.count) /
        Number.parseFloat(item.player.scorecards_aggregate.aggregate.count),
    };
  });

  return <ScorecardSummary data={scorecards} />;
}
