import React, { Component } from 'react'

class ToolBar extends Component {
  render() {
    return (
    <nav className="toolbar p-2">
      <button className="btn btn-primary m-2">Character Generator</button>
      <button className="btn btn-secondary m-2" disabled>Coming soon</button>
      <button className="btn btn-secondary m-2" disabled>Coming soon</button>
    </nav>
    )
  }
}

export default ToolBar;