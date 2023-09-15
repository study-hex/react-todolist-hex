import axios, { AxiosResponse } from 'axios';

import { Toast } from '../components/Toast';

const req = axios.create({
  baseURL: 'https://todolist-api.hexschool.io',
});

const handleError = (err: any) => {
  let msg = '請重新操作 > <;';
  console.log('err:::', err);

  if (err?.request) {
    msg = err.request;
  }

  if (
    err?.response?.status === 400 ||
    err?.response?.status === 401 ||
    err?.response?.status === 404
  ) {
    msg = err.response.data.message;
  }

  Toast.fire({
    icon: 'warning',
    title: msg,
  });
};
// end of handleError

const signup = async (data: object): Promise<any> => {
  try {
    const res: AxiosResponse = await req.post('/users/sign_up', data);

    return res?.data;
  } catch (error: unknown) {
    handleError(error);
  }
};

const login = async (data: object): Promise<any> => {
  try {
    const res: AxiosResponse = await req.post('/users/sign_in', data);

    return res?.data;
  } catch (error: unknown) {
    handleError(error);
  }
};

const check = async (cookieValue: string): Promise<any> => {
  try {
    req.defaults.headers.common['Authorization'] = cookieValue;

    const res: AxiosResponse = await req.get('/users/checkout');

    return res?.data;
  } catch (error: any) {
    handleError(error);
  }
};

const logout = async (): Promise<any> => {
  try {
    const res: AxiosResponse = await req.post('/users/sign_out');

    return res?.data;
  } catch (error: unknown) {
    handleError(error);
  }
};

const getTodo = async (): Promise<any> => {
  try {
    const res: AxiosResponse = await req.get('/todos');

    return res?.data;
  } catch (error: unknown) {
    handleError(error);
  }
};

const postTodo = async (data: object): Promise<any> => {
  try {
    const res: AxiosResponse = await req.post('/todos', data);

    return res?.data;
  } catch (error: unknown) {
    handleError(error);
  }
};

const deleteTodo = async (todoId: string): Promise<any> => {
  try {
    const res: AxiosResponse = await req.delete(`/todos/${todoId}`);

    return res?.data;
  } catch (error: unknown) {
    handleError(error);
  }
};

const patchTodo = async (todoId: string): Promise<any> => {
  try {
    const res: AxiosResponse = await req.patch(`/todos/${todoId}/toggle`);

    return res?.data;
  } catch (error: unknown) {
    handleError(error);
  }
};

const putTodo = async (todoId: string, data: object): Promise<any> => {
  try {
    const res: AxiosResponse = await req.put(`/todos/${todoId}`, data);

    return res?.data;
  } catch (error: unknown) {
    handleError(error);
  }
};

export const api = {
  req,
  handleError,
  signup,
  login,
  check,
  logout,
  getTodo,
  postTodo,
  deleteTodo,
  patchTodo,
  putTodo,
};
