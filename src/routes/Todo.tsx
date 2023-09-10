import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { useAuth } from '../contexts/AuthContext';
import { api } from '../helpers/api';
import { Toast } from '../components/Toast';

import TodoAddInput from '../components/TodoAddInput';
import TodoTabs from '../components/TodoTabs';
import TodoCardBody from '../components/TodoCardBody';

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
        <nav className="flex items-center justify-between gap-10 py-4">
          <div className="w-4/5">
            <Logo bgPosition={'bg-start'} />
          </div>

          <button type="button" className="text-sm" onClick={handleLogout}>
            登出
          </button>
        </nav>

        <TodoAddInput handleAddTodo={handleAddTodo} />

        <main className="mx-auto flex min-h-[calc(100vh_-_170px)] max-w-[500px] flex-col rounded-[10px] bg-white text-sm">
          <TodoTabs isClickTab={isClickTab} setIsClickTab={setIsClickTab} />

          <TodoCardBody
            todoData={todoData}
            getTodos={getTodos}
            isClickTab={isClickTab}
            setIsClickTab={setIsClickTab}
          />

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
