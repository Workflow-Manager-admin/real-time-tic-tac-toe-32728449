import React, { useState } from 'react';
import Board from './components/Board';
import './App.css';

// PUBLIC_INTERFACE
function App() {
  const [history, setHistory] = useState([Array(9).fill(null)]);
  const [currentStep, setCurrentStep] = useState(0);
  const [xIsNext, setXIsNext] = useState(true);
  const current = history[currentStep];
  
  const calculateWinner = (squares) => {
    const lines = [
      [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
      [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
      [0, 4, 8], [2, 4, 6] // Diagonals
    ];
    
    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];
      if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
        return { winner: squares[a], line: lines[i] };
      }
    }
    return null;
  };

  const handleClick = (i) => {
    const newHistory = history.slice(0, currentStep + 1);
    const squares = [...current];
    
    if (calculateWinner(squares) || squares[i]) {
      return;
    }
    
    squares[i] = xIsNext ? 'X' : 'O';
    setHistory([...newHistory, squares]);
    setCurrentStep(newHistory.length);
    setXIsNext(!xIsNext);
  };

  const resetGame = () => {
    setHistory([Array(9).fill(null)]);
    setCurrentStep(0);
    setXIsNext(true);
  };

  const winnerInfo = calculateWinner(current);
  const winner = winnerInfo?.winner;
  const isDraw = !winner && current.every(square => square !== null);
  const status = winner 
    ? `Winner: ${winner}`
    : isDraw
    ? "Game is a draw!"
    : `Next player: ${xIsNext ? 'X' : 'O'}`;

  return (
    <div className="app">
      <div className="game">
        <h1>Tic Tac Toe</h1>
        <div className="game-status">{status}</div>
        <Board 
          squares={current}
          onClick={handleClick}
          winningLine={winnerInfo?.line}
        />
        <button className="reset-button" onClick={resetGame}>
          New Game
        </button>
      </div>
    </div>
  );
}

export default App;
