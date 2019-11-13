import React from "react";
import { useQuery } from "@apollo/react-hooks";
import { gql } from "apollo-boost";
import { useParams } from "react-router-dom";
import { Paper, CircularProgress, Typography, Grid } from "@material-ui/core";
import { useTheme } from "@material-ui/core/styles";
import CompactScorecardList from "./CompactScorecardList";
import LoadError from "./LoadError";

const GET_EVENT = gql`
  query GetEvent($id: bigint) {
    events(where: { id: { _eq: $id } }) {
      id
      name
      description
      is_comp
      games_aggregate {
        aggregate {
          max {
            game_datetime
          }
        }
      }
      scorecards {
        id
        player_name
        position
        score
        mvp_points
        medic_hits
        accuracy
        shot_team
        hit_diff
        game {
          id
          game_name
        }
      }
    }
  }
`;

export default function Event(props) {
  const theme = useTheme();

  const styles = {
    root: {
      flexGrow: 1
    },
    paper: {
      margin: theme.spacing(2),
      padding: theme.spacing(2),
      alignText: "center",
      justifyContent: "center"
    }
  };

  const { eventId } = useParams();

  const { data, loading, error } = useQuery(GET_EVENT, {
    variables: { id: eventId * 1 }
  });

  return (
    <div style={styles.root}>
      <Typography variant="h4" color="primary">
        Event Stats
      </Typography>
      <Paper style={styles.paper}>
        {loading && (
          <div style={{ display: "flex", justifyContent: "center" }}>
            <CircularProgress />
          </div>
        )}
        {error && <LoadError />}
        {data && (
          <CompactScorecardList scorecards={data.events[0].scorecards} />
        )}
      </Paper>
    </div>
  );
}
