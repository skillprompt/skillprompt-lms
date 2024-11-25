import { Course } from './Course';
import { Home } from './Home';
import NxWelcome from './nx-welcome';

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
      {/* These routes and navigation have been generated for you */}
      {/* Feel free to move and update them to fit your needs */}
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
        </ul>
      </div>
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
