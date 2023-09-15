import React from 'react';

import { useInput } from '../hooks/useInput';

interface ITodoAddInputProps {
  handleAddTodo: (newInput: string) => void;
}
// end of interface

function TodoAddInput(props: ITodoAddInputProps): React.ReactElement {
  const newInputTodo = useInput('');
  const { handleAddTodo } = props;

  return (
    <div className="mx-auto mb-4 flex max-w-[500px] items-center justify-between rounded-lg bg-white py-1 pl-4 pr-1 shadow-lg">
      <input
        type="text"
        name="content"
        id="inputAddToto"
        placeholder="新增待辦事項"
        className="w-[83%] font-medium text-dark outline-none placeholder:text-light"
        value={newInputTodo.value}
        onChange={newInputTodo.onChange}
        onKeyDown={(e) => {
          if (e.key === 'Enter') {
            handleAddTodo(newInputTodo.value.trim());
            return newInputTodo.clear();
          }
          if (e.key === 'Escape') {
            return newInputTodo.clear();
          }
        }}
      />

      <button
        type="button"
        className="transition-border relative h-10 w-10 rounded-[10px] bg-dark duration-100 hover:border-light disabled:cursor-not-allowed disabled:bg-light"
        disabled={!newInputTodo.value}
        onClick={() => handleAddTodo(newInputTodo.value.trim())}
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
  );
}
// end of TodoAddInput

export default TodoAddInput;
