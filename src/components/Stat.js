import React, { Component } from 'react'

class Stat extends Component {
  render() {
    return (
      <div className="stat">
        <div className="stat-label">
          <span>{this.props.statLabel}</span>
        </div>
        <div className="stat-value">
          <span>{this.props.statValue}</span>
          <sub>{this.props.subValue}</sub>
        </div>
      </div>
    )
  }
}

export default Stat;