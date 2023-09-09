import { useState, useMemo, useEffect, useContext, createContext } from 'react';

interface IAuthContextData {
  token: string;
  setToken: (token: string) => void;
}

interface IAuthProviderProps {
  children: React.ReactNode;
}

const AuthContext = createContext<IAuthContextData | undefined>(undefined);

export function AuthProvider({ children }: IAuthProviderProps) {
  const [token, setToken] = useState('');

  const authContextData: IAuthContextData = useMemo(() => {
    return {
      token,
      setToken,
    };
  }, [token, setToken]);

  useEffect(() => {
    const cookieValue = document.cookie
      .split('; ')
      .find((row) => row.startsWith('hexschoolTodo='))
      ?.split('=')[1];

    if (cookieValue) {
      setToken(cookieValue);
    }
  }, []);

  return (
    <AuthContext.Provider value={authContextData}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const authContextData = useContext(AuthContext);

  if (authContextData === undefined) {
    throw new Error('useAuth must be used within a AuthProvider');
  }

  return authContextData;
}
