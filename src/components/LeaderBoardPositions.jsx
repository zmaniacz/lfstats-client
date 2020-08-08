import React from "react";
import { EuiFlexGroup, EuiFlexItem, EuiText } from "@elastic/eui";
import LeaderBoardPositionsTable from "./LeaderBoardPositionTable";

export default ({ data }) => {
  return (
    <EuiFlexGroup wrap={true}>
      <EuiFlexItem grow={5}>
        <EuiText color="default">Commander</EuiText>
        <LeaderBoardPositionsTable
          position="Commander"
          data={data.filter((item) => item.position === "Commander")}
        />
      </EuiFlexItem>
      <EuiFlexItem grow={5}>
        <EuiText color="default">Heavy Weapons</EuiText>
        <LeaderBoardPositionsTable
          position="Heavy Weapons"
          data={data.filter((item) => item.position === "Heavy Weapons")}
        />
      </EuiFlexItem>
      <EuiFlexItem grow={5}>
        <EuiText color="default">Scout</EuiText>
        <LeaderBoardPositionsTable
          position="Scout"
          data={data.filter((item) => item.position === "Scout")}
        />
      </EuiFlexItem>
      <EuiFlexItem grow={5}>
        <EuiText color="default">Ammo Carrier</EuiText>
        <LeaderBoardPositionsTable
          position="Ammo Carrier"
          data={data.filter((item) => item.position === "Ammo Carrier")}
        />
      </EuiFlexItem>
      <EuiFlexItem grow={5}>
        <EuiText color="default">Medic</EuiText>
        <LeaderBoardPositionsTable
          position="Medic"
          data={data.filter((item) => item.position === "Medic")}
        />
      </EuiFlexItem>
    </EuiFlexGroup>
  );
};
