# Front-end Setup

## React router

React Router is a library for handling routing and navigation in React JS Applications. It allows you to create dynamic routes providing a seamless user experience by mapping various URLs to components. It enables navigation in single-page application (SPA) without refreshing the entire page.

## setup

### 👉️ Open up your terminal and bootstrap a new React app with Vite:

npm

```sh
npm create vite@latest
cd <your new project directory>
npm install react-router-dom
npm run dev
```

yarn

```sh
yarn create vite
cd <your new project directory>
yarn add react-router-dom
yarn start
```

Learn more about [vite](https://vite.dev/guide/) and [react-router](https://reactrouter.com/6.28.0/start/tutorial)

## React Query

React Query is a powerful library developed by TanStack that simplifies data fetching and state management in React applications.
It offers a set of hooks and utilities that enable you to manage data from various sources, including REST APIs, GraphQL, or even local state, effortlessly

## setup

npm

```sh
npm install @tanstack/react-query
```

yarn

```sh
yarn add react-query
```

After the library is installed in our application, create a provider and client to use React Query. You can create it in the main.tsx file

```sh
const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
const queryClient = new QueryClient();
root.render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <App />
    </QueryClientProvider>
  </StrictMode>
);
```

Learn more about [react-query](https://tanstack.com/query/latest/docs/framework/react/overview)

## Zustand setup

Zustand is a small and fast state-management library for React. With Zustand, you can create and update states globally that can be easily shared between different parts of your app. It's like having a central hub for your app's information, making it simple to organize and access data from anywhere in your application.

## Installation

```sh
yarn add zustand
```

This adds Zustand to your project dependencies.

## Creating the store

Purpose : The store is where you define your application's state and the actions to modify it.

- Creating a new file [store.ts]

store.ts

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

## Creating a Counter Component

Purpose: This component interacts with the Zustand store to display and update the state.

- Creating a new file [Counter.tsx]

```sh
import useStore from '../app/store';

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

## Add the Component to App

- Purpose: Integrate the Counter component into the application.

In [app.tsx]

```sh
{
    path: '/instructor',
    element: (
      <>
        <Counter />
      </>
    ),
  },
```

- Adding a route for the Counter component.

## NextUI

NextUI is a UI library for React that helps you build beautiful and accessible user interfaces.

## Global Installation

The easiest way to get started with NextUI is to use the global installation, which means that all the components are imported from a single package.

Follow the steps below to install all NextUI components:
npm

```sh
npm install @nextui-org/react framer-motion
```

yarn

```sh
yarn add @nextui-org/react framer-motion
```

## Tailwind CSS Setup

NextUI is built on top of Tailwind CSS, so you need to install Tailwind CSS first. You can follow the official [installation-guide](https://tailwindcss.com/docs/installation) to install Tailwind CSS.

Then you need to add the following code to your tailwind.config.js file:

```sh
// tailwind.config.js
const {nextui} = require("@nextui-org/react");

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    // ...
    // make sure it's pointing to the ROOT node_module
    "../../node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  darkMode: "class",
  plugins: [nextui()],
};
```

## Provider Setup

It is essential to add the NextUIProvider at the root of your application.

```sh
import * as React from "react";

// 1. import `NextUIProvider` component
import {NextUIProvider} from "@nextui-org/react";

function App() {
  // 2. Wrap NextUIProvider at the root of your app
  return (
    <NextUIProvider>
        <App />
    </NextUIProvider>
  );
}
```
