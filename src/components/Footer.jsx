import React from "react";
import { Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";

const useStyles = makeStyles(theme => ({
  footer: {
    textAlign: "center"
  },
  footerText: {
    padding: `${theme.spacing.unit}px ${theme.spacing.unit * 2}px`
  },
  flip_H: { display: "inline-block", transform: "scale(-1, 1)" }
}));

export default function Footer() {
  const classes = useStyles();

  return (
    <div className={classes.footer}>
      <Typography variant="h6" className={classes.footerText}>
        <span className={classes.flip_H} role="img" aria-label="pewpew">
          🔫
        </span>
        STATS GO HERE
        <span role="img" aria-label="pewpew">
          🔫
        </span>
      </Typography>
    </div>
  );
}
