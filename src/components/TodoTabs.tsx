import React from 'react';

interface ITodoTabsProps {
  isClickTab: string;
  setIsClickTab: (isClickTab: string) => void;
}
// end of interface

function TodoTabs(props: ITodoTabsProps): React.ReactElement {
  const { isClickTab, setIsClickTab } = props;

  return (
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
  );
}

// end of TodoTabs

export default TodoTabs;
