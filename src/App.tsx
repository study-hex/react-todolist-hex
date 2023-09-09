import React from 'react';
import { createHashRouter, RouterProvider, Navigate } from 'react-router-dom';

import { AuthProvider } from './contexts/AuthContext';

import Signup from './routes/Signup';
import Login from './routes/Login';
import Todo from './routes/Todo';
import NotFound from './routes/NotFound';

import PublicLayout from './routes/PublicLayout';
import ProtectedRoute from './routes/ProtectedRoute';

function App(): React.ReactElement {
  const router = createHashRouter([
    {
      path: '/',
      element: <PublicLayout />,
      children: [
        {
          index: true,
          element: <Navigate to="signup" />,
        },
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
      element: (
        <ProtectedRoute>
          <Todo />
        </ProtectedRoute>
      ),
    },
    {
      path: '/*',
      element: <NotFound />,
    },
  ]);

  return (
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  );
}

export default App;
