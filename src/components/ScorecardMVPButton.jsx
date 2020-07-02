import React, { useState, Fragment } from "react";
import { gql } from "apollo-boost";
import { useQuery } from "@apollo/react-hooks";
import {
  EuiPopover,
  EuiButtonEmpty,
  EuiLoadingSpinner,
  EuiDescriptionList,
  EuiDescriptionListTitle,
  EuiDescriptionListDescription,
  EuiTextColor,
} from "@elastic/eui";
import { htmlIdGenerator } from "@elastic/eui/lib/services";
import LoadError from "./LoadError";

const GET_MVP_DETAILS = gql`
  query GetMVPDetails($id: bigint!) {
    scorecard: scorecards_by_pk(id: $id) {
      id
      mvp_details
    }
  }
`;

export default function ScorecardMVPButton({ scorecardId, children }) {
  const { data, loading, error } = useQuery(GET_MVP_DETAILS, {
    variables: { id: scorecardId * 1 },
  });

  const [isPopoverOpen, setIsPopoverOpen] = useState(false);
  const onButtonClick = () =>
    setIsPopoverOpen((isPopoverOpen) => !isPopoverOpen);
  const closePopover = () => setIsPopoverOpen(false);

  const button = (
    <EuiButtonEmpty onClick={onButtonClick}>{children}</EuiButtonEmpty>
  );

  let content;
  if (loading) content = <EuiLoadingSpinner size="xl" />;
  else if (error) content = <LoadError />;
  else {
    content = (
      <EuiDescriptionList compressed={true}>
        {Object.entries(data.scorecard.mvp_details)
          .filter(([, value]) => value.value !== 0)
          .map(([, value]) => (
            <Fragment key={htmlIdGenerator()()}>
              <EuiDescriptionListTitle>{value.name}</EuiDescriptionListTitle>
              <EuiDescriptionListDescription>
                <EuiTextColor color={value.value > 0 ? "secondary" : "danger"}>
                  {Number.isInteger(value.value)
                    ? value.value
                    : Number.parseFloat(value.value).toFixed(2)}
                </EuiTextColor>
              </EuiDescriptionListDescription>
            </Fragment>
          ))}
      </EuiDescriptionList>
    );
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
