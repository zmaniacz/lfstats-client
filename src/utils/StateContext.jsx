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
      0: "gray",
      1: "red",
      2: "green",
      11: "red",
      12: "blue",
      13: "green",
    },
  });

  return (
    <StateContext.Provider value={[state, setState]}>
      {props.children}
    </StateContext.Provider>
  );
};

export { StateContext, StateProvider };
