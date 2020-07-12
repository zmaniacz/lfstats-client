import React from "react";
import { useQuery, gql } from "@apollo/client";
import { EuiComboBox } from "@elastic/eui";
import CenterSelect from "./CenterSelect";

const GET_CENTERS = gql`
  query GetCenters {
    centers(order_by: { name: asc }) {
      id
      name
    }
    selectedCenters @client
  }
`;

//add a container to pass data in
export default () => {
  const { data, loading, error } = useQuery(GET_CENTERS);

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
    <CenterSelect centers={options} selectedCenters={data.selectedCenters} />
  );
};
