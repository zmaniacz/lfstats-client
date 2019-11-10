import React from "react";
import { DataTypeProvider } from "@devexpress/dx-react-grid";
import { useTheme } from "@material-ui/core/styles";
import { TableChart } from "@material-ui/icons";
import { Link } from "react-router-dom";

function HitDiffFormatter({ value }) {
  const theme = useTheme();

  const styles = {
    icon: {
      marginLeft: theme.spacing(1),
      fontSize: 16
    },
    cell: {
      display: "inline-flex",
      verticalAlign: "bottom"
    }
  };

  let hitDiff = value.toFixed(2);
  return (
    <Link to="/">
      <div style={styles.cell}>
        {hitDiff} <TableChart style={styles.icon} />
      </div>
    </Link>
  );
}

export default function HitDiffTypeProvider(props) {
  return <DataTypeProvider formatterComponent={HitDiffFormatter} {...props} />;
}
