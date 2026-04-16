import PublicLayout from '../../pages/Layouts/PublicLayouts';
import { useState } from "react";

export default function ForgotPasswordPage() {

  const [email, setEmail] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    // 🔥 simulation
    alert("Lien de réinitialisation envoyé !");
    setEmail("");
  };

  return (
    <PublicLayout>

      <section className="py-5 bg-light">
        <div className="container">

          <div className="row justify-content-center">

            <div className="col-md-6">

              <div className="card shadow p-4">

                <h3 className="mb-3 text-center">
                  Mot de passe oublié 🔐
                </h3>

                <p className="text-muted text-center mb-4">
                  Entrez votre email pour recevoir un lien de réinitialisation
                </p>

                <form onSubmit={handleSubmit}>

                  {/* EMAIL */}
                  <div className="mb-3">
                    <label>Email</label>
                    <input
                      type="email"
                      className="form-control"
                      placeholder="email@example.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                  </div>

                  {/* BUTTON */}
                  <button className="btn btn-primary w-100">
                    Envoyer le lien
                  </button>

                </form>

                {/* BACK LOGIN */}
                <div className="text-center mt-4">
                  <a href="/login" className="text-primary">
                    ← Retour à la connexion
                  </a>
                </div>

              </div>

            </div>

          </div>

        </div>
      </section>

    </PublicLayout>
  );
}
