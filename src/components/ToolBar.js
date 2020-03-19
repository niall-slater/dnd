import React, { Component } from 'react'

import CharacterManager from '../pages/CharacterManager'
import CharacterSheet from '../pages/CharacterSheet'

class ToolBar extends Component {

  constructor(props) {
    super(props);

    this.selectToolCallback = props.selectTool;
  }

  selectTool = (tool) => {
    this.selectToolCallback(tool);
  }

  selectGenerator = () => {
    this.selectTool(<CharacterManager />);
  }

  selectSheet = () => {
    this.selectTool(<CharacterSheet />);
  }

  render() {
    return (
      <nav className="toolbar p-2">
        <button className="btn btn-primary m-2" onClick={this.selectGenerator}>Character Manager</button>
        <button className="btn btn-secondary m-2" onClick={this.selectSheet}>Character Sheet</button>
      </nav>
    )
  }
}

export default ToolBar;