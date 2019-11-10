import React from "react";
import { useQuery } from "@apollo/react-hooks";
import { gql } from "apollo-boost";
import { Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

const GET_FOOTER_STATS = gql`
{
  scorecards_aggregate {
    aggregate {
      count
      sum {
        shots_hit
      }
    }
  }
  games_aggregate {
    aggregate {
      count
    }
  }
}
`;

const useStyles = makeStyles(theme => ({
  footer: {
    padding: `${theme.spacing(1)}px ${theme.spacing(2)}px`
  },
  flip_H: { display: "inline-block", transform: "scale(-1, 1)" }
}));

export default function Footer() {
  const classes = useStyles();
  const { data, loading, error } = useQuery(GET_FOOTER_STATS);

  return (
    <Typography
      variant="h6"
      className={classes.footer}
      align="center"
      color="textSecondary"
    >
      <span className={classes.flip_H} role="img" aria-label="pewpew">
        🔫
      </span>
      {data && (`Players have shot each other ${data.scorecards_aggregate.aggregate.sum.shots_hit} times in ${data.games_aggregate.aggregate.count} games with ${data.scorecards_aggregate.aggregate.count} individual scorecards`)}
      <span role="img" aria-label="pewpew">
        🔫
      </span>
    </Typography>
  );
}
