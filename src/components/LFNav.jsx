import React, { useState } from "react";
import {
  EuiCollapsibleNav,
  EuiCollapsibleNavGroup,
  EuiHeaderSectionItemButton,
  EuiIcon,
  EuiText,
  EuiShowFor,
  EuiListGroupItem,
  EuiCode,
} from "@elastic/eui";

export default () => {
  const [navIsOpen, setNavIsOpen] = useState(
    JSON.parse(String(localStorage.getItem("navIsDocked"))) || false
  );
  const [navIsDocked, setNavIsDocked] = useState(
    JSON.parse(String(localStorage.getItem("navIsDocked"))) || false
  );

  return (
    <EuiCollapsibleNav
      id="guideCollapsibleNavAllExampleNav"
      aria-label="Main navigation"
      isOpen={navIsOpen}
      isDocked={navIsDocked}
      button={
        <EuiHeaderSectionItemButton
          aria-label="Toggle main navigation"
          onClick={() => setNavIsOpen(!navIsOpen)}
        >
          <EuiIcon type={"menu"} size="m" aria-hidden="true" />
        </EuiHeaderSectionItemButton>
      }
      onClose={() => setNavIsOpen(false)}
    >
      <EuiCollapsibleNavGroup title="Event Stats" iconType="dashboardApp">
        <EuiText size="s" color="subdued">
          <p>
            This is a nice group with a heading supplied via{" "}
            <EuiCode>title</EuiCode> and <EuiCode>iconType</EuiCode>.
          </p>
        </EuiText>
      </EuiCollapsibleNavGroup>
      <EuiCollapsibleNavGroup title="Player Stats" iconType="metricsApp">
        <EuiText size="s" color="subdued">
          <p>
            This is a nice group with a heading supplied via{" "}
            <EuiCode>title</EuiCode> and <EuiCode>iconType</EuiCode>.
          </p>
        </EuiText>
      </EuiCollapsibleNavGroup>
      <EuiCollapsibleNavGroup title="Center Stats" iconType="gisApp">
        <EuiText size="s" color="subdued">
          <p>
            This is a nice group with a heading supplied via{" "}
            <EuiCode>title</EuiCode> and <EuiCode>iconType</EuiCode>.
          </p>
        </EuiText>
      </EuiCollapsibleNavGroup>

      {/* Docking button only for larger screens that can support it*/}
      <EuiShowFor sizes={["l", "xl"]}>
        <EuiCollapsibleNavGroup>
          <EuiListGroupItem
            size="xs"
            color="subdued"
            label={`${navIsDocked ? "Undock" : "Dock"} navigation`}
            onClick={() => {
              setNavIsDocked(!navIsDocked);
              localStorage.setItem("navIsDocked", JSON.stringify(!navIsDocked));
            }}
            iconType={navIsDocked ? "lock" : "lockOpen"}
          />
        </EuiCollapsibleNavGroup>
      </EuiShowFor>
    </EuiCollapsibleNav>
  );
};
