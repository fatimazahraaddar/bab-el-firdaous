/* eslint-disable react-refresh/only-export-components */
import React, { createContext, useEffect, useState } from "react";
import axios from "axios";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {

  // ✅ USER SAFE PARSE
  const [user, setUser] = useState(() => {
    try {
      const savedUser = localStorage.getItem("user");
      return savedUser && savedUser !== "undefined"
        ? JSON.parse(savedUser)
        : null;
    } catch {
      return null;
    }
  });

  const [loading, setLoading] = useState(true);

  // 🔥 CONFIG AXIOS GLOBAL
  const setAxiosToken = (token) => {
    if (token) {
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      axios.defaults.headers.common["Accept"] = "application/json";
    } else {
      delete axios.defaults.headers.common["Authorization"];
    }
  };

  // ✅ FETCH USER
  const fetchUser = async () => {
    const token = localStorage.getItem("token");

    if (!token) {
      setLoading(false);
      return;
    }

    try {
      const res = await axios.get("http://localhost:8000/api/user", {
        headers: {
          Authorization: `Bearer ${token}`, // 🔥 FORCÉ
          Accept: "application/json"
        }
      });

      setUser(res.data);
      localStorage.setItem("user", JSON.stringify(res.data));

    } catch (err) {
      console.error("Auth error:", err.response?.data || err);

      // ❌ token invalide → nettoyage
      localStorage.removeItem("token");
      localStorage.removeItem("user");

      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  // ✅ LOGIN
  const login = (token, userData) => {
    localStorage.setItem("token", token);
    localStorage.setItem("user", JSON.stringify(userData));

    setAxiosToken(token);
    setUser(userData);
  };

  // ✅ LOGOUT
  const logout = async () => {
    try {
      await axios.post("http://localhost:8000/api/logout");
    } catch (err) {
      console.error(err);
    }

    localStorage.removeItem("token");
    localStorage.removeItem("user");

    setAxiosToken(null);
    setUser(null);
  };

  // 🔄 INIT APP
  useEffect(() => {
    const token = localStorage.getItem("token");
    setAxiosToken(token); // 🔥 IMPORTANT GLOBAL
    fetchUser();
  }, []);

  return (
    <AuthContext.Provider value={{
      user,
      setUser,
      login,
      logout,
      loading
    }}>
      {!loading && children}
    </AuthContext.Provider>
  );
};
