"use client"
import React, { useState, useEffect } from 'react';
import styles from '../styles/TicTacToe.module.css';
import ToggleSwitch from "./ToggleSwitch";
import AIModel from "./AIModel";

const TicTacToe = () => {
  const [board, setBoard] = useState(Array(9).fill(null));
  const [highlight, setHighlight] = useState(Array(9).fill(false));
  const [isXNext, setIsXNext] = useState(true);
  const [winner, setWinner] = useState(null);
  const [winningCells, setWinningCells] = useState([]);
  const [isAI, setIsAI] = useState(false);
  function toggle() {
    setIsAI(!isAI);
  }
  useEffect(() => {
    if (winner) {
      highlightWinningCells();
    }
  }, [winner]);

  useEffect(() => {
    resetGame();
  }, [isAI]);

  function sleep(milliseconds) {
    const date = Date.now();
    let currentDate = null;
    do {
      currentDate = Date.now();
    } while (currentDate - date < milliseconds);
  }

  const handleClick = (index) => {
    if (winner || board[index]) return;
    if (isAI == false) {
      const newBoard = [...board];
      newBoard[index] = isXNext ? 'X' : 'O';
      setBoard(newBoard);
      setIsXNext(!isXNext);
      checkWinner(newBoard);
    }
    else {
      const newBoard = [...board];
      newBoard[index] = isXNext ? 'X' : 'O';
      setBoard(newBoard);
      checkWinner(newBoard);
      const nextMove = (!isXNext) ? 'X' : 'O';
      const aiIndex = AIModel(newBoard, nextMove)
      newBoard[aiIndex] = nextMove;
      setBoard(newBoard);
      checkWinner(newBoard);
    }

  };

  const checkWinner = (board) => {
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];

    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];
      if (board[a] && board[a] === board[b] && board[a] === board[c]) {
        setWinner(board[a]);
        setWinningCells([a, b, c]);
        return;
      }
    }

    if (board.every((cell) => cell !== null)) {
      console.log("Draw Triggered");
      setWinner('Draw');
    }
  };

  const highlightWinningCells = () => {
    if (winner !== 'Draw') {
      const [a, b, c] = winningCells;
      const allCells = [...highlight];
      allCells[a] = true;
      allCells[b] = true;
      allCells[c] = true;
      setHighlight(allCells);
    }
  };

  const renderCell = (index) => {
    const cellValue = board[index];
    const isHighlighted = highlight[index];
    const isWinningCell = winningCells.includes(index);
    const classNames = `${styles.cell} ${isWinningCell ? styles.winningCell : ''} ${isHighlighted === true ? styles.highlight : ''}`;

    return (
      <div className={classNames} onClick={() => handleClick(index)}>
        {cellValue}
      </div>
    );
  };

  const resetGame = () => {
    setBoard(Array(9).fill(null));
    setIsXNext(true);
    setWinner(null);
    const [a, b, c] = winningCells;
    const allCells = [...highlight];
    allCells[a] = false;
    allCells[b] = false;
    allCells[c] = false;
    setHighlight(allCells);
    setWinningCells([]);
  };

  return (
    <>
      <ToggleSwitch label="V/S" toggleAI={toggle} />
      <div className={styles.board}>
        {board.map((cell, index) => (
          renderCell(index)
        ))}
        <div className={styles.status}>
          {winner ? (
            <>
              {winner === 'Draw' ? (
                <p>It's a Draw!</p>
              ) : (
                <p>Player {winner} wins!</p>
              )}
              <button className='bg-white text-black p-2 border-double border-green-500 border-2 hover:rounded' onClick={resetGame}>Play Again</button>
            </>
          ) : (
            <p>Next Player: {isXNext ? 'X' : 'O'}</p>
          )}
        </div>
      </div>
    </>

  );
};

export default TicTacToe;
