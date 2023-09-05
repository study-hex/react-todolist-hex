import React from 'react';
import {
  createHashRouter,
  RouterProvider,
  Link,
  Outlet,
} from 'react-router-dom';

import Login from './routes/Login';
import Signup from './routes/Signup';
import Todo from './routes/Todo';
import NotFound from './routes/NotFound';

function PublicLayout() {
  return (
    <div>
      <h1>RouterProvider</h1>

      <ul>
        <li>
          <Link to="/">Public Page</Link>
        </li>
        <li>
          <Link to="/login">LOGIN Page</Link>
        </li>
        <li>
          <Link to="/signup">SIGNUP Page</Link>
        </li>
        <li>
          <Link to="/todo">Protected Page</Link>
        </li>
      </ul>

      <Outlet />
    </div>
  );
}

function App(): React.ReactElement {
  const router = createHashRouter([
    {
      path: '/',
      element: <PublicLayout />,
      children: [
        {
          path: 'signup',
          element: <Signup />,
        },
        {
          path: 'login',
          element: <Login />,
        },
      ],
    },
    {
      path: '/todo',
      element: <Todo />,
    },
    {
      path: '/*',
      element: <NotFound />,
    },
  ]);

  return <RouterProvider router={router} />;
}

export default App;
