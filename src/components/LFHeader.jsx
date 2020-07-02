import React from "react";
import { EuiHeader } from "@elastic/eui";
import LFNav from "./LFNav";
import EuiCustomHeaderLogo from "./EuiCustomHeaderLogo";

export default () => {
  const leftSectionItems = [
    <LFNav />,
    <EuiCustomHeaderLogo iconType="grokApp" to="/">
      LFstats
    </EuiCustomHeaderLogo>,
  ];
  return (
    <EuiHeader
      position="fixed"
      sections={[
        {
          items: leftSectionItems,
          borders: "right",
        },
      ]}
    />
  );
};
