import useStore from '../app/store';

const Counter = () => {
  const { count, increment, decrement } = useStore();

  return (
    <div>
      <h1 className="bg-slate-400">Counter: {count}</h1>
      <button onClick={increment}>Increase</button>
      <button onClick={decrement}>Decrease</button>
    </div>
  );
};

export default Counter;
