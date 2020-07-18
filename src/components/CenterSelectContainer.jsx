import React from "react";
import { useQuery, gql } from "@apollo/client";
import { EuiComboBox } from "@elastic/eui";
import { selectedCentersOptionsVar } from "../cache";

const GET_CENTERS = gql`
  query GetCenters {
    centers(order_by: { name: asc }) {
      id
      name
    }
    selectedCentersOptions @client
  }
`;

export default () => {
  const { data, loading, error } = useQuery(GET_CENTERS);

  const onChange = (selectedOptions) => {
    selectedCentersOptionsVar(selectedOptions);
  };

  if (loading) return <EuiComboBox placeholder="Loading..." isLoading={true} />;
  if (error) return <EuiComboBox placeholder="Error" isInvalid={true} />;

  let options = data.centers.map((item) => ({
    label: item.name,
    value: {
      id: item.id,
      name: item.name,
    },
  }));

  return (
    <EuiComboBox
      placeholder="Select centers to include"
      options={options}
      selectedOptions={data.selectedCentersOptions}
      onChange={onChange}
    />
  );
};
