import React from "react";
import {
  EuiPageHeader,
  EuiPageHeaderSection,
  EuiTitle,
  EuiPageContent,
} from "@elastic/eui";
import { Outlet } from "react-router-dom";
import CenterSelectContainer from "./CenterSelectContainer";

export default () => (
  <>
    <EuiPageHeader>
      <EuiPageHeaderSection>
        <EuiTitle size="l">
          <h1>Social Stats</h1>
        </EuiTitle>
      </EuiPageHeaderSection>
    </EuiPageHeader>
    <EuiPageContent>
      <CenterSelectContainer />
      <Outlet />
    </EuiPageContent>
  </>
);
