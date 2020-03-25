import React from 'react';
import StatLongText from './StatLongText';

class SkillSet extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      skills: props.skills
    }
  }

  componentDidUpdate(prevProps) {
    if (this.props.skills !== prevProps.skills) {
      this.setState({skills: this.props.skills});
    }
  }

  renderSkills = () => {
    var skillsArray = [];
    var skillSet = this.state.skills;

    var keys = Object.keys(Object.assign(skillSet));

    keys.forEach(key => {
      var skill = Object.assign(skillSet[key]);

      var prefix = "";

      if (skill.modifier >= 0)
        prefix = "+";

      var style = skill.proficient ? "skill proficient" : "skill";

      var element = <div className={style} key={key}><StatLongText name={key} value={prefix + skill.modifier} /></div>;

      skillsArray.push(element);
    });

    return skillsArray;
  }


  render() {
    if (!this.state.skills)
      return null;

    var skills = this.renderSkills();

    return(
      <div className="skills">
        {skills}
      </div>
    );
  }
}

export default SkillSet;