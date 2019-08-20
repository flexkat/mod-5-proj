import React from 'react';
import { NavLink } from 'react-router-dom'
import { Menu } from 'semantic-ui-react'


class Navbar extends React.Component {

  state = {}

  handleItemClick = (e, { name }) => this.setState({ activeItem: name })

  render() {
    const { activeItem } = this.state
    return (
      <Menu pointing>
        <Menu.Item as={NavLink} to="/" exact strict name="home" active={activeItem === "home"} onClick={this.handleItemClick}>Home</Menu.Item>
        <Menu.Item as={NavLink} to="/setup" exact name="setup" active={activeItem === "setup"} onClick={this.handleItemClick}>Add medicine</Menu.Item>
        <Menu.Item as={NavLink} to="/statistics" exact name="stats" active={activeItem === "stats"} onClick={this.handleItemClick}>Statistics</Menu.Item>
        <Menu.Item as={NavLink} to="/contact" exact name="contact" active={activeItem === "contact"} onClick={this.handleItemClick}>Contact</Menu.Item>
        {/* <Menu.Item header position="right">Pill Pal</Menu.Item> */}
      </Menu>
    );
  }
}

export default Navbar;