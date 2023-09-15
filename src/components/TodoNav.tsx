import React from 'react';
import { useNavigate } from 'react-router-dom';

import { api } from '../helpers/api';
import { Toast } from '../components/Toast';

import Logo from './Logo';

function TodoNav(): React.ReactElement {
  const navigate = useNavigate();

  const handleLogout = () => {
    api.logout().then((res: any) => {
      if (res?.status) {
        const msg = res.message || '登出成功';

        api.req.defaults.headers.common['Authorization'] = '';

        Toast.fire({
          icon: 'success',
          title: msg,
          didClose: () => {
            setTimeout(() => {
              navigate('/login');
            }, 400);
          },
        });
      }
      // end of res?.status

      // if (!res?.status) {
      //   Toast.fire({
      //     icon: 'warning',
      //     title: '請重新操作',
      //   });
      // }
      // // end of !res?.status
    });
    // end of api
  };
  // end of handleLogout

  return (
    <nav className="flex items-center justify-between gap-10 py-4">
      <div className="inline-flex w-[160px] items-center md:w-[316px]">
        <Logo bgPosition={'bg-start'} />
      </div>

      <button type="button" className="text-sm" onClick={handleLogout}>
        登出
      </button>
    </nav>
  );
}

// end of TodoNav

export default TodoNav;
