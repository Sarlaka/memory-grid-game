import React, { Component } from 'react';
import Game from './components/Game';
import './App.css'
class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      gameId: 1,
      score: 0
    }
  }
  createNewGame(gameState,preScore) {
    let score;
    if(gameState === 'won'){
       score = preScore;
    }else if(gameState === 'lost'){
       score = 0;
    }
    this.setState({ gameId: this.state.gameId + 1 ,score: score}); 
  }
  render() {
    return (
      <div className="App">
        <Game rows={5} cols={5} activeCellsCount={6} allowedWrongAttempts={2} timeoutSeconds={10} key={this.state.gameId} createNewGame={this.createNewGame.bind(this)} score={this.state.score}/>
      </div>
    );
  }
}

export default App;
