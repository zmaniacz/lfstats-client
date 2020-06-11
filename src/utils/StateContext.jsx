import React, { useState } from "react";

const StateContext = React.createContext([{}, () => {}]);

/*
Team Color Enum
0,None
1,Red
2,Green
11,Fire
12,Ice
13,Earth
*/

const StateProvider = (props) => {
  const [state, setState] = useState({
    selectedEvent: null,
    selectedCenter: null,
    typeFilter: "all",
    teamColors: {
      0: "#424242",
      1: "#c62828",
      2: "#2e7d32",
      11: "#c62828",
      12: "#6a1b9a",
      13: "#2e7d32",
    },
  });

  return (
    <StateContext.Provider value={[state, setState]}>
      {props.children}
    </StateContext.Provider>
  );
};

export { StateContext, StateProvider };
