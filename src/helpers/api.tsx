import axios, { AxiosResponse } from 'axios';

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

const signup = async (data: object): Promise<any> => {
  try {
    const res: AxiosResponse = await req.post('/users/sign_up', data);
    if (res?.status !== 201) {
      throw new Error();
    }

    return res?.data;
  } catch (error: unknown) {
    handleError(error);
  }
};

const login = async (data: object): Promise<any> => {
  try {
    const res: AxiosResponse = await req.post('/users/sign_in', data);
    if (res?.status !== 200) {
      throw new Error();
    }

    return res?.data;
  } catch (error: unknown) {
    handleError(error);
  }
};

const check = async (cookieValue: string): Promise<any> => {
  try {
    // if (cookieValue) {
    //   req.defaults.headers.common['Authorization'] = cookieValue;
    // }

    const res: AxiosResponse = await req.get('/users/checkout');
    if (res?.status !== 200) {
      throw new Error();
    }

    return res?.data;
  } catch (error: any) {
    if (error?.status === 400) {
      return;
    }

    handleError(error);
  }
};

const logout = async (): Promise<any> => {
  try {
    const res: AxiosResponse = await req.post('/users/sign_out');
    if (res?.status !== 200) {
      throw new Error();
    }

    return res?.data;
  } catch (error: unknown) {
    handleError(error);
  }
};

    return res?.data;
  } catch (error: unknown) {
    handleError(error);
  }
};

export const api = { req, signup, login, check, logout };
