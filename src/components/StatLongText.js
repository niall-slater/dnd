import React, { Component } from 'react';

class StatLongText extends Component {

  render() {
    var statStyle = "stat inline longtext ";
    if (this.props.editMode) {
      statStyle += "editMode";
    }
    return (
      <span className={statStyle} onClick={this.props.onClick}>
        <span className="stat-label">{this.props.name}<span className="stat-value">{this.props.value}</span></span>
      </span>
    );
  }
}

export default StatLongText;