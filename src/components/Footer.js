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
    remainingCount() {
        if (this.props.gameState !== "recall") { return null; } 
        return (
            <div className="remaining-count">
                {this.props.activeCellsCount - this.props.correctGuesses.length}
            </div> );
    }
    render () {
        return (
            <div className="footer">
                <div className="hint">
                {this.state.hints[this.props.gameState]}...
                </div>
                {this.remainingCount()}
            </div>
        );
    }
}

export default Footer