import React from 'react';
import useStore from './store';

const Counter = () => {
  const { count, increment, decrement } = useStore();

  return (
    <div>
      <h1>Counter: {count}</h1>
      <button onClick={increment}>Increase</button>
      <button onClick={decrement}>Decrease</button>
    </div>
  );
};

export default Counter;
