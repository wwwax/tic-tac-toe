import { useState } from 'react';
import Board from './Board';
import calculateWinner from '../functions/calculateWinner';

const Game = () => {
  const [state, setState] = useState({
    history: [{ squares: Array(9).fill(null) }],
    xIsNext: true,
    stepNumber: 0,
  });

  const current = state.history[state.stepNumber];
  const winner = calculateWinner(current.squares);
  let status;

  if (winner) {
    status = `Winner is ${winner}`;
  } else {
    status = `Next player is ${state.xIsNext ? 'X' : 'O'}`;
  }

  const handleClick = (i) => {
    const history = state.history.slice(0, state.stepNumber + 1);
    const current = state.history[state.history.length - 1];
    const squares = current.squares.slice();

    if (calculateWinner(squares) || squares[i]) {
      return;
    }

    squares[i] = state.xIsNext ? 'X' : 'O';

    setState((prev) => ({
      ...prev,
      xIsNext: !prev.xIsNext,
      stepNumber: history.length,
      history: prev.history.concat([{ squares: squares }]),
    }));
  };

  const jumpTo = (step) => {
    setState((prev) => ({ ...prev, stepNumber: step, xIsNext: !prev.xIsNext }));
  };

  const moves = state.history.map((step, move) => {
    const desc = move ? `К ходу #${move}` : 'К началу игры';

    return (
      <li key={move}>
        <button onClick={() => jumpTo(move)}>{desc}</button>
      </li>
    );
  });

  return (
    <div className='game'>
      <div className='game-board'>
        <Board squares={current.squares} onClick={(i) => handleClick(i)} />
      </div>

      <div className='game-info'>
        <div className='status'>{status}</div>
        <ol>{moves}</ol>
      </div>
    </div>
  );
};

export default Game;
