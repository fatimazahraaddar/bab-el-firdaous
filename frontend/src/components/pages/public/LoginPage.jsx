import React, { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Mail, Lock, Eye, EyeOff, ArrowRight } from "lucide-react";
import "./PremiumLoginPage.css";
import { AuthContext } from "../../contextes/AuthProvider";
import logoEcole from "../../../assets/logoEcole.jpg";

export default function LoginPage() {
  const navigate = useNavigate();
  const { login } = useContext(AuthContext);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const res = await fetch("http://127.0.0.1:8000/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      console.log("LOGIN RESPONSE:", data); // 🔥 debug

      if (!res.ok) {
        throw new Error(data.message || "Email ou mot de passe incorrect");
      }

      // 🔥 🔥 🔥 CORRECTION PRINCIPALE
      localStorage.setItem("token", data.token);

      console.log("TOKEN SAVED:", data.token);

      // context
      login(data.token, data.user);

      const role = data.user.role;

      // redirection selon rôle
      if (role === "admin") {
        navigate("/admin/dashboard");
      } else if (role === "parent") {
        navigate("/parent/dashboard");
      } else {
        alert("Accès non autorisé");
        navigate("/");
      }
    } catch (error) {
      console.error("LOGIN ERROR:", error);
      if (error?.message?.includes("Failed to fetch")) {
        alert("Impossible de joindre l'API. Lance le backend Laravel sur http://127.0.0.1:8000 (php artisan serve).");
      } else {
        alert(error.message);
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="premium-login-page">
      <Link to="/" className="back-home-btn">
        ← Retour au site
      </Link>

      {/* LEFT */}
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
                Accédez à votre espace personnel avec un dashboard puissant et
                intuitif
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* RIGHT */}
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
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />

                {/* 👁️ bouton DANS le wrapper */}
                <button
                  type="button"
                  className="show-password-btn"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>

              {/* ✅ Checkbox en dessous */}
              <div className="remember-me">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                />
                <span style={{ marginLeft: "8px" }}>Se souvenir de moi</span>
              </div>
            </div>

            <button
              type="submit"
              className="login-button"
              disabled={isLoading || !email || !password}
            >
              {isLoading ? "Connexion..." : "Se connecter"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
