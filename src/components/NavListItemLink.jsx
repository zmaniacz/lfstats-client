import React from "react";
import { ListItem, ListItemText, ListItemIcon } from "@material-ui/core";
import { Link } from "react-router-dom";

function NavListItemLink(props) {
  const { to, primary, icon } = props;
  return (
    <ListItem button component={Link} to={to} {...props}>
      <ListItemIcon>{icon}</ListItemIcon>
      <ListItemText primary={primary} />
    </ListItem>
  );
}

export default NavListItemLink;
