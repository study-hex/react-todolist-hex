import { useState, useMemo, useEffect, useContext, createContext } from 'react';
import {
  saveTokenToCookie,
  removeTokenFromCookie,
  getTokenFromCookie,
} from '../helpers/CookieService';

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
    setToken(resToken);
    saveTokenToCookie(resToken);
  };
  // end of saveToken(resToken)

  function removeToken() {
    setToken('');
    removeTokenFromCookie();
  }
  // end of removeToken

  useEffect(() => {
    const cookieValue = getTokenFromCookie();

    if (cookieValue) {
      // console.log('cookieValue:::', cookieValue);
      saveToken(cookieValue);
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
