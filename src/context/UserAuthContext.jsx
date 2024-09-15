import React, { createContext, useState, useEffect } from "react";

export const UserAuthContext = createContext();

export const UserAuthProvider = ({ children }) => {
  const [userData, setUserData] = useState({
    accessToken: localStorage.getItem("accessToken"),
    refreshToken: localStorage.getItem("refreshToken"),
    userData: JSON.parse(localStorage.getItem("userData")),
  });

  const login = (data) => {
    const { accessToken, refreshToken, userData } = data;

    localStorage.setItem("accessToken", accessToken);
    localStorage.setItem("refreshToken", refreshToken);
    localStorage.setItem("userData", JSON.stringify(userData));

    setUserData({ accessToken, refreshToken, userData });
  };

  const logout = () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    localStorage.removeItem("userData");

    // Update the state
    setUserData({ accessToken: null, refreshToken: null, userData: null });
  };

  useEffect(() => {
    setUserData({
      accessToken: localStorage.getItem("accessToken"),
      refreshToken: localStorage.getItem("refreshToken"),
      userData: JSON.parse(localStorage.getItem("userData")),
    });
  }, []);

  return (
    <UserAuthContext.Provider value={{ userData, login, logout }}>
      {children}
    </UserAuthContext.Provider>
  );
};
