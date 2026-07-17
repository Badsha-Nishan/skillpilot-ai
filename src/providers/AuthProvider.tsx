/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { createContext, useContext, useState, useEffect } from "react";
import api from "../services/api";
import toast from "react-hot-toast";

export interface User {
  id: string;
  name: string;
  email: string;
  role: string;
  photoURL?: string;
  createdAt?: string;
}

interface AuthContextType {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (name: string, email: string, password: string) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(localStorage.getItem("token"));
  const [isLoading, setIsLoading] = useState<boolean>(true);

  // Initialize and check user session from JWT token on mount
  useEffect(() => {
    const checkSession = async () => {
      const activeToken = localStorage.getItem("token");
      if (!activeToken) {
        setIsLoading(false);
        return;
      }

      try {
        const response: any = await api.get("/auth/me");
        if (response && response.data?.user) {
          setUser(response.data.user);
        } else {
          // Clean up stale token
          localStorage.removeItem("token");
          setToken(null);
        }
      } catch (error) {
        console.warn("Session authentication handshake failed:", error);
        localStorage.removeItem("token");
        setToken(null);
      } finally {
        setIsLoading(false);
      }
    };

    checkSession();
  }, []);

  // Handle Login Event
  const login = async (email: string, password: string) => {
    setIsLoading(true);
    try {
      const response: any = await api.post("/auth/login", { email, password });
      const { user: userData, token: userToken } = response.data;

      localStorage.setItem("token", userToken);
      setToken(userToken);
      setUser(userData);
      toast.success(`Welcome back, ${userData.name}! Identity verified.`);
    } catch (error: any) {
      const message = error.message || "Failed to authenticate. Please check your credentials.";
      toast.error(message);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  // Handle Register Event
  const registerUser = async (name: string, email: string, password: string) => {
    setIsLoading(true);
    try {
      const response: any = await api.post("/auth/register", { name, email, password });
      const { user: userData, token: userToken } = response.data;

      localStorage.setItem("token", userToken);
      setToken(userToken);
      setUser(userData);
      toast.success(`Account registered! Welcome onboard, ${userData.name}.`);
    } catch (error: any) {
      const message = error.message || "Registration failed. Please check the form fields.";
      toast.error(message);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  // Handle Logout Event
  const logout = () => {
    localStorage.removeItem("token");
    setToken(null);
    setUser(null);
    toast.success("Logged out successfully. Session closed.");
  };

  const value: AuthContextType = {
    user,
    token,
    isAuthenticated: !!user,
    isLoading,
    login,
    register: registerUser,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be executed within an AuthProvider scope.");
  }
  return context;
}
