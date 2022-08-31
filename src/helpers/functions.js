export const calculateWinnerForPlayer = (squares) => {
  const winningPatterns = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (let i = 0; i < winningPatterns.length; i++) {
    const [a, b, c] = winningPatterns[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return [squares[a], winningPatterns[i]];
    }
  }
  return null;
};
export const calculateWinner = (squares) => {
  const winningPatterns = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (let i = 0; i < winningPatterns.length; i++) {
    const [a, b, c] = winningPatterns[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
};
export const calculateWinnerPattern = (squares) => {
  const winningPatterns = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (let i = 0; i < winningPatterns.length; i++) {
    const [a, b, c] = winningPatterns[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return winningPatterns[i];
    }
  }
  return null;
};
export const findBestSquare = (squares, player) => {
  const opponent = player === "X" ? "O" : "X";

  const minimax = (squares, isMax) => {
    const winner = calculateWinner(squares);

    if (winner === player) return { square: -1, score: 1 };

    if (winner === opponent) return { square: -1, score: -1 };

    if (isBoardFilled(squares)) return { square: -1, score: 0 };

    const best = { square: -1, score: isMax ? -1000 : 1000 };

    for (let i = 0; i < squares.length; i++) {
      if (squares[i]) {
        continue;
      }

      squares[i] = isMax ? player : opponent;
      const score = minimax(squares, !isMax).score;
      squares[i] = null;

      if (isMax) {
        if (score > best.score) {
          best.score = score;
          best.square = i;
        }
      } else {
        if (score < best.score) {
          best.score = score;
          best.square = i;
        }
      }
    }

    return best;
  };

  return minimax(squares, true).square;
};
export const isBoardFilled = (squares) => {
  for (let i = 0; i < squares.length; i++) {
    if (squares[i] === null) {
      return false;
    }
  }
  return true;
};
