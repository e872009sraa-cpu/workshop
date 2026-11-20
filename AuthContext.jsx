import { createContext, useContext, useState } from 'react';
import { api } from './api';

const AuthContext = createContext();
export const useAuth = () => useContext(AuthContext);

export function AuthProvider({ children }) {
  
  const [user, setUser] = useState(() => JSON.parse(localStorage.getItem('user') || 'null'));

  const login = (user, token) => {
    setUser(user);
    localStorage.setItem('user', JSON.stringify(user));
    localStorage.setItem('token', token);
  };

  const logout = async () => {
    try {
      await api.post('/logout');
    } catch {}
    setUser(null);
    localStorage.removeItem('user');
    localStorage.removeItem('token');
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, isOrganizer: user?.role === 'organizer' }}>
      {children}
    </AuthContext.Provider>
  );
}