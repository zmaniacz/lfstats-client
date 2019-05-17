import React from "react";
import useAxios from "axios-hooks";
import { Paper, CircularProgress, Typography } from "@material-ui/core";
import { useTheme } from "@material-ui/styles";
import CompactScorecardList from "./CompactScorecardList";
import LoadError from "./LoadError";

export default function Event(props) {
  const theme = useTheme();

  const styles = {
    root: {
      flexGrow: 1,
      width: "100%"
    },
    paper: {
      padding: theme.spacing.unit * 2,
      alignText: "center",
      justifyContent: "center"
    },
    spinner: {
      color: theme.palette.primary.main
    }
  };

  const { eventId } = props.match.params;

  const [{ data, loading, error }] = useAxios(
    `events/${eventId}?include[]=scorecards.game`
  );

  return (
    <div style={styles.root}>
      <Typography variant="h4">Event Stats</Typography>
      <Paper style={styles.paper}>
        {
          <div style={{ display: "flex", justifyContent: "center" }}>
            <CircularProgress style={styles.spinner} />
          </div>
        }
        {/*{error && <LoadError />}*/}
        {/*{data && <CompactScorecardList scorecards={data.data.scorecards} />}*/}
      </Paper>
    </div>
  );
}
