import React, { useState } from "react";
import { gql } from "apollo-boost";
import { useQuery } from "@apollo/react-hooks";
import {
  EuiPopover,
  EuiButtonEmpty,
  EuiLoadingSpinner,
  EuiDescriptionList,
} from "@elastic/eui";
import LoadError from "./LoadError";

const GET_MVP_DETAILS = gql`
  query GetMVPDetails($id: bigint) {
    scorecards(where: { id: { _eq: $id } }) {
      id
      mvp_details
    }
  }
`;

export default function ScorecardMVPButton({ scorecardId, mvp }) {
  const { data, loading, error } = useQuery(GET_MVP_DETAILS, {
    variables: { id: scorecardId * 1 },
  });

  const [isPopoverOpen, setIsPopoverOpen] = useState(false);
  const onButtonClick = () =>
    setIsPopoverOpen((isPopoverOpen) => !isPopoverOpen);
  const closePopover = () => setIsPopoverOpen(false);

  const button = (
    <EuiButtonEmpty
      iconType="arrowDown"
      iconSide="right"
      onClick={onButtonClick}
    >
      {Number.parseFloat(mvp).toFixed(2)}
    </EuiButtonEmpty>
  );

  let content;
  if (loading) content = <EuiLoadingSpinner size="xl" />;
  else if (error) content = <LoadError />;
  else {
    const listItems = Object.entries(data.scorecards[0].mvp_details)
      .filter((item) => item[1].value > 0)
      .map((item, index) => ({
        title: item[1].name,
        description: Number.isInteger(item[1].value)
          ? item[1].value
          : item[1].value.toFixed(2),
      }));
    content = <EuiDescriptionList listItems={listItems} />;
  }

  return (
    <EuiPopover
      button={button}
      isOpen={isPopoverOpen}
      closePopover={closePopover}
    >
      {content}
    </EuiPopover>
  );
}
