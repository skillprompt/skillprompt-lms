import React from 'react';
import useStore from './store'; 

const Counter: React.FC = () => {
  const { count, increment, decrement } = useStore();

  return (
    <div style={{ textAlign: 'center', marginTop: '20px' }}>
      <h1>Count: {count}</h1>
      <button onClick={increment} style={{ marginRight: '10px' }}>
        Increase
      </button>
      <button onClick={decrement}>Decrease</button>
    </div>
  );
};

export default Counter;
