import { useState, useMemo, useEffect, useContext, createContext } from 'react';

interface IAuthContextData {
  token: string;
  setToken: (token: string) => void;
  saveToken: (resToken: string) => void;
  removeToken: () => void;
}

interface IAuthProviderProps {
  children: React.ReactNode;
}
// end of interface

const AuthContext = createContext<IAuthContextData | undefined>(undefined);

export function AuthProvider({ children }: IAuthProviderProps) {
  const [token, setToken] = useState<string>('');

  const saveToken = (resToken: string) => {
    // console.log('AUTH_TOKEN:::', resToken);
    setToken(resToken);
    // localStorage.setItem('AUTH_TOKEN', resToken);

    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    tomorrow.setHours(1, 0, 0, 0);

    document.cookie = `hexschoolTodo=${resToken}; expires=${tomorrow.toUTCString()}`;
  };
  // end of saveToken(resToken)

  function removeToken() {
    document.cookie =
      'hexschoolTodo=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/';
    setToken('');
  }
  // end of removeToken

  useEffect(() => {
    const cookieValue = document.cookie
      .split('; ')
      .find((row) => row.startsWith('hexschoolTodo='))
      ?.split('=')[1];

    if (cookieValue) {
      setToken(cookieValue);
    }
  }, []);
  // end of useEffect()

  const authContextData: IAuthContextData = useMemo(() => {
    return {
      token,
      setToken,
      saveToken,
      removeToken,
    };
  }, [token, setToken]);
  // end of useMemo()

  return (
    <AuthContext.Provider value={authContextData}>
      {children}
    </AuthContext.Provider>
  );
}
// end of AuthProvider()

export function useAuth() {
  const authContextData = useContext(AuthContext);

  if (authContextData === undefined) {
    throw new Error('useAuth must be used within a AuthProvider');
  }

  return authContextData;
}
// end of useAuth()
