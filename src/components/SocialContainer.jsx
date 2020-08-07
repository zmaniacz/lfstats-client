import React from "react";
import {
  EuiPageHeader,
  EuiPageHeaderSection,
  EuiTitle,
  EuiPageContent,
  EuiSpacer,
  EuiFormRow,
  EuiFlexGroup,
  EuiFlexItem,
} from "@elastic/eui";
import { Outlet, Routes, Route } from "react-router-dom";
import CenterMultiSelect from "./CenterMultiSelect";
import SocialDatePickerContainer from "./SocialDatePickerContainer";
import SocialMultiDatePickerContainer from "./SocialMultiDatePickerContainer";

export default function SocialContainer() {
  return (
    <>
      <EuiPageHeader>
        <EuiPageHeaderSection>
          <EuiTitle size="l">
            <h1>Social Stats</h1>
          </EuiTitle>
        </EuiPageHeaderSection>
      </EuiPageHeader>
      <EuiPageContent>
        <EuiFlexGroup>
          <EuiFlexItem>
            <EuiFormRow label="Filter by Center">
              <CenterMultiSelect />
            </EuiFormRow>
          </EuiFlexItem>
          <EuiFlexItem>
            <EuiFormRow label="Filter by Date">
              <Routes>
                <Route path="daily" element={<SocialDatePickerContainer />} />
                <Route path="*" element={<SocialMultiDatePickerContainer />} />
              </Routes>
            </EuiFormRow>
          </EuiFlexItem>
        </EuiFlexGroup>
        <EuiSpacer />
        <Outlet />
      </EuiPageContent>
    </>
  );
}
