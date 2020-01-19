import React from "react";
import {
  EuiHeader,
  EuiHeaderSection,
  EuiHeaderSectionItem,
  EuiHeaderSectionItemButton,
  EuiIcon,
  EuiHeaderLinks,
  EuiHeaderLink,
  EuiHeaderLogo,
  EuiShowFor
} from "@elastic/eui";
import UserMenu from "../components/UserMenu";
import * as routes from "./../routes";
import "@elastic/eui/dist/eui_theme_light.css";

export default () => (
  <EuiHeader>
    <EuiHeaderSection grow={false}>
      <EuiShowFor sizes={["xs", "s"]}>
        <EuiHeaderSectionItem border="right">
          <EuiHeaderSectionItemButton
            aria-label="Open nav"
            onClick={() => this.navDrawerRef.toggleOpen()}
          >
            <EuiIcon type="apps" href="#" size="m" />
          </EuiHeaderSectionItemButton>
        </EuiHeaderSectionItem>
      </EuiShowFor>
      <EuiHeaderSectionItem border="right">
        <EuiHeaderLogo
          iconType="grokApp"
          href={routes.LANDING}
          aria-label="Goes to home"
        >
          LFStats
        </EuiHeaderLogo>
      </EuiHeaderSectionItem>
    </EuiHeaderSection>
    <EuiHeaderLinks>
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
