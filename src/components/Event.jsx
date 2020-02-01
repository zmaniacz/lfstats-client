import React, { Fragment } from "react";
import {
  EuiPageContent,
  EuiPageHeader,
  EuiPageHeaderSection,
  EuiTitle,
  EuiPageContentHeader,
  EuiPageContentHeaderSection,
  EuiPageContentBody,
  EuiFlexGroup,
  EuiFlexItem,
  EuiLoadingSpinner,
  EuiHorizontalRule,
  EuiLoadingContent
} from "@elastic/eui";
import { useQuery } from "@apollo/react-hooks";
import { gql } from "apollo-boost";
import { useParams } from "react-router-dom";
import LoadError from "./LoadError";
import ScorecardList from "./ScorecardList";
import ScorecardSummary from "./ScorecardSummary";
import MedicHitSummary from "./MedicHitSummary";

const GET_EVENT = gql`
  query GetEvent($id: bigint) {
    events(where: { id: { _eq: $id } }) {
      id
      name
      description
      is_comp
      games_aggregate {
        aggregate {
          max {
            game_datetime
          }
        }
      }
      center {
        name
      }
    }
  }
`;

const GET_EVENT_SCORECARDS = gql`
  query GetEventScorecards($id: bigint) {
    events(where: { id: { _eq: $id } }) {
      scorecards {
        id
        player_name
        position
        team
        score
        mvp_points
        medic_hits
        accuracy
        shot_team
        hit_diff
        game {
          id
          game_name
          winner
        }
        player {
          id
          player_name
        }
      }
    }
  }
`;

const GET_SUMMARY_STATS = gql`
  query GetSummaryStats($id: bigint) {
    events(where: { id: { _eq: $id } }) {
      scorecards(distinct_on: player_id) {
        player {
          id
          player_name
          scorecards_aggregate(where: { event_id: { _eq: $id } }) {
            aggregate {
              avg {
                accuracy
                mvp_points
                score
              }
              min {
                accuracy
                mvp_points
                score
              }
              max {
                accuracy
                mvp_points
                score
              }
              sum {
                shot_opponent
                times_zapped
                medic_hits
              }
            }
          }
        }
      }
    }
  }
`;

const GET_MEDIC_HIT_STATS = gql`
  query GetmedicHitStats($id: bigint) {
    events(where: { id: { _eq: $id } }) {
      scorecards(distinct_on: player_id) {
        player {
          id
          player_name
          nonresup: scorecards_aggregate(
            where: {
              event_id: { _eq: $id }
              _and: {
                position: { _neq: "Ammo Carrier" }
                _and: { position: { _neq: "Medic" } }
              }
            }
          ) {
            aggregate {
              avg {
                medic_hits
              }
              sum {
                medic_hits
              }
              count
            }
          }
          all: scorecards_aggregate(where: { event_id: { _eq: $id } }) {
            aggregate {
              avg {
                medic_hits
              }
              sum {
                medic_hits
              }
              count
            }
          }
        }
      }
    }
  }
`;

export default function Event() {
  const { eventId } = useParams();

  const { data: eventData, loading: eventLoading } = useQuery(GET_EVENT, {
    variables: { id: eventId * 1 }
  });

  const {
    data: scorecardData,
    loading: scorecardLoading,
    error: scorecardError
  } = useQuery(GET_EVENT_SCORECARDS, {
    variables: { id: eventId * 1 }
  });

  const {
    data: summaryData,
    loading: summaryLoading,
    error: summaryError
  } = useQuery(GET_SUMMARY_STATS, {
    variables: { id: eventId * 1 }
  });

  const {
    data: medicData,
    loading: medicLoading,
    error: medicError
  } = useQuery(GET_MEDIC_HIT_STATS, {
    variables: { id: eventId * 1 }
  });

  return (
    <Fragment>
      <EuiPageHeader>
        <EuiPageHeaderSection>
          <EuiTitle size="l">
            <h1>
              {eventLoading && <EuiLoadingContent lines={1} />}
              {eventData &&
                `${eventData.events[0].name} @ ${eventData.events[0].center.name}`}
            </h1>
          </EuiTitle>
        </EuiPageHeaderSection>
      </EuiPageHeader>
      <EuiPageContent>
        <EuiPageContentHeader>
          <EuiPageContentHeaderSection>
            <EuiTitle>
              <h2>Scorecards</h2>
            </EuiTitle>
          </EuiPageContentHeaderSection>
        </EuiPageContentHeader>
        <EuiPageContentBody>
          <EuiFlexGroup justifyContent="center">
            <EuiFlexItem grow={false}>
              {scorecardLoading && <EuiLoadingSpinner size="xl" />}
              {scorecardError && <LoadError />}
              {scorecardData && (
                <ScorecardList
                  scorecards={scorecardData.events[0].scorecards}
                />
              )}
            </EuiFlexItem>
          </EuiFlexGroup>
        </EuiPageContentBody>
        <EuiHorizontalRule margin="xxl" />
        <EuiPageContentHeader>
          <EuiPageContentHeaderSection>
            <EuiTitle>
              <h2>Summary Stats</h2>
            </EuiTitle>
          </EuiPageContentHeaderSection>
        </EuiPageContentHeader>
        <EuiPageContentBody>
          <EuiFlexGroup justifyContent="center">
            <EuiFlexItem grow={false}>
              {summaryLoading && <EuiLoadingSpinner size="xl" />}
              {summaryError && <LoadError />}
              {summaryData && (
                <ScorecardSummary data={summaryData.events[0].scorecards} />
              )}
            </EuiFlexItem>
          </EuiFlexGroup>
        </EuiPageContentBody>
        <EuiHorizontalRule margin="xxl" />
        <EuiPageContentHeader>
          <EuiPageContentHeaderSection>
            <EuiTitle>
              <h2>Medic Hits</h2>
            </EuiTitle>
          </EuiPageContentHeaderSection>
        </EuiPageContentHeader>
        <EuiPageContentBody>
          <EuiFlexGroup justifyContent="center">
            <EuiFlexItem grow={false}>
              {medicLoading && <EuiLoadingSpinner size="xl" />}
              {medicError && <LoadError />}
              {medicData && (
                <MedicHitSummary data={medicData.events[0].scorecards} />
              )}
            </EuiFlexItem>
          </EuiFlexGroup>
        </EuiPageContentBody>
      </EuiPageContent>
    </Fragment>
  );
}
