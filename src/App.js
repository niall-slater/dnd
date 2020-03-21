import React from 'react';
import './scss/index.scss';
import { Tools } from './globals/Tools.Const';
import { StorageKeys } from './globals/StorageKeys.Const';
import { Environment } from './globals/Environment.Const';
import ToolBar from './components/ToolBar';
import CharacterManager from './pages/CharacterManager';
import CharacterSheet from './pages/CharacterSheet';
import LocalStorageHelper from './helpers/LocalStorageHelper';

const version = 0.12;

export default class App extends React.Component {

  constructor(props){
    super(props);

    var savedCharacters = LocalStorageHelper.Load(StorageKeys.SAVED_CHARACTERS);

    this.state = {
      loading: true,
      savedCharacters: savedCharacters,
      activeCharacter: null,
      currentTool: Tools.SHEET
    };

    this.checkForSavedCharacters();
  }

  async checkForSavedCharacters() {
    if (this.state.savedCharacters.length > 0)
      return;

    const response = await fetch(Environment.API_LOCATION + 'character/generate')
    const json = await response.json();
    var activeCharacter = json;
    this.setState({
      savedCharacters: [],
      activeCharacter: activeCharacter,
      loading: false
    });
  }

  selectTool = (tool) => {
    this.setState({
      currentTool: tool
    });
  }

  setActiveCharacter = (character) => {
    this.setState({
      activeCharacter: character
    });
  }

  renderTool = () => {
    switch (this.state.currentTool) {
      case Tools.MANAGER: return <CharacterManager setActiveCharacter={this.setActiveCharacter} />;
      case Tools.SHEET: return <CharacterSheet character={this.state.activeCharacter} />;
      default: ;
    }
  }

  renderError = () => {
    return(
      <div className="App">
        <h2 className="display-4 pt-3">Critical Assist</h2>
        <p className="text lead">Your RPG assistant <span className="text-muted">| A work-in-progress v{version}</span></p>
        <p>Looks like Critical Assist isn't working right now. Check back later!</p>
      </div>
    );
  }

  render() {
    var currentTool = this.renderTool();
    var error = this.renderError();

    if (this.state.loading) {
      return (<p>Loading...</p>);
    }
    
    return (
      <div className="App">
      <h2 className="display-4 pt-3">Critical Assist</h2>
      <p className="text lead">Your RPG assistant <span className="text-muted">| A work-in-progress v{version}</span></p>
      <ToolBar selectTool={this.selectTool} currentTool={this.state.currentTool} />
      {currentTool}
      </div>
    );
  }
}