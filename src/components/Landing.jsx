import React, { Fragment } from "react";
import {
  EuiFlexGroup,
  EuiFlexItem,
  EuiPageContent,
  EuiPageContentBody,
  EuiPageContentHeader,
  EuiPageContentHeaderSection,
  EuiPageHeader,
  EuiPageHeaderSection,
  EuiTitle
} from "@elastic/eui";
import CompactEventList from "./CompactEventList";

export default () => (
  <Fragment>
    <EuiPageHeader>
      <EuiPageHeaderSection>
        <EuiTitle size="l">
          <h1>Welcome</h1>
        </EuiTitle>
      </EuiPageHeaderSection>
    </EuiPageHeader>
    <EuiPageContent>
      <EuiPageContentHeader>
        <EuiPageContentHeaderSection>
          <EuiTitle>
            <h2>Recent Events</h2>
          </EuiTitle>
        </EuiPageContentHeaderSection>
      </EuiPageContentHeader>
      <EuiPageContentBody>
        <EuiFlexGroup justifyContent="center">
          <EuiFlexItem grow={false}>
            <CompactEventList />
          </EuiFlexItem>
        </EuiFlexGroup>
      </EuiPageContentBody>
    </EuiPageContent>
  </Fragment>
);
