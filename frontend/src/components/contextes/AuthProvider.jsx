/* eslint-disable react-refresh/only-export-components */
import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  useMemo,
  useCallback,
} from "react";
import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "http://localhost:8000/api",
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
});

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // 1. CLEANUP CENTRALISÉ
  const handleCleanup = useCallback(() => {
    localStorage.removeItem("token");
    setUser(null);
    delete api.defaults.headers.common["Authorization"];
  }, []);

  // 2. INTERCEPTEURS (Requête + Réponse pour sécurité 401)
  useEffect(() => {
    // Intercepteur de requête : Ajoute le token
    const requestInterceptor = api.interceptors.request.use((config) => {
      const token = localStorage.getItem("token");
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    });

    // Intercepteur de réponse : Si le token expire (401), on déconnecte
    const responseInterceptor = api.interceptors.response.use(
      (response) => response,
      (error) => {
        if (error.response?.status === 401) {
          handleCleanup();
        }
        return Promise.reject(error);
      },
    );

    return () => {
      api.interceptors.request.eject(requestInterceptor);
      api.interceptors.response.eject(responseInterceptor);
    };
  }, [handleCleanup]);

  // 3. ACTIONS OPTIMISÉES
  const fetchUser = useCallback(async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      setLoading(false);
      return;
    }

    try {
      const res = await api.get("/user");
      setUser(res.data);
    } catch (err) {
      console.error("Erreur de récupération utilisateur:", err); // Utilisation de 'err'
      handleCleanup();
    } finally {
      setLoading(false);
    }
  }, [handleCleanup]);

  const login = useCallback((token, userData) => {
    localStorage.setItem("token", token);
    setUser(userData);
  }, []);

  const logout = useCallback(async () => {
    try {
      await api.post("/logout");
    } finally {
      handleCleanup();
    }
  }, [handleCleanup]);

  // 4. INITIALISATION
  useEffect(() => {
    fetchUser();
  }, [fetchUser]);

  // 5. MÉMOÏSATION (Performance : évite les re-renders inutiles)
  const value = useMemo(
    () => ({
      user,
      setUser,
      login,
      logout,
      loading,
      api,
    }),
    [user, loading, login, logout],
  );

  return (
    <AuthContext.Provider value={value}>
      {!loading ? (
        children
      ) : (
        <div className="flex h-screen items-center justify-center bg-gray-50">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
        </div>
      )}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth doit être utilisé à l'intérieur de AuthProvider");
  }
  return context;
};
