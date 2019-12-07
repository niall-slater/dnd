import React, { Component } from 'react'

class Stat extends Component {
  render() {
    return (
      <div className="stat">
        <div className="stat-label">
          <span>{this.props.stat.name}</span>
        </div>
        <div className="stat-value">
          <span>{this.props.stat.value}</span>
          <sub>{this.props.stat.subValue}</sub>
        </div>
      </div>
    )
  }
}

export default Stat;