import { useState, useMemo, useContext, createContext } from 'react';

const AuthContext = createContext<IAuthContextData | undefined>(undefined);

interface IAuthContextData {
  token: string;
  setToken: (token: string) => void;
}

interface IAuthProviderProps {
  children: React.ReactNode;
}

export function AuthProvider({ children }: IAuthProviderProps) {
  const [token, setToken] = useState('');

  const authContextData: IAuthContextData = useMemo(() => {
    return {
      token,
      setToken,
    };
  }, [token, setToken]);

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
