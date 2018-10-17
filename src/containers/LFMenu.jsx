import React from "react";
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink as BsNavLink
} from "reactstrap";
import { NavLink } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHome } from "@fortawesome/free-solid-svg-icons";

export default class LFMenu extends React.Component {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.state = {
      isOpen: false
    };
  }

  toggle() {
    this.setState({
      isOpen: !this.state.isOpen
    });
  }

  render() {
    return (
      <Navbar color="primary" dark expand="lg">
        <NavbarBrand tag={NavLink} href="/" to="/">
          <FontAwesomeIcon icon={faHome} />
        </NavbarBrand>
        <NavbarToggler onClick={this.toggle} />
        <Collapse isOpen={this.state.isOpen} navbar>
          <Nav className="mr-auto" navbar>
            <NavItem>
              <BsNavLink tag={NavLink} href="/events" to="/events">
                Events
              </BsNavLink>
            </NavItem>
            <NavItem>
              <BsNavLink tag={NavLink} href="/players" to="/players">
                Players
              </BsNavLink>
            </NavItem>
          </Nav>
        </Collapse>
      </Navbar>
    );
  }
}
