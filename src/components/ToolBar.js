import React, { Component } from 'react';
import {Tools} from '../globals/Tools.Const';

class ToolBar extends Component {

  constructor(props) {
    super(props);

    this.selectToolCallback = props.selectTool;
  }

  selectTool = (tool) => {
    this.selectToolCallback(tool);
  }

  selectManager = () => {
    this.selectTool(Tools.MANAGER);
  }

  selectSheet = () => {
    this.selectTool(Tools.SHEET);
  }

  render() {
    return (
      <nav className="toolbar p-2">
        <button className="btn btn-primary m-2" onClick={this.selectManager}>Character Manager</button>
        <button className="btn btn-secondary m-2" onClick={this.selectSheet}>Character Sheet</button>
      </nav>
    )
  }
}

export default ToolBar;