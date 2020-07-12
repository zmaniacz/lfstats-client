import React, { useState } from "react";
import { gql, useApolloClient } from "@apollo/client";
import { EuiComboBox } from "@elastic/eui";

export default ({ centers, selectedCenters }) => {
  const client = useApolloClient();
  const [selectedOptions, setSelected] = useState(selectedCenters);

  const onChange = (selectedOptions) => {
    setSelected(selectedOptions);
    client.writeQuery({
      query: gql`
        query getSelectedCenters {
          selectedCenters
        }
      `,
      data: {
        selectedCenters: selectedOptions,
      },
    });
  };

  return (
    <EuiComboBox
      placeholder="Select centers to include"
      options={centers}
      selectedOptions={selectedOptions}
      onChange={onChange}
    />
  );
};
