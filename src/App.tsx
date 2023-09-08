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
    <div className="container mx-auto min-h-screen px-8 py-12 sm:flex sm:flex-wrap sm:items-center sm:justify-between lg:grid lg:grid-cols-12 lg:gap-[103px] xl:gap-[120px]">
      <header className="sm:w-full md:mx-auto md:w-[47%] lg:col-span-5 lg:col-start-2 lg:w-full">
        <Link
          to="/signup"
          className="leading-[3rem] hover:opacity-80"
          title="TODOLIST"
        >
          <h1 className="mb-4 w-full overflow-hidden whitespace-nowrap bg-logo bg-[length:316px_46.9px] bg-center bg-no-repeat indent-[101%]">
            ONLINE TODO LIST
          </h1>
        </Link>

        <figure className="hidden w-full lg:inline-block">
          <img
            src={ImgHero}
            alt="hero"
            className="mx-auto object-cover lg:block lg:aspect-square"
          />
        </figure>
      </header>

      <main className="sm:w-full md:mx-auto md:w-3/5 lg:col-span-4 lg:w-full">
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
