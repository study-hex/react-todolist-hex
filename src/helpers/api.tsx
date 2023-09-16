import axios from 'axios';

import { Toast } from '../components/Toast';

const req = axios.create({
  baseURL: 'https://todolist-api.hexschool.io',
});

req.interceptors.response.use(
  function (response) {
    // within the range of 2xx

    return response?.data;
  },
  function (error) {
    // outside the range of 2xx
    let msg = '請重新操作 > <;';

    if (
      error?.response?.status === 400 ||
      error?.response?.status === 401 ||
      error?.response?.status === 404
    ) {
      msg = error.response.data.message;
    }

    Toast.fire({
      icon: 'warning',
      title: msg,
    });

    return Promise.reject(error);
  },
);
// end of interceptors

const clientReq = async (
  method: 'get' | 'post' | 'put' | 'patch' | 'delete',
  url: string,
  data?: object,
): Promise<any> => {
  return await req
    .request({
      method,
      url,
      data,
    })
    .catch((error: unknown) => console.log(error));
};
// end of clientReq

const signup = async (data: object): Promise<any> => {
  return await clientReq('post', '/users/sign_up', data);
};

const login = async (data: object): Promise<any> => {
  return await clientReq('post', '/users/sign_in', data);
};

const check = async (cookieValue: string): Promise<any> => {
  req.defaults.headers.common['Authorization'] = cookieValue;

  return await clientReq('get', '/users/checkout');
};

const logout = async (): Promise<any> => {
  return await clientReq('post', '/users/sign_out');
};

const getTodo = async (): Promise<any> => {
  return await clientReq('get', '/todos');
};

const postTodo = async (data: object): Promise<any> => {
  return await clientReq('post', '/todos', data);
};

const deleteTodo = async (todoId: string): Promise<any> => {
  return await clientReq('delete', `/todos/${todoId}`);
};

const patchTodo = async (todoId: string): Promise<any> => {
  return await clientReq('patch', `/todos/${todoId}/toggle`);
};

const putTodo = async (todoId: string, data: object): Promise<any> => {
  return await clientReq('put', `/todos/${todoId}`, data);
};

export const api = {
  req,
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
