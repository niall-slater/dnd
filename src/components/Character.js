import React from 'react';
import Stat from './Stat';
import StatWithSubvalue from './StatWithSubvalue';
import StatLongText from './StatLongText';
import uuid from 'uuid';
import { Environment } from '../globals/Environment.Const';
import { Mocks } from '../globals/Mocks.Const';

class Character extends React.Component{

  constructor(props) {
    super(props);
    this.state = {};
  }

  componentWillMount()
  {
    this.regenerate();
    this.regenerate = this.regenerate.bind(this);
    this.renderAttributes = this.renderAttributes.bind(this);
    this.renderStats = this.renderStats.bind(this);
    this.renderName = this.renderName.bind(this);
    this.onSave = this.onSave.bind(this);
  }
  
  regenerate() {
    var stats = [];
    this.setState({
      isLoaded: false,
      character: Mocks.character
    });
    fetch(Environment.API_LOCATION + 'character/generate')
      .then(res => res.json())
      .then(
        (result) => {
          for (var stat in result.stats)
          {
            var statName = stat;
            var statValue = result.stats[stat];
            var subValue = Math.floor((statValue - 10) / 2);

            var formattedStat = {
              name: statName.toUpperCase(),
              value: statValue,
              subValue: subValue
            };
            stats.push(formattedStat);
          }

          this.setState({
            isLoaded: true,
            character: result,
            stats: stats
          });
        },
        (error) => {
          console.log(error);
          this.setState({
            isLoaded: true,
            stats: {}
          });
        }
      );
  }

  onSave(character) {
    this.props.onSaveCharacter(character);   
  }

  renderAttributes() {
    var stats = [];
    if (!this.state.isLoaded)
    {
      return (<div className="loading">Loading stats...</div>);
    }
    this.state.stats.forEach(stat => {
      stats.push(<StatWithSubvalue
          key={uuid.v4()}
          stat={stat}/>)
    });
    return stats;
  }

  renderName() {
    var character = this.state.character; 
    return(
      <div className="container">
        <h2>{this.state.character.name}</h2>
        <p className="ml-1">{character.race.name} {character.class.name} from the town of {character.home.name}.</p>
      </div>
    );
  }

  renderStats() {
    var character = this.state.character;
    var proficiency = "+" + character.proficiencyBonus;
    var speed = character.speed + "ft";
    var hitDie = "1d" + character.class.hitDie;
    return(
      <div className="container">
        <div className="row mb-2 ml-0">
          <Stat name="Lvl" value={character.level}></Stat>
          <Stat name="AC" value={character.ac}></Stat>
          <Stat name="HP" value={character.maxHp}></Stat>
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

  render() {
    let stats = this.renderStats();
    let attributes = this.renderAttributes();
    let name = this.renderName();
    return (
      <div className="container">
        <div className="row mt-2 ml-1">
          {name}
        </div>
        <div className="row">
          <div className="col col-8">
            {stats}
          </div>
          <div className="col col-3 mr-1">
            {attributes}
          </div>
        </div>
        <button className="btn btn-primary mt-3" onClick={this.regenerate}>Generate a level 1 character</button>
        <button className="btn btn-secondary mt-3" onClick={() => this.onSave(this.state.character)}>Save this character</button>
      </div>
    );
  }
}

export default Character;