import React, { Component } from 'react';

class RollButton extends Component {

  constructor(props) {
    super(props);
    this.roll = props.rollFunction;

    this.state = {
      result: 0
    }
  }

  executeRoll = () => {
    var rollResult = this.roll();
    this.setState({result: rollResult});
  }

  render() {
    return (
      <div className="btn btn-primary rollButton" onClick={this.executeRoll}>
        <div className="dice-label">{this.props.label}</div>
        <div className="dice-value">{this.state.result}</div>
      </div>
    );
  }
}

export default RollButton;