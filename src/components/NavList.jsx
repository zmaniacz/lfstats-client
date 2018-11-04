import React from "react";
import {
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  ListSubheader,
  Divider,
  withStyles
} from "@material-ui/core";
import { KeyboardArrowRight, Home } from "@material-ui/icons";
import { Link, NavLink } from "react-router-dom";
import * as routes from "./../routes";

const styles = theme => ({
  activeButton: {
    color: theme.palette.primary.main
  }
});

const NavList = props => {
  const { classes } = props;
  return (
    <div>
      <List>
        <ListItem
          button
          component={NavLink}
          to={routes.LANDING}
          activeClassName={classes.activeButton}
        >
          <ListItemIcon>
            <Home />
          </ListItemIcon>
          <ListItemText primary="Recent Events" />
        </ListItem>
        <ListSubheader>Event Stats</ListSubheader>
        <ListItem button>
          <ListItemIcon>
            <KeyboardArrowRight />
          </ListItemIcon>
          <ListItemText primary="Scorecards" />
        </ListItem>
        <ListItem
          button
          component={NavLink}
          to={routes.GAMES}
          activeClassName={classes.activeButton}
        >
          <ListItemIcon>
            <KeyboardArrowRight />
          </ListItemIcon>
          <ListItemText primary="Games Played" />
        </ListItem>
        <ListItem button>
          <ListItemIcon>
            <KeyboardArrowRight />
          </ListItemIcon>
          <ListItemText primary="Player Stats" />
        </ListItem>
        <Divider />
        <ListSubheader>All Stats</ListSubheader>
        <ListItem button component={NavLink} to={routes.PLAYERS}>
          <ListItemIcon>
            <KeyboardArrowRight />
          </ListItemIcon>
          <ListItemText primary="Players" />
        </ListItem>
        <ListItem button>
          <ListItemIcon>
            <KeyboardArrowRight />
          </ListItemIcon>
          <ListItemText primary="Center Stats" />
        </ListItem>
        <ListItem button>
          <ListItemIcon>
            <KeyboardArrowRight />
          </ListItemIcon>
          <ListItemText primary="All-Center Teams" />
        </ListItem>
        <Divider />
        <ListItem button>
          <ListItemIcon>
            <KeyboardArrowRight />
          </ListItemIcon>
          <ListItemText primary="About SM5" />
        </ListItem>
        <ListItem button>
          <ListItemIcon>
            <KeyboardArrowRight />
          </ListItemIcon>
          <ListItemText primary="Twitch" />
        </ListItem>
      </List>
    </div>
  );
};

export default withStyles(styles)(NavList);
