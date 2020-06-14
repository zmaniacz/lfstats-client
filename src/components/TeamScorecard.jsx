import React, { useContext, Fragment } from "react";
import {
  EuiFlexItem,
  EuiFlexGroup,
  EuiTitle,
  EuiBadge,
  EuiInMemoryTable,
  EuiStat,
  EuiAccordion,
} from "@elastic/eui";
import { euiPaletteForStatus } from "@elastic/eui/lib/services";
import { VictoryPie, VictoryTooltip } from "victory";
import { htmlIdGenerator } from "@elastic/eui/lib/services";
import EuiCustomLink from "./EuiCustomLink";
import { StateContext } from "../utils/StateContext";

const TeamScorecard = ({ team, gameLength }) => {
  const [state] = useContext(StateContext);
  const uptimePalette = euiPaletteForStatus(3);
  uptimePalette.push("#ffffff");

  const columns = [
    {
      field: "player_name",
      name: "Name",
      dataType: "string",
      truncateText: true,
      render: (name, item) => (
        <EuiCustomLink to={`/players/${item.player_id}`}>{name}</EuiCustomLink>
      ),
    },
    {
      field: "position",
      name: "Position",
      dataType: "string",
    },
    { field: "score", name: "Score", dataType: "number", sortable: true },
    {
      field: "mvp_points",
      name: "MVP",
      dataType: "number",
      sortable: true,
      render: (name, item) => {
        return Number.parseFloat(name).toFixed(2);
      },
    },
    {
      field: "hit_diff",
      name: "Hit Diff",
      dataType: "number",
      sortable: true,
      render: (name, item) => {
        return (
          <span>
            {Number.parseFloat(name).toFixed(2)} ({item.shot_opponent}/
            {item.times_zapped})
          </span>
        );
      },
    },
    {
      name: "Uptime",
      align: "center",
      render: (item) => {
        let chartData = [
          { y: item.uptime },
          { y: item.resupply_downtime },
          { y: item.other_downtime },
        ];

        if (item.lives_left == 0) {
          chartData.push({
            y:
              gameLength * 1000 -
              item.uptime -
              item.resupply_downtime -
              item.other_downtime,
          });
        }
        return (
          <VictoryPie
            height={100}
            padding={0}
            colorScale={uptimePalette}
            labelComponent={<VictoryTooltip />}
            data={chartData}
          />
        );
      },
    },
  ];

  return (
    <Fragment>
      <EuiFlexGroup justifyContent="spaceAround">
        <EuiFlexItem grow={true}>
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
      <EuiInMemoryTable
        columns={columns}
        items={team.scorecards}
        search={false}
        compressed={true}
        pagination={false}
        sorting={false}
      />
    </Fragment>
  );
};

export default TeamScorecard;
