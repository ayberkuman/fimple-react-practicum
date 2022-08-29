import { useState } from "react";
import { calculateWinnerForPlayer } from "../../helpers/functions";
import { Square } from "../Square";

export const Board = () => {
  const [squares, setSquares] = useState(Array(9).fill(null));
  const [isX, setIsX] = useState(true);
  const handleClick = (i) => {
    if (calculateWinnerForPlayer(squares) || squares[i]) {
      return;
    }

    squares[i] = isX ? "X" : "O";
    setSquares(squares);
    setIsX(!isX);
  };
  const emptySquares = squares.filter((x) => x === null);

  const winner = calculateWinnerForPlayer(squares);
  let status;
  if (winner) {
    status = `Winner: ${winner[0]}`;
  } else if (!winner && emptySquares.length === 0) {
    status = "It's a Tie!";
  } else {
    status = "Next player: " + (isX ? "X" : "O");
  }
  const handleRestart = () => {
    setIsX(true);
    setSquares(Array(9).fill(null));
  };
  const winningPattern = winner ? winner[1] : "";

  const renderSquare = (i) => {
    return (
      <Square
        value={squares[i]}
        onClick={() => handleClick(i)}
        isWinner={winningPattern.includes(i)}
      />
    );
  };

  return (
    <div className="board">
      <div className="board-row">
        {renderSquare(0)}
        {renderSquare(1)}
        {renderSquare(2)}
      </div>
      <div className="board-row">
        {renderSquare(3)}
        {renderSquare(4)}
        {renderSquare(5)}
      </div>
      <div className="board-row">
        {renderSquare(6)}
        {renderSquare(7)}
        {renderSquare(8)}
      </div>
      <div className="status">{status}</div>
      <button className="restart" onClick={handleRestart}>
        Restart Game!
      </button>
    </div>
  );
};
