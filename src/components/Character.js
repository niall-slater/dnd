import React from 'react';
import Stat from './Stat';
import Helpers from './Helpers';

const statNames = [
  "STR",
  "DEX",
  "CON",
  "INT",
  "WIS",
  "CHA"
];

class Character extends React.Component{

  constructor(props) {
    super(props);
    let stats = this.buildRandomStats();
    this.stats = stats;
    this.regenerate = this.regenerate.bind(this);
    this.buildRandomStats = this.buildRandomStats.bind(this);
  }
  
  regenerate() {
    console.log("HONK");
    this.stats = this.buildRandomStats();
  }
  
  buildRandomStats() {
    let stats = [];
    for (var statName in statNames) {
      var statValue = 0;
      var initRolls = [];
      for (var i = 0; i < 4; i++) {
        initRolls.push(Helpers.rollDie(6));
      }
      initRolls = Helpers.removeSmallest(initRolls);
      statValue = Helpers.getTotal(initRolls);
      var subValue = Math.floor((statValue - 10) / 2);
      var newStat = {
        name: statName,
        value: statValue,
        subValue: subValue
      };
      stats.push(newStat);
    }
    
    return stats;
  }

  render() {
    return (
    <div id="stats">
      {this.stats.map((stat, i) => {return(
        <Stat
            key={i}
            statLabel={stat.name.toUpperCase()}
            statValue={stat.value}
            subValue={stat.subValue}>
        </Stat>
      )})}
      <button onClick={this.regenerate}>Give me a character!</button>
    </div>
    );
  }
}

export default Character;