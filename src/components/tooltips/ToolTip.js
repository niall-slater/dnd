import React, { Component } from 'react';

class ToolTip extends Component {
  render() {
    return (
      <div className="tooltipCustom">
        <span>{this.props.content}</span>
      </div>
    );
  }
}

export default ToolTip;