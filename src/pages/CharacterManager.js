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

  render() {
      return(
          <div className="container toolBox">
            <h1>Character Manager</h1>
            <Character character={this.state.activeCharacter} onSaveCharacter={this.saveCharacter} />
            
            <CharacterList onClickOnCharacterCard={this.selectCharacter} savedCharacters={this.state.savedCharacters} />
          </div>
      );
  }
}

export default CharacterManager;