import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import './PublicLayouts.css';
import logoEcole from '../../../assets/logoEcole.jpg';

export default function PublicLayout({ children }) {
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    document.documentElement.style.scrollBehavior = "smooth";
    const sections = Array.from(document.querySelectorAll('[data-animate]'));
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animate-enter');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15 }
    );
    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  return (
    <div className="public-shell">
      <nav className="navbar navbar-expand-lg bg-white shadow-sm">
        <div className="container">
          <Link to="/" className="navbar-brand public-brand">
            <span><img src={logoEcole} alt="Logo"  className="logo_img"/></span>
            <div className="brand-text">
              <div className="brand-title">Groupe Scolaire Bab El Firdaouss</div>
              {/*<div className="brand-subtitle">Bab El Firdaous</div>*/}
            </div>
          </Link>

          <button
            className="navbar-toggler"
            type="button"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className={`collapse navbar-collapse justify-content-between ${menuOpen ? 'show' : ''}`}>
            <ul className="navbar-nav mx-auto">
              <li className="nav-item">
                <Link className="nav-link public-nav-link" to="/">Accueil</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link public-nav-link" to="/about">À propos</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link public-nav-link" to="/announcements">Annonces</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link public-nav-link" to="/contact">Contact</Link>
              </li>
            </ul>

            <div className="d-flex gap-2">
              <Link to="/login" className="btn btn-outline-primary public-button-outline">
                Connexion
              </Link>
              <Link to="/register" className="btn btn-primary public-button">
                Inscription
              </Link>
            </div>
          </div>
        </div>
      </nav>

      <main className="public-main">{children}</main>

      <footer className="public-footer">
        <div className="container">
          <div className="footer-row">
            <div className="footer-col">
              <h5>Groupe Scolaire Bab El Firdaouss</h5>
              <p>Une école moderne pour inspirer et former les leaders de demain.</p>
            </div>
            <div className="footer-col">
              <h6>Liens rapides</h6>
              <ul className="footer-links list-unstyled">
                <li><Link to="/about">À propos</Link></li>
                <li><Link to="/announcements">Annonces</Link></li>
                <li><Link to="/contact">Contact</Link></li>
              </ul>
            </div>
            <div className="footer-col">
              <h6>Contact<link to="/contact"/> </h6>
              <p className="small">
                Casablanca<br />
                contact@ecole.com<br />
                +212 527-297908
              </p>
            </div>
          </div>
          <hr />
          <p className="text-center small mb-0">© {new Date().getFullYear()} Bab El Firdaouss. Tous droits réservés.</p>
        </div>
      </footer>
    </div>
  );
}
