import React from "react";
import {
  EuiPageContent,
  EuiPageContentHeader,
  EuiPageContentHeaderSection,
  EuiPageContentBody,
  EuiFlexGroup,
  EuiFlexItem,
  EuiPanel,
  EuiText,
  EuiStat,
} from "@elastic/eui";
import moment from "moment";
import TeamScorecard from "./TeamScorecard.jsx";

export default ({ game }) => (
  <EuiPageContent>
    <EuiPageContentHeader>
      <EuiPageContentHeaderSection>
        <EuiText>
          <h2>{game.game_name}</h2>
        </EuiText>
      </EuiPageContentHeaderSection>
      <EuiPageContentHeaderSection>
        <EuiFlexGroup>
          <EuiFlexItem>
            <EuiStat
              title={game.center.name}
              description="Location"
              titleSize="xs"
              reverse
            />
          </EuiFlexItem>
          <EuiFlexItem>
            <EuiStat
              title={moment
                .utc(game.game_datetime)
                .format("MMM Do YYYY, HH:mm")}
              description="Date/Time"
              titleSize="xs"
              reverse
            />
          </EuiFlexItem>
        </EuiFlexGroup>
      </EuiPageContentHeaderSection>
    </EuiPageContentHeader>
    <EuiPageContentBody>
      <EuiFlexGroup justifyContent="center">
        <EuiFlexItem>
          <EuiPanel>
            <TeamScorecard
              team={game.winner[0]}
              gameLength={game.game_length}
            />
          </EuiPanel>
        </EuiFlexItem>
      </EuiFlexGroup>
      <EuiFlexGroup justifyContent="center">
        <EuiFlexItem>
          <EuiPanel>
            <TeamScorecard team={game.loser[0]} gameLength={game.game_length} />
          </EuiPanel>
        </EuiFlexItem>
      </EuiFlexGroup>
    </EuiPageContentBody>
  </EuiPageContent>
);
