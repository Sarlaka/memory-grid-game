import React, {Component} from 'react';
import _ from 'lodash';
import Row from './Row';
import Cell from './Cell';
import Footer from './Footer';

class Game extends Component{
    constructor (props) {
        super(props)
        // 二维数组，保存格子的坐标信息
        let matrix = [];
        for (let r = 0; r < this.props.rows; r++) {
            let row = [];
            for (let c = 0; c < this.props.cols; c++) {
                row.push(`${r}${c}`);
            }
            matrix.push(row);
        }
        // 选出激活的格子坐标
        let flatMatrix = _.flatten(matrix);
        let activeCells = _.sampleSize(flatMatrix,this.props.activeCellsCount);
        this.state = {
            gameState: 'ready',
            matrix: matrix,
            activeCells: activeCells,
            wrongGuesses: [],
            correctGuesses: []
        }
        this.recordGuess = this.recordGuess.bind(this)
    }
    // 记录点击的方块
    recordGuess({ cellId, userGuessIsCorrect }) {
        let { wrongGuesses, correctGuesses, gameState } = this.state;
        if (userGuessIsCorrect) {
            correctGuesses.push(cellId);
            if (correctGuesses.length === this.props.activeCellsCount) {
                gameState = "won";
            }
        } else {
            wrongGuesses.push(cellId);
            if (wrongGuesses.length > this.props.allowedWrongAttempts) {
                gameState = "lost";
            }
        }
        this.setState({ correctGuesses, wrongGuesses ,gameState});
    }
    // 限制游戏时间，超过时间游戏结束
    startRecallMode() {
        this.setState({ gameState: 'recall' }, () => {
            this.secondsRemaining = this.props.timeoutSeconds; 
            setInterval(() => {
                if (--this.secondsRemaining === 0) { 
                    this.setState({ gameState: "lost" });
                }
            }, 1000);
        }); 
    }
    componentDidMount () {
        setTimeout(() => {
            this.setState({ gameState: 'memorize' }, () => {
                setTimeout(this.startRecallMode.bind(this), 2000);
            });
        }, 2000);
    }
    render () {
        console.log(this.state)
        // 判断游戏状态，在记忆或输掉时显示激活的格子
        let showActiveCells = ["memorize", "lost"].indexOf(this.state.gameState) >= 0;
        return (
            <div className="grid">
            {this.state.matrix.map((row, index) => (
                <Row key={index}>
                    {row.map(cellId => <Cell 
                                            key={cellId} 
                                            id={cellId} 
                                            activeCells={this.state.activeCells} 
                                            gameState={this.state.gameState}
                                            wrongGuesses={this.state.wrongGuesses}
                                            correctGuesses={this.state.correctGuesses}
                                            recordGuess={this.recordGuess}
                                            showActiveCells={showActiveCells}
                                        />)}
                </Row>
            ))}
            <Footer gameState={this.state.gameState}
                    correctGuesses={this.state.correctGuesses}
                    activeCellsCount={this.props.activeCellsCount}
                />
            </div>
        )
    }
}

export default Game;