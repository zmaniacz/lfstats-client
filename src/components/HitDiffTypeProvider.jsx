import React from "react";
import { DataTypeProvider } from "@devexpress/dx-react-grid";

const HitDiffFormatter = ({ value }) => {
  return value.toFixed(2);
};

const HitDiffTypeProvider = props => (
  <DataTypeProvider formatterComponent={HitDiffFormatter} {...props} />
);

export default HitDiffTypeProvider;
