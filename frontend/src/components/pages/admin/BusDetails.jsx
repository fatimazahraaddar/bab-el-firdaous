import DashboardLayout from '../../pages/Layouts/DashboardLayout';
import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

export default function BusDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [bus, setBus] = useState(null);
  const [students, setStudents] = useState([]);
  const [allStudents, setAllStudents] = useState([]);
  const [selectedStudent, setSelectedStudent] = useState("");
  const [loading, setLoading] = useState(true);

  // 🔄 FETCH DATA
  useEffect(() => {
    Promise.all([
      fetch(`http://localhost:8000/api/buses/${id}`),
      fetch(`http://localhost:8000/api/students`)
    ])
      .then(async ([busRes, studentsRes]) => {
        const busData = await busRes.json();
        const studentsData = await studentsRes.json();

        setBus(busData);
        setStudents(busData.students || []);
        setAllStudents(studentsData);

        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setLoading(false);
      });
  }, [id]);

  // ➕ Ajouter élève au bus
  const addStudent = async () => {
    if (!selectedStudent) return;

    if (students.length >= bus.capacity) {
      alert("Bus plein !");
      return;
    }

    try {
      await fetch(`http://localhost:8000/api/students/${selectedStudent}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ bus_id: bus.id })
      });

      // refresh
      const updated = allStudents.find(s => s.id == selectedStudent);
      setStudents([...students, updated]);
      setSelectedStudent("");

    } catch (err) {
      console.error(err);
    }
  };

  // ❌ retirer élève du bus
  const removeStudent = async (studentId) => {
    if (!window.confirm("Retirer cet élève ?")) return;

    try {
      await fetch(`http://localhost:8000/api/students/${studentId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ bus_id: null })
      });

      setStudents(students.filter(s => s.id !== studentId));

    } catch (err) {
      console.error(err);
    }
  };

  // ✅ LOADING
  if (loading) {
    return (
      <DashboardLayout>
        <div className="loading">Chargement...</div>
      </DashboardLayout>
    );
  }

  if (!bus) return <p>Bus introuvable</p>;

  return (
    <DashboardLayout>
      <div className="container-fluid">

        {/* Header */}
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h2>Détail du bus</h2>

          <button
            onClick={() => navigate(`/admin/transport/edit/${bus.id}`)}
            className="btn btn-warning"
          >
            ✏️ Modifier
          </button>
        </div>

        <div className="row">

          {/* 🚌 Infos */}
          <div className="col-md-4">
            <div className="card shadow p-3 mb-3">

              <h5>Informations</h5>

              <p><strong>Bus :</strong> {bus.number}</p>
              <p><strong>Chauffeur :</strong> {bus.driver_name}</p>
              <p><strong>Capacité :</strong> {bus.capacity}</p>
              <p><strong>Zone :</strong> {bus.zone}</p>

              <p>
                <strong>Occupation :</strong>{" "}
                <span className={`badge ${students.length >= bus.capacity ? "bg-danger" : "bg-success"}`}>
                  {students.length} / {bus.capacity}
                </span>
              </p>

              {students.length >= bus.capacity && (
                <div className="alert alert-danger mt-2">
                  ⚠️ Bus plein !
                </div>
              )}

            </div>
          </div>

          {/* 👨‍🎓 Liste élèves */}
          <div className="col-md-8">
            <div className="card shadow p-3">

              <h5 className="mb-3">Liste des élèves</h5>

              {/* ➕ Ajouter élève */}
              <div className="row mb-3">
                <div className="col-md-10">
                  <select
                    className="form-select"
                    value={selectedStudent}
                    onChange={(e) => setSelectedStudent(e.target.value)}
                  >
                    <option value="">Choisir un élève</option>
                    {allStudents
                      .filter(s => !s.bus_id)
                      .map(s => (
                        <option key={s.id} value={s.id}>
                          {s.name}
                        </option>
                      ))}
                  </select>
                </div>

                <div className="col-md-2">
                  <button onClick={addStudent} className="btn btn-primary w-100">
                    +
                  </button>
                </div>
              </div>

              {/* TABLE */}
              <table className="table table-hover">
                <thead>
                  <tr>
                    <th>Nom</th>
                    <th>Classe</th>
                    <th>Actions</th>
                  </tr>
                </thead>

                <tbody>
                  {students.map((s) => (
                    <tr key={s.id}>
                      <td>{s.name}</td>
                      <td>{s.class?.name || "-"}</td>

                      <td>
                        <button
                          onClick={() => navigate(`/admin/students/${s.id}`)}
                          className="btn btn-sm btn-outline-primary me-2"
                        >
                          👀
                        </button>

                        <button
                          onClick={() => removeStudent(s.id)}
                          className="btn btn-sm btn-outline-danger"
                        >
                          ❌
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>

              </table>

            </div>
          </div>

        </div>

      </div>
    </DashboardLayout>
  );
}