import React, { Component } from 'react'

class StatLongText extends Component {

  render() {
    return (
      <span className="stat inline longtext">
        <span className="stat-label">{this.props.name}<span className="stat-value">{this.props.value}</span></span>
      </span>
    )
  }
}

export default StatLongText;