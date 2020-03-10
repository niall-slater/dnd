import React from 'react';
import StatLongText from './StatLongText';

class SkillSet extends React.Component {

  constructor(props) {
    super(props);
  }

  renderSkills = (skillSet) => {
    var skillsArray = [];

    var keys = Object.keys(skillSet);

    keys.forEach(key => {
      var skill = skillSet[key];

      //TODO: bug where this is called again on save - once fixed remove the second condition here
      if (skill.modifier >= 0 && skill.modifier[0] !== "+")
        skill.modifier = "+" + skill.modifier;

      var element = <div className="skill" key={key}><StatLongText name={key} value={skill.modifier} /></div>;

      if (skill.proficient)
        element = <div className="skill proficient" key={key}><StatLongText name={key} value={skill.modifier} /></div>;

      skillsArray.push(element);
    });

    return skillsArray;
  }


  render() {
    if (!this.props.skills)
      return null;

    var skills = this.renderSkills(this.props.skills);

    return(
      <div className="skills">
        {skills}
      </div>
    );
  }
}

export default SkillSet;