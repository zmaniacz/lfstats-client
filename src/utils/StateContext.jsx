import React, { useState } from "react";
import { euiPaletteColorBlind } from "@elastic/eui/lib/services";

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
  const palette = euiPaletteColorBlind();
  const [state, setState] = useState({
    selectedEvent: null,
    selectedCenter: null,
    typeFilter: "all",
    teamColors: {
      0: palette[6],
      1: palette[9],
      2: palette[0],
      11: palette[9],
      12: palette[3],
      13: palette[0],
    },
  });

  return (
    <StateContext.Provider value={[state, setState]}>
      {props.children}
    </StateContext.Provider>
  );
};

export { StateContext, StateProvider };
