import React from "react";
import { DataTypeProvider } from "@devexpress/dx-react-grid";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFilePdf } from "@fortawesome/free-regular-svg-icons";

const PdfFormatter = ({ value }) => (
  <a href={value} target="_blank" rel="noopener noreferrer">
    <FontAwesomeIcon icon={faFilePdf} />
  </a>
);

const PdfLinkTypeProvider = props => (
  <DataTypeProvider formatterComponent={PdfFormatter} {...props} />
);

export default PdfLinkTypeProvider;
