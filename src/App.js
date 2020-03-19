import React from 'react';
import ToolBar from './components/ToolBar';
import CharacterManager from './pages/CharacterManager';
import './scss/index.scss';
import CharacterSheet from './pages/CharacterSheet';
import { Tools } from './globals/Tools.Const';

const version = 0.1;

export default class App extends React.Component {

  constructor(props){
    super(props);

    this.state = {
      currentTool: Tools.MANAGER,
      activeCharacter: null
    }
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

  render() {
    var currentTool = this.renderTool();

    return (
      <div className="App">
        <h2 className="display-4 pt-3">Critical Assist</h2>
        <p className="text lead">Your RPG assistant <span className="text-muted">| A work-in-progress v{version}</span></p>
        <ToolBar selectTool={this.selectTool} />
        {currentTool}
      </div>
    );
  }
}