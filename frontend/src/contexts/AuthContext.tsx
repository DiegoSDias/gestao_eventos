import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import type { User } from "../types/User";
import { api } from "../services/api";

interface AuthContextData {
  user: User | null;
  isAuthenticated: boolean;
  loading: boolean;
  signIn: (credentials: {email: string; password: string }) => Promise<void>;
  signOut: () => void;
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [ user, setUser ] = useState<User | null>(null);
  const [ loading, setLoadind ] = useState(true);

  useEffect(() => {
    async function loadUserFromStorage() {
      const token = localStorage.getItem('@Eventos:token');

      if (token) {
        api.defaults.headers.common["Authorization"] = `Bearer ${token}`;

        try {
          const response = await api.get('/profile/me');
          const userData = response.data.data || response.data;

          setUser(userData);
        } catch (error) {
          console.error('Sessão invalida ou token expirado. Limpando credenciais.');
          localStorage.removeItem('@Eventos:token');
          api.defaults.headers.common["Authorization"] = ``;
          setUser(null);
        }
      }
      setLoadind(false);
    }
    loadUserFromStorage();
  }, [])

  const signIn = async ({email, password}: { email: string, password: string}) => {
    const response = await api.post('/login', {email, password});
    const token = response.data.data.token;
    const userData = response.data.data.user;

    localStorage.setItem('@Eventos:token', token);
    api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    setUser(userData);
  }

  const signOut = () => {
    localStorage.removeItem('@Eventos:token');
    api.defaults.headers.common["Authorization"] = ``;
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ 
      user,
      isAuthenticated: !!user,
      loading,
      signIn,
      signOut
     }}>
      {children}
     </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext);