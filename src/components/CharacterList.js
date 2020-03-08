import React from 'react';
import CharacterCard from './CharacterCard';

class CharacterList extends React.Component{

  constructor(props) {
    super(props);
    this.renderCharacterCards = this.renderCharacterCards.bind(this);
  }

  renderCharacterCards()
  {
    var chars = this.props.savedCharacters;
    console.log(typeof chars);
    console.log(chars);

    if (chars === null || !chars)
    {
      return (<p>No saved characters</p>);
    }

    var cards = [];

    chars.forEach(c => {
      cards.push(<CharacterCard character={c} key={c.id} />)
    });

    return (cards);
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