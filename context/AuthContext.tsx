
import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { User, Order } from '../types';
import { useToast } from './ToastContext';
import { db } from '../services/database';

interface AuthContextType {
  user: User | null;
  loading: boolean;
  login: (email: string) => Promise<void>;
  register: (email: string, name: string) => Promise<void>;
  logout: () => void;
  refreshUserData: () => Promise<void>;
  orders: Order[];
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const { showToast } = useToast();

  // Initialize Session
  useEffect(() => {
    const initAuth = async () => {
      try {
        const sessionUser = await db.auth.getSession();
        if (sessionUser) {
          setUser(sessionUser);
          await loadUserOrders(sessionUser.uid);
        }
      } catch (error) {
        console.error("Session restore failed", error);
      } finally {
        setLoading(false);
      }
    };
    initAuth();
  }, []);

  const loadUserOrders = async (userId: string) => {
      const history = await db.orders.getHistory(userId);
      setOrders(history);
  };

  const login = async (email: string) => {
    setLoading(true);
    try {
      const loggedUser = await db.auth.login(email);
      setUser(loggedUser);
      await loadUserOrders(loggedUser.uid);
      showToast(`Welcome back, ${loggedUser.displayName}`, 'success');
    } catch (err: any) {
      showToast(err.message || 'Login failed', 'error');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const register = async (email: string, name: string) => {
    setLoading(true);
    try {
      const newUser = await db.auth.register(email, name);
      setUser(newUser);
      showToast('Account created successfully', 'success');
    } catch (err: any) {
      showToast(err.message || 'Registration failed', 'error');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    await db.auth.logout();
    setUser(null);
    setOrders([]);
    showToast('Successfully logged out', 'info');
  };

  const refreshUserData = async () => {
      if (user) {
          const freshUser = await db.auth.getSession();
          if (freshUser) {
            setUser(freshUser);
            await loadUserOrders(freshUser.uid);
          }
      }
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, register, logout, refreshUserData, orders }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within an AuthProvider');
  return context;
};
