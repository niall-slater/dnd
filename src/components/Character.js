import React from 'react';
import Stat from './Stat';
import StatWithSubvalue from './StatWithSubvalue';
import StatLongText from './StatLongText';
import uuid from 'uuid';
import { Environment } from '../globals/Environment.Const';

class Character extends React.Component{

  constructor(props) {
    super(props);
    this.state = {};
  }

  componentWillMount()
  {
    this.regenerate();
    this.regenerate = this.regenerate.bind(this);
    this.renderStats = this.renderStats.bind(this);
    this.renderName = this.renderName.bind(this);
    this.renderBio = this.renderBio.bind(this);
  }
  
  regenerate() {
    var stats = [];
    this.setState({
      isLoaded: false,
      character: {
        stats: {},
        home: {},
        race: {},
        class: {}
      }
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

  renderStats() {
    var stats = [];
    if (!this.state.isLoaded)
    {
      return (<div className="loading">Loading...</div>);
    }
    this.state.stats.forEach(stat => {
      stats.push(<StatWithSubvalue
          key={uuid.v4()}
          stat={stat}/>)
    });
    return stats;
  }

  renderName() {
    return(<h2>{this.state.character.name}</h2>);
  }

  renderBio() {
    var character = this.state.character;
    var proficiency = "+" + character.proficiencyBonus;
    var speed = character.speed + "ft";
    var hitDie = "1d" + character.class.hitDie;
    console.log(character);
    return(
      <div>
        <div className="row mb-2 ml-0">
          <Stat name="Lvl" value={character.level}></Stat>
          <Stat name="AC" value={character.ac}></Stat>
          <Stat name="HP" value={character.maxHp}></Stat>
        </div>
        <div className="bio">
          <p>{character.race.name} {character.class.name} from the town of {character.home.name}.</p>
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
    if (!this.state.isLoaded)
    {
      return (<div className="loading">Loading...</div>);
    }
    let stats = this.renderStats();
    let name = this.renderName();
    let bio = this.renderBio();
    return (
      <div className="container">
        <div className="row">
          {name}
        </div>
        <div className="row">
          <div className="col-sm">
            {bio}
          </div>
          <div className="col-xs">
            {stats}
          </div>
        </div>
        <button className="btn btn-secondary" onClick={this.regenerate}>Give me a character!</button>
      </div>
    );
  }
}

export default Character;