import DashboardLayout from '../../pages/Layouts/DashboardLayout';
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from 'axios';

export default function Students() {
  const navigate = useNavigate();
  
  // États
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [search, setSearch] = useState('');
  const [filters, setFilters] = useState({ level: '', transport: '' });
  const [pagination, setPagination] = useState({ current_page: 1, last_page: 1 });

  // 🔄 Charger les élèves au montage
  useEffect(() => {
    fetchStudents();
  }, [search, filters, pagination.current_page]);

  const fetchStudents = async () => {
    setLoading(true);
    setError('');
    
    try {
      const user = JSON.parse(localStorage.getItem('user'));
      const token = user?.token;

      if (!token) {
        throw new Error('Session expirée');
      }

      // Paramètres de requête
      const params = new URLSearchParams({
        page: pagination.current_page,
        ...(search && { search }),
        ...(filters.level && { level: filters.level }),
        ...(filters.transport && { transport: filters.transport }),
      });

      const response = await axios.get(
        `http://localhost:8000/api/admin/students?${params}`,
        {
          headers: {
            'Accept': 'application/json',
            'Authorization': `Bearer ${token}`
          }
        }
      );

      setStudents(response.data.data); // Laravel pagination: data est dans .data
      setPagination({
        current_page: response.data.current_page,
        last_page: response.data.last_page,
        total: response.data.total
      });

    } catch (err) {
      console.error('Erreur chargement élèves:', err);
      
      if (err.response?.status === 401) {
        localStorage.removeItem('user');
        navigate('/login');
      } else {
        setError('❌ Impossible de charger la liste des élèves');
      }
    } finally {
      setLoading(false);
    }
  };

  // 🗑️ Supprimer un élève
  const handleDelete = async (id) => {
    if (!window.confirm("Supprimer définitivement cet élève ?")) return;
    
    try {
      const user = JSON.parse(localStorage.getItem('user'));
      
      await axios.delete(`http://localhost:8000/api/admin/students/${id}`, {
        headers: {
          'Authorization': `Bearer ${user?.token}`
        }
      });
      
      // Retirer l'élève de la liste locale
      setStudents(prev => prev.filter(s => s.id !== id));
      
    } catch (err) {
      console.error('Erreur suppression:', err);
      alert('❌ Échec de la suppression');
    }
  };

  // 🔍 Gestion recherche
  const handleSearch = (e) => {
    setSearch(e.target.value);
    setPagination(p => ({ ...p, current_page: 1 })); // Reset page 1
  };

  // 🎛️ Gestion filtres
  const handleFilterChange = (name, value) => {
    setFilters(prev => ({ ...prev, [name]: value }));
    setPagination(p => ({ ...p, current_page: 1 }));
  };

  // 📄 Pagination
  const goToPage = (page) => {
    if (page < 1 || page > pagination.last_page) return;
    setPagination(p => ({ ...p, current_page: page }));
  };

  return (
    <DashboardLayout userRole="admin" userName="Admin User">
      <div className="container-fluid">

        {/* Header */}
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h2>Liste des élèves</h2>
          <button
            onClick={() => navigate('/admin/students/create')}
            className="btn btn-primary"
          >
            + Ajouter élève
          </button>
        </div>

        {/* Filtres & Recherche */}
        <div className="card shadow p-3 mb-4">
          <div className="row g-3">
            {/* 🔍 Recherche */}
            <div className="col-md-4">
              <input
                type="text"
                className="form-control"
                placeholder="Rechercher par nom ou email..."
                value={search}
                onChange={handleSearch}
              />
            </div>
            
            {/* 🎓 Filtre niveau */}
            <div className="col-md-3">
              <select
                className="form-select"
                value={filters.level}
                onChange={(e) => handleFilterChange('level', e.target.value)}
              >
                <option value="">Tous les niveaux</option>
                <option value="maternelle">Maternelle</option>
                <option value="primaire">Primaire</option>
                <option value="college">Collège</option>
                <option value="lycee">Lycée</option>
              </select>
            </div>
            
            {/* 🚌 Filtre transport */}
            <div className="col-md-3">
              <select
                className="form-select"
                value={filters.transport}
                onChange={(e) => handleFilterChange('transport', e.target.value)}
              >
                <option value="">Tous les transports</option>
                <option value="pieton">Piéton</option>
                <option value="bus">Bus scolaire</option>
              </select>
            </div>
            
            {/* 🔄 Bouton réinitialiser */}
            <div className="col-md-2">
              <button
                className="btn btn-outline-secondary w-100"
                onClick={() => {
                  setSearch('');
                  setFilters({ level: '', transport: '' });
                }}
              >
                Réinitialiser
              </button>
            </div>
          </div>
        </div>

        {/* Message d'erreur */}
        {error && (
          <div className="alert alert-danger">{error}</div>
        )}

        {/* Tableau */}
        <div className="card shadow p-3">
          {loading ? (
            // ⏳ Loading state
            <div className="text-center py-5">
              <div className="spinner-border text-primary" role="status">
                <span className="visually-hidden">Chargement...</span>
              </div>
              <p className="mt-2">Chargement des élèves...</p>
            </div>
          ) : students.length > 0 ? (
            <>
              <table className="table table-hover align-middle">
                <thead>
                  <tr>
                    <th>Nom</th>
                    <th>Classe</th>
                    <th>Parent</th>
                    <th>Téléphone</th>
                    <th>Transport</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {students.map((student) => (
                    <tr key={student.id}>
                      <td>
                        <strong>{student.name}</strong>
                        {student.email && (
                          <div className="text-muted small">{student.email}</div>
                        )}
                      </td>
                      <td>
                        <span className="badge bg-info text-dark">
                          {student.class}
                        </span>
                      </td>
                      <td>
                        {student.parent?.name || 'Non assigné'}
                      </td>
                      <td>{student.phone || '-'}</td>
                      <td>
                        {student.transport === "bus" ? (
                          <span className="badge bg-primary">
                            🚌 {student.bus}
                          </span>
                        ) : (
                          <span className="badge bg-secondary">
                            🚶 Piéton
                          </span>
                        )}
                      </td>
                      <td>
                        <button
                          onClick={() => navigate(`/admin/students/${student.id}`)}
                          className="btn btn-sm btn-outline-primary me-1"
                          title="Voir"
                        >
                          👁
                        </button>
                        <button
                          onClick={() => navigate(`/admin/students/edit/${student.id}`)}
                          className="btn btn-sm btn-outline-warning me-1"
                          title="Modifier"
                        >
                          ✏️
                        </button>
                        <button
                          onClick={() => handleDelete(student.id)}
                          className="btn btn-sm btn-outline-danger"
                          title="Supprimer"
                        >
                          🗑
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>

              {/* 📄 Pagination */}
              {pagination.last_page > 1 && (
                <nav className="mt-3">
                  <ul className="pagination justify-content-center mb-0">
                    <li className={`page-item ${pagination.current_page === 1 ? 'disabled' : ''}`}>
                      <button className="page-link" onClick={() => goToPage(pagination.current_page - 1)}>
                        Précédent
                      </button>
                    </li>
                    
                    {[...Array(pagination.last_page)].map((_, i) => (
                      <li key={i+1} className={`page-item ${pagination.current_page === i+1 ? 'active' : ''}`}>
                        <button className="page-link" onClick={() => goToPage(i+1)}>
                          {i+1}
                        </button>
                      </li>
                    ))}
                    
                    <li className={`page-item ${pagination.current_page === pagination.last_page ? 'disabled' : ''}`}>
                      <button className="page-link" onClick={() => goToPage(pagination.current_page + 1)}>
                        Suivant
                      </button>
                    </li>
                  </ul>
                </nav>
              )}
            </>
          ) : (
            // 📭 Aucun résultat
            <div className="text-center py-5">
              <p className="text-muted">Aucun élève trouvé</p>
              <button 
                className="btn btn-primary"
                onClick={() => navigate('/admin/students/create')}
              >
                + Ajouter un élève
              </button>
            </div>
          )}
        </div>

      </div>
    </DashboardLayout>
  );
}