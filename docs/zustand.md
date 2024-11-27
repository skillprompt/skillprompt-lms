# Zustand setup

Zustand is a small and fast state-management library for React.

# Installation

```sh
yarn add zustand
```

This adds Zustand to your project dependencies.

# Creating the store

Purpose : The store is where you define your application's state and the actions to modify it.

- Creating a new file [store.ts] in src directory

```sh
import { create } from 'zustand';

interface CounterState {
  count: number;
  increment: () => void;
  decrement: () => void;
}
const useStore = create<CounterState>((set) => ({
  count: 0,
  increment: () => set((state) => ({ count: state.count + 1 })),
  decrement: () => set((state) => ({ count: state.count - 1 })),
}));
export default useStore;
```

-State (count): Holds the numeric value of the counter.
-Actions (increment, decrement): Functions that update the state.
-set: Zustand's function to update the state.

# Creating a Counter Component

Purpose: This component interacts with the Zustand store to display and update the state.

- Creating a new file [Counter.tsx] in the src directory.

```sh
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
```

- The useStore hook gives access to count (state) and increment/decrement (actions).
- The component renders:
  . The current value of count.
  . Two buttons that trigger increment and decrement actions when clicked.

# Add the Component to App

- Purpose: Integrate the Counter component into the application.

In [app.tsx]

```sh
import Counter from './Counter';
<Route path="/counter" element={<Counter />} />
```

- Adding a route for the Counter component.

# NextUI Setup

NextUI is a modern and customizable React-based UI library designed to help developers create beautiful, fast, and responsive user interfaces effortlessly.

# Installation

```sh
npm install @nextui-org/react framer-motion
```
This install the NextUI to the project.

```sh
const { nextui } = require('@nextui-org/react');
```
This imports the NextUI configuration, which might be used later in your setup for theme customization or plugin integration with TailwindCSS.

```sh
import {NextUIProvider} from "@nextui-org/react";
```
The NextUIProvider is a core component provided by the @nextui-org/react library. Its primary function is to act as a context provider that wraps your application and supplies global theming, styles, and configuration for all NextUI components.
