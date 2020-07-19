import React from "react";
import { useQuery, gql } from "@apollo/client";
import { EuiComboBox } from "@elastic/eui";
import { selectedCentersVar } from "../cache";

const GET_CENTERS = gql`
  query GetCenters {
    centers(order_by: { name: asc }) {
      id
      name
    }
    selectedCenters @client
  }
`;

export default () => {
  const { data, loading, error } = useQuery(GET_CENTERS);

  const onChange = (selectedOptions) => {
    selectedCentersVar(selectedOptions.map((item) => item.value.id));
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

  let selectedOptions = options.filter(
    (item) => data.selectedCenters.indexOf(item.value.id) >= 0
  );

  return (
    <EuiComboBox
      placeholder="Select centers to include"
      options={options}
      selectedOptions={selectedOptions}
      onChange={onChange}
    />
  );
};
