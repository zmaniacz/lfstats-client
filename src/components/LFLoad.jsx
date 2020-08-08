import React from "react";
import {
  EuiCallOut,
  EuiFlexGroup,
  EuiFlexItem,
  EuiLoadingSpinner,
} from "@elastic/eui";

export function LoadError() {
  return (
    <EuiCallOut
      title="Data Failed to Load"
      color="danger"
      iconType="alert"
    ></EuiCallOut>
  );
}

export function LoadSpinner() {
  return (
    <EuiFlexGroup justifyContent="spaceAround">
      <EuiFlexItem grow={false}>
        <EuiLoadingSpinner size="xl" />
      </EuiFlexItem>
    </EuiFlexGroup>
  );
}
