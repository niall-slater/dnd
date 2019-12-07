import React from 'react';
import Stat from './Stat';
import Helpers from './Helpers';
import uuid from 'uuid';

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
    this.state ={stats}
    this.regenerate = this.regenerate.bind(this);
    this.buildRandomStats = this.buildRandomStats.bind(this);
  }
  
  regenerate() {
    console.log("HONK");
    let stats = this.buildRandomStats();
    this.setState({stats})
  }
  
  buildRandomStats() {
    let stats = [];
      for (var x = 0; x < statNames.length; x++) {
      var statValue = 0;
      var initRolls = [];
      for (var i = 0; i < 4; i++) {
        initRolls.push(Helpers.rollDie(6));
      }
      initRolls = Helpers.removeSmallest(initRolls);
      statValue = Helpers.getTotal(initRolls);
      var subValue = Math.floor((statValue - 10) / 2);
      var newStat = {
        name: statNames[x],
        value: statValue,
        subValue: subValue
      };
      stats.push(newStat);
    }
    
    return stats;
  }

  renderStats() {
    var stats = [];
    this.state.stats.forEach(stat => {
      stats.push(<Stat
          key={uuid.v4()}
          stat={stat}/>)
    });
    return stats;
  }

  render() {
    let stats = this.renderStats();      

    return (
    <div id="stats">      
      {stats}
      <button onClick={this.regenerate}>Give me a character!</button>
    </div>
    );
  }
}

export default Character;