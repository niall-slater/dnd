import React from 'react';
import Stat from './Stat';
import Helpers from './Helpers';
import uuid from 'uuid';
import { Environment } from '../globals/Environment.Const';

class Character extends React.Component{

  constructor(props) {
    super(props);
    this.regenerate();
    this.regenerate = this.regenerate.bind(this);
  }
  
  regenerate() {
    this.setState({
      isLoaded: false,
      stats: {}
    });
    fetch(Environment.API_LOCATION + 'character/generate')
      .then(res => res.json())
      .then(
        (result) => {
          this.setState({
            isLoaded: true,
            stats: result.stats
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

  render() {    
    return (
    <div id="stats">      
      {this.stats}
      <button onClick={this.regenerate}>Give me a character!</button>
    </div>
    );
  }
}

export default Character;