import React, { createContext, useState, useContext, useEffect, useRef } from "react";
import { useRouter, useSegments } from "expo-router";
import AsyncStorage from '@react-native-async-storage/async-storage';

interface AuthContextType {
  isAuthenticated: boolean;
  userInfo: UserInfo | null;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
}

interface UserInfo {
  email: string;
  name: string;
  token: string;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userInfo, setUserInfo] = useState<UserInfo | null>(null);
  const initialized = useRef(false);
  const router = useRouter();
  const segments = useSegments();

  useEffect(() => {
    if (!initialized.current) {
      initialized.current = true;
      checkInitialAuth();
    }
  }, []);

  const checkInitialAuth = async () => {
    try {
      const token = await AsyncStorage.getItem('userToken');
      setIsAuthenticated(!!token);
    } catch (error) {
      console.error('Error checking auth:', error);
      setIsAuthenticated(false);
    }
  };

  useEffect(() => {
    if (!initialized.current) return;

    const timer = setTimeout(() => {
      const inAuthGroup = segments[0] === '(auth)';

      if (!isAuthenticated && !inAuthGroup) {
        router.replace('/(auth)/login');
      } else if (isAuthenticated && inAuthGroup) {
        router.replace('/(tabs)/(list)');
      }
    }, 0);

    return () => clearTimeout(timer);
  }, [isAuthenticated, segments]);

  const login = async (email: string, password: string) => {
    try {
      // 模拟API请求
      const response = await new Promise<UserInfo>((resolve) => {
        setTimeout(() => {
          resolve({
            email,
            name: '测试用户',
            token: 'mock-token'
          });
        }, 1000);
      });

      await AsyncStorage.setItem('userToken', response.token);
      setUserInfo(response);
      setIsAuthenticated(true);
      return true;
    } catch (error) {
      console.error('登录失败:', error);
      return false;
    }
  };

  const logout = async () => {
    try {
      await AsyncStorage.removeItem('userToken');
      setIsAuthenticated(false);
      setUserInfo(null);
    } catch (error) {
      console.error('登出失败:', error);
    }
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, userInfo, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
