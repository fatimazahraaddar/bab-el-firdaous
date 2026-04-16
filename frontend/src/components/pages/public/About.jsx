import PublicLayout from "../../pages/Layouts/PublicLayouts";
import { Link } from "react-router-dom";
import {
  Award,
  BookOpen,
  Heart,
  Lightbulb,
  Shield,
  Users,
  Target,
  ArrowRight,
} from "lucide-react";
import logoEcole from "../../../assets/logoEcole.jpg";

const features = [
  {
    title: "Équipe engagée",
    description:
      "Des enseignants passionnés et expérimentés pour accompagner chaque élève.",
    icon: Users,
  },
  {
    title: "Campus sécurisé",
    description:
      "Un environnement protégé et stimulant pour un apprentissage optimal.",
    icon: Shield,
  },
  {
    title: "Innovation pédagogique",
    description:
      "Méthodes modernes et technologies intégrées pour une éducation d'excellence.",
    icon: Lightbulb,
  },
  {
    title: "Valeurs humaines",
    description:
      "Respect, tolérance et bienveillance au cœur de notre communauté.",
    icon: Heart,
  },
];

const timeline = [
  {
    year: "2010",
    title: "Fondation",
    description: "Création de l'école avec une vision moderne de l'éducation.",
  },
  {
    year: "2015",
    title: "Expansion",
    description:
      "Ouverture du collège et développement des programmes académiques.",
  },
  {
    year: "2020",
    title: "Digitalisation",
    description: "Intégration des technologies numériques dans l'enseignement.",
  },
  {
    year: "2025",
    title: "Excellence",
    description:
      "Reconnaissance internationale pour nos résultats académiques.",
  },
];

const values = [
  {
    title: "Notre mission",
    description:
      "Former des citoyens responsables et épanouis pour un avenir meilleur.",
    icon: Target,
  },
  {
    title: "Notre vision",
    description:
      "Être une référence en matière d'éducation innovante et inclusive.",
    icon: Award,
  },
];

export default function AboutPage() {
  return (
    <PublicLayout>
      <section className="hero-section" data-animate>
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-lg-8 text-center">
              <div className="hero-panel">
                <h1 className="hero-title">
                  À propos de <span>notre école</span>
                </h1>
                <p className="hero-text">
                  Découvrez l'histoire et les valeurs qui font le groupe
                  scolaire bab el firdaouss un établissement d'exception, où
                  chaque élève trouve sa place pour s'épanouir et réussir.
                </p>
                <Link to="/contact" className="public-button">
                  Nous contacter
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-5" data-animate>
        <div className="container">
          <div className="row align-items-center gy-5">
            <div className="col-lg-6" data-animate>
              <div className="map-card p-4">
                <img
                  src={logoEcole}
                  className="img-fluid rounded-4 shadow-sm"
                />
              </div>
            </div>
            <div className="col-lg-6" data-animate>
              <div className="content-panel">
                <h2>Notre histoire</h2>
                <p>
                  Le Groupe Scolaire Bab El Firdaous est un établissement privé
                  situé à Casablanca, engagé depuis plusieurs années dans
                  l’excellence éducative et la formation des générations
                  futures. Fondé avec la volonté d’offrir un enseignement de
                  qualité, il propose un environnement d’apprentissage moderne,
                  dynamique et adapté aux besoins des élèves. L’école se
                  distingue par une équipe pédagogique qualifiée et dévouée, qui
                  accompagne chaque élève dans son parcours scolaire et
                  personnel. Grâce à une approche éducative innovante, le Groupe
                  Scolaire Bab El Firdaous met l’accent sur le développement des
                  compétences, l’épanouissement de l’élève et la réussite
                  académique.
                </p>
                 Au-delà de l’enseignement, l’établissement veille
                  à inculquer des valeurs essentielles telles que le respect, la
                  responsabilité et l’esprit d’initiative, afin de former des
                  citoyens responsables et ouverts sur le monde.
                <p>
                </p>
                <div className="mt-4">
                  <strong>Plus de 1200 élèves</strong> nous font confiance
                  chaque année pour leur parcours éducatif.
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-5 bg-light" data-animate>
        <div className="container">
          <div className="section-heading text-center">
            <h2>Ce qui nous distingue</h2>
            <p>
              Un environnement d'apprentissage unique et des méthodes éprouvées.
            </p>
          </div>
          <div className="feature-grid row g-4">
            {features.map((feature) => {
              const Icon = feature.icon;
              return (
                <div
                  key={feature.title}
                  className="col-12 col-md-6 col-lg-3 mb-4"
                >
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

      <section className="py-5" data-animate>
        <div className="container">
          <div className="section-heading text-center">
            <h2>Notre évolution</h2>
            <p>Un parcours marqué par l'innovation et la croissance.</p>
          </div>
          <div className="timeline-container">
            {timeline.map((item) => (
              <div key={item.year} className="timeline-item" data-animate>
                <div className="timeline-marker"></div>
                <div className="timeline-content">
                  <div className="timeline-year">{item.year}</div>
                  <h5>{item.title}</h5>
                  <p>{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-5 bg-light" data-animate>
        <div className="container">
          <div className="section-heading text-center">
            <h2>Mission & Vision</h2>
            <p>Les principes qui guident notre action au quotidien.</p>
          </div>
          <div className="row justify-content-center g-4">
            {values.map((value) => {
              const Icon = value.icon;
              return (
                <div
                  key={value.title}
                  className="col-12 col-md-6 col-lg-5 mb-4"
                >
                  <div className="mission-card h-100">
                    <div className="mission-icon">
                      <Icon size={24} />
                    </div>
                    <h5>{value.title}</h5>
                    <p>{value.description}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="py-5" data-animate>
        <div className="container">
          <div className="cta-banner">
            <h3>Rejoignez notre communauté</h3>
            <p>
              Découvrez comment SchoolHub peut transformer l'avenir de votre
              enfant.
            </p>
            <Link to="/register" className="public-button">
              Inscription en ligne
            </Link>
          </div>
        </div>
      </section>
    </PublicLayout>
  );
}
