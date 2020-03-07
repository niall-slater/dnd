import React, { Component } from 'react'

class StatWithSubvalue extends Component {
  render() {
    var subValue = this.props.stat.subValue;
    if (subValue >= 0)
      subValue = "+" + subValue;

    return (
      <div className="stat">
        <div className="stat-label">
          <span>{this.props.stat.name}</span>
        </div>
        <div className="stat-value">
          <span>{this.props.stat.value}</span>
          <sub>{subValue}</sub>
        </div>
      </div>
    )
  }
}

export default StatWithSubvalue;