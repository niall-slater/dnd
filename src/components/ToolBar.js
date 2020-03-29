import React, { Component } from 'react';
import {Tools} from '../globals/Tools.Const';

class ToolBar extends Component {

  constructor(props) {
    super(props);

    this.selectToolCallback = props.selectTool;

    this.state = {
      currentTool: props.currentTool
    }
  }

  selectTool = (tool) => {
    this.selectToolCallback(tool);
    this.setState({currentTool: tool});
  }

  selectManager = () => {
    this.selectTool(Tools.MANAGER);
  }

  selectSheet = () => {
    this.selectTool(Tools.SHEET);
  }

  selectDice = () => {
    this.selectTool(Tools.DICE);
  }

  renderButtonClassName = (tool) => {
    return (`btn m-2 ${this.state.currentTool === tool ? "btn-primary active" : "btn-secondary"}`);
  }

  render() {
    return (
      <nav className="toolbar p-2">
        <button className={this.renderButtonClassName(Tools.MANAGER)}
          onClick={this.selectManager}>Character Manager</button>
          <button className={this.renderButtonClassName(Tools.SHEET)}
            onClick={this.selectSheet}>Character Sheet (TEST)</button>
            <button className={this.renderButtonClassName(Tools.DICE)}
              onClick={this.selectDice}>Dice roller (TEST)</button>
      </nav>
    )
  }
}

export default ToolBar;