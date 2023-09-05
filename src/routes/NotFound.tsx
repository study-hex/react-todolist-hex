import React, { useState } from 'react';

function NotFound(): React.ReactElement {
  const [count, setCount] = useState<number>(0);

  return (
    <div className="text-center selection:bg-green-900">
      <header className="flex min-h-screen flex-col items-center justify-center bg-[#282c34] text-white">
        <h1>404</h1>

        <button
          type="button"
          className="my-6 rounded bg-gray-300 px-2 py-2 text-[#282C34] transition-all hover:bg-gray-200"
          onClick={() => setCount((prevCount) => prevCount + 1)}
        >
          count is:
          <span className="pl-1">{count}</span>
        </button>
      </header>
    </div>
  );
}

export default NotFound;
