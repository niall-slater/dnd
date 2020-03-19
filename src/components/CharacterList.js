import React from 'react';
import CharacterCard from './CharacterCard';
import LocalStorageHelper from '../helpers/LocalStorageHelper';

class CharacterList extends React.Component{

  constructor(props) {
    super(props);
  }

  renderCharacterCards = () => {
    var chars = this.props.savedCharacters;

    if (chars === null || !chars || chars.length === 0)
    {
      return (<p>No saved characters</p>);
    }

    var cards = [];

    chars.forEach(c => {
      cards.push(<CharacterCard character={c} key={c.id} onClickOnCharacterCard={this.onClickOnCharacterCard} />)
    });

    return (cards);
  }

  onClickOnCharacterCard = (character) => {
    this.props.onClickOnCharacterCard(character);
  }

  clearCharacters = () => {
    this.props.clearCharacters();
  }

  render() {
    var characterCards = this.renderCharacterCards();

      return(
          <div className="container mt-3">
            <h3>Saved characters</h3>
            <div className="characterList">
              {characterCards}
            </div>
            <br />
            <button className="btn btn-secondary" onClick={this.clearCharacters}>Clear characters</button>
          </div>
      );
  }
}

export default CharacterList;