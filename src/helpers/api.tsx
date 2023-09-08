import axios from 'axios';

import { Toast } from '../components/Toast';

const req = axios.create({
  baseURL: 'https://todolist-api.hexschool.io',
});

const handleError = ({ err }: any = {}) => {
  let msg = '請重新操作';

  if (err?.response) {
    msg = err.response?.data?.message;
  }

  if (err?.request) {
    msg = err.request;
  }

  Toast.fire({
    icon: 'warning',
    title: msg,
  });
};

const signup = async (data: object) => {
  try {
    const res = await req.post('/users/sign_up', data);
    if (res?.status !== 201) {
      throw Error;
    }

    return res?.data;
  } catch (error) {
    handleError(error);
  }
};

const login = async (data: object) => {
  try {
    const res = await req.post('/users/sign_in', data);
    if (res?.status !== 200) {
      throw Error;
    }

    return res?.data;
  } catch (error) {
    handleError(error);
  }
};

export const api = { signup, login };
