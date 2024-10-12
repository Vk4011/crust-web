// AuthContext.js

import React, { createContext, useState, useEffect } from "react";
import BASE_URL from "../api/authAPI"; // Ensure BASE_URL is correctly defined

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userName, setUserName] = useState("");

  // Function to load user data
  const loadUser = async () => {
    const token = localStorage.getItem("token");
    if (token) {
      try {
        const response = await fetch(`${BASE_URL}/api/v1/profile`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`,
          },
        });

        if (response.ok) {
          const data = await response.json();
          setIsAuthenticated(true);
          setUserName(data.firstName);
        } else {
          // Token is invalid or expired
          localStorage.removeItem("token");
          setIsAuthenticated(false);
          setUserName("");
        }
      } catch (error) {
        console.error("Error loading user:", error);
        localStorage.removeItem("token");
        setIsAuthenticated(false);
        setUserName("");
      }
    } else {
      setIsAuthenticated(false);
      setUserName("");
    }
  };

  useEffect(() => {
    loadUser();
  }, []);

  // Login function
  const login = (token) => {
    localStorage.setItem("token", token);
    loadUser();
  };

  // Logout function
  const logout = () => {
    localStorage.removeItem("token");
    setIsAuthenticated(false);
    setUserName("");
  };

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        userName,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
