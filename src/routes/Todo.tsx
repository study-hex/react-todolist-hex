import React, { useState } from 'react';

import Logo from '../components/Logo';

function Todo(): React.ReactElement {
  // const [count, setCount] = useState<number>(0);

  return (
    <div className="min-h-screen md:bg-linear">
      <div className="container mx-auto px-8 pb-8">
        <header className="flex items-center justify-between gap-10 py-4">
          <div className="w-4/5">
            <Logo bgPosition={'bg-start'} />
          </div>

          <button type="button" className="text-sm">
            登出
          </button>
        </header>

        <div className="mx-auto mb-4 flex max-w-[500px] items-center justify-between rounded-lg bg-white py-1 pl-4 pr-1 shadow">
          <input
            type="text"
            name="content"
            id="inputAddToto"
            placeholder="新增待辦事項"
            className="w-[83%] font-medium text-dark placeholder:text-light"
          />

          <button
            type="button"
            className="transition-border relative h-10 w-10 rounded-[10px] bg-dark duration-100 hover:border-light disabled:bg-light"
            disabled
          >
            <p className="sr-only">ADD</p>
            <span
              className="absolute left-[45%] top-[20%] h-[60%] w-[12%] rounded-[10px] bg-white"
              aria-hidden="true"
            ></span>
            <span
              className="absolute left-[45%] top-[20%] h-[60%] w-[12%] rotate-90 transform rounded-[10px] bg-white"
              aria-hidden="true"
            ></span>
          </button>
        </div>

        <main className="mx-auto flex min-h-[calc(100vh_-_170px)] max-w-[500px] flex-col rounded-[10px] bg-white text-sm">
          <header>
            <ul className="flex items-center justify-between text-center font-bold">
              <li className="w-1/3">
                <button
                  type="button"
                  className="w-full border-b-[1px] border-dark py-4"
                >
                  全部
                </button>
              </li>
              <li className="w-1/3">
                <button type="button" className="w-full py-4 text-light">
                  待完成
                </button>
              </li>
              <li className="w-1/3">
                <button type="button" className="w-full py-4 text-light">
                  已完成
                </button>
              </li>
            </ul>
          </header>

          <div className="-mt-[1px] flex-1 border-t-[1px] pt-6">
            <ul>
              <li className="px-4">
                <div className="flex items-center gap-4 border-b-[1px] pb-4">
                  <label htmlFor="todoStatus">
                    <input
                      type="checkbox"
                      name="checkbox"
                      id="todoStatus"
                      aria-label="STATUS"
                      value="yes"
                      className="absolute h-5 w-5 opacity-0"
                    />

                    <div className="flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-md border-2 border-primary bg-white">
                      <svg
                        className="pointer-events-none hidden h-[18px] w-[18px] fill-current text-primary"
                        xmlns="http://www.w3.org/2000/svg"
                        width="18"
                        height="18"
                        viewBox="0 0 18 18"
                        fill="none"
                      >
                        <g clipPath="url(#clip0_6_706)">
                          <path
                            d="M17.5817 2.94198C17.0248 2.38432 16.1204 2.38467 15.5628 2.94198L6.47614 12.029L2.43751 7.99039C1.87985 7.43272 0.975883 7.43272 0.418218 7.99039C-0.139447 8.54805 -0.139447 9.45202 0.418218 10.0097L5.46628 15.0577C5.74493 15.3364 6.11032 15.4761 6.47575 15.4761C6.84117 15.4761 7.20691 15.3367 7.48557 15.0577L17.5817 4.96124C18.1394 4.40396 18.1394 3.49961 17.5817 2.94198Z"
                            fill="#FFD370"
                          />
                        </g>
                        <defs>
                          <clipPath id="clip0_6_706">
                            <rect width="18" height="18" fill="white" />
                          </clipPath>
                        </defs>
                      </svg>
                    </div>
                    {/* end of custom checkbox */}
                  </label>

                  <input
                    type="text"
                    name="content"
                    id="todoContent"
                    aria-label="CONTENT"
                    className="flex-1"
                    value={'123'}
                  />

                  <button type="button">&times;</button>
                </div>
              </li>
            </ul>
          </div>

          <footer className="flex items-center justify-between p-4">
            <button type="button">
              <span className="mr-[7px]">5</span>
              個待完成項目
            </button>

            <button type="button" className="text-light">
              清除已完成項目
            </button>
          </footer>
        </main>
      </div>
    </div>
  );
}

export default Todo;
