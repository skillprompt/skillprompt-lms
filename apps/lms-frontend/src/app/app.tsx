import { Course } from './Course';
import { Home } from './Home';
import NxWelcome from './nx-welcome';
import { Link, Route, Routes } from 'react-router';
import { Button, NextUIProvider } from '@nextui-org/react';
import Counter from './counter';
import {
  Link,
  createBrowserRouter,
  RouterProvider,
  NavLink,
} from 'react-router-dom';
export function App() {
  const router = createBrowserRouter([
    {
      path: '/',
      element: <Home />,
    },
    {
      path: '/page-2',
      element: <Course />,
    },
  ]);
  return (
    <div>
      <NxWelcome title="lms-frontend" />

      {/* START: routes */}
      <br />
      <hr />
      <br />
      <div role="navigation">
        <ul>
          <li>
            <NavLink to="/">Home</NavLink>
          </li>
          <li>
            <NavLink to="/page-2">Page 2</NavLink>
          </li>
          <li>
            <Link to="/counter">Counter</Link>{' '}
          </li>
        </ul>
      </div>
      <Routes>
        <Route
          path="/"
          element={
            <div>
              This is the generated root route.{' '}
              <Link to="/page-2">Click here for page 2.</Link>
            </div>
          }
        />
        <Route
          path="/page-2"
          element={
            <div>
              <Link to="/">Click here to go back to root page.</Link>
            </div>
          }
        />
        <Route path="/counter" element={<Counter />} />{' '}
      </Routes>
      <NextUIProvider>
        <div>
          <Button color="primary">Click Me</Button>
        </div>
      </NextUIProvider>
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
