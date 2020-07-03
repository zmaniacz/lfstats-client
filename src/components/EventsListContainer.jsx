import React from "react";
import {
  EuiPageContentHeaderSection,
  EuiPageContent,
  EuiPageContentHeader,
  EuiPageContentBody,
  EuiTitle,
  EuiFlexGroup,
  EuiFlexItem,
  EuiLoadingSpinner,
} from "@elastic/eui";
import { useQuery, gql } from "@apollo/client";
import LoadError from "./LoadError";
import EventsList from "./EventsList";

const GET_EVENTS = gql`
  query GetEvent {
    events {
      id
      name
      type
      scoring
      is_comp
      center {
        id
        name
      }
      games_aggregate {
        aggregate {
          max {
            game_datetime
          }
        }
      }
    }
  }
`;

export default ({ eventId }) => {
  const { data, loading, error } = useQuery(GET_EVENTS);

  if (loading) return <EuiLoadingSpinner size="xl" />;
  if (error) return <LoadError />;
  const events = data.events.map((item) => ({
    center_name: item.center.name,
    ...item,
  }));
  return (
    <EuiPageContent>
      <EuiPageContentHeader>
        <EuiPageContentHeaderSection>
          <EuiTitle>
            <h2>Events</h2>
          </EuiTitle>
        </EuiPageContentHeaderSection>
      </EuiPageContentHeader>
      <EuiPageContentBody>
        <EuiFlexGroup justifyContent="center">
          <EuiFlexItem grow={false}>
            <EventsList events={events} />
          </EuiFlexItem>
        </EuiFlexGroup>
      </EuiPageContentBody>
    </EuiPageContent>
  );
};
