import React from "react";
import ReactDOM from "react-dom";
import "bootswatch/dist/litera/bootstrap.min.css";
import "@devexpress/dx-react-grid-bootstrap4/dist/dx-react-grid-bootstrap4.css";
import LFStats from "./LFStats";
import * as serviceWorker from "./serviceWorker";

ReactDOM.render(<LFStats />, document.getElementById("root"));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
