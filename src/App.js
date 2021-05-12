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
    history: [{ squares: Array(9).fill(null) }],
    xIsNext: true,
    stepNumber: 0,
  });

  /**
   *
   */

  const history = state.history;
  const current = history[state.stepNumber];
  const winner = winnerChecking(current.squares);
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
    const history = state.history.slice(0, state.stepNumber + 1);
    const current = history[history.length - 1];
    const squares = current.squares.slice();

    if (squares[i] || winnerChecking(squares)) {
      return;
    }

    squares[i] = state.xIsNext ? 'X' : 'O';

    setState((prev) => ({
      ...prev,
      history: history.concat([{ squares: squares }]),
      xIsNext: !prev.xIsNext,
      stepNumber: history.length,
    }));
  };

  const jumpTo = (stepNumber) => {
    setState((prev) => ({
      ...prev,
      stepNumber: stepNumber,
      xIsNext: stepNumber % 2 === 0,
    }));
  };

  /**
   *
   */

  return (
    <>
      <div className='board'>
        {current.squares.map((square, idx) => (
          <div className='square' key={idx} onClick={() => handleClick(idx)}>
            {square}
          </div>
        ))}
      </div>

      <div className='status'>{status}</div>

      <h3 className='history_title'>History:</h3>
      <ol className='history_list'>
        {history.map((el, idx) => {
          let text;

          if (idx === 0) {
            text = 'start';
          } else {
            text = `go to ${idx}`;
          }

          return (
            <li className='history_list-item' key={idx} onClick={() => jumpTo(idx)}>
              {text}
            </li>
          );
        })}
      </ol>
    </>
  );
}
