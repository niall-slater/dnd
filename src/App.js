import React from 'react';
import ToolBar from './components/ToolBar';
import CharacterManager from './pages/CharacterManager';
import './scss/index.scss';

const version = 0.1;

export default class App extends React.Component {

  constructor(props){
    super(props);

    this.state = {
      currentTool: <CharacterManager />
    }
  }

  selectTool = (tool) => {
    this.setState({
      currentTool: tool
    });
  }

  render() {
    return (
      <div className="App">
        <h2 className="display-4 pt-3">Critical Assist</h2>
        <p className="text lead">Your RPG assistant <span className="text-muted">| A work-in-progress v{version}</span></p>
        <ToolBar selectTool={this.selectTool} />
        {this.state.currentTool}
      </div>
    );
  }
}