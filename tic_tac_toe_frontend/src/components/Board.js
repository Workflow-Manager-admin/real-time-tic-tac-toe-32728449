import React from 'react';

// PUBLIC_INTERFACE
const Board = ({ squares, onClick, winningLine }) => {
  return (
    <div className="board">
      {squares.map((square, i) => (
        <button
          key={i}
          className={`square ${winningLine?.includes(i) ? 'winning' : ''}`}
          onClick={() => onClick(i)}
        >
          {square}
        </button>
      ))}
    </div>
  );
};

export default Board;
