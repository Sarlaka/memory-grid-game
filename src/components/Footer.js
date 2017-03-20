import React,{Component} from 'react'

class Footer extends Component{
    constructor(props) {
        super(props)
        this.state = {
            hints:{
                ready: "Get Ready",
                memorize: "Memorize",
                recall: "Recall",
                won: "Well Played", 
                lost: "Game Over"
            }
        }
    }
    handleClick() {
        this.props.playAgain(this.props.gameState,this.props.score);
    }
    remainingCount() {
        if (this.props.gameState !== "recall") { return null; } 
        return (
            <div className="remaining-count">
                {this.props.activeCellsCount - this.props.correctGuesses.length}
            </div> );
    }
    playAgainButton() {
        if (["won", "lost"].indexOf(this.props.gameState) >= 0) {
            if(this.props.gameState === 'won'){
                return (
                    <button className="play-again-button"
                        onClick={this.handleClick.bind(this)}> Play Again
                    </button> 
                );
            }else {
                return (
                    <button className="play-again-button"
                        onClick={this.handleClick.bind(this)}> Restart
                    </button> 
                );
            }
        } 
    }
    render () {
        return (
            <div className="footer">
                <div className="hint">
                <div>score: {this.props.score}</div>
                {this.state.hints[this.props.gameState]}...
                </div>
                {this.remainingCount()}
                {this.playAgainButton()}
            </div>
        );
    }
}

export default Footer