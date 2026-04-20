import DashboardLayout from "../../pages/Layouts/DashboardLayout";
import { useEffect, useState } from "react";
import axios from "axios";

export default function StudentTransport() {

  const [transport, setTransport] = useState(null);
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTransport = async () => {
      try {
        const token = localStorage.getItem("token");

        // 🔥 récupérer user + student profile
        const res = await axios.get(
          "http://localhost:8000/api/user",
          {
            headers: {
              Authorization: `Bearer ${token}`,
              Accept: "application/json"
            }
          }
        );

        const user = res.data;

        // ⚠️ vérifie studentProfile (Laravel relation)
        const student = user.student_profile || user.studentProfile;

        if (!student || !student.bus) {
          setTransport({ type: "Pieton" });
          setStudents([]);
          return;
        }

        const bus = student.bus;

        // ✅ infos transport
        setTransport({
          type: "Bus",
          busNumber: bus.number,
          driver: bus.driver_name,
          phone: bus.phone || "—",
          schedule: bus.schedule || "—"
        });

        // ✅ élèves du bus
        if (bus.students) {
          setStudents(bus.students);
        }

      } catch (err) {
        console.error("Erreur transport:", err.response?.data || err);
      } finally {
        setLoading(false);
      }
    };

    fetchTransport();
  }, []);

  // 🔄 LOADING
  if (loading) {
    return (
      <DashboardLayout userRole="student" userName="Student User">
        <div className="p-4">Chargement transport...</div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout userRole="student" userName="Student User">

      <div className="container-fluid">

        {/* HEADER */}
        <div className="mb-4">
          <h2>🚌 Transport scolaire</h2>
          <p>Informations sur votre transport</p>
        </div>

        {/* STATUS */}
        <div className="card shadow p-3 mb-4">
          <h5>🚦 Statut</h5>

          {transport?.type === "Bus" ? (
            <span className="badge bg-success mt-2">
              🚌 Transport actif
            </span>
          ) : (
            <span className="badge bg-secondary mt-2">
              🚶 Piéton
            </span>
          )}
        </div>

        {/* BUS INFO */}
        {transport?.type === "Bus" && (
          <div className="row mb-4">

            <div className="col-md-3">
              <div className="card shadow p-3">
                <h6>Bus</h6>
                <h5>{transport.busNumber}</h5>
              </div>
            </div>

            <div className="col-md-3">
              <div className="card shadow p-3">
                <h6>Chauffeur</h6>
                <h5>{transport.driver}</h5>
              </div>
            </div>

            <div className="col-md-3">
              <div className="card shadow p-3">
                <h6>Téléphone</h6>
                <h6>{transport.phone}</h6>
              </div>
            </div>

            <div className="col-md-3">
              <div className="card shadow p-3">
                <h6>Horaire</h6>
                <h6>{transport.schedule}</h6>
              </div>
            </div>

          </div>
        )}

        {/* STUDENTS LIST */}
        {transport?.type === "Bus" && (
          <div className="card shadow p-3">
            <h5>👨‍🎓 Élèves dans le bus</h5>

            <table className="table mt-3">
              <thead>
                <tr>
                  <th>Nom</th>
                </tr>
              </thead>

              <tbody>
                {students.length > 0 ? (
                  students.map((student) => (
                    <tr key={student.id}>
                      <td>{student.name}</td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td className="text-muted">
                      Aucun élève trouvé
                    </td>
                  </tr>
                )}
              </tbody>

            </table>
          </div>
        )}

      </div>

    </DashboardLayout>
  );
}