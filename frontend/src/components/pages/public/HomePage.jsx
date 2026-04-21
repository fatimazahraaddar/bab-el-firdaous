import PublicLayout from '../../pages/Layouts/PublicLayouts';
import { Link } from 'react-router-dom';
import { Award, BookOpen, Bell, ShieldCheck, Sparkles, Users, School, ArrowRight } from 'lucide-react';

const features = [
  {
    title: 'Enseignement de qualité',
    description: 'Des programmes modernes adaptés aux besoins des élèves avec une pédagogie active.',
    icon: Sparkles,
  },
  {
    title: 'Encadrement pédagogique',
    description: 'Une équipe éducative expérimentée accompagnant chaque élève dans sa réussite.',
    icon: Users,
  },
  {
    title: 'Environnement sécurisé',
    description: 'Un cadre scolaire sûr, sain et favorable au bien-être des élèves.',
    icon: ShieldCheck,
  },
  {
    title: 'Suivi et réussite',
    description: 'Un accompagnement personnalisé pour garantir la progression et la réussite scolaire.',
    icon: Award,
  },
];

const announcements = [
  {
    id: 1,
    title: 'Journée portes ouvertes',
    date: '2026-05-12',
    excerpt: 'Rencontrez nos enseignants et découvrez nos installations modernes.',
  },
  {
    id: 2,
    title: 'Lancement du programme STEM',
    date: '2026-05-20',
    excerpt: 'Un parcours science et technologie pour stimuler chaque élève.',
  },
  {
    id: 3,
    title: 'Concours artistique',
    date: '2026-06-02',
    excerpt: 'Semaine dédiée à la créativité, au design et à l’expression.',
  },
];

export default function HomePage() {
  return (
    <PublicLayout>
      <section className="hero-section" data-animate>
        <div className="container">
          <div className="row align-items-center gy-5">
            <div className="col-lg-6">
              <div className="hero-panel">
                <div className="hero-badge">Éducation premium</div>
                <h1 className="hero-title">
                  Une école moderne pour <span>chaque élève</span>
                </h1>
                <p className="hero-text">
                  Bab el firdaouss combine innovation pédagogique, accompagnement personnalisé et campus connecté pour préparer les élèves au monde de demain.
                </p>
                <div className="hero-actions">
                  <Link to="/contact" className="public-button">
                    Contactez-nous
                  </Link>
                  <Link to="/about" className="public-button-outline">
                    En savoir plus
                  </Link>
                </div>
                <div className="hero-stats mt-5">
                  <div className="hero-stat">
                    <strong>1,200+</strong>
                    Élèves engagés
                  </div>
                  <div className="hero-stat">
                    <strong>95%</strong>
                    Taux de réussite
                  </div>
                  <div className="hero-stat">
                    <strong>80+</strong>
                    Enseignants experts
                  </div>
                  <div className="hero-stat">
                    <strong>16</strong>
                    Classes connectées
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-6" data-animate>
              <div className="map-card p-4">
                <div className="d-flex justify-content-between align-items-center mb-4">
                  <div>
                    <p className="text-primary small mb-1">Campus intelligent</p>
                    <h2 className="h4 mb-0">Une gestion scolaire simple et intelligente</h2>
                  </div>
                  <School size={32} className="text-primary" />
                </div>
                <p className="text-muted mb-4">
                 Gérez les élèves, paiements, absences et communications en toute simplicité grâce à notre plateforme moderne.
                </p>
                <div className="row g-3">
                  <div className="col-6">
                    <div className="info-card p-4 d-flex justify-content-between align-items-center">
                      <p className="text-muted mb-0">Gestion des élèves</p>
                      <h5 className="mb-0">Suivi complet des informations
</h5>
                    </div>
                  </div>
                  <div className="col-6">
                    <div className="info-card p-4 d-flex justify-content-between align-items-center">
                      <p className="text-muted mb-0">Paiements simplifiés</p>
                      <h5 className="mb-0">Gestion rapide et sécurisée</h5>
                    </div>
                  </div>
                  <div className="col-6">
                    <div className="info-card p-4 d-flex justify-content-between align-items-center">
                      <p className="text-muted mb-0">Suivi des absences</p>
                      <h5 className="mb-0">Contrôle en temps réel</h5>
                    </div>
                  </div>
                  <div className="col-6">
                    <div className="info-card p-4 d-flex justify-content-between align-items-center">
                      <p className="text-muted mb-0">Communication</p>
                      <h5 className="mb-0">Messagerie entre parents et école</h5>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-5" data-animate>
        <div className="container">
          <div className="section-heading text-center">
            <h2>Nos atouts clés</h2>
            <p>Une pédagogie inspirante, un accompagnement humain et un cadre stimulant.</p>
          </div>
          <div className="feature-grid row g-4">
            {features.map((feature) => {
              const Icon = feature.icon;
              return (
                <div key={feature.title} className="col-12 col-md-6 col-lg-4 mb-4">
                  <div className="feature-card h-100">
                    <div className="feature-icon">
                      <Icon size={24} />
                    </div>
                    <h5>{feature.title}</h5>
                    <p>{feature.description}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="py-5 bg-light" data-animate>
        <div className="container">
          <div className="section-heading text-center">
            <h2>Actualités & annonces</h2>
            <p>Ce qui se prépare sur le campus et les temps forts à ne pas manquer.</p>
          </div>
          <div className="announcement-grid row g-4">
            {announcements.map((announcement) => (
              <div key={announcement.id} className="col-12 col-md-6 col-lg-4 mb-4">
                <article className="announcement-card h-100 p-4">
                  <div className="announcement-icon mb-3">
                    <Bell size={22} />
                  </div>
                  <p className="announcement-meta">{new Date(announcement.date).toLocaleDateString('fr-FR')}</p>
                  <h5>{announcement.title}</h5>
                  <p>{announcement.excerpt}</p>
                  <Link className="public-button-outline mt-3 d-inline-flex align-items-center gap-2" to="/announcements">
                    Voir l’annonce <ArrowRight size={16} />
                  </Link>
                </article>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-5" data-animate>
        <div className="container">
          <div className="cta-banner">
            <h3>Prêt à découvrir l’expérience SchoolHub ?</h3>
            <p>Rejoignez un établissement où l’excellence rime avec bienveillance et créativité.</p>
            <Link to="/register" className="public-button">
              Inscription rapide
            </Link>
          </div>
        </div>
      </section>
    </PublicLayout>
  );
}
