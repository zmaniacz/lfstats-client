import React from "react";
import { Query } from "react-apollo";
import gql from "graphql-tag";
import Event from "../components/Event";

const GET_EVENT = gql`
  query Event($eventId: Int!) {
    event(id: $eventId) {
      id
      name
      center {
        id
        name
      }
      games {
        id
        name
        startTime
        winner
        loser
        redScore
        greenScore
        pdfLink
      }
      scorecards {
        id
        playerId
        playerName
        team
        position
        shotsFired
        hitDiff
        shotsHit
        timesZapped
        timesMissiled
        missileHits
        nukesActivated
        nukesDetonated
        nukesCanceled
        medicHits
        ownMedicHits
        medicNukes
        scoutRapid
        lifeBoost
        ammoBoost
        livesLeft
        score
        shotsLeft
        shot3Hit
        elimOtherTeam
        teamElim
        ownNukeCancels
        shotOpponent
        shotTeam
        missiledOpponent
        missiledTeam
        resupplies
        rank
        basesDestroyed
        accuracy
        mvp
        spEarned
        spSpent
        isSub
        game {
          id
          name
        }
      }
    }
  }
`;

const EventContainer = ({ match }) => (
  <Query
    query={GET_EVENT}
    variables={{ eventId: parseInt(match.params.eventId) }}
  >
    {({ loading, error, data }) => {
      if (loading) return <p>Loading...</p>;
      if (error) return <p>Error :( - {`${error}`}</p>;

      return <Event event={data.event} />;
    }}
  </Query>
);

export default EventContainer;
