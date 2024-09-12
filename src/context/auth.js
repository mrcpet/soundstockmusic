"use client";

import { sendStatusCode } from "next/dist/server/api-utils";
import { createContext, useContext, useEffect, useState } from "react";

const defaultState = {
  user: null,
  token: null,
  setToken: () => {},
  logout: () => {},
};

const AuthContext = createContext(defaultState);

function AuthProvider({ children }) {
  const [token, setToken] = useState(defaultState.token);

  useEffect(() => {
    const _token = localStorage.getItem("@library/token");
    if (_token) {
      setToken(_token);
    }
  }, []);

  useEffect(() => {
    if (token) {
      verify();
    }
  }, [token]);

  function logout() {
    localStorage.removeItem("@library/token");
    localStorage.removeItem("@library/userName");
    setToken(null);
  }

  async function verify() {
    const response = await fetch("/api/auth/verify", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearar ${token}`,
      },
    });
    if (!response.ok) {
      logout();
    }
  }

  return (
    <AuthContext.Provider
      value={{
        token,
        user: null,
        setToken,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

function useAuth() {
  return useContext(AuthContext);
}

export { AuthProvider, useAuth };
