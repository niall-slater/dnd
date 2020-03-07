import React from 'react';
import Character from './components/Character';
import './App.css';

export default class App extends React.Component {

  constructor(props){
    super(props);
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h2 className="Nav-item">Critical Assist</h2>
          <a className="Nav-item" href="https://www.twitter.com/niall_slater">@niall_slater</a>
        </header>
        <Character />
      </div>
    );
  }
}