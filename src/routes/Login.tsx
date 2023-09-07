import React from 'react';
import { Link } from 'react-router-dom';

function Login(): React.ReactElement {
  return (
    <form action="#" className="text-center">
      <h2 className="mb-6 text-2xl font-bold">最實用的線上待辦事項服務</h2>

      <div className="mb-4 text-left">
        <label htmlFor="email" className="text-sm font-bold">
          <p className="mb-1">Email</p>

          <input
            type="email"
            name="email"
            id="email"
            aria-label="Email"
            className="w-full rounded-[10px] px-4 py-3 font-medium placeholder:text-light"
            placeholder="請輸入 Email"
            required
          />
        </label>
      </div>

      <div className="mb-4 text-left">
        <label htmlFor="password" className="text-sm font-bold">
          <p className="mb-1">Password</p>

          <input
            type="password"
            name="password"
            id="password"
            aria-label="nickname"
            placeholder="請輸入密碼"
            className="w-full rounded-[10px] px-4 py-3 font-medium placeholder:text-light"
            required
          />
        </label>
      </div>

      <button
        type="submit"
        className="mb-6 rounded-[10px] bg-dark px-12 py-3 font-bold text-[#fff]"
      >
        登入
      </button>

      <Link to="/signup" className="block font-bold">
        註冊帳號
      </Link>
    </form>
  );
}

export default Login;
