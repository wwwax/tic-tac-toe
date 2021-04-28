import { useState } from 'react';
import Board from './Board';
import calculateWinner from '../functions/calculateWinner';

const Game = () => {
  const [history, setHistory] = useState([{ squares: Array(9).fill(null) }]);
  const [xIsNext, setXisNext] = useState(true);

  const current = history[history.length - 1];
  const winner = calculateWinner(current.squares);
  let status;

  if (winner) {
    status = `Winner is ${winner}`;
  } else {
    status = `Next player is ${xIsNext ? 'X' : 'O'}`;
  }

  const handleClick = (i) => {
    const current = history[history.length - 1];
    const squares = current.squares.slice();

    if (calculateWinner(squares) || squares[i]) {
      return;
    }

    squares[i] = xIsNext ? 'X' : 'O';

    setHistory((prev) => prev.concat([{ squares: squares }]));
    setXisNext((prev) => !prev);
  };

  const moves = history.map((step, move) => {
    const desc = move ? `К ходу #${move}` : 'К началу игры';

    return (
      <li key={move}>
        <button onClick={() => null}>{desc}</button>
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
