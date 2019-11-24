import React from 'react';
import logo from './logo.svg';
import Stat from './components/Stat';
import CharacterBuilder from './components/CharacterBuilder';
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h3>DND babey</h3>
        <div id="stats">
          {buildStats(CharacterBuilder.generate())}
        </div>
      </header>
    </div>
  );
}

function buildStats(stats) {
  console.log(stats);
  var statsElements = [];

  for (var statKey in stats) {
    var subValue = Math.floor((stats[statKey] - 10) / 2);
    if (subValue >= 0)
      subValue = "+" + subValue;
    statsElements.push(<Stat
        key={statKey}
        statLabel={statKey.toUpperCase()}
        statValue={stats[statKey]}
        subValue={subValue}></Stat>);
  }

  return statsElements;
}

export default App;

//MOCKS

var stats = {
  str: 17,
  dex: 5,
  con: 17,
  int: 12,
  wis: 8,
  cha: 9
};