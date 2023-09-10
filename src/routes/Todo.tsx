import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import { useAuth } from '../contexts/AuthContext';
import { useInput } from '../hooks/useInput';
import { api } from '../helpers/api';
import { Toast } from '../components/Toast';

import TodoAddInput from '../components/TodoAddInput';

import Logo from '../components/Logo';

interface ITodoData {
  content: string;
  createTime: number;
  id: string;
  status: boolean;
}

function Todo(): React.ReactElement {
  const navigate = useNavigate();
  const { token } = useAuth();

  const [todoData, setTodoData] = useState<ITodoData[]>([]);
  const [filterData, setFilterData] = useState<ITodoData[]>([]);
  // const newInputTodo = useInput('');
  const editInputTodo = useInput('');

  const [isEditId, setIsEditId] = useState<string>('');
  const [isClickTab, setIsClickTab] = useState<string>('ALL');
  const [haveTodoLength, setHaveTodoLength] = useState<number>(0);
  const [haveClearLength, setHaveClearLength] = useState<number>(0);

  const handleLogout = () => {
    api.logout().then((res: any) => {
      if (!res?.status) {
        Toast.fire({
          icon: 'warning',
          title: '請重新操作',
        });
      }
      // end of !res?.status

      if (res?.status) {
        const msg = res.message || '登出成功';

        api.req.defaults.headers.common['Authorization'] = '';

        Toast.fire({
          icon: 'success',
          title: msg,
          didClose: () => {
            setTimeout(() => {
              navigate('/login');
            }, 400);
          },
        });
      }
      // end of res?.status
    });
    // end of api
  };
  // end of handleLogout

  const getTodos = () => {
    api.getTodo().then((res: any) => {
      if (res?.status) {
        setTodoData([...res?.data]);
      }
    });
    // end of api
  };
  // end of getTodos()

  const handleAddTodo = (newInput: string) => {
    const data = {
      content: newInput,
      // content: newInputTodo.value.trim(),
    };

    api.postTodo(data).then((res) => {
      if (!res?.status) {
        Toast.fire({
          icon: 'warning',
          title: '請重新操作',
        });
      }
      // end of !res?.status

      if (res?.status) {
        const msg = res.message || '新增成功';

        Toast.fire({
          icon: 'success',
          title: msg,
        });

        // newInputTodo.clear();
        getTodos();
        setIsClickTab('TODO');
      }
      // end of res?.status
    });
    // end of api
  };
  // end of handleAddTodo

  const handleRemoveTodo = (todo: ITodoData) => {
    api.deleteTodo(todo.id).then((res) => {
      if (!res?.status) {
        Toast.fire({
          icon: 'warning',
          title: '請重新操作',
        });
      }
      // end of !res?.status

      if (res?.status) {
        const msg = res.message || '刪除成功';

        Toast.fire({
          icon: 'success',
          title: msg,
        });

        getTodos();
      }
      // end of res?.status
    });
    // end of api
  };
  // end of handleRemoveTodo

  const handleToggleTodo = (todo: ITodoData) => {
    api.patchTodo(todo.id).then((res) => {
      if (!res?.status) {
        Toast.fire({
          icon: 'warning',
          title: '請重新操作',
        });
      }
      // end of !res?.status

      if (res?.status) {
        const msg = res.message || '編輯成功';

        Toast.fire({
          icon: 'success',
          title: msg,
        });

        getTodos();
      }
      // end of res?.status
    });
    // end of api
  };
  // end of handleToggleTodo

  const handleEditTodo = () => {
    const data = {
      content: editInputTodo.value,
    };

    api.putTodo(isEditId, data).then((res) => {
      if (!res?.status) {
        Toast.fire({
          icon: 'warning',
          title: '請重新操作',
        });
      }
      // end of !res?.status

      if (res?.status) {
        const msg = res.message || '編輯成功';

        Toast.fire({
          icon: 'success',
          title: msg,
        });

        getTodos();
      }
      // end of res?.status

      setIsEditId('');
    });
    // end of api
  };
  // end of handleEditTodo

  const handleClearDoneTodo = () => {
    const doneIdList = [...todoData]
      .filter((item) => {
        return item.status;
      })
      .map((todo) => {
        return todo.id;
      });

    // console.log(doneIdList);

    const deletePromises = doneIdList.map((id) => api.deleteTodo(id));

    Promise.all(deletePromises)
      .then((results) => {
        results.forEach((result) => {
          if (!result?.status) {
            throw new Error();
          }
          const msg = result.message || '編輯成功';

          Toast.fire({
            icon: 'success',
            title: msg,
          });
        });
      })
      .catch((error) => {
        console.error('Error:::', error);
      })
      .finally(() => {
        getTodos();
      });
  };
  // end of handleClearDone

  useEffect(() => {
    if (token) {
      api.req.defaults.headers.common['Authorization'] = token;
    }
  }, []);

  useEffect(() => {
    if (!todoData.length) {
      getTodos();
    }
  }, []);

  useEffect(() => {
    setFilterData(
      [...todoData]
        .filter((item) => {
          if (isClickTab === 'ALL') {
            return true;
          }
          if (isClickTab === 'TODO') {
            return !item.status;
          }
          if (isClickTab === 'DONE') {
            return item.status;
          }
        })
        .reverse(),
    );

    setHaveTodoLength(
      [...todoData].filter((item) => {
        return !item.status;
      }).length,
    );

    setHaveClearLength(
      [...todoData].filter((item) => {
        return item.status;
      }).length,
    );
  }, [isClickTab, todoData]);

  return (
    <div className="min-h-screen md:bg-linear">
      <div className="container mx-auto px-8 pb-8">
        <header className="flex items-center justify-between gap-10 py-4">
          <div className="w-4/5">
            <Logo bgPosition={'bg-start'} />
          </div>

          <button type="button" className="text-sm" onClick={handleLogout}>
            登出
          </button>
        </header>

        <TodoAddInput handleAddTodo={handleAddTodo} />

        <main className="mx-auto flex min-h-[calc(100vh_-_170px)] max-w-[500px] flex-col rounded-[10px] bg-white text-sm">
          <header className="z-10">
            <ul className="flex items-center justify-between text-center font-bold">
              <li className="w-1/3">
                <button
                  type="button"
                  className={`w-full border-dark hover:text-dark ${
                    isClickTab === 'ALL'
                      ? 'border-b-2 pb-[14px] pt-4 text-dark'
                      : 'py-4 text-light'
                  } `}
                  onClick={() => setIsClickTab('ALL')}
                >
                  全部
                </button>
              </li>
              <li className="w-1/3">
                <button
                  type="button"
                  className={`w-full border-dark hover:text-dark ${
                    isClickTab === 'TODO'
                      ? 'border-b-2 pb-[14px] pt-4 text-dark'
                      : 'py-4 text-light'
                  } `}
                  onClick={() => setIsClickTab('TODO')}
                >
                  待完成
                </button>
              </li>
              <li className="w-1/3">
                <button
                  type="button"
                  className={`w-full border-dark hover:text-dark ${
                    isClickTab === 'DONE'
                      ? 'border-b-2 pb-[14px] pt-4 text-dark'
                      : 'py-4 text-light'
                  } `}
                  onClick={() => setIsClickTab('DONE')}
                >
                  已完成
                </button>
              </li>
            </ul>
          </header>

          <div className="-mt-[2px] flex-1 border-t-[1px] pt-6">
            <ul className="flex flex-col gap-4">
              {filterData &&
                filterData.map((todo) => {
                  return (
                    <li key={todo.id} className="px-4">
                      <div className="flex items-center gap-4 border-b-[1px] pb-4">
                        <label htmlFor="todoStatus">
                          <input
                            type="checkbox"
                            name="checkbox"
                            id="todoStatus"
                            aria-label="STATUS"
                            className="absolute h-5 w-5 cursor-pointer opacity-0"
                            value={`${todo.status}`}
                            checked={todo.status}
                            onChange={() => handleToggleTodo(todo)}
                          />

                          <div className="custom-check flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-md border-[1px] border-light bg-white">
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

                        {isEditId === todo.id ? (
                          <input
                            type="text"
                            name="content"
                            id="todoContent"
                            aria-label="todoContent"
                            className="relative flex-1 border-b-2 border-primary outline-none"
                            value={editInputTodo.value}
                            onChange={editInputTodo.onChange}
                            onKeyDown={(e) => {
                              if (e.key === 'Enter' || e.key === 'Escape') {
                                handleEditTodo();
                              }
                            }}
                          />
                        ) : (
                          <button
                            type="button"
                            onClick={() => {
                              setIsEditId(todo.id);
                              editInputTodo.setValue(todo.content);
                            }}
                            className="flex-1 text-start"
                          >
                            <span
                              className={`${
                                todo.status && 'text-light line-through'
                              }`}
                            >
                              {todo.content}
                            </span>
                          </button>
                        )}

                        <button
                          type="button"
                          onClick={() => handleRemoveTodo(todo)}
                          className="hover:scale-125"
                        >
                          &times;
                        </button>
                      </div>
                    </li>
                  );
                })}
            </ul>
          </div>

          <footer className="flex items-center justify-between p-4">
            <button type="button" onClick={() => setIsClickTab('TODO')}>
              <span className="mr-[7px]">{haveTodoLength}</span>
              個待完成項目
            </button>

            <button
              type="button"
              className={`text-light transition duration-150 ease-linear ${
                !haveClearLength ? 'cursor-not-allowed' : 'hover:scale-105'
              }`}
              onClick={handleClearDoneTodo}
            >
              清除已完成項目
            </button>
          </footer>
        </main>
      </div>
    </div>
  );
}

export default Todo;
