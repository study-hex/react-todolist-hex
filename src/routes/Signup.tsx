import React from 'react';
import { Link } from 'react-router-dom';

function Signup(): React.ReactElement {
  return (
    <form action="#" className="text-center">
      <h2 className="mb-6 text-2xl font-bold">註冊帳號</h2>

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
        <label htmlFor="nickname" className="text-sm font-bold">
          <p className="mb-1">您的暱稱</p>

          <input
            type="text"
            name="nickname"
            id="nickname"
            aria-label="nickname"
            className="w-full rounded-[10px] px-4 py-3 font-medium placeholder:text-light"
            placeholder="請輸入暱稱"
            required
          />
        </label>
      </div>

      <div className="mb-4 text-left">
        <label htmlFor="password" className="text-sm font-bold">
          <p className="mb-1">密碼</p>

          <input
            type="password"
            name="password"
            id="password"
            aria-label="password"
            placeholder="請輸入密碼"
            className="w-full rounded-[10px] px-4 py-3 font-medium placeholder:text-light"
            required
          />
        </label>
      </div>

      <div className="mb-3 text-left">
        <label htmlFor="confirm-password" className="text-sm font-bold">
          <p className="mb-1">再次輸入密碼</p>

          <input
            type="confirm-password"
            name="confirm-password"
            id="confirm-password"
            aria-label="confirm-password"
            placeholder="請再次輸入密碼"
            className="w-full rounded-[10px] px-4 py-3 font-medium placeholder:text-light"
            required
          />
        </label>
      </div>

      <button
        type="submit"
        className="mb-6 rounded-[10px] bg-dark px-12 py-3 font-bold text-[#fff]"
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
