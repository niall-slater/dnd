import React from 'react';
import Navbar from './components/Navbar';
import Character from './components/Character';
import './scss/index.scss';

export default class App extends React.Component {

  constructor(props){
    super(props);
  }

  render() {
    return (
      <div className="App">
        <Navbar />
        <Character />
      </div>
    );
  }
}