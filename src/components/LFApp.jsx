import React from "react";
import { EuiPage, EuiPageBody, EuiSpacer } from "@elastic/eui";
import { Route, Routes, Navigate } from "react-router-dom";
import Landing from "./Landing";
import EventDetailContainer from "./EventDetailContainer";
import EventsListContainer from "./EventsListContainer";
import EventDaily from "./EventDaily";
import EventGames from "./EventGames";
//import PlayersContainer from "./PlayersContainer";
//import CentersContainer from "./CentersContainer";
import GameContainer from "./GameContainer";
import SocialContainer from "./SocialContainer";
import SocialDaily from "./SocialDaily";
import SocialGames from "./SocialGames";
import Footer from "./Footer";
import LFHeader from "./LFHeader";

import "@elastic/eui/dist/eui_theme_amsterdam_light.css";

export default () => (
  <>
    <LFHeader />
    <EuiPage restrictWidth={true}>
      <EuiPageBody>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="events">
            <Route path="/" element={<EventsListContainer />} />
            <Route path=":eventId" element={<EventDetailContainer />}>
              <Route path="/" element={<EventDaily />} />
              <Route path="standings" element={<EventDaily />} />
              <Route path="daily" element={<EventDaily />} />
              <Route path="games" element={<EventGames />} />
            </Route>
          </Route>
          <Route path="games">
            <Route path="/" element={<Navigate to="../" replace={true} />} />
            <Route path=":gameId" element={<GameContainer />} />
          </Route>
          <Route path="social" element={<SocialContainer />}>
            <Route path="/" element={<SocialDaily />} />
            <Route path="daily" element={<SocialDaily />} />
            <Route path="games" element={<SocialGames />} />
          </Route>
          {/*<Route path="players" element={<PlayersContainer />} />
<Route path="centers" element={<CentersContainer />} />*/}
        </Routes>
        <EuiSpacer />
        <Footer />
      </EuiPageBody>
    </EuiPage>
  </>
);
