import { Button } from '@nextui-org/react';
import useStore from '../app/store';

const Counter = () => {
  const { count, increment, decrement } = useStore();

  return (
    <>
      <h1 className="bg-slate-400">Counter: {count}</h1>
      {/* <button onClick={increment}>Increase</button> */}
      <Button color="danger" onClick={increment}>
        Increase
      </Button>
      <button onClick={decrement}>Decrease</button>
    </>
  );
};

export default Counter;
