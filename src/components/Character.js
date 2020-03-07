import React from 'react';
import Stat from './Stat';
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
    this.renderHome = this.renderHome.bind(this);
  }
  
  regenerate() {
    var stats = [];
    this.setState({
      isLoaded: false,
      stats: stats
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
            stats: stats,
            name: result.name,
            home: result.home.name
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
      return (<div class="loading">Loading...</div>);
    }
    this.state.stats.forEach(stat => {
      stats.push(<Stat
          key={uuid.v4()}
          stat={stat}/>)
    });
    return stats;
  }

  renderName() {
    return(<h2>{this.state.name}</h2>);
  }

  renderHome() {
    return(<h3>{this.state.home}</h3>);
  }

  render() {
    let stats = this.renderStats();
    let name = this.renderName();
    let home = this.renderHome();
    //TODO: {home} causes an error - fix this
    return (
    <div id="stats">
      {name}
      {home}
      {stats}
      <button onClick={this.regenerate}>Give me a character!</button>
    </div>
    );
  }
}

export default Character;