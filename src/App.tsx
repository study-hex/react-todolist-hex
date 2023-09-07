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

import ImgHero from './images/hero.webp';

function PublicLayout() {
  return (
    <div className="container min-h-screen px-8 py-12 md:grid md:grid-cols-12 md:items-center md:gap-[103px]">
      <header className="md:col-span-5 md:col-start-2">
        <Link
          to="/signup"
          className="leading-[3rem] hover:opacity-80"
          title="TODOLIST"
        >
          <h1 className="mb-4 w-full overflow-hidden whitespace-nowrap bg-logo bg-[length:316px_46.9px] bg-center bg-no-repeat indent-[101%]">
            ONLINE TODO LIST
          </h1>
        </Link>

        <figure className="hidden w-full md:inline-block">
          <img
            src={ImgHero}
            alt="hero"
            className="mx-auto object-cover md:block md:aspect-square"
          />
        </figure>
      </header>

      <main className="md:col-span-4">
        <Outlet />
      </main>
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
