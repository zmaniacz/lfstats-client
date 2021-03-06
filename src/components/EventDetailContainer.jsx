import React from "react";
import {
  EuiPageHeader,
  EuiPageHeaderSection,
  EuiTitle,
  EuiText,
} from "@elastic/eui";
import { useQuery, gql } from "@apollo/client";
import { Outlet, useParams } from "react-router-dom";
import { selectedEventVar } from "../cache";
import { LoadError, LoadSpinner } from "./LFLoad";
import EuiCustomLink from "./EuiCustomLink";

const GET_EVENT = gql`
  query GetEvent($id: bigint!) {
    event: events_by_pk(id: $id) {
      id
      name
      description
      is_comp
      center {
        name
      }
    }
  }
`;

export default () => {
  const { eventId } = useParams();
  const { data, loading, error } = useQuery(GET_EVENT, {
    variables: { id: eventId * 1 },
  });

  if (loading) return <LoadSpinner />;
  if (error) return <LoadError />;
  if (data.event === null) return <LoadError />;

  selectedEventVar({
    id: data.event.id,
    name: data.event.name,
    description: data.event.description,
    is_comp: data.event.is_comp,
  });

  return (
    <>
      <EuiPageHeader>
        <EuiPageHeaderSection>
          <EuiTitle size="l">
            <h1>{`${data.event.name} @ ${data.event.center.name}`}</h1>
          </EuiTitle>
          <EuiText>
            <h4>
              <EuiCustomLink to="/events">Change</EuiCustomLink>
            </h4>
          </EuiText>
        </EuiPageHeaderSection>
      </EuiPageHeader>
      <Outlet />
    </>
  );
};
