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
        this.nowScore = this.props.score;
    }
    // 记录点击的方块
    recordGuess({ cellId, userGuessIsCorrect }) {
        let { wrongGuesses, correctGuesses, gameState } = this.state;
        if (userGuessIsCorrect) {
            correctGuesses.push(cellId);
            if (correctGuesses.length === this.props.activeCellsCount) {
                gameState = this.finishGame("won");
            }
        } else {
            wrongGuesses.push(cellId);
            if (wrongGuesses.length > this.props.allowedWrongAttempts) {
                gameState = this.finishGame("lost");
            }
        }
        this.setState({ correctGuesses, wrongGuesses ,gameState});
    }
    // 限制游戏时间，超过时间游戏结束
    startRecallMode() {
        this.setState({ gameState: 'recall' }, () => {
            this.secondsRemaining = this.props.timeoutSeconds; 
            this.playTimerId = setInterval(() => {
                if (--this.secondsRemaining === 0) { 
                    this.setState({ gameState: this.finishGame("lost") });
                }
            }, 1000);
        }); 
    }
    // 结束游戏
    finishGame(gameState) { 
        clearInterval(this.playTimerId);
        if(gameState === 'won'){
            this.nowScore += 600 - 200*this.state.wrongGuesses.length;
        }
        return gameState;
    }
    componentDidMount () {
       this.memorizeTimerId = setTimeout(() => {
            this.setState({ gameState: 'memorize' }, () => {
                this.recallTimerId = setTimeout(this.startRecallMode.bind(this), 2000);
            });
        }, 2000);
    }
    componentWillUnmount() { 
        clearTimeout(this.memorizeTimerId); clearTimeout(this.recallTimerId); this.finishGame();
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
                    playAgain={this.props.createNewGame}
                    score={this.nowScore}
                />
            </div>
        )
    }
}

export default Game;