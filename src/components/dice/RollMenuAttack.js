import React, { Component } from 'react';
import StatHelper from '../../helpers/StatHelper';
import DiceHelper from '../../helpers/DiceHelper';
import FormatHelper from '../../helpers/FormatHelper';
import RollButton from './RollButton';

const Attacks = {
  MELEE: 'melee',
  MELEE_FINESSE: 'meleeFinesse',
  MELEE_UNARMED: 'meleeUnarmed',
  RANGED: 'ranged',
  RANGED_THROWN: 'rangedThrown',
  MELEE_SPELL: 'meleeSpell',
  RANGED_SPELL: 'rangedSpell'
}

class RollMenuAttack extends Component {

  constructor(props) {
    super(props);

    this.stats = props.character.stats;
    this.proficiencyBonus = props.character.proficiencyBonus;

    this.state = {
      proficient: true,
      activeAttack: Attacks.MELEE,
      spellcastingAbilityModifier: StatHelper.GetSpellcastingAbilityModifier(props.character)
    }
  }

  roll = () => {
    var attack = this.state.activeAttack;
    var modifier = 0;

    switch (attack) {
      case Attacks.MELEE: modifier = this.getMeleeModifier(); break;
      case Attacks.MELEE_FINESSE: modifier = this.getFinesseModifier(); break;
      case Attacks.MELEE_UNARMED: modifier = this.getUnarmedModifier(); break;
      case Attacks.RANGED: modifier = this.getRangedModifier(); break;
      case Attacks.RANGED_THROWN: modifier = this.getThrownModifier(); break;
      case Attacks.MELEE_SPELL: modifier = this.getMeleeSpellModifier(); break;
      case Attacks.RANGED_SPELL: modifier = this.getRangedSpellModifier(); break;
      default: break;
    }

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

  getMeleeModifier = () => {
    var modifier = StatHelper.GetModifier(this.stats.str);
    if (this.state.proficient)
      modifier += this.proficiencyBonus;

    return modifier;
  }

  getFinesseModifier = () => {
    var modifier = StatHelper.GetModifier(this.stats.dex);
    if (this.state.proficient)
      modifier += this.proficiencyBonus;

    return modifier;
  }

  getUnarmedModifier = () => {
    return StatHelper.GetModifier(this.stats.str) + this.proficiencyBonus;
  }

  getRangedModifier = () => {
    var modifier = StatHelper.GetModifier(this.stats.dex);;
    if (this.state.proficient)
      modifier += this.proficiencyBonus;

    return modifier;
  }

  getThrownModifier = () => {
    return this.getRangedModifier();
  }

  getMeleeSpellModifier = () => {
    return this.state.spellcastingAbilityModifier + this.proficiencyBonus;
  }

  getRangedSpellModifier = () => {
    return this.getMeleeSpellModifier();
  }

  selectAttack = (attack) => {
    this.setState ({
      activeAttack: attack
    });
  }

  handleOptionChange = (event) => {
    const target = event.target;
    const value = target.name === 'attackOption' ? target.checked : target.value;

    this.setState({
      proficient: value
    });
  }

  renderOptions = () => {
    
    var result = <></>;

    switch (this.state.activeAttack) {
      case Attacks.MELEE: result = (
        <label>Tick here if you're proficient in the weapon you're using.
          <input type="checkbox" name="attackOption" checked={this.state.proficient} onChange={this.handleOptionChange} ></input>
        </label>
      ); break;
      case Attacks.MELEE_FINESSE: result = (
        <label>Tick here if you're proficient in the weapon you're using.
          <input type="checkbox" name="attackOption" checked={this.state.proficient} onChange={this.handleOptionChange} ></input>
        </label>
      ); break;
      case Attacks.MELEE_UNARMED: break;
      case Attacks.RANGED:  result = (
        <label>Tick here if you're proficient in the weapon you're using.
          <input type="checkbox" name="attackOption" checked={this.state.proficient} onChange={this.handleOptionChange} ></input>
        </label>
      ); break;
      case Attacks.RANGED_THROWN: result = (
        <label>Tick here if you're using a 'thrown' weapon, or if you're throwing a random object and you have the Tavern Brawler trait.
          <input type="checkbox" name="attackOption" checked={this.state.proficient} onChange={this.handleOptionChange} ></input>
        </label>
      ); break;
      case Attacks.MELEE_SPELL:  result = (
        <div>
          <p>Spellcasting ability modifier: +{this.state.spellcastingAbilityModifier}<br/>Proficiency bonus: +{this.proficiencyBonus}</p>
        </div>
      ); break;
      case Attacks.RANGED_SPELL:  result = (
        <div>
          <p>Spellcasting ability modifier: +{this.state.spellcastingAbilityModifier}<br/>Proficiency bonus: +{this.proficiencyBonus}</p>
        </div>
      ); break;
      default: break;
    }

    return result;
  }

  render() {
    var options = this.renderOptions();
    var attackLabel = this.state.activeAttack;
    attackLabel = FormatHelper.CamelCaseToSentenceCase(attackLabel);

    return (
      <div className="rollMenu">
        <p>Select your attack and roll!</p>
        <div className="btn-group attack">
          <button className="btn btn-secondary" onClick={()=>{this.selectAttack(Attacks.MELEE)}}>Melee attack</button>
          <button className="btn btn-secondary" onClick={()=>{this.selectAttack(Attacks.MELEE_FINESSE)}}>Finesse attack</button>
          <button className="btn btn-secondary" onClick={()=>{this.selectAttack(Attacks.MELEE_UNARMED)}}>Unarmed strike</button>
          <button className="btn btn-secondary" onClick={()=>{this.selectAttack(Attacks.RANGED)}}>Ranged attack</button>
          <button className="btn btn-secondary" onClick={()=>{this.selectAttack(Attacks.RANGED_THROWN)}}>Throw a weapon</button>
          <button className="btn btn-secondary" onClick={()=>{this.selectAttack(Attacks.MELEE_SPELL)}}>Melee spellcast</button>
          <button className="btn btn-secondary" onClick={()=>{this.selectAttack(Attacks.RANGED_SPELL)}}>Ranged spellcast</button>
        </div>
        <br />
        <RollButton label={attackLabel} rollFunction={this.roll} />
        <br />
        <div className="options">
          {options}
        </div>
      </div>
    );
  }
}

export default RollMenuAttack;