import React, { useState } from "react";
import {
  EuiCollapsibleNav,
  EuiCollapsibleNavGroup,
  EuiHeaderSectionItemButton,
  EuiIcon,
  EuiText,
  EuiListGroup,
} from "@elastic/eui";
import { useQuery, gql } from "@apollo/client";
import EuiCustomListGroupItem from "./EuiCustomListGroupItem";

const CURRENT_EVENT_ID = gql`
  query GetCurrentEvent {
    selectedEvent @client
  }
`;

export default () => {
  const { data } = useQuery(CURRENT_EVENT_ID);
  const [navIsOpen, setNavIsOpen] = useState(
    JSON.parse(String(localStorage.getItem("navIsOpen"))) || false
  );

  return (
    <EuiCollapsibleNav
      id="guideCollapsibleNavAllExampleNav"
      aria-label="Main navigation"
      isOpen={navIsOpen}
      isDocked={true}
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
      <EuiCollapsibleNavGroup
        title="Event Stats"
        iconType="dashboardApp"
        onClick={() => setNavIsOpen(false)}
      >
        {data.selectedEvent !== null ? (
          <>
            <EuiText size="s" color="default">
              <h6>{data.selectedEvent.name}</h6>
            </EuiText>
            <EuiListGroup flush={true} gutterSize="none">
              {data.selectedEvent.is_comp && (
                <EuiCustomListGroupItem
                  size="xs"
                  label="Standings"
                  to={`/events/${data.selectedEvent.id}/standings`}
                />
              )}
              <EuiCustomListGroupItem
                size="xs"
                label="Daily Stats"
                to={`/events/${data.selectedEvent.id}/daily`}
              />
              <EuiCustomListGroupItem
                size="xs"
                label="Player Rankings"
                to={`/events/${data.selectedEvent.id}/rankings`}
              />
              <EuiCustomListGroupItem
                size="xs"
                label="Leaderboards"
                to={`/events/${data.selectedEvent.id}/leaderboards`}
              />
              <EuiCustomListGroupItem
                size="xs"
                label="Game List"
                to={`/events/${data.selectedEvent.id}/games`}
              />
              <EuiCustomListGroupItem
                size="xs"
                label="Penalties"
                to={`/events/${data.selectedEvent.id}/leaderboards`}
              />
            </EuiListGroup>
          </>
        ) : (
          <EuiListGroup flush={true} gutterSize="none">
            <EuiCustomListGroupItem label="Select an Event" to={`/events`} />
          </EuiListGroup>
        )}
      </EuiCollapsibleNavGroup>
      <EuiCollapsibleNavGroup title="Social Stats" iconType="lensApp">
        <EuiText size="s" color="subdued">
          <EuiListGroup flush={true} gutterSize="none">
            <EuiCustomListGroupItem
              size="xs"
              label="Daily Stats"
              to="/social"
            />
          </EuiListGroup>
          <p>Game List</p>
          <p>Leaderboards</p>
        </EuiText>
      </EuiCollapsibleNavGroup>
      <EuiCollapsibleNavGroup title="Player Stats" iconType="metricsApp">
        <EuiText size="s" color="subdued">
          <p>Top Players</p>
        </EuiText>
      </EuiCollapsibleNavGroup>
      <EuiCollapsibleNavGroup title="Center Stats" iconType="gisApp">
        <EuiText size="s" color="subdued">
          <p>Center Stats</p>
          <p>All-Center Teams</p>
        </EuiText>
      </EuiCollapsibleNavGroup>
    </EuiCollapsibleNav>
  );
};
