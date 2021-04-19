import Board from './components/Board';

const Game = () => {
  return (
    <div className='game'>
      <div className='game-board'>
        <Board />
      </div>

      <div className='game-info'>
        <h2>Info</h2>
      </div>
    </div>
  );
};

export default Game;
