import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';

import { useAuth } from '../contexts/AuthContext';
import { api } from '../helpers/api';
import { Toast } from '../components/Toast';

const LoginSchema = Yup.object().shape({
  email: Yup.string().email('Invalid email').required('Required'),
  password: Yup.string().min(6, 'Too Short!').required('Required'),
});

function Login(): React.ReactElement {
  const { saveToken } = useAuth();

  const navigate = useNavigate();

  return (
    <Formik
      initialValues={{
        email: '',
        password: '',
      }}
      validationSchema={LoginSchema}
      onSubmit={(values, { resetForm }) => {
        // setTimeout(() => {
        //   alert(JSON.stringify(values, null, 2));
        // }, 400);

        const data = {
          email: values.email,
          password: values.password,
        };

        api.login(data).then((res: any) => {
          if (!res?.status) {
            Toast.fire({
              icon: 'warning',
              title: '請重新操作',
            });
          }
          // end of !res?.status

          if (res?.status) {
            api.req.defaults.headers.common['Authorization'] = res?.token;

            Toast.fire({
              icon: 'success',
              title: '登入成功',
              didClose: () => {
                // saveToken(res?.token, res?.exp);
                saveToken(res?.token);

                setTimeout(() => {
                  navigate('/todo');
                }, 500);
              },
            });
          }
          // end of res?.status

          // resetForm();
        });
        // end of api
      }}
    >
      {({ errors, touched, isValid, dirty }) => (
        <>
          <Form className="text-center" id="swal-target">
            <h2 className="mb-6 text-2xl font-bold">
              最實用的線上待辦事項服務
            </h2>

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

              {errors.email && touched.email ? <p>{errors.email}</p> : null}
            </div>

            <div className="mb-4 text-left">
              <label htmlFor="password" className="text-sm font-bold">
                <p className="mb-1">Password</p>

                <Field
                  type="password"
                  name="password"
                  placeholder="請輸入密碼"
                  className="w-full rounded-[10px] px-4 py-3 font-medium placeholder:text-light"
                />
              </label>

              {!!errors.password && (
                <p className="text-error">{errors.password}</p>
              )}
            </div>

            <button
              type="submit"
              className={`mb-6 rounded-[10px] px-12 py-3 font-bold text-white ${
                isValid && dirty
                  ? 'cursor-pointer bg-dark'
                  : 'cursor-not-allowed bg-light'
              }`}
            >
              登入
            </button>

            <Link to="/signup" className="block font-bold">
              註冊帳號
            </Link>
          </Form>
        </>
      )}
    </Formik>
  );
}

export default Login;
