import React, { Component } from 'react';
import { Stats } from '../../globals/Stats.Const';
import DiceHelper from '../../helpers/DiceHelper';
import RollButton from './RollButton';

class RollMenuSkill extends Component {

  constructor(props) {
    super(props);

    this.skills = props.character.skillSet;

    this.state = {
      activeSkill: this.skills.Acrobatics,
      activeSkillName: "Acrobatics"
    }
  }

  roll = () => {
    var skill = this.state.activeSkill;
    var modifier = parseInt(skill.modifier) + parseInt(skill.bonusModifier);
    if (skill.proficient)
      modifier += this.props.character.proficiencyBonus;

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

  selectSkill = (skillName) => {
    this.setState ({
      activeSkill: this.skills[skillName],
      activeSkillName: skillName
    });
  }

  renderSkills = () => {
    var result = [];
    for (const [key, value] of Object.entries(this.skills)) {
      var modifier = parseInt(value.modifier) + parseInt(value.bonusModifier);
      var nameOfClass = "btn btn-secondary";
      if (value.proficient) {
        modifier += this.props.character.proficiencyBonus;
        nameOfClass += " highlight";
      }

      var sign = " ";
      if (modifier >= 0)
        sign = " +";

      modifier = sign + modifier;

      var renderedSkill = (
        <button className={nameOfClass} 
                key={key} 
                onClick={()=>{this.selectSkill([key])}}
        >{key} {modifier}</button>
      );
      result.push(renderedSkill);
    }
    return result;
  }

  render() {
    var skills = this.renderSkills();
    return (
      <div className="rollMenu">
        <p>Select a skill check to roll:</p>
        <div className="btn-group skills">
          {skills}
        </div>
        <br />
        <RollButton label={this.state.activeSkillName} rollFunction={this.roll} />
      </div>
    );
  }
}

export default RollMenuSkill;