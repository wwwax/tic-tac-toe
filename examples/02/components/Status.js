export default function Status({ winner, xIsNext }) {
  let text;

  if (winner) {
    text = `Winner: ${winner}`;
  } else {
    text = `Next: ${xIsNext ? 'X' : 'O'}`;
  }

  return <h3 className='status  '>{text}</h3>;
}
