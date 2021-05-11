import { useState } from 'react';
import Board from './Board';
import Status from './Status';
import History from './History';
import winnerChecking from '../functions/winnerChecking';

export default function Game() {
  const [state, setState] = useState({
    history: [{ squares: Array(9).fill(null) }],
    xIsNext: true,
    stepNumber: 0,
  });

  const history = state.history;
  const current = history[state.stepNumber];
  const winner = winnerChecking(current.squares);

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

  return (
    <>
      <Board squares={current.squares} onClick={(index) => handleClick(index)} />
      <Status winner={winner} xIsNext={state.xIsNext} />
      <History history={history} jumpTo={jumpTo} />
    </>
  );
}
