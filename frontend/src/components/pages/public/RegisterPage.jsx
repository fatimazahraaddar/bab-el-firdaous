import PublicLayout from '../../pages/Layouts/PublicLayouts';
import { useState } from 'react';
import { Link ,useNavigate} from 'react-router-dom';
import { User, Mail, Lock, ArrowRight } from 'lucide-react';
import axios from 'axios';

export default function RegisterPage() {
  const [form, setForm] = useState({ name: '', email: '', password: '', confirmPassword: '' });

    const navigate = useNavigate();  // ← Hook pour la navigation

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  /*const handleSubmit = async (e) => {
    e.preventDefault();
    if (form.password !== form.password_confirmation) {
      alert('Les mots de passe ne correspondent pas.');
      return;
    }
    alert('Inscription réussie (simulation).');
    setForm({ name: '', email: '', password: '', password_confirmation: '' });
    try {
      const res = await axios.post('http://localhost:8000/api/register', form, 
        { withCredentials: true,
          //withXSRFToken:true
          headers: {
              'X-XSRF-TOKEN': document.cookie
              .split('; ')
              .find(row => row.startsWith('XSRF-TOKEN='))
              ?.split('=')[1]
            }
         });
      if (res.data.success) {
        console.log('Ok');
      } else {
        console.log(res?.data.message);
      }
    } catch (err) {
      console.log(err.response.data);
    }
  };
*/

const handleSubmit = async (e) => {
  e.preventDefault();
  
  // 1️⃣ Validation frontend : mots de passe identiques
  if (form.password !== form.confirmPassword) {
    alert('❌ Les mots de passe ne correspondent pas.');
    return;
  }

    console.log('📤 Données du formulaire:', form);

  // 2️⃣ Préparer les données avec le nom attendu par Laravel
  const payload = {
    name: form.name,
    email: form.email,
    password: form.password,
    password_confirmation: form.confirmPassword  // le nom exacete il doit etre remplacer 
  };

    console.log('📦 Payload envoyé à Laravel:', payload);

  try {
        console.log(' Envoi vers API...');

    // 3️⃣ Appel API
    const res = await axios.post('http://localhost:8000/api/register', payload, {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
      // Pas besoin de withCredentials pour Sanctum tokens
    });

    // 4️⃣ Succès : afficher l'alerte APRES la réponse
    if (res.data.token) {
      // Stocker le token et l'utilisateur
      localStorage.setItem('auth_token', res.data.token);
      localStorage.setItem('user', JSON.stringify(res.data.user));
      
      // Configurer Axios pour les futures requêtes
      axios.defaults.headers.common['Authorization'] = `Bearer ${res.data.token}`;
      
      alert('✅ Inscription réussie !');
      
      // Réinitialiser le formulaire
      setForm({ name: '', email: '', password: '', confirmPassword: '' });
      
      // Redirection optionnelle
      // window.location.href = '/dashboard';
            navigate('/login');

    }
    
  } catch (err) {
    // 5️⃣ Gestion robuste des erreurs
    console.error('Erreur complète:', err);
    
    let message = '❌ Erreur de connexion au serveur';
    
    if (err.response) {
      // Le serveur a répondu avec un statut d'erreur
      const errors = err.response.data.errors;
      const apiMessage = err.response.data.message;
      
      if (errors) {
        // Erreurs de validation (422)
        message = Object.values(errors)
          .flat()
          .join('\n');
      } else if (apiMessage) {
        message = '❌ ' + apiMessage;
      }
    } else if (err.request) {
      // La requête est partie mais pas de réponse (CORS, serveur down...)
      message = '❌ Aucune réponse du serveur. Vérifiez que Laravel tourne sur http://localhost:8000';
    }
    
    alert(message);
  }
};
  return (
    <PublicLayout>
      <section className="hero-section" data-animate>
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-lg-8 text-center">
              <div className="hero-panel">
                <h1 className="hero-title">
                  Rejoignez <span>Groupe Scolaire Bab El firdaouss</span>
                </h1>
                <p className="hero-text">
                  Créez votre compte et accédez à toutes les fonctionnalités de notre plateforme éducative.
                  Inscrivez-vous dès maintenant pour commencer votre parcours.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-5" data-animate>
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-lg-6">
              <div className="map-card p-5">
                <h3 className="text-center mb-4">Créer un compte</h3>
                <form onSubmit={handleSubmit}>
                  <div className="mb-4">
                    <label className="form-label fw-semibold">Nom complet</label>
                    <div className="input-group">
                      <span className="input-group-text">
                        <User size={18} />
                      </span>
                      <input
                        type="text"
                        name="name"
                        className="form-control form-control-lg"
                        placeholder="Votre nom complet"
                        value={form.name}
                        onChange={handleChange}
                        required
                      />
                    </div>
                  </div>
                  <div className="mb-4">
                    <label className="form-label fw-semibold">Adresse email</label>
                    <div className="input-group">
                      <span className="input-group-text">
                        <Mail size={18} />
                      </span>
                      <input
                        type="email"
                        name="email"
                        className="form-control form-control-lg"
                        placeholder="votre.email@exemple.com"
                        value={form.email}
                        onChange={handleChange}
                        required
                      />
                    </div>
                  </div>
                  <div className="mb-4">
                    <label className="form-label fw-semibold">Mot de passe</label>
                    <div className="input-group">
                      <span className="input-group-text">
                        <Lock size={18} />
                      </span>
                      <input
                        type="password"
                        name="password"
                        className="form-control form-control-lg"
                        placeholder="Votre mot de passe"
                        value={form.password}
                        onChange={handleChange}
                        required
                      />
                    </div>
                  </div>
                  <div className="mb-4">
                    <label className="form-label fw-semibold">Confirmer le mot de passe</label>
                    <div className="input-group">
                      <span className="input-group-text">
                        <Lock size={18} />
                      </span>
                      <input
                        type="password"
                        name="confirmPassword"
                        className="form-control form-control-lg"
                        placeholder="Confirmez votre mot de passe"
                        value={form.confirmPassword}
                        onChange={handleChange}
                        required
                      />
                    </div>
                  </div>
                  <button type="submit" className="public-button w-100 d-flex align-items-center justify-content-center gap-2">
                    S'inscrire maintenant
                    <ArrowRight size={18} />
                  </button>
                </form>
                <div className="text-center mt-4">
                  <p className="mb-0">
                    Déjà un compte ?{' '}
                    <Link to="/login" className="text-decoration-none fw-semibold">
                      Se connecter
                    </Link>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </PublicLayout>
  );
}
