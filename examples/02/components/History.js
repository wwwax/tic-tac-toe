export default function History({ history, jumpTo }) {
  return (
    <ol className='history_list'>
      {history.map((step, move) => (
        <li className='history_item' key={move}>
          <button
            className='history_button'
            onClick={() => jumpTo(move)}>{`move #${move}`}</button>
        </li>
      ))}
    </ol>
  );
}
