import React, { useState } from "react";
import { useQuery, gql } from "@apollo/client";
import { EuiComboBox } from "@elastic/eui";

const GET_CENTERS = gql`
  query GetCenters {
    centers(order_by: { name: asc }) {
      id
      ipl_id
      name
      short_name
    }
  }
`;

export default () => {
  const { data, loading, error } = useQuery(GET_CENTERS);
  const [selectedOptions, setSelected] = useState();

  const onChange = (selectedOptions) => {
    setSelected(selectedOptions);
  };

  if (loading) return <EuiComboBox isLoading={true} />;
  if (error) return <EuiComboBox isInvalid={true} />;

  let options = data.centers.map((item) => ({
    label: item.name,
  }));

  return (
    <EuiComboBox
      placeholder="Select centers to include"
      options={options}
      selectedOptions={selectedOptions}
      onChange={onChange}
    />
  );
};
