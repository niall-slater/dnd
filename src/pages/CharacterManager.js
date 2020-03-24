import React from 'react';
import Character from '../components/Character';
import CharacterList from '../components/CharacterList';
import { StorageKeys } from '../globals/StorageKeys.Const';
import LocalStorageHelper from '../helpers/LocalStorageHelper';

class CharacterManager extends React.Component{

  constructor(props) {
    super(props);

    var savedCharacters = this.loadSavedCharacters();
    var activeCharacter = this.props.activeCharacter;

    this.state = {
      savedCharacters: savedCharacters,
      activeCharacter: activeCharacter
    };
  }

  loadSavedCharacters = () => {
    var loadedData = LocalStorageHelper.Load(StorageKeys.SAVED_CHARACTERS);
    if (loadedData.length === 0 || !loadedData)
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
    this.props.setActiveCharacter(character);
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
          <h3 className="text-muted">Character Manager</h3>
          
          <CharacterList
            onClickOnCharacterCard={this.selectCharacter}
            savedCharacters={this.state.savedCharacters}
            clearCharacters={this.clearCharacters}
          />

          <br />

          <Character
            character={this.state.activeCharacter}
            onSaveCharacter={this.saveCharacter}
            onLoadStart={this.onLoadStart}
            onLoadEnd={this.onLoadEnd}
          />
        </div>
    );
  }
}

export default CharacterManager;