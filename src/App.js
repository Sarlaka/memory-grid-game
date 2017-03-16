import React, { Component } from 'react';
import Game from './components/Game';
import './App.css'
class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      gameId: 1
    }
  }
  createNewGame() {
    this.setState({ gameId: this.state.gameId + 1 }); 
  }
  render() {
    return (
      <div className="App">
        <Game rows={5} cols={5} activeCellsCount={6} allowedWrongAttempts={3} timeoutSeconds={10} key={this.state.gameId} createNewGame={this.createNewGame.bind(this)}/>
      </div>
    );
  }
}

export default App;
