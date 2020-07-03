import React from "react";
import {
  EuiPageContent,
  EuiTitle,
  EuiPageContentHeader,
  EuiPageContentHeaderSection,
  EuiPageContentBody,
  EuiFlexGroup,
  EuiFlexItem,
} from "@elastic/eui";
import EventGameListContainer from "./EventGameListContainer";

export default ({ eventId }) => (
  <EuiPageContent>
    <EuiPageContentHeader>
      <EuiPageContentHeaderSection>
        <EuiTitle>
          <h2>Games Played</h2>
        </EuiTitle>
      </EuiPageContentHeaderSection>
    </EuiPageContentHeader>
    <EuiPageContentBody>
      <EuiFlexGroup justifyContent="center">
        <EuiFlexItem grow={false}>
          <EventGameListContainer eventId={eventId} />
        </EuiFlexItem>
      </EuiFlexGroup>
    </EuiPageContentBody>
  </EuiPageContent>
);
