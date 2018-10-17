import React from "react";
import { Table } from "@devexpress/dx-react-grid-bootstrap4";

const TableComponent = ({ ...restProps }) => (
  <Table.Table
    {...restProps}
    className="table table-striped table-bordered table-sm"
  />
);

export default TableComponent;
