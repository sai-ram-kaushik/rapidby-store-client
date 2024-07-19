import React, { createContext, useState, useEffect } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [authData, setAuthData] = useState({
    accessToken: localStorage.getItem("accessToken"),
    refreshToken: localStorage.getItem("refreshToken"),
    storeData: JSON.parse(localStorage.getItem("storeData")),
  });

  const login = (data) => {
    const { accessToken, refreshToken, storeData } = data;

    localStorage.setItem("accessToken", accessToken);
    localStorage.setItem("refreshToken", refreshToken);
    localStorage.setItem("storeData", JSON.stringify(storeData));

    setAuthData({ accessToken, refreshToken, storeData });
  };

  const logout = () => {
    // Remove tokens and user data from localStorage
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    localStorage.removeItem("storeData");

    // Update the state
    setAuthData({ accessToken: null, refreshToken: null, storeData: null });
  };

  useEffect(() => {
    // Update authData from localStorage on mount
    setAuthData({
      accessToken: localStorage.getItem("accessToken"),
      refreshToken: localStorage.getItem("refreshToken"),
      storeData: JSON.parse(localStorage.getItem("storeData")),
    });
  }, []);

  return (
    <AuthContext.Provider value={{ authData, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
