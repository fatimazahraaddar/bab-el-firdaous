import { Navigate } from "react-router-dom";

export default function ProtectedRoute({ children, roleRequired }) {
  const token = localStorage.getItem("token");

  let user = null;

  const storedUser = localStorage.getItem("user");

  if (storedUser && storedUser !== "undefined") {
    try {
      user = JSON.parse(storedUser);
    } catch {
      user = null;
    }
  }

  // ❌ pas connecté
  if (!token || !user) {
    return <Navigate to="/login" replace />;
  }

  // ❌ mauvais role
  if (roleRequired && user.role !== roleRequired) {
    return <Navigate to="/login" replace />;
  }

  // ✅ autorisé
  return children;
}