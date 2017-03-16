import React,{Component} from 'react'

class Footer extends Component{
    constructor(props) {
        super(props)
        this.state = {
            hints:{
                ready: "Get Ready",
                memorize: "Memorize",
                recall: "Recall"
            }
        }
    }
    render () {
        return (
            <div className="footer">
            <div className="hint">
            {this.state.hints[this.props.gameState]}...
            </div>
            </div>
        );
    }
}

export default Footer