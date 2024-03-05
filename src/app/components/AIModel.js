// AIModel.js
const AIModel = (board, symbol) => {
  const availableMoves = board.reduce((acc, cell, index) => {
    if (cell === null) {
      return [...acc, index];
    }
    return acc;
  }, []);

  const isWinning = (board, player) => {
    const winningConditions = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];

    for (let condition of winningConditions) {
      if (
        board[condition[0]] === player &&
        board[condition[1]] === player &&
        board[condition[2]] === player
      ) {
        return true;
      }
    }
    return false;
  };

  const isBoardFull = (board) => {
    return board.every((cell) => cell !== null);
  };

  const evaluateBoard = (board) => {
    if (isWinning(board, 'X')) {
      return 10;
    } else if (isWinning(board, 'O')) {
      return -10;
    } else {
      return 0;
    }
  };

  const minimax = (board, depth, maximizingPlayer) => {
    const score = evaluateBoard(board);

    if (score === 10 || score === -10 || isBoardFull(board) || depth === 0) {
      return score;
    }

    if (maximizingPlayer) {
      let bestScore = -Infinity;
      for (let move of availableMoves) {
        if (board[move] === null) {
          board[move] = symbol; // Place the symbol
          bestScore = Math.max(bestScore, minimax(board, depth - 1, false));
          board[move] = null;
        }
      }
      return bestScore;
    } else {
      let bestScore = Infinity;
      for (let move of availableMoves) {
        if (board[move] === null) {
          board[move] = symbol; // Place the symbol
          bestScore = Math.min(bestScore, minimax(board, depth - 1, true));
          board[move] = null;
        }
      }
      return bestScore;
    }
  };

  let bestMove;
  let bestScore = -Infinity;

  for (let move of availableMoves) {
    if (board[move] === null) {
      board[move] = symbol; // Place the symbol
      let moveScore = minimax(board, 3, false);
      board[move] = null;

      if (moveScore > bestScore) {
        bestScore = moveScore;
        bestMove = move;
      }
    }
  }

  return bestMove;
};

export default AIModel;
