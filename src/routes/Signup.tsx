import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

import { useForm } from 'react-hook-form';
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';

import { api } from '../helpers/api';
import { Toast } from '../components/Toast';

const SignupSchema = Yup.object().shape({
  nickname: Yup.string()
    .min(0, 'Too Short!')
    .max(50, 'Too Long!')
    .required('Required'),

  email: Yup.string().email('Invalid email').required('Required'),
  password: Yup.string().min(6, 'Too Short!').required('Required'),

  confirmPassword: Yup.string()
    .oneOf([Yup.ref('password')], 'Passwords does not match')
    .required('Required'),
});
// end of SignupSchema

function Signup(): React.ReactElement {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(SignupSchema),
    defaultValues: {
      nickname: '',
      email: '',
      password: '',
      confirmPassword: '',
    },
  });

  const onSubmitHandler = (data: any) => {
    console.log({ data });
    // console.log(watch('email'));
    const sendData = {
      email: data.email,
      password: data.password,
      nickname: data.nickname,
    };

    api.signup(sendData).then((res: any) => {
      if (!res?.status) {
        Toast.fire({
          icon: 'warning',
          title: '請重新操作',
        });
      }
      // end of !res?.status

      if (res?.status) {
        Toast.fire({
          icon: 'success',
          title: '註冊成功',
          didClose: () => {
            setTimeout(() => {
              navigate('/login');
            }, 400);
          },
        });
      }
      // end of res?.status

      reset();
    });
    // // end of api
  };

  return (
    <form
      className="text-center"
      id="swal-target"
      onSubmit={handleSubmit(onSubmitHandler)}
    >
      <h2 className="mb-6 text-2xl font-bold">註冊帳號</h2>

      <div className="mb-4 text-left">
        <label htmlFor="email" className="text-sm font-bold">
          <p className="mb-1">Email</p>

          <input
            type="email"
            placeholder="請輸入 Email"
            className="w-full rounded-[10px] px-4 py-3 font-medium placeholder:text-light"
            {...register('email')}
            required
          />
        </label>

        <p>{errors.email?.message}</p>
      </div>

      <div className="mb-4 text-left">
        <label htmlFor="nickname" className="text-sm font-bold">
          <p className="mb-1">您的暱稱</p>

          <input
            type="text"
            placeholder="請輸入暱稱"
            className="w-full rounded-[10px] px-4 py-3 font-medium placeholder:text-light"
            {...register('nickname')}
            required
          />
        </label>

        <p>{errors.nickname?.message}</p>
      </div>

      <div className="mb-4 text-left">
        <label htmlFor="password" className="text-sm font-bold">
          <p className="mb-1">密碼</p>

          <input
            type="password"
            placeholder="請輸入密碼"
            className="w-full rounded-[10px] px-4 py-3 font-medium placeholder:text-light"
            {...register('password')}
            required
          />
        </label>

        <p>{errors.password?.message}</p>
      </div>

      <div className="mb-3 text-left">
        <label htmlFor="confirm-password" className="text-sm font-bold">
          <p className="mb-1">再次輸入密碼</p>

          <input
            type="password"
            placeholder="請再次輸入密碼"
            className="w-full rounded-[10px] px-4 py-3 font-medium placeholder:text-light"
            {...register('confirmPassword')}
            required
          />
        </label>

        <p>{errors.confirmPassword?.message}</p>
      </div>

      <button
        type="submit"
        className={`mb-6 rounded-[10px] px-12 py-3 font-bold text-white ${
          !errors.confirmPassword?.message &&
          watch('nickname') &&
          watch('email') &&
          watch('password') &&
          watch('confirmPassword')
            ? 'cursor-pointer bg-dark'
            : 'cursor-not-allowed bg-light'
        }`}
      >
        註冊帳號
      </button>

      <Link to="/login" className="block font-bold">
        登入
      </Link>
    </form>
  );
}

export default Signup;
