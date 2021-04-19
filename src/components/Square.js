import { useState } from 'react';

const Square = ({ value }) => {
  const [testValue, setTestValue] = useState(null);

  const onFieldClick = () => {
    setTestValue('X');
  };

  return (
    <button className='square' onClick={onFieldClick}>
      {testValue}
    </button>
  );
};

export default Square;
