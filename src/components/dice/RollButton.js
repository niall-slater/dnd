import React, { Component } from 'react';

class RollButton extends Component {

  constructor(props) {
    super(props);

    this.roll = props.rollFunction;
    this.defaultValue = "Click to roll!";

    this.state = {
      result: this.defaultValue
    }
  }

  executeRoll = () => {
    var rollResult = this.roll();
    this.setState({result: rollResult});
  }
  componentDidUpdate(prevProps) {
    if (prevProps.label !== this.props.label) {
      this.setState({result: this.defaultValue});
    }
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