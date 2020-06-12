import React, { useContext, Fragment } from "react";
import {
  EuiFlexItem,
  EuiFlexGroup,
  EuiTitle,
  EuiText,
  EuiBadge,
  EuiInMemoryTable,
  EuiStat,
  EuiAccordion,
  EuiFlexGrid,
} from "@elastic/eui";
import { htmlIdGenerator } from "@elastic/eui/lib/services";
import { StateContext } from "../utils/StateContext";

const TeamScorecard = ({ team }) => {
  const [state] = useContext(StateContext);

  return (
    <Fragment>
      <EuiFlexGroup justifyContent="spaceAround">
        <EuiFlexItem grow={false}>
          <EuiTitle size="m">
            <EuiBadge color={state.teamColors[team.color_enum]}>
              {team.color_desc} Team
            </EuiBadge>
          </EuiTitle>
        </EuiFlexItem>
      </EuiFlexGroup>

      <EuiAccordion
        id={htmlIdGenerator()()}
        buttonContent={
          <EuiFlexGroup justifyContent="spaceAround">
            <EuiFlexItem>
              <EuiStat
                title={team.total_score}
                description="Score"
                titleSize="l"
                reverse
              />
            </EuiFlexItem>
          </EuiFlexGroup>
        }
      >
        <EuiFlexGroup>
          <EuiFlexItem>
            <EuiStat
              title={team.raw_score}
              description="Raw Score"
              titleSize="xs"
              reverse
            />
          </EuiFlexItem>
          <EuiFlexItem>
            <EuiStat
              title={team.elim_bonus}
              description="Elim Bonus"
              titleSize="xs"
              reverse
            />
          </EuiFlexItem>
          <EuiFlexItem>
            <EuiStat
              title={0}
              description="Individual Penalties"
              titleSize="xs"
              reverse
            />
          </EuiFlexItem>
          <EuiFlexItem>
            <EuiStat title={0} description="Team Penalties" titleSize="xs" />
          </EuiFlexItem>
        </EuiFlexGroup>
      </EuiAccordion>
    </Fragment>
  );
};

export default TeamScorecard;
