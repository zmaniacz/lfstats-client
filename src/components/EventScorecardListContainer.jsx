import React from "react";
import { useQuery, gql } from "@apollo/client";
import { LoadError, LoadSpinner } from "./LFLoad";
import ScorecardList from "./ScorecardList";

const GET_EVENT_SCORECARDS = gql`
  query GetEventScorecards($id: bigint!) {
    event: events_by_pk(id: $id) {
      scorecards {
        id
        player_name
        position
        game_team {
          id
          color_enum
          rank
        }
        score
        mvp_points
        medic_hits
        accuracy
        shot_team
        hit_diff
        shot_opponent
        times_zapped
        game {
          id
          game_name
          winner {
            id
            color_enum
          }
        }
        player {
          id
          player_name
        }
      }
    }
  }
`;

export default function EventScorecardListContainer({ eventId }) {
  const { data, loading, error } = useQuery(GET_EVENT_SCORECARDS, {
    variables: { id: eventId * 1 },
  });

  if (loading) return <LoadSpinner />;
  if (error) return <LoadError />;

  const scorecards = data.event.scorecards.map((item) => {
    return {
      id: item.id,
      player_id: item.player.id,
      player_name: item.player_name,
      position: item.position,
      team_color_enum: item.game_team.color_enum,
      team_rank: item.game_team.rank,
      score: item.score,
      mvp_points: item.mvp_points,
      medic_hits: item.medic_hits,
      accuracy: item.accuracy,
      shot_team: item.shot_team,
      hit_diff: item.hit_diff,
      shot_opponent: item.shot_opponent,
      times_zapped: item.times_zapped,
      game_id: item.game.id,
      game_name: item.game.game_name,
      game_winner_color_enum: item.game.winner[0].color_enum,
    };
  });

  return <ScorecardList data={scorecards} />;
}
