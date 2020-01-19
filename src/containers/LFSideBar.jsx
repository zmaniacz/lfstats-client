import React, { Component, Fragment } from "react";
import {
  EuiNavDrawerGroup,
  EuiNavDrawer,
  EuiHorizontalRule
} from "@elastic/eui";
import LFHeader from "./LFHeader";
import * as routes from "./../routes";
import "@elastic/eui/dist/eui_theme_light.css";

export default class extends Component {
  constructor(props) {
    super(props);

    this.eventLinks = [
      {
        label: "Event Stats",
        iconType: "arrowRight",
        href: routes.EVENT
      },
      {
        label: "Games Played",
        iconType: "arrowRight",
        href: routes.GAMES
      }
    ];

    this.statsLinks = [
      {
        label: "Canvas",
        href: "#/layout/nav-drawer",
        iconType: "canvasApp",
        isActive: true
      }
    ];
  }

  setNavDrawerRef = ref => (this.navDrawerRef = ref);

  render() {
    return (
      <Fragment>
        <LFHeader />
        <EuiNavDrawer isLocked={true} ref={this.setNavDrawerRef}>
          <EuiNavDrawerGroup listItems={this.eventLinks}>
            Event Stats
          </EuiNavDrawerGroup>
          <EuiHorizontalRule margin="none" />
          <EuiNavDrawerGroup listItems={this.statsLinks} />
          <EuiHorizontalRule margin="none" />
          <EuiNavDrawerGroup listItems={this.adminLinks} />
        </EuiNavDrawer>
      </Fragment>
    );
  }
}
