import React from 'react';
import Navbar from './components/Navbar';
import CharacterManager from './pages/CharacterManager';
import './scss/index.scss';

export default class App extends React.Component {

  constructor(props){
    super(props);
  }

  render() {
    return (
      <div className="App">
        <Navbar />
        <CharacterManager />
      </div>
    );
  }
}