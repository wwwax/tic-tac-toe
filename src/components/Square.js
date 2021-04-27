const Square = ({ value, onClick }) => {
  return (
    <button className='square' onClick={onClick}>
      {value}
    </button>
  );
};

export default Square;

// function example(squares) {
//   const lines = [
//     [0, 1, 2],
//     [3, 4, 5],
//     [6, 7, 8],
//     [0, 3, 6],
//     [1, 4, 7],
//     [2, 5, 8],
//     [0, 4, 8],
//     [2, 4, 6],
//   ];

//   for (let i = 0; i < lines.length; i++) {
//     const [a, b, c] = lines[i];

//     if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
//       return squares[a];
//     }
//   }

//   return null;
// }

/**
 *
 */

// handleClick(i) {
//   const squares = this.state.squares.slice();
//   if (calculateWinner(squares) || squares[i]) {
//     return;
//   }
//   squares[i] = this.state.xIsNext ? 'X' : 'O';
//   this.setState({
//     squares: squares,
//     xIsNext: !this.state.xIsNext,
//   });
// }
