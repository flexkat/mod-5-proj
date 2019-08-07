import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router'

class Navbar extends React.Component {
  render() {
    return (
      <Router >
      <div className="Navbar">
        <Route path="/" exact>Home</Route>
      </div>
      </Router >
    );
  }
}

export default Navbar;