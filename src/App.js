import React from 'react';
import logo from './logo.svg';
import Stat from './components/Stat';
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h3>DND babey</h3>
        <div id="stats">
          <Stat statLabel="STR" statValue="17" subValue="+3"></Stat>
          <Stat statLabel="DEX" statValue="16" subValue="+2"></Stat>
          <Stat statLabel="CON" statValue="17" subValue="+3"></Stat>
          <Stat statLabel="INT" statValue="16" subValue="+2"></Stat>
          <Stat statLabel="WIS" statValue="8" subValue="-1"></Stat>
          <Stat statLabel="CHA" statValue="17" subValue="+3"></Stat>
        </div>
      </header>
    </div>
  );
}

export default App;