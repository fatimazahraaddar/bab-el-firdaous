import PublicLayout from '../../pages/Layouts/PublicLayouts';
import { Link } from 'react-router-dom';
import { Bell, Calendar, Search, Filter } from 'lucide-react';
import { useState, useEffect } from 'react';

export default function AnnouncementsPage() {
  const [announcements, setAnnouncements] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('Tous');
  const [loading, setLoading] = useState(true);

  // 🔥 FETCH DATA FROM BACKEND
  useEffect(() => {
    fetch("http://localhost:5000/api/announcements")
      .then(res => res.json())
      .then(data => {
        setAnnouncements(data);
        setLoading(false);
      })
      .catch(err => {
        console.error("Erreur API:", err);
        setLoading(false);
      });
  }, []);

  // 🔥 catégories dynamiques
  const categories = ['Tous', ...new Set(announcements.map(a => a.category))];

  // 🔥 filtre + recherche
  const filteredAnnouncements = announcements.filter(announcement => {
    const matchesSearch =
      announcement.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      announcement.content.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesCategory =
      selectedCategory === 'Tous' ||
      announcement.category === selectedCategory;

    return matchesSearch && matchesCategory;
  });

  return (
    <PublicLayout>

      {/* HERO */}
      <section className="hero-section" data-animate>
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-lg-8 text-center">
              <div className="hero-panel">
                <h1 className="hero-title">
                  Annonces & <span>actualités</span>
                </h1>
                <p className="hero-text">
                  Restez informés de toutes les nouvelles et événements importants de notre établissement scolaire.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FILTER */}
      <section className="py-5" data-animate>
        <div className="container">

          <div className="filters-section mb-5">
            <div className="row justify-content-center">
              <div className="col-lg-8">
                <div className="search-filter-card p-4">
                  <div className="row g-3">

                    {/* SEARCH */}
                    <div className="col-md-8">
                      <div className="search-input-group">
                        <Search size={20} className="search-icon" />
                        <input
                          type="text"
                          className="form-control search-input"
                          placeholder="Rechercher une annonce..."
                          value={searchTerm}
                          onChange={(e) => setSearchTerm(e.target.value)}
                        />
                      </div>
                    </div>

                    {/* FILTER */}
                    <div className="col-md-4">
                      <div className="filter-select-group">
                        <Filter size={20} className="filter-icon" />
                        <select
                          className="form-select filter-select"
                          value={selectedCategory}
                          onChange={(e) => setSelectedCategory(e.target.value)}
                        >
                          {categories.map(category => (
                            <option key={category} value={category}>
                              {category}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>

                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* 🔥 LOADING */}
          {loading ? (
            <div className="text-center py-5">
              <h3>Chargement...</h3>
            </div>
          ) : filteredAnnouncements.length > 0 ? (

            <div className="announcement-grid row g-4">
              {filteredAnnouncements.map((announcement, index) => (
                <div
                  key={announcement._id || announcement.id}
                  className="col-12 col-md-6 col-lg-4"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <article className="announcement-card h-100 p-4">

                    <div className="announcement-icon mb-3">
                      <Bell size={22} />
                    </div>

                    <div className="category-badge mb-3">
                      <span className="badge bg-primary">
                        {announcement.category}
                      </span>
                    </div>

                    <h5 className="announcement-title">
                      {announcement.title}
                    </h5>

                    <p className="announcement-meta">
                      <Calendar size={16} className="me-2" />
                      {new Date(announcement.date).toLocaleDateString('fr-FR', {
                        weekday: 'long',
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                      })}
                    </p>

                    <p className="announcement-excerpt">
                      {announcement.content}
                    </p>

                    <Link
                      to={`/announcements/${announcement._id || announcement.id}`}
                      className="public-button-outline mt-3 d-inline-flex align-items-center gap-2"
                    >
                      Voir l'annonce
                    </Link>

                  </article>
                </div>
              ))}
            </div>

          ) : (

            <div className="text-center py-5">
              <Bell size={64} className="text-muted mb-4" />
              <h3>Aucune annonce trouvée</h3>
              <p className="text-muted">
                Essayez de modifier vos critères de recherche.
              </p>
            </div>

          )}
        </div>
      </section>

    </PublicLayout>
  );
}