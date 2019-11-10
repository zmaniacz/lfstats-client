import React from "react";
import { Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(theme => ({
  footer: {
    padding: `${theme.spacing(1)}px ${theme.spacing(2)}px`
  },
  flip_H: { display: "inline-block", transform: "scale(-1, 1)" }
}));

export default function Footer() {
  const classes = useStyles();

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
      STATS GO HERE
      <span role="img" aria-label="pewpew">
        🔫
      </span>
    </Typography>
  );
}
