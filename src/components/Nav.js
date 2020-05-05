import React, { Component } from "react";
import { Menu, Button } from "semantic-ui-react";
import { NavLink } from "react-router-dom";
import "semantic-ui-css/semantic.min.css";

class Nav extends Component {
  state = { activeItem: "dashboard" };

  handleItemClick = (e, { name }) => {
    e.preventDefault();
    this.setState({ activeItem: name });
  };
  signOut = () => {
    localStorage.removeItem('token');
    // window.location.reload();

  }
  render() {
    const { activeItem } = this.state;

    return (
      <>
        <Menu inverted size="large" color="green" fluid widths={3}>
          {/* {the icon looks a little -wonky- will update during polish} */}

          <Menu.Item
            name="Add Receipt"
            active={activeItem === "Add Receipt"}
            onClick={this.handleItemClick}
          >
              <NavLink to="/add-receipt"> Add Receipt +</NavLink>
          </Menu.Item>

          {/* <Menu.Item
            name="Sign Up"
            active={activeItem === "Sign Up"}
            onClick={this.handleItemClick}
          >
              <NavLink to="/sign-up"> Sign Up</NavLink>
          </Menu.Item> */}

          {!localStorage.getItem('token') ? (<Menu.Item
            name="Log In"
            active={activeItem === "Log In"}
            onClick={this.handleItemClick}
          >
            <NavLink to="/login">
                <Button primary>Log In</Button>
            </NavLink>
          </Menu.Item>):(<Menu.Item
            name="Log Out"
            active={activeItem === "Log Out"}
            onClick={this.signOut}
          ><NavLink to="/login">
              <Button color="red">Log Out</Button>
           </NavLink>
          </Menu.Item>)}

        </Menu>
        <NavLink to="/">
          <img
            className="ReceiptLogo"
            src="https://files.slack.com/files-pri/T4JUEB3ME-FMQ7Z2Z60/image.png"
            alt="logo"
          />
        </NavLink>
      </>
    );
  }
}

export default Nav;
