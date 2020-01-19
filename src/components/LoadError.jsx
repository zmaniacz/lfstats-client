import React from "react";
import { EuiCallOut } from "@elastic/eui";

export default () => (
  <EuiCallOut
    title="Data Failed to Load"
    color="danger"
    iconType="alert"
  ></EuiCallOut>
);
