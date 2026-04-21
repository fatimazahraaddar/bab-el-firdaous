import axios from "axios";

/**
 * Récupère l'utilisateur actuellement connecté via la session (cookie).
 * L'option { withCredentials: true } est CRUCIAL pour envoyer le cookie au serveur.
 */
export const getUser = async () => {
  try {
    const res = await axios.get("http://localhost:8000/api/user", {
      withCredentials: true,
      headers: {
        "Accept": "application/json"
      }
    });

    return res.data;
  } catch (error) {
    // Si l'erreur est 401 (Non autorisé), cela signifie simplement qu'aucun utilisateur n'est connecté.
    if (error.response?.status === 401) {
      return null;
    }
    
    console.error("Erreur lors de la récupération de l'utilisateur:", error.message);
    return null;
  }
};