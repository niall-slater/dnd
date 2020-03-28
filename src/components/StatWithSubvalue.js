import React, { Component } from 'react';
import StatHelper from '../helpers/StatHelper';

class StatWithSubvalue extends Component {

  constructor(props) {
    super(props);

    this.state = {
      stat: props.stat,
      editMode: props.editMode
    }
  }

  onValueChanged = (value) => {
    var newStat = Object.assign(this.state.stat);

    newStat.value = value;
    newStat.subValue = StatHelper.GetModifier(newStat.value);

    this.setState({
      stat: newStat
    });

    this.props.onChange(newStat);
  }

  renderIncrement = () => {
    if (!this.state.editMode) {
      return <></>;
    } else {
      return (
        <div className="increment">
          <div className="increment-button" 
          onClick={() => {this.onValueChanged(this.state.stat.value - 1)}}>-</div>
          <div className="increment-button" 
          onClick={() => {this.onValueChanged(this.state.stat.value + 1)}}>+</div>
        </div>
      );
    }
  }

  render() {
    var subValue = this.props.stat.subValue;
    var increment = this.renderIncrement();
    if (subValue >= 0)
      subValue = "+" + subValue;

    return (
      <div className="stat">
        {increment}
        <div className="stat-label">
          <span>{this.state.stat.statName.toUpperCase()}</span>
        </div>
        <div className="stat-value square">
          <span>{this.state.stat.value}</span>
          <sub>{subValue}</sub>
        </div>
      </div>
    )
  }
}

export default StatWithSubvalue;