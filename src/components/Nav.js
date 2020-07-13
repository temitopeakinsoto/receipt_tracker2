import React, { Component } from "react";
import { Menu, Button } from "semantic-ui-react";
import { NavLink } from "react-router-dom";
import "semantic-ui-css/semantic.min.css";
import logo_image from "../logo-2.svg";

class Nav extends Component {
  state = { activeItem: "dashboard" };

  handleItemClick = (e, { name }) => {
    e.preventDefault();
    this.setState({ activeItem: name });
  };
  signOut = () => {
    localStorage.removeItem("token");
    // window.location.reload();
  };
  render() {
    const { activeItem } = this.state;

    return (
      <>
        <NavLink to="/">
          <img
            style={{ width: "60px" }}
            className="ReceiptLogo"
            src={logo_image}
            alt="logo file"
          />
        </NavLink>
        <Menu inverted size="large" color="green" fluid widths={3}>
          <Menu.Item
            name="Add Receipt"
            active={activeItem === "Add Receipt"}
            onClick={this.handleItemClick}
          >
            <NavLink to="/add-receipt"> Add Receipt +</NavLink>
          </Menu.Item>
            <Menu.Item
              name="Log Out"
              active={activeItem === "Log Out"}
              onClick={this.signOut}
            >
              <NavLink to="/login">
                <Button color="red">Log Out</Button> 
              </NavLink>
            </Menu.Item>
        </Menu>
      </>
    );
  }
}

export default Nav;
