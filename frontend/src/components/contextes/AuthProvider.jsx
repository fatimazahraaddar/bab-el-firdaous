import React, { createContext, useContext, useEffect, useState, useMemo } from "react";
import axios from "axios";

// 1. Instance خفيفة بلا Cookies
const api = axios.create({
  baseURL: "http://127.0.0.1:8000/api",
  headers: { "Accept": "application/json" }
});

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // 2. Interceptor: هادا هو السر! كيزيد التوكن لأي طلب كيخرج من "api" بشكل تلقائي
  api.interceptors.request.use((config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  });

  useEffect(() => {
    const initAuth = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        setLoading(false);
        return;
      }

      try {
        // كنستعملو api اللي ديجا فيه الـ Interceptor
        const res = await api.get("/user");
        setUser(res.data);
      } catch (err) {
        console.error("Auth error:", err);
        localStorage.removeItem("token");
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    initAuth();
    // ❌ حيدنا fetchUser من هنا باش ما يبقاش يتعاود الطلب بلامعنى
  }, []); 

  const login = (token, userData) => {
    localStorage.setItem("token", token);
    setUser(userData);
    // كنعلمو axios بالتوكن الجديد نيشان
    api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  };

  const logout = () => {
    localStorage.removeItem("token");
    delete api.defaults.headers.common['Authorization'];
    setUser(null);
  };

  const value = useMemo(() => ({
    user, login, logout, loading, api
  }), [user, loading]);

  return (
    <AuthContext.Provider value={value}>
      {!loading ? children : <div className="loading-screen">Chargement...</div>}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);