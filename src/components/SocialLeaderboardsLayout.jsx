import React from "react";
import {
  EuiTitle,
  EuiPageContentHeader,
  EuiPageContentHeaderSection,
  EuiPageContentBody,
} from "@elastic/eui";

import SocialLeaderBoardPositionsContainer from "./SocialLeaderBoardPositionsContainer";

export default () => {
  return (
    <>
      <EuiPageContentHeader>
        <EuiPageContentHeaderSection>
          <EuiTitle>
            <h2>Leaderboards</h2>
          </EuiTitle>
        </EuiPageContentHeaderSection>
      </EuiPageContentHeader>
      <EuiPageContentBody>
        <SocialLeaderBoardPositionsContainer />
      </EuiPageContentBody>
    </>
  );
};
