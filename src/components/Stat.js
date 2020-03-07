import React, { Component } from 'react'

class Stat extends Component {

  render() {
    return (
      <span className="stat inline">
        <span className="stat-label">{this.props.name}</span>
        <span className="stat-value">{this.props.value}</span>
      </span>
    )
  }
}

export default Stat;