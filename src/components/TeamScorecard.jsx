import React, { useContext } from "react";
import { StateContext } from "../utils/StateContext";

const TeamScorecard = ({ team }) => {
  const [state] = useContext(StateContext);
  let teamColor =
    team.team_color === "red" ? state.redTeamColor : state.greenTeamColor;

  return (
    <h1>
      <span style={{ color: teamColor }}>{team.team_color}</span>
    </h1>
  );
};

export default TeamScorecard;
