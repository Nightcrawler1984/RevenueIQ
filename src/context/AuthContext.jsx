import { createContext, useContext, useState, useCallback } from 'react';
import { checkLogin } from '../data/auth';

const STORAGE_KEY = 'revenueiq_auth_session';
const AuthContext = createContext(null);

function loadSession() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

export function AuthProvider({ children }) {
  const [session, setSession] = useState(loadSession);
  const [error, setError] = useState('');

  const login = useCallback((username, password) => {
    const result = checkLogin(username, password);
    if (!result) {
      setError('Incorrect username or password.');
      return false;
    }
    setError('');
    setSession(result);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(result));
    return true;
  }, []);

  const logout = useCallback(() => {
    setSession(null);
    localStorage.removeItem(STORAGE_KEY);
  }, []);

  return (
    <AuthContext.Provider value={{ session, isAdmin: session?.role === 'admin', login, logout, error, setError }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
}
