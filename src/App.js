import React from 'react';
import Character from './components/Character';
import './App.css';

export default class App extends React.Component{
  constructor(props){
    super(props);
  }
  render() {
    return (
      <div className="App">
        <header className="App-header">
        </header>
        <h4>Ability Scores</h4>
        <Character />
      </div>
    );
  }
}