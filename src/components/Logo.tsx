import React from 'react';
import { Link } from 'react-router-dom';

interface LogoProps {
  bgPosition: string;
}
// end of interface

function Logo({ bgPosition }: LogoProps): React.ReactElement {
  const h1Class = `${bgPosition}
    overflow-hidden whitespace-nowrap bg-logo bg-[length:316px_46.9px] bg-no-repeat indent-[101%]
  `;

  return (
    <Link
      to="/login"
      className="inline-block w-full leading-[46.9px] hover:opacity-80"
      title="TODOLIST"
    >
      <h1 className={h1Class}>ONLINE TODO LIST</h1>
    </Link>
  );
}
// end of Logo

export default Logo;
