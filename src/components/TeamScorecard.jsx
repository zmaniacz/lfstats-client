import React, { useContext, useState, Fragment } from "react";
import {
  EuiFlexItem,
  EuiFlexGroup,
  EuiTitle,
  EuiBadge,
  EuiBasicTable,
  EuiStat,
  EuiAccordion,
  EuiButtonIcon,
  EuiFlexGrid,
  EuiHorizontalRule,
} from "@elastic/eui";
import { euiPaletteForStatus } from "@elastic/eui/lib/services";
import { VictoryPie, VictoryTooltip } from "victory";
import { htmlIdGenerator } from "@elastic/eui/lib/services";
import EuiCustomLink from "./EuiCustomLink";
import { StateContext } from "../utils/StateContext";

const TeamScorecard = ({ team, gameLength }) => {
  const [itemIdToExpandedRowMap, setItemIdToExpandedRowMap] = useState({});

  const [state] = useContext(StateContext);

  const uptimePalette = euiPaletteForStatus(3);
  uptimePalette.push("#ffffff");

  const toggleDetails = (item) => {
    const itemIdToExpandedRowMapValues = { ...itemIdToExpandedRowMap };
    if (itemIdToExpandedRowMapValues[item.id]) {
      delete itemIdToExpandedRowMapValues[item.id];
    } else {
      const listItems = [
        {
          description: "Lives Left",
          title: item.lives_left,
        },
        {
          description: "Shots Left",
          title: item.shots_left,
        },
        {
          description: "Got Missiled",
          title: item.times_missiled,
        },
        {
          description: "Shot Team",
          title: item.shot_team,
        },
        {
          description: "Nuke Cancels",
          title: item.nukes_canceled,
        },
      ];

      if (item.position !== "Heavy Weapons") {
        listItems.push(
          {
            description: "SP Spent",
            title: item.sp_spent,
          },
          {
            description: "SP Earned",
            title: item.sp_earned,
          }
        );
      }

      if (item.position === "Commander") {
        listItems.push({
          description: "Nukes",
          title: `${item.nukes_activated}/${item.nukes_detonated}`,
        });
      }

      if (item.position === "Commander" || item.position === "Heavy Weapons") {
        listItems.push(
          {
            description: "Missiled",
            title: item.missiled_opponent,
          },
          {
            description: "Missiled Team",
            title: item.missiled_team,
          }
        );
      }

      if (item.position === "Medic") {
        listItems.push({
          description: "Life Boosts",
          title: item.life_boost,
        });
      }

      if (item.position === "Ammo Carrier") {
        listItems.push({
          description: "Ammo Boosts",
          title: item.ammo_boost,
        });
      }

      if (item.position === "Ammo Carrier" || item.position === "Medic") {
        listItems.push({
          description: "Resupplies",
          title: item.resupplies,
        });
      }

      itemIdToExpandedRowMapValues[item.id] = (
        <EuiFlexGrid>
          {listItems.map((item, index) => (
            <EuiFlexItem key={index} style={{ minWidth: 100 }}>
              <EuiStat
                title={item.title}
                description={item.description}
                titleSize="xs"
                reverse
              />
            </EuiFlexItem>
          ))}
        </EuiFlexGrid>
      );
    }
    setItemIdToExpandedRowMap(itemIdToExpandedRowMapValues);
  };

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
      render: (name, item) => {
        return Number.parseFloat(name).toFixed(2);
      },
    },
    {
      field: "hit_diff",
      name: "Hit Diff",
      dataType: "number",
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
      field: "accuracy",
      name: "Acc",
      dataType: "number",
      render: (name, item) => `${(item.accuracy * 100).toFixed(2)}%`,
    },
    {
      field: "medic_hits",
      name: "Medic Hits",
      dataType: "number",
      render: (name, item) => {
        if (item.position === "Commander") {
          return `${item.medic_hits}/${item.medic_nukes}`;
        } else {
          return item.medic_hits;
        }
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

        if (item.lives_left === 0) {
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
    {
      align: "right",
      width: "40px",
      isExpander: true,
      render: (item) => (
        <EuiButtonIcon
          onClick={() => toggleDetails(item)}
          aria-label={itemIdToExpandedRowMap[item.id] ? "Collapse" : "Expand"}
          iconType={itemIdToExpandedRowMap[item.id] ? "arrowUp" : "arrowDown"}
        />
      ),
    },
  ];

  const scoreListItems = [
    {
      description: "Score",
      title: team.total_score,
    },
    {
      description: "Raw Score",
      title: team.raw_score,
    },
    {
      description: "Elim Bonus",
      title: team.elim_bonus,
    },
    {
      description: "Individual Penalties",
      title: 0,
    },
    {
      description: "Team Penalties",
      title: 0,
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
        paddingSize="m"
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
          {scoreListItems.map((item, index) => (
            <EuiFlexItem key={index}>
              <EuiStat
                title={item.title}
                description={item.description}
                titleSize="xs"
                reverse
              />
            </EuiFlexItem>
          ))}
        </EuiFlexGroup>
      </EuiAccordion>
      <EuiBasicTable
        columns={columns}
        items={team.scorecards}
        itemId="id"
        itemIdToExpandedRowMap={itemIdToExpandedRowMap}
        isExpandable={true}
      />
    </Fragment>
  );
};

export default TeamScorecard;
