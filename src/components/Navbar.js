import React, { Component } from 'react'

class Navbar extends Component {
  render() {
    return (
    <nav className="App-header navbar navbar-expand-md navbar-dark bg-dark">
      <a className="navbar-brand" href="#"><img className="logo" src="./favicon.png" alt="" /></a>
      <ul className="navbar-nav mr-auto">
        <li className="nav-item active">
          <a className="nav-link" href="#">Critical Assist <span className="sr-only">(current)</span></a>
        </li>
        <li className="nav-item">
          <a className="nav-link" target="_blank" rel="noopener noreferrer" href="https://www.twitter.com/niall_slater">Updates on Twitter</a>
        </li>
      </ul>
    </nav>
    )
  }
}

export default Navbar;