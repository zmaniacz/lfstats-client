import React from "react";
import {
  EuiHeader,
  EuiHeaderSection,
  EuiHeaderSectionItem,
  EuiHeaderLinks,
  EuiHeaderLink
} from "@elastic/eui";
import EuiCustomHeaderLink from "./EuiCustomHeaderLink";
import EuiCustomHeaderLogo from "./EuiCustomHeaderLogo";
import UserMenu from "./UserMenu";
import "@elastic/eui/dist/eui_theme_light.css";

export default () => (
  <EuiHeader>
    <EuiHeaderSection grow={false}>
      <EuiHeaderSectionItem border="right">
        <EuiCustomHeaderLogo
          iconType="grokApp"
          to="/"
          aria-label="Goes to home"
        >
          LFStats
        </EuiCustomHeaderLogo>
      </EuiHeaderSectionItem>
    </EuiHeaderSection>
    <EuiHeaderLinks>
      <EuiCustomHeaderLink to="/events">Event Stats</EuiCustomHeaderLink>
      <EuiCustomHeaderLink to="/players">Player Stats</EuiCustomHeaderLink>
      <EuiCustomHeaderLink to="/centers">Center Stats</EuiCustomHeaderLink>
      <EuiHeaderLink href="#">About SM5</EuiHeaderLink>
      <EuiHeaderLink href="#">Twitch</EuiHeaderLink>
    </EuiHeaderLinks>
    <EuiHeaderSection side="right">
      <EuiHeaderSectionItem>
        <UserMenu />
      </EuiHeaderSectionItem>
    </EuiHeaderSection>
  </EuiHeader>
);
