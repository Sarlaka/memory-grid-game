import React, { Component } from 'react';
import Game from './components/Game';
import './App.css'
class App extends Component {
  render() {
    return (
      <div className="App">
        <Game rows={5} cols={5} activeCellsCount={6} />
      </div>
    );
  }
}

export default App;
