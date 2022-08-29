import AiBoard from "./AiBoard";
import React from "react";
import {
  calculateWinner,
  findBestSquare,
  isBoardFilled,
  calculateWinnerPattern,
} from "../../helpers/functions";

class Game extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      history: [
        {
          squares: Array(9).fill(null),
        },
      ],
      stepNumber: 0,
      xIsNext: true,
    };
  }

  makeMove(i) {
    const history = this.state.history.slice(0, this.state.stepNumber + 1);
    const current = history[history.length - 1];
    const squares = current.squares.slice();
    if (calculateWinner(squares) || squares[i]) {
      return Promise.resolve();
    }
    squares[i] = this.state.xIsNext ? "X" : "O";
    const nextState = {
      history: history.concat([
        {
          squares: squares,
        },
      ]),
      stepNumber: history.length,
      xIsNext: !this.state.xIsNext,
    };

    // Return a Promise that resolves when setState completes.
    return new Promise((resolve, reject) => {
      this.setState(nextState, resolve);
    });
  }

  async handleClick(i) {
    // Apply player move to square i
    await this.makeMove(i);

    // Apply AI move
    const squares = this.state.history[this.state.stepNumber].squares.slice();
    const bestSquare = findBestSquare(squares, this.state.xIsNext ? "X" : "O");
    if (bestSquare !== -1) {
      await this.makeMove(bestSquare);
    }
  }

  jumpTo(step) {
    this.setState({
      stepNumber: step,
      xIsNext: step % 2 === 0,
    });
  }
  render() {
    const history = this.state.history;
    const current = history[this.state.stepNumber];
    const winner = calculateWinner(current.squares);
    let isWinner;
    if (winner) {
      isWinner = calculateWinnerPattern(current.squares);
    }
    const handleRestart = () => {
      this.jumpTo(0);
    };
    let status;
    if (winner) {
      status = "Winner: " + winner;
    } else if (isBoardFilled(current.squares)) {
      status = "It's a Tie!";
    } else {
      status = "Next player: " + (this.state.xIsNext ? "X" : "O");
    }

    return (
      <div className="board">
        <AiBoard
          isWinner={isWinner}
          squares={current.squares}
          onClick={(i) => this.handleClick(i)}
        />
        <div className="status">{status}</div>
        <button className="restart" onClick={handleRestart}>
          Restart Game!
        </button>
      </div>
    );
  }
}

export default Game;
