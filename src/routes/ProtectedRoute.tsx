import React from 'react';
import { Navigate } from 'react-router-dom';
// import { Navigate } from 'react-router-dom';

import { useAuth } from '../contexts/AuthContext';

interface IProtectedRouteProps {
  children: JSX.Element;
}
// end of interface

function ProtectedRoute({ children }: IProtectedRouteProps) {
  const { token } = useAuth();

  if (!token) {
    return <Navigate to="/login" />;
    // return <Navigate to="/" replace />;
  }

  return children;
}

export default ProtectedRoute;
