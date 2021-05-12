import { useState } from 'react';

function winnerChecking(squares) {
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

    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }

  return null;
}

export default function App() {
  const [state, setState] = useState({
    squares: Array(9).fill(null),
    xIsNext: true,
  });

  /**
   *
   */

  const winner = winnerChecking(state.squares);
  let status;

  if (winner) {
    status = `Winner: ${winner}`;
  } else {
    status = `Next: ${state.xIsNext ? 'X' : 'O'}`;
  }

  /**
   *
   */

  const handleClick = (i) => {
    if (state.squares[i] || winner) {
      return;
    }

    const copySquares = state.squares.slice();
    copySquares[i] = state.xIsNext ? 'X' : 'O';
    setState((prev) => ({
      ...prev,
      squares: copySquares,
      xIsNext: !prev.xIsNext,
    }));
  };

  /**
   *
   */

  return (
    <>
      <div className='board'>
        {state.squares.map((square, idx) => (
          <div className='square' key={idx} onClick={() => handleClick(idx)}>
            {square}
          </div>
        ))}
      </div>

      <div className='status'>{status}</div>
    </>
  );
}
