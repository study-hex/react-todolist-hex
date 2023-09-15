import React, { useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';

import { useAuth } from '../contexts/AuthContext';
import { api } from '../helpers/api';
import { Toast } from '../components/Toast';

import Logo from '../components/Logo';

import ImgHero from '../images/hero.webp';

function PublicLayout(): React.ReactElement {
  const { token } = useAuth();
  const navigate = useNavigate();

  const bgPosition = 'bg-center';

  useEffect(() => {
    if (token) {
      api.check(token).then((res: any) => {
        if (res?.status) {
          Toast.fire({
            icon: 'success',
            title: '登入成功',
            didClose: () => {
              setTimeout(() => {
                navigate('/todo');
              }, 100);
            },
          });
        }
        // end of res?.status

        // if (!res?.status) {
        //   return;
        //   // Toast.fire({
        //   //   icon: 'warning',
        //   //   title: '請重新操作',
        //   // });
        // }
        // // end of !res?.status
      });
      // end of api
    }
  }, []);

  return (
    <div className="container mx-auto min-h-screen p-8 sm:flex sm:flex-wrap sm:items-center sm:justify-between lg:grid lg:grid-cols-12 lg:gap-[103px] xl:gap-[120px]">
      <header className="py-4 sm:w-full md:mx-auto md:w-[47%] lg:col-span-5 lg:col-start-2 lg:w-full">
        <div className="mb-4">
          <Logo bgPosition={bgPosition} />
        </div>

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

export default PublicLayout;
