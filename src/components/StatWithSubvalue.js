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
    var newStat = this.state.stat;

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
          <div className="btn btn-secondary" 
          onClick={() => {this.onValueChanged(this.state.stat.value + 1)}}>+</div>
          <div className="btn btn-secondary" 
          onClick={() => {this.onValueChanged(this.state.stat.value - 1)}}>-</div>
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
          <span>{this.state.stat.statName}</span>
        </div>
        <div className="stat-value">
          <span>{this.state.stat.value}</span>
          <sub>{subValue}</sub>
        </div>
      </div>
    )
  }
}

export default StatWithSubvalue;