import { useState } from 'react';

export default function App() {
  const [state, setState] = useState(Array(9).fill(null));
  console.log(state);

  const test = () => {
    setState(null);
  };

  return <h1 onClick={test}>hello</h1>;
}
