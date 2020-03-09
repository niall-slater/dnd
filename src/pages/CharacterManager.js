import React from 'react';
import Character from '../components/Character';
import CharacterList from '../components/CharacterList';
import { StorageKeys } from '../globals/StorageKeys.Const';
import LocalStorageHelper from '../helpers/LocalStorageHelper';

class CharacterManager extends React.Component{

  constructor(props) {
    super(props);

    this.loadSavedCharacters = this.loadSavedCharacters.bind(this);
    this.saveCharacter = this.saveCharacter.bind(this);
    this.selectCharacter = this.selectCharacter.bind(this);
    this.clearCharacters = this.clearCharacters.bind(this);
    this.onLoadStart = this.onLoadStart.bind(this);
    this.onLoadEnd = this.onLoadEnd.bind(this);

    var savedCharacters = this.loadSavedCharacters();
    var activeCharacter = savedCharacters[0];

    this.state = {
      savedCharacters: savedCharacters,
      activeCharacter: activeCharacter
    };
  }

  loadSavedCharacters()
  {
    var loadedData = LocalStorageHelper.Load(StorageKeys.SAVED_CHARACTERS);
    if (loadedData === null || !loadedData)
    {
      return [];
    }
    return loadedData;
  }

  saveCharacter(character) {
    var currentCharacters = this.loadSavedCharacters();

    var conflict = false;

    if (currentCharacters)
    {
      currentCharacters.forEach(c => {
        if (c.id === character.id)
        {
          conflict = true;
          return;
        }
      });
    }

    if (conflict)
    {
      //TODO: raise toast saying character already saved
      return;
    }

    currentCharacters.push(character);

    LocalStorageHelper.Save(StorageKeys.SAVED_CHARACTERS, currentCharacters);

    this.setState({savedCharacters: currentCharacters});
  }

  selectCharacter(character) {
    this.setState({activeCharacter: character});
  }

  clearCharacters() {
    LocalStorageHelper.Clear();
    this.setState({savedCharacters: []})
  }

  onLoadStart() {
    this.setState({loading: true});
  }

  onLoadEnd() {
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