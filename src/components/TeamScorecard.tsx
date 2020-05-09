import React, { useContext } from "react";
import { StateContext } from "../utils/StateContext";

interface TeamScorecardItem {
  team_color: String;
  score: Number;
  adj: Number;
  team_id: Number;
  scorecards: Array<Object>;
  team_penalties: Array<Object>;
}

const TeamScorecard = ({ team }: { team: TeamScorecardItem }): JSX.Element => {
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
