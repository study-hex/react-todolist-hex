import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';

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

function Signup(): React.ReactElement {
  const navigate = useNavigate();

  return (
    <Formik
      initialValues={{
        nickname: '',
        email: '',
        password: '',
        confirmPassword: '',
      }}
      validationSchema={SignupSchema}
      onSubmit={(values, { resetForm }) => {
        // setTimeout(() => {
        //   alert(JSON.stringify(values, null, 2));
        // }, 400);

        const data = {
          email: values.email,
          password: values.password,
          nickname: values.nickname,
        };

        api.signup(data).then((res: any) => {
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

          resetForm();
        });
        // end of api
      }}
    >
      {({ errors, touched, isValid, dirty }) => (
        <Form className="text-center" id="swal-target">
          <h2 className="mb-6 text-2xl font-bold">註冊帳號</h2>

          <div className="mb-4 text-left">
            <label htmlFor="email" className="text-sm font-bold">
              <p className="mb-1">Email</p>

              <Field
                type="email"
                name="email"
                placeholder="請輸入 Email"
                className="w-full rounded-[10px] px-4 py-3 font-medium placeholder:text-light"
              />
            </label>

            {errors.email && touched.email ? <div>{errors.email}</div> : null}
          </div>

          <div className="mb-4 text-left">
            <label htmlFor="nickname" className="text-sm font-bold">
              <p className="mb-1">您的暱稱</p>

              <Field
                type="text"
                name="nickname"
                className="w-full rounded-[10px] px-4 py-3 font-medium placeholder:text-light"
              />

              {!!errors.nickname && (
                <p className="text-error">{errors.nickname}</p>
              )}
            </label>
          </div>

          <div className="mb-4 text-left">
            <label htmlFor="password" className="text-sm font-bold">
              <p className="mb-1">密碼</p>

              <Field
                type="password"
                name="password"
                className="w-full rounded-[10px] px-4 py-3 font-medium placeholder:text-light"
              />

              {!!errors.password && (
                <p className="text-error">{errors.password}</p>
              )}
            </label>
            {errors.password && touched.password && errors.password}
          </div>

          <div className="mb-3 text-left">
            <label htmlFor="confirm-password" className="text-sm font-bold">
              <p className="mb-1">再次輸入密碼</p>

              <Field
                type="password"
                name="confirmPassword"
                className="w-full rounded-[10px] px-4 py-3 font-medium placeholder:text-light"
              />

              {!!errors.confirmPassword && (
                <p className="text-error">{errors.confirmPassword}</p>
              )}
            </label>
          </div>

          <button
            type="submit"
            className={`mb-6 rounded-[10px] px-12 py-3 font-bold text-[#fff] ${
              isValid && dirty
                ? 'cursor-pointer bg-dark'
                : 'cursor-not-allowed bg-light'
            }`}
          >
            註冊帳號
          </button>

          <Link to="/login" className="block font-bold">
            登入
          </Link>
        </Form>
      )}
    </Formik>
  );
}

export default Signup;
