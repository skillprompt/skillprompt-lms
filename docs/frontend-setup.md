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
