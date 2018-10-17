import React from "react";
import {
  TabContent,
  TabPane,
  Nav,
  NavItem,
  NavLink,
  Row,
  Col
} from "reactstrap";
import classnames from "classnames";
import CompactScorecardList from "./CompactScorecardList";
import GameList from "./GameList";

export default class Event extends React.Component {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.state = {
      activeTab: "event-scorecards"
    };
  }

  toggle(tab) {
    if (this.state.activeTab !== tab) {
      this.setState({
        activeTab: tab
      });
    }
  }

  render() {
    const { event } = this.props;
    return (
      <div>
        <h1>{`${event.name} - ${event.center.name}`}</h1>
        <Nav tabs>
          <NavItem>
            <NavLink
              className={classnames({
                active: this.state.activeTab === "event-scorecards"
              })}
              onClick={() => {
                this.toggle("event-scorecards");
              }}
            >
              Scorecards
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink
              className={classnames({
                active: this.state.activeTab === "event-overall"
              })}
              onClick={() => {
                this.toggle("event-overall");
              }}
            >
              Overall
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink
              className={classnames({
                active: this.state.activeTab === "event-games"
              })}
              onClick={() => {
                this.toggle("event-games");
              }}
            >
              Games Played
            </NavLink>
          </NavItem>
        </Nav>
        <TabContent activeTab={this.state.activeTab}>
          <TabPane tabId="event-scorecards">
            <Row>
              <Col>
                <CompactScorecardList scorecards={event.scorecards} />
              </Col>
            </Row>
          </TabPane>
          <TabPane tabId="event-overall">
            <h1>Overall</h1>
          </TabPane>
          <TabPane tabId="event-games">
            <GameList games={event.games} />
          </TabPane>
        </TabContent>
      </div>
    );
  }
}
