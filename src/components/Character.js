import React from 'react';
import NameField from './editable/NameField';
import Stat from './Stat';
import StatWithSubvalue from './StatWithSubvalue';
import StatLongText from './StatLongText';
import SkillSet from './SkillSet';
import uuid from 'uuid';
import { Environment } from '../globals/Environment.Const';
import { Mocks } from '../globals/Mocks.Const';
import StatHelper from '../helpers/StatHelper';

class Character extends React.Component{

  constructor(props) {
    super(props);

    this.state = {
      isLoaded: false,
      character: null,
      stats: [],
      editMode: false
    };
  }

  componentWillMount() {
    if (!this.props.character) {
        this.regenerate();
    } else {
      var character = this.props.character;
      var stats = this.formatStats(character);
      this.props.onLoadEnd();
      this.setState({
        isLoaded: true,
        character: character,
        stats: stats,
        editMode: false
      });
    }
  }

  componentDidUpdate(prevProps) {
    if (!this.props.character)
      return;

    if(this.props.character.id !== prevProps.character.id)
    {
      var character = this.props.character;
      var stats = this.formatStats(character);
      this.setState({
        character: character,
        stats: stats
      });
    }
  }
  
  regenerate = () => {
    var stats = [];

    this.props.onLoadStart();
    this.setState({
      isLoaded: false,
      character: Mocks.character,
      stats: []
    });

    fetch(Environment.API_LOCATION + 'character/generate')
      .then(res => res.json())
      .then(
        (result) => {
          stats = this.formatStats(result);

      this.props.onLoadEnd();
          this.setState({
            isLoaded: true,
            character: result,
            stats: stats
          });
        },
        (error) => {
          console.log(error);
        }
      );
  }

  formatStats = (character) => {
    var result = [];

    var keys = Object.keys(character.stats);

    keys.forEach(key => {
      // Drop modifiers, only store ability scores
      if (key.length === 3) {
        var statValue = character.stats[key];
        var subValue = Math.floor((statValue - 10) / 2);
  
        var formattedStat = {
          statName: key,
          value: statValue,
          subValue: subValue
        };
        result.push(formattedStat);
      }
    });
    return result;
  }

  onSave = (character) => {
    this.props.onSaveCharacter(character);
  }

  // Takes a changed ability score and updates the character
  onStatChange = (changedStat) => {
    var newStats = Object.assign(this.state.stats);

    for (var i = 0; i < newStats.length; i++)
    {
      var stat = newStats[i];
      if (stat.statName === changedStat.statName) {
        stat = changedStat;
        break;
      }
    }

    this.updateCharacterStats(newStats);
  }

  updateCharacterStats = (newStats) => {
    var updatedCharacter = Object.assign(this.state.character);
    // Update ability scores
    newStats.forEach((newStat) => {
      updatedCharacter.stats[newStat.statName] = newStat.value;
    });

    updatedCharacter.proficiencyBonus = (1 + Math.ceil(updatedCharacter.level / 4));

    // Update skills
    var newSkills = Object.assign(updatedCharacter.skillSet);
    
    var keys = Object.keys(newSkills);

    keys.forEach(key => {
      var skillToUpdate = newSkills[key];
      skillToUpdate.modifier = StatHelper.GetAssociatedModifier(key, updatedCharacter);
      if (skillToUpdate.proficient)
        skillToUpdate.modifier += updatedCharacter.proficiencyBonus;
    });

    // Update base AC
    updatedCharacter.ac = 10 + StatHelper.GetModifier(updatedCharacter.stats.dex);

    this.setState({character: updatedCharacter});

    this.onSave(updatedCharacter);
  }

  renderAttributes = () => {
    var stats = [];
    this.state.stats.forEach(stat => {
      stats.push(<StatWithSubvalue
          key={uuid.v4()}
          stat={stat}
          editMode={this.state.editMode}
          onChange={this.onStatChange}
      />)
    });
    return stats;
  }

  renderName = () => {
    var character = this.state.character;
    var nameField = <h2>{this.state.character.name}</h2>;
    if (this.state.editMode) {
      nameField = <NameField name={this.state.character.name} onChange={this.onEditName} />;
    }
    return (
      <div className="container">
        {nameField}
        <p className="ml-1">{character.race.name} {character.class.name}</p>
      </div>
    );
  }

  renderStats = () =>  {
    var character = this.state.character;
    var proficiency = "+" + character.proficiencyBonus;
    var speed = character.speed + "ft";
    var hitDie = "1d" + character.class.hitDie;

    var hp = `${character.hp}/${character.maxHp}`;

    return(
      <div className="container">
        <div className="row mb-2 ml-0">
          <Stat name="Lvl" value={character.level} square={true}></Stat>
          <Stat name="AC" value={character.ac} square={true}></Stat>
          <Stat name="HP" value={hp}></Stat>
        </div>
        <div className="bio">
          <p><StatLongText name="Proficiency bonus" value={proficiency}></StatLongText></p>
          <p><StatLongText name="Speed" value={speed}></StatLongText></p>
          <p><StatLongText name="Hit die" value={hitDie}></StatLongText></p>
          <p><StatLongText name="Alignment" value={character.alignmentName}></StatLongText></p>
        </div>
      </div>
    );
  }

  onEditName = (name) => {
    var newChar = this.state.character;
    newChar.name = name;
    this.setState({
      character: newChar
    });
    this.onSave(newChar);
  }

  renderEditButton = () => {
    if (!this.state.editMode) {
      return <button className="btn btn-secondary m-2"
      onClick={() => {this.setState({editMode: true});}}>Edit this character</button>
    }
    else {
      return <button className="btn btn-primary m-2"
      onClick={() => {this.setState({editMode: false});}}>Stop editing</button>
    }
  }

  render() {
    let stats = this.renderStats();
    let attributes = this.renderAttributes();
    let name = this.renderName();
    let editButton = this.renderEditButton();

    return (
      <div className="container">
        <div className="row mt-2 ml-1">
            {name}
        </div>
        <div className="row">
          <div className="col col-xs-4 col-sm-3">
            {attributes}
          </div>
          <div className="col col-xs-8 col-sm-9">
            {stats}
          </div>
        </div>
        <div className="row">
          <div className="col col-12">
            <SkillSet skills={this.state.character.skillSet} />
          </div>
        </div>
        <div className="btn-group p-2">
          <button className="btn btn-primary m-2" onClick={this.regenerate}>Generate a new Lv1 character</button>
          <button className="btn btn-secondary m-2" onClick={() => this.onSave(this.state.character)}>Save this character</button>
          {editButton}
        </div>
      </div>
    );
  }
}

export default Character;