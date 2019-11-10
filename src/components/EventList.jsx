import React from "react";
import { useQuery } from "@apollo/react-hooks";
import { gql } from "apollo-boost";
import { Link } from "react-router-dom";
import CircularProgress from "@material-ui/core/CircularProgress";

const GET_RECENT_EVENTS = gql`
{
  events(limit: 10, order_by: {games_aggregate: {max: {game_datetime: desc_nulls_last}}}) {
    id
    name
    games_aggregate {
      aggregate {
        max {
          game_datetime
        }
        count
      }
    }
  }
}
`;

function EventList() {
  const { data, loading, error } = useQuery(GET_RECENT_EVENTS);

  return (
    <ul>
      {loading && <CircularProgress />}
      {error && <p>Error!</p>}
      {data &&
        data.events.map(({ id, name, games_aggregate }) => (
          <li key={id}>
            <Link to={`/event/${id}`}>
              {id} - {name} - {games_aggregate.aggregate.max.game_datetime} - {games_aggregate.aggregate.count}
            </Link>
          </li>
        ))}
    </ul>
  );
}

export default EventList;
