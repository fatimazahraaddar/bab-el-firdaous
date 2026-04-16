import PublicLayout from '../../pages/Layouts/PublicLayouts';
import { useState } from 'react';
import { MapPin, Phone, Mail, Send, MessageCircle } from 'lucide-react';

export default function ContactPage() {
  const [form, setForm] = useState({
    name: '',
    email: '',
    message: ''
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert('Message envoyé !');
    setForm({ name: '', email: '', message: '' });
  };

  return (
    <PublicLayout>
      <section className="hero-section" data-animate>
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-lg-8 text-center">
              <div className="hero-panel">
                <h1 className="hero-title">
                  Contactez-nous
                </h1>
                <p className="hero-text">
                  Nous sommes là pour vous aider. Envoyez-nous un message et nous vous répondrons rapidement.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-5" data-animate>
        <div className="container">
          <div className="section-heading text-center mb-5">
            <h2>Contact rapide</h2>
            <p>Choisissez un canal et envoyez votre demande en quelques clics.</p>
          </div>
          <div className="row g-4 align-items-start">
            <div className="col-lg-5" data-animate>
              <div className="contact-info p-4 mb-4 mb-lg-0">
                <h4>Entrer en contact</h4>
                <p className="text-muted mb-4">
                  Notre équipe est disponible pour vous accompagner et répondre à toutes vos questions.
                </p>

                <div className="row g-3">
                  <div className="col-12">
                    <div className="contact-card p-4 hover-card" data-animate>
                      <div className="d-flex align-items-start gap-3">
                        <div className="contact-card-icon">
                          <MapPin size={20} />
                        </div>
                        <div>
                          <h6>Adresse</h6>
                          <p className="text-muted mb-0">Boulevard oum rabiaa, oulfa , Casablanca ,Morocco</p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-12">
                    <div className="contact-card p-4 hover-card" data-animate>
                      <div className="d-flex align-items-start gap-3">
                        <div className="contact-card-icon">
                          <Phone size={20} />
                        </div>
                        <div>
                          <h6>Téléphone</h6>
                          <p className="text-muted mb-0">+212 5 27 29 79 08</p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-12">
                    <div className="contact-card p-4 hover-card" data-animate>
                      <div className="d-flex align-items-start gap-3">
                        <div className="contact-card-icon">
                          <Mail size={20} />
                        </div>
                        <div>
                          <h6>Email</h6>
                          <p className="text-muted mb-0">contact@ecole.com</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="col-lg-7" data-animate>
              <div className="contact-form p-4">
                <h4>Envoyer un message</h4>
                <p className="text-muted mb-4">
                  Remplissez le formulaire ci-dessous et nous reviendrons vers vous très rapidement.
                </p>

                <form onSubmit={handleSubmit}>
                  <div className="mb-4">
                    <label className="form-label">Nom</label>
                    <input
                      type="text"
                      name="name"
                      className="form-control rounded-4 form-control-lg"
                      placeholder="Votre nom"
                      value={form.name}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  <div className="mb-4">
                    <label className="form-label">Email</label>
                    <input
                      type="email"
                      name="email"
                      className="form-control rounded-4 form-control-lg"
                      placeholder="Votre email"
                      value={form.email}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  <div className="mb-4">
                    <label className="form-label">Message</label>
                    <textarea
                      name="message"
                      className="form-control rounded-4 form-control-lg"
                      rows="6"
                      placeholder="Votre message"
                      value={form.message}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  <button type="submit" className="public-button w-100 py-3 d-flex justify-content-center align-items-center gap-2">
                    <Send size={18} />
                    Envoyer
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-5 bg-light" data-animate>
        <div className="container">
          <div className="section-heading text-center mb-4">
            <h2>Notre emplacement</h2>
            <p>Retrouvez-nous facilement grâce à la carte interactive.</p>
          </div>
          <div className="map-card rounded-4 shadow-sm overflow-hidden" data-animate>
            <iframe
              title="map"
              src="103 BD d'Oued Oum Rabia, Arrondissement de Hay Hassani, 20640 Casablanca, Maroc"
              loading="lazy"
            />
          </div>
        </div>
      </section>
      <a
        href="https://wa.me/212600000000"
        target="_blank"
        rel="noopener noreferrer"
        className="whatsapp-fixed d-inline-flex align-items-center gap-2"
      >
        <MessageCircle size={20} />
        Contactez-nous
      </a>
    </PublicLayout>
  );
}
