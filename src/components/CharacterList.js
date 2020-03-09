import React from 'react';
import CharacterCard from './CharacterCard';

class CharacterList extends React.Component{

  constructor(props) {
    super(props);
    this.renderCharacterCards = this.renderCharacterCards.bind(this);
    this.onClickOnCharacterCard = this.onClickOnCharacterCard.bind(this);
  }

  renderCharacterCards()
  {
    var chars = this.props.savedCharacters;

    if (chars === null || !chars)
    {
      return (<p>No saved characters</p>);
    }

    var cards = [];

    chars.forEach(c => {
      cards.push(<CharacterCard character={c} key={c.id} onClickOnCharacterCard={this.onClickOnCharacterCard} />)
    });

    return (cards);
  }

  onClickOnCharacterCard(character) {
    this.props.onClickOnCharacterCard(character);
  }

  render() {
    var characterCards = this.renderCharacterCards();

      return(
          <div className="container mt-3">
            <h3>Saved characters</h3>
            <div className="characterList">
              {characterCards}
            </div>
          </div>
      );
  }
}

export default CharacterList;