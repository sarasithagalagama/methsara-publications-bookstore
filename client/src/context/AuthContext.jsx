import React, { createContext, useContext, useState, useEffect } from "react";
import {
  login as loginService,
  register as registerService,
  logout as logoutService,
  googleLogin as googleLoginService,
} from "../services/authService";

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check if user is logged in
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setLoading(false);
  }, []);

  const login = async (credentials) => {
    const data = await loginService(credentials);
    setUser(data.user);
    return data;
  };

  const register = async (userData) => {
    const data = await registerService(userData);
    setUser(data.user);
    return data;
  };

  const googleLogin = async (token) => {
    const data = await googleLoginService(token);
    setUser(data.user);
    return data;
  };

  const logout = () => {
    logoutService();
    setUser(null);
  };

  const isAdmin = user?.role === "admin";
  const isAuthenticated = !!user;

  const value = {
    user,
    login,
    googleLogin,
    register,
    logout,
    isAdmin,
    isAuthenticated,
    loading,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
