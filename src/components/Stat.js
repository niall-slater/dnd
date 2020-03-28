import React, { Component } from 'react';
import ToolTip from './tooltips/ToolTip';

class Stat extends Component {

  constructor(props) {
    super(props);

    this.state = {
      tooltipActive: false
    }
  }
  
  onMouseEnter = () => {
    this.setState({tooltipActive: true});
  }

  onMouseLeave = () => {
    this.setState({tooltipActive: false});
  }

  renderTooltip = () => {
    var result = <></>;
    if (this.state.tooltipActive && this.props.tooltipContent != null) {
      result = (
        <ToolTip content={this.props.tooltipContent}/>
      )
    } 

    return result;
  }

  render() {
    var tooltip = this.renderTooltip();

    var valueStyle = "stat-value ";
    if (this.props.square)
      valueStyle += "square";

    return (
      <span className="stat inline" onMouseEnter={this.onMouseEnter} onMouseLeave={this.onMouseLeave}>
        <span className="stat-label">{this.props.name}</span>
        <span className={valueStyle}>{this.props.value}</span>
        {tooltip}
      </span>
    );
  }
}

export default Stat;