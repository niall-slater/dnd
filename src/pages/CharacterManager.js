import React from 'react';
import Character from '../components/Character';
import CharacterList from '../components/CharacterList';
import { StorageKeys } from '../globals/StorageKeys.Const';
import LocalStorageHelper from '../helpers/LocalStorageHelper';

class CharacterManager extends React.Component{

  constructor(props) {
    super(props);

    var savedCharacters = this.loadSavedCharacters();
    var activeCharacter = savedCharacters[0];

    this.state = {
      savedCharacters: savedCharacters,
      activeCharacter: activeCharacter
    };
  }

  loadSavedCharacters = () => {
    var loadedData = LocalStorageHelper.Load(StorageKeys.SAVED_CHARACTERS);
    if (loadedData === null || !loadedData)
    {
      return [];
    }
    return loadedData;
  }

  saveCharacter = (character) => {
    var currentCharacters = this.loadSavedCharacters();

    // Update the list with any changes made to the characters
    var newList = currentCharacters;
    var conflict = false;

    if (currentCharacters) {
      currentCharacters.forEach(c => {
        if (c.id === character.id)
        {
          newList[currentCharacters.indexOf(c)] = character;
          c = character;
          conflict = true;
          return;
        }
      });
    }
    currentCharacters = newList;

    if (!conflict) {
      currentCharacters.push(character);
    }

    LocalStorageHelper.Save(StorageKeys.SAVED_CHARACTERS, currentCharacters);

    this.setState({
      savedCharacters: currentCharacters,
      activeCharacter: character
    });
  }

  selectCharacter = (character) => {
    this.setState({activeCharacter: character});
  }

  clearCharacters = () => {
    LocalStorageHelper.Clear();
    this.setState({savedCharacters: []})
  }

  onLoadStart = () => {
    this.setState({loading: true});
  }

  onLoadEnd = () => {
    this.setState({loading: false});
  }

  render() {
      return(
          <div className={`container toolBox ${this.state.loading ? "loading" : ""}`}>
            <h3 className="text-muted">Character generator</h3>
            <Character
              character={this.state.activeCharacter}
              onSaveCharacter={this.saveCharacter}
              onLoadStart={this.onLoadStart}
              onLoadEnd={this.onLoadEnd}
            />
            
            <CharacterList
              onClickOnCharacterCard={this.selectCharacter}
              savedCharacters={this.state.savedCharacters}
              clearCharacters={this.clearCharacters}
            />
          </div>
      );
  }
}

export default CharacterManager;