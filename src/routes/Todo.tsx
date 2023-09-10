import React, { useEffect, useState } from 'react';

import { useAuth } from '../contexts/AuthContext';
import { api } from '../helpers/api';
import { Toast } from '../components/Toast';

import TodoAddInput from '../components/TodoAddInput';
import TodoTabs from '../components/TodoTabs';
import TodoCardBody from '../components/TodoCardBody';
import TodoNav from '../components/TodoNav';

import ImgEmpty from '../images/empty.webp';

interface ITodoData {
  content: string;
  createTime: number;
  id: string;
  status: boolean;
}

function Todo(): React.ReactElement {
  const { token } = useAuth();

  const [todoData, setTodoData] = useState<ITodoData[]>([]);

  const [isClickTab, setIsClickTab] = useState<string>('ALL');
  const [haveTodoLength, setHaveTodoLength] = useState<number>(0);
  const [haveClearLength, setHaveClearLength] = useState<number>(0);

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
        <TodoNav />

        <TodoAddInput handleAddTodo={handleAddTodo} />

        {!todoData.length ? (
          <main className="mx-auto flex max-w-[500px] flex-col justify-between gap-4 pt-[60px] text-center">
            <p className="font-medium">目前尚無待辦事項 (≥o≤)</p>

            <img
              src={ImgEmpty}
              alt="EMPTY"
              loading="lazy"
              className="mx-auto w-60"
            />
          </main>
        ) : (
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
        )}
      </div>
    </div>
  );
}

export default Todo;
