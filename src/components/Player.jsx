import React from "react";
import {
  EuiLink,
  EuiListGroup,
  EuiPageContent,
  EuiPageContentHeader,
  EuiPageContentHeaderSection,
  EuiPageContentBody,
  EuiText,
} from "@elastic/eui";

export function Player({ player }) {
  let aliases = player.players_names
    .filter((item) => item.player_name !== player.active_player_name)
    .map((item) => ({ label: item.player_name }));
  return (
    <EuiPageContent>
      <EuiPageContentHeader>
        <EuiPageContentHeaderSection>
          <EuiText>
            <h1>{player.active_player_name}</h1>{" "}
            <EuiLink
              href={`http://www.iplaylaserforce.com/mission-stats/?t=${player.ipl_id.slice(
                1
              )}`}
              external={true}
              target="_blank"
            >
              IPlayLaserForce
            </EuiLink>
          </EuiText>
        </EuiPageContentHeaderSection>
        {aliases.length > 0 && (
          <EuiPageContentHeaderSection>
            <EuiText>
              <h3>Aliases</h3>
            </EuiText>
            <EuiListGroup
              listItems={aliases}
              flush={true}
              gutterSize="none"
              color="subdued"
              size="s"
            />
          </EuiPageContentHeaderSection>
        )}
      </EuiPageContentHeader>
      <EuiPageContentBody></EuiPageContentBody>
    </EuiPageContent>
  );
}
