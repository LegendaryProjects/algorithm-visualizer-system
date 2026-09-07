import React, { createContext, useContext, useState, useEffect } from 'react';
import api from '../services/api';

const AuthContext = createContext();

const getTokenExpiry = (token) => {
  if (!token) return null;
  try {
    const payload = JSON.parse(atob(token.split('.')[1]));
    return payload.exp ? payload.exp * 1000 : null;
  } catch (e) {
    return null;
  }
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [session, setSession] = useState(null);
  const [loading, setLoading] = useState(true);
  const [sessionNotice, setSessionNotice] = useState('');

  const clearSessionNotice = () => setSessionNotice('');

  const logout = async (reason = '') => {
    try {
      await api.post('/auth/logout');
    } catch (e) {
      // Proceed with client logout even on server error
    }
    localStorage.removeItem('token');
    setUser(null);
    setSession(null);
    if (typeof reason === 'string' && reason.trim()) {
      setSessionNotice(reason.trim());
    } else {
      setSessionNotice('');
    }
  };

  // Set up auto-logout timer whenever a token is active
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token || !user) return;

    const expiryTime = getTokenExpiry(token);
    if (!expiryTime) return;

    const remainingMs = expiryTime - Date.now();
    if (remainingMs <= 0) {
      logout('Your 24-hour session has expired. Please sign in again.');
      return;
    }

    const timer = setTimeout(() => {
      logout('Your 24-hour session has expired. Please sign in again.');
    }, remainingMs);

    return () => clearTimeout(timer);
  }, [user]);

  // Listen for unauthorized/expired events from axios interceptor
  useEffect(() => {
    const handleExpired = (e) => {
      setUser(null);
      setSession(null);
      localStorage.removeItem('token');
      if (e.detail) {
        setSessionNotice(e.detail);
      }
    };
    window.addEventListener('auth:expired', handleExpired);
    return () => window.removeEventListener('auth:expired', handleExpired);
  }, []);

  useEffect(() => {
    const fetchUser = async () => {
      const token = localStorage.getItem('token');
      if (!token) {
        setLoading(false);
        return;
      }

      // Pre-check JWT expiry
      const expiryTime = getTokenExpiry(token);
      if (expiryTime && Date.now() >= expiryTime) {
        localStorage.removeItem('token');
        setUser(null);
        setSession(null);
        setSessionNotice('Your session has expired. Please sign in again.');
        setLoading(false);
        return;
      }

      try {
        const response = await api.get('/auth/me');
        setUser(response.data.user);
        setSession(response.data.session);
      } catch (err) {
        localStorage.removeItem('token');
        setUser(null);
        setSession(null);
      } finally {
        setLoading(false);
      }
    };
    fetchUser();
  }, []);

  const login = async (credential, password, role = 'learner') => {
    const response = await api.post('/auth/login', { credential, password, role });
    localStorage.setItem('token', response.data.token);
    setUser(response.data.user);
    setSession(response.data.session);
    setSessionNotice('');
    return response.data;
  };

  const register = async (username, email, password, role = 'learner') => {
    const response = await api.post('/auth/register', { username, email, password, role });
    localStorage.setItem('token', response.data.token);
    setUser(response.data.user);
    setSession(response.data.session);
    setSessionNotice('');
    return response.data;
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        session,
        login,
        register,
        logout,
        loading,
        sessionNotice,
        clearSessionNotice,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);