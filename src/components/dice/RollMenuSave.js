import React, { Component } from 'react';
import { Stats } from '../../globals/Stats.Const';
import DiceHelper from '../../helpers/DiceHelper';
import RollButton from './RollButton';
import StatHelper from '../../helpers/StatHelper';

class RollMenuSave extends Component {

  constructor(props) {
    super(props);

    this.abilities = Stats.ABILITY;

    this.state = {
      activeAbility: this.abilities.STR
    }
  }

  roll = () => {
    var ability = this.state.activeAbility;
    var modifier = StatHelper.GetModifier(this.props.character.stats[ability]);
    var sign = " ";
    if (modifier >= 0)
      sign = " +";
    
    var natRoll = DiceHelper.RollDie(20);
    var result = natRoll + sign + modifier;
    if (natRoll === 20)
      result = "20: CRITICAL HIT!";
    else if (natRoll === 1)
      result = "1: CRITICAL MISS!";
    return result;
  }

  selectAbility = (ability) => {
    this.setState ({
      activeAbility: ability
    });
  }

  render() {
    return (
      <div className="rollMenu">
        <p>Select your saving throw and roll!</p>
        <div className="btn-group save">
          <button className="btn btn-secondary" onClick={()=>{this.selectAbility(Stats.ABILITY.STR)}}>STR</button>
          <button className="btn btn-secondary" onClick={()=>{this.selectAbility(Stats.ABILITY.DEX)}}>DEX</button>
          <button className="btn btn-secondary" onClick={()=>{this.selectAbility(Stats.ABILITY.CON)}}>CON</button>
          <button className="btn btn-secondary" onClick={()=>{this.selectAbility(Stats.ABILITY.INT)}}>INT</button>
          <button className="btn btn-secondary" onClick={()=>{this.selectAbility(Stats.ABILITY.WIS)}}>WIS</button>
          <button className="btn btn-secondary" onClick={()=>{this.selectAbility(Stats.ABILITY.CHA)}}>CHA</button>
        </div>
        <br />
        <RollButton label={this.state.activeAbility.toUpperCase()} rollFunction={this.roll} />
      </div>
    );
  }
}

export default RollMenuSave;