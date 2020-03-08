import React from 'react';

class CharacterCard extends React.Component {

  render() {
    var c = this.props.character;

      return(
          <div className="container characterCard">
            <h5>{c.name}</h5>
            <h6>Lvl {c.level} {c.race.name} {c.class.name}</h6>
          </div>
      );
  }
}

export default CharacterCard;