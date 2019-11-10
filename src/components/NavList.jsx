import React from "react";
import {
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  ListSubheader,
  Divider
} from "@material-ui/core";
import { KeyboardArrowRight, Home } from "@material-ui/icons";
import NavListItemLink from "./NavListItemLink";
import * as routes from "./../routes";

export default function NavList(props) {
  return (
    <div>
      <List>
        <NavListItemLink to={routes.LANDING} primary="Home" icon={<Home />} />
        <ListSubheader>Event Stats</ListSubheader>
        <NavListItemLink
          to={routes.SCORECARDS}
          primary="Scorecards"
          icon={<KeyboardArrowRight />}
        />
        <NavListItemLink
          to={routes.GAMES}
          primary="Games Played"
          icon={<KeyboardArrowRight />}
        />
        <NavListItemLink
          to={routes.PLAYERS}
          primary="Player Stats"
          icon={<KeyboardArrowRight />}
        />
        <Divider />
        <ListSubheader>All Stats</ListSubheader>
        <ListItem button>
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
}
