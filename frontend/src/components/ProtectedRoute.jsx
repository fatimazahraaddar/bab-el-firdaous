import { Navigate } from "react-router-dom";
import { useAuth } from "./contextes/UseAuth"; // Utilisation de ton hook personnalisé

export default function ProtectedRoute({ children, role }) {
  const { user, loading } = useAuth();

  // 1. Gérer l'attente de la réponse de l'API (évite les redirections par erreur)
  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  // 2. Si l'utilisateur n'est pas connecté, redirection vers /login
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  // 3. Vérification du rôle (ex: un Parent ne peut pas aller sur la page Admin)
  if (role && user.role !== role) {
    return <Navigate to="/unauthorized" replace />;
  }

  // 4. Si tout est bon, on affiche la page demandée
  return children;
}