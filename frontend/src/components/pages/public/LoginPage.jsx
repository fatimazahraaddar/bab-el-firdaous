import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Mail, Lock, Eye, EyeOff } from "lucide-react";
import "./PremiumLoginPage.css";
import { useAuth } from "../../contextes/UseAuth"; // Utilisation du hook personnalisé
import logoEcole from "../../../assets/logoEcole.jpg";

export default function LoginPage() {
  const navigate = useNavigate();
  const { login, api } = useAuth(); // On récupère 'api' depuis le contexte

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isLoading) return;
    
    setIsLoading(true);

    try {
      // Utilisation de l'instance axios centralisée
      const res = await api.post("/login", { 
        email, 
        password,
        remember: rememberMe 
      });

      const { token, user } = res.data;

      // 1. Mise à jour du contexte (le contexte gère le localStorage en interne)
      login(token, user);

      // 2. Redirection basée sur le rôle
      if (user.role === "admin") {
        navigate("/admin/dashboard");
      } else if (user.role === "parent") {
        navigate("/parent/dashboard");
      } else {
        navigate("/");
      }
      
    } catch (error) {
      console.error("LOGIN ERROR:", error);
      
      // Gestion des messages d'erreur selon la réponse API
      const message = error.response?.data?.message 
        || "Identifiants incorrects ou problème de connexion.";
      
      alert(message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="premium-login-page">
      <Link to="/" className="back-home-btn">
        ← Retour au site
      </Link>

      {/* LEFT SECTION */}
      <div className="login-left">
        <div className="login-left-content">
          <div className="left-section d-flex flex-column justify-content-center align-items-center text-center">
            <div className="logo-container mb-4">
              <img src={logoEcole} alt="logo" className="logo-img" />
            </div>

            <div className="title-container">
              <h2 className="main-title">
                Groupe scolaire <br />
                <span>Bab El Firdaouss</span>
              </h2>
            </div>

            <div className="mt-4">
              <p className="subtitle">
                Accédez à votre espace personnel avec un dashboard puissant et intuitif
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* RIGHT SECTION */}
      <div className="login-right">
        <div className="login-card">
          <div className="login-header">
            <h2>Connexion</h2>
            <p>Accédez à votre tableau de bord</p>
          </div>

          <form onSubmit={handleSubmit} className="login-form">
            <div className="form-group">
              <label>Email</label>
              <div className="input-wrapper">
                <Mail size={20} className="input-icon" />
                <input
                  type="email"
                  className="login-input"
                  placeholder="votre@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
            </div>

            <div className="form-group">
              <label>Mot de passe</label>
              <div className="input-wrapper">
                <Lock size={20} className="input-icon" />
                <input
                  type={showPassword ? "text" : "password"}
                  className="login-input"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                <button
                  type="button"
                  className="show-password-btn"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>

              <div className="remember-me">
                <input
                  type="checkbox"
                  id="remember"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                />
                <label htmlFor="remember" style={{ marginLeft: "8px", cursor: "pointer" }}>
                  Se souvenir de moi
                </label>
              </div>
            </div>

            <button
              type="submit"
              className="login-button"
              disabled={isLoading || !email || !password}
            >
              {isLoading ? (
                <span className="d-flex align-items-center justify-content-center gap-2">
                  <span className="spinner-border spinner-border-sm" role="status"></span>
                  Connexion...
                </span>
              ) : (
                "Se connecter"
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}