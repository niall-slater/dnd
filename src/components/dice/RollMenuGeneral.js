import React, { Component } from 'react';
import DiceHelper from '../../helpers/DiceHelper';
import RollButton from './RollButton';

class RollMenuGeneral extends Component {

  constructor(props) {
    super(props);

    this.state = {
      selectedFacets: 20
    }
  }

  roll = () => {
    var result = DiceHelper.RollDie(this.state.selectedFacets);
    return result;
  }

  selectDie = (facets) => {
    this.setState ({
      selectedFacets: facets
    });
  }

  render() {
    var dieLabel = "D" + this.state.selectedFacets;
    return (
      <div className="rollMenu">
        <p>Select your die and roll!</p>
        <div className="btn-group">
          <button className="btn btn-secondary" onClick={()=>{this.selectDie(4)}}>D4</button>
          <button className="btn btn-secondary" onClick={()=>{this.selectDie(6)}}>D6</button>
          <button className="btn btn-secondary" onClick={()=>{this.selectDie(8)}}>D8</button>
          <button className="btn btn-secondary" onClick={()=>{this.selectDie(10)}}>D10</button>
          <button className="btn btn-secondary" onClick={()=>{this.selectDie(12)}}>D12</button>
          <button className="btn btn-secondary" onClick={()=>{this.selectDie(20)}}>D20</button>
          <button className="btn btn-secondary" onClick={()=>{this.selectDie(100)}}>D100</button>
        </div>
        <br />
        <RollButton label={dieLabel} rollFunction={this.roll} />
      </div>
    );
  }
}

export default RollMenuGeneral;