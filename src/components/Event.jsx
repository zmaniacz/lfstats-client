import React from "react";
import { useQuery } from "@apollo/react-hooks";
import { gql } from "apollo-boost";
import { useParams } from "react-router-dom";
import { Paper, CircularProgress, Typography, Grid } from "@material-ui/core";
import { useTheme } from "@material-ui/core/styles";
import CompactScorecardList from "./CompactScorecardList";
import LoadError from "./LoadError";

const GET_EVENT = gql`
  query Event($id: Int!) {
    event(id: $id) {
      id
      name
      description
      type
      isComp
      lastGameTime
      center {
        id
      }
      games {
        id
      }
      scorecards {
        id
        playerName
        position
        score
        mvp
        hitDiff
        medicHits
        accuracy
        shotTeam
        game {
          id
          name
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
        {data && <CompactScorecardList scorecards={data.event.scorecards} />}
      </Paper>
    </div>
  );
}
