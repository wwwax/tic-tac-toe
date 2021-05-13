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
      return lines[i];
    }
  }

  return null;
}

export default function App() {
  const [state, setState] = useState({
    history: [{ squares: Array(9).fill(null) }],
    xIsNext: true,
    stepNumber: 0,
    sortedUp: true,
  });

  /**
   *
   */

  const history = state.history;
  const current = history[state.stepNumber];
  const winner = winnerChecking(current.squares);
  let status;

  if (winner) {
    const winnerIndex = winner[0];
    const winnerSymbol = current.squares[winnerIndex];
    status = `Winner: ${winnerSymbol}`;
  } else if (state.history.length === 10 && !winner) {
    status = 'Draw!';
  } else {
    status = `Next: ${state.xIsNext ? 'X' : 'O'}`;
  }

  const historyIndexes = state.history.slice().map((el, i) => i);

  if (!state.sortedUp) {
    historyIndexes.sort((a, b) => b - a);
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

  const toggleSort = () => {
    setState((prev) => ({
      ...prev,
      sortedUp: !prev.sortedUp,
    }));
  };

  const refreshGame = () => {
    setState({
      history: [{ squares: Array(9).fill(null) }],
      xIsNext: true,
      stepNumber: 0,
      sortedUp: true,
    });
  };

  /**
   *
   */

  return (
    <>
      <div className='board'>
        {current.squares.map((square, idx) => {
          let winnerStyles = {};

          if (winner) {
            if (winner.includes(idx)) {
              winnerStyles = {
                backgroundColor: 'lightgreen',
              };
            }
          }

          return (
            <div
              className='square'
              key={idx}
              onClick={() => handleClick(idx)}
              style={winnerStyles}>
              {square}
            </div>
          );
        })}
      </div>

      <div className='status'>{status}</div>

      {history.length !== 1 ? (
        <>
          <h3 className='history_title'>History:</h3>
          <ol className='history_list'>
            {historyIndexes.map((idx) => {
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

          <div className='sort-btn' onClick={toggleSort}>
            {state.sortedUp ? 'sort down' : 'sort up'}
          </div>
        </>
      ) : null}

      <div className='reset-btn' onClick={refreshGame}>
        &#x21bb;
      </div>
    </>
  );
}
