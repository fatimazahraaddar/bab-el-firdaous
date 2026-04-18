import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Mail,
  Lock,
  Eye,
  EyeOff,
  Code2,
  Globe,
  ArrowRight,
} from 'lucide-react';
import './PremiumLoginPage.css';


export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const features = [
    { icon: '📊', title: 'Dashboard en temps réel', desc: 'Suivi complet de vos données' },
    { icon: '🔔', title: 'Notifications', desc: 'Alertes instantanées' },
    { icon: '📱', title: 'Mobile responsive', desc: 'Accédez partout, anytime' },
    { icon: '🔒', title: 'Sécurisé', desc: 'Données protégées' },
  ];

  const handleSubmit = async (e) => {
  e.preventDefault();
  setIsLoading(true);

  try {
    const res = await fetch("http://localhost:8000/api/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
                "Accept": "application/json"  // ← Ajout crucial pour Laravel API

      },
      body: JSON.stringify({
        email,
        password,
      }),
    });

    const data = await res.json();

    if (!res.ok) {
      const message = data.message || "Échec de la connexion";
      const errors = data.errors;
      
      if (errors) {
        // Erreurs de validation : affiche la première
        const firstError = Object.values(errors)[0]?.[0];
        throw new Error(firstError || message);
      }
    
      throw new Error(message);
    }
    // ✅ sauvegarder token + user
    localStorage.setItem("token", data.token);
    localStorage.setItem("user", JSON.stringify(data.user));

    // ✅ redirection selon role
    if (data.user.role === "admin") {
      window.location.href = "/admin/dashboard";
    } else if (data.user?.role === "parent") {
      window.location.href = "/parent/dashboard";
    }
    else if (data.user?.role === "teacher") {
      window.location.href = "/teacher/dashboard";
    }  else if (data.user?.role === "student") {
      window.location.href = "/student/dashboard";
    } else {
      // Fallback
      window.location.href = "/";
    }

  } catch (error) {
 // alert(JSON.stringify(error.response?.data));

   console.error('Erreur complète:', error);
  
  // fetch ne rejette pas pour les erreurs HTTP (401, 422, 500...)
  alert('❌ Erreur de connexion au serveur');
  } finally {
    setIsLoading(false);
  }
};

  const handleSocialLogin = (provider) => {
    // Handle social login
    console.log(`Logging in with ${provider}`);
  };

  return (
    <div className="premium-login-page">
      {/* LEFT SECTION - GRADIENT & INFO */}
      <div className="login-left">
        <div className="login-left-content">
          {/* LOGO */}
          <div className="login-logo">
            <div className="logo-icon"></div>
            <h1>Groupe scolaire bab el firdaouss</h1>
          </div>

          {/* MAIN HEADING */}
          <div className="login-hero">
            <h2>Gestion Scolaire Moderne</h2>
            <p>Accédez à votre espace personnel avec un dashboard puissant et intuitif</p>
          </div>

          {/* FEATURES LIST */}
          <div className="features-list">
            {features.map((feature, index) => (
              <div key={index} className="feature-item">
                <span className="feature-icon">{feature.icon}</span>
                <div className="feature-text">
                  <h4>{feature.title}</h4>
                  <p>{feature.desc}</p>
                </div>
              </div>
            ))}
          </div>

          {/* ILLUSTRATION PLACEHOLDER */}
          <div className="login-illustration">
            <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
              <circle cx="100" cy="100" r="80" fill="rgba(255,255,255,0.1)" />
              <circle cx="100" cy="60" r="25" fill="rgba(255,255,255,0.2)" />
              <rect x="75" y="95" width="50" height="60" rx="5" fill="rgba(255,255,255,0.15)" />
              <circle cx="85" cy="110" r="4" fill="rgba(255,255,255,0.3)" />
              <circle cx="115" cy="110" r="4" fill="rgba(255,255,255,0.3)" />
              <line x1="85" y1="130" x2="115" y2="130" stroke="rgba(255,255,255,0.2)" strokeWidth="2" />
            </svg>
          </div>
        </div>
      </div>

      {/* RIGHT SECTION - LOGIN FORM */}
      <div className="login-right">
        <div className="login-card">
          {/* HEADER */}
          <div className="login-header">
            <h2>Connexion</h2>
            <p>Accédez à votre tableau de bord</p>
          </div>

          {/* FORM */}
          <form onSubmit={handleSubmit} className="login-form">
            {/* EMAIL INPUT */}
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <div className="input-wrapper">
                <Mail size={20} className="input-icon" />
                <input
                  id="email"
                  type="email"
                  placeholder="votre@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="login-input"
                />
              </div>
            </div>

            {/* PASSWORD INPUT */}
            <div className="form-group">
              <label htmlFor="password">Mot de passe</label>
              <div className="input-wrapper">
                <Lock size={20} className="input-icon" />
                <input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Votre mot de passe"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="login-input"
                />
                <button
                  type="button"
                  className="show-password-btn"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
            </div>

            {/* REMEMBER ME & FORGOT PASSWORD */}
            <div className="form-options">
              <label className="remember-me">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                />
                <span>Se souvenir de moi</span>
              </label>
              <Link to="/forgot-password" className="forgot-password">
                Mot de passe oublié ?
              </Link>
            </div>

            {/* LOGIN BUTTON */}
            <button
              type="submit"
              className="login-button"
              disabled={isLoading || !email || !password}
            >
              {isLoading ? (
                <>
                  <span className="spinner"></span>
                  Connexion...
                </>
              ) : (
                <>
                  Se connecter
                  <ArrowRight size={20} />
                </>
              )}
            </button>
          </form>

          {/* DIVIDER */}
          <div className="divider">
            <span>OU</span>
          </div>

          {/* SOCIAL LOGIN */}
          <div className="social-login">
            <button
              type="button"
              className="social-btn google"
              onClick={() => handleSocialLogin('google')}
              title="Google"
            >
              <Globe size={20} />
              <span>Google</span>
            </button>
            <button
              type="button"
              className="social-btn github"
              onClick={() => handleSocialLogin('github')}
              title="Github"
            >
              <Code2 size={20} />
              <span>GitHub</span>
            </button>
          </div>

          {/* SIGNUP LINK */}
          <div className="signup-section">
            <p>
              Pas de compte ?{' '}
              <Link to="/register" className="signup-link">
                Créer un compte
              </Link>
            </p>
          </div>

          {/* FOOTER */}
          <div className="login-footer">
            <p>
              En vous connectant, vous acceptez nos{' '}
              <a href="#" className="footer-link">
                conditions d'utilisation
              </a>{' '}
              et notre{' '}
              <a href="#" className="footer-link">
                politique de confidentialité
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
