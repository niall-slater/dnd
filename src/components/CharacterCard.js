import React from 'react';

class CharacterCard extends React.Component {

  constructor(props) {
    super(props);
  }

  handleClick = () => {
    this.props.onClickOnCharacterCard(this.props.character);
  }

  render() {
    var c = this.props.character;
    var className = "container characterCard ";
    if (this.props.highlight)
      className += "highlight";

      return(
          <div className={className} onClick={this.handleClick}>
            <h5>{c.name}</h5>
            <h6>Lvl {c.level} {c.race.name} {c.class.name}</h6>
          </div>
      );
  }
}

export default CharacterCard;