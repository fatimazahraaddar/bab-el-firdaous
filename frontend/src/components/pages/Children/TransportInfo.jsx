import DashboardLayout from "../../pages/Layouts/DashboardLayout";
import { useEffect, useState } from "react";
import axios from "axios";

export default function TransportInfo() {

  const [transport, setTransport] = useState(null);
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTransport = async () => {
      try {
        const token = localStorage.getItem("token");

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
        const student = user.student_profile || user.studentProfile;

        // 🚶 pas de transport
        if (!student || !student.bus) {
          setTransport({ type: "Pieton" });
          setStudents([]);
          return;
        }

        const bus = student.bus;

        // 🚌 transport
        setTransport({
          type: "Bus",
          busNumber: bus.number,
          driver: bus.driver_name,
          phone: bus.phone || "—",
          morningTime: bus.morning_time || "07:30",
          returnTime: bus.return_time || "17:00",
          status: bus.status || "En route"
        });

        // 👨‍🎓 élèves du bus
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

  // 🔄 loading
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
          <h2>🚌 Transport Info</h2>
          <p>Suivi détaillé de votre transport scolaire</p>
        </div>

        {/* STATUS */}
        <div className="card shadow p-3 mb-4 d-flex justify-content-between align-items-center flex-row">
          <h5 className="mb-0">🚦 Statut du transport</h5>

          <span className={`badge ${
            transport?.status === "En route"
              ? "bg-warning"
              : "bg-success"
          }`}>
            {transport?.type === "Bus"
              ? transport.status
              : "🚶 Piéton"}
          </span>
        </div>

        {/* BUS INFO */}
        {transport?.type === "Bus" && (
          <div className="row mb-4">

            <div className="col-md-3">
              <div className="card shadow p-3 text-center">
                <h6>Bus</h6>
                <h4>🚌 {transport.busNumber}</h4>
              </div>
            </div>

            <div className="col-md-3">
              <div className="card shadow p-3 text-center">
                <h6>Chauffeur</h6>
                <h5>{transport.driver}</h5>
                <a
                  href={`tel:${transport.phone}`}
                  className="btn btn-sm btn-success mt-2"
                >
                  📞 Appeler
                </a>
              </div>
            </div>

            <div className="col-md-3">
              <div className="card shadow p-3 text-center">
                <h6>Matin</h6>
                <h5>{transport.morningTime}</h5>
              </div>
            </div>

            <div className="col-md-3">
              <div className="card shadow p-3 text-center">
                <h6>Retour</h6>
                <h5>{transport.returnTime}</h5>
              </div>
            </div>

          </div>
        )}

        {/* STUDENTS */}
        {transport?.type === "Bus" && (
          <div className="card shadow p-3 mb-4">
            <h5>👨‍🎓 Élèves du bus</h5>

            <div className="row mt-3">
              {students.length > 0 ? (
                students.map((s) => (
                  <div key={s.id} className="col-md-3 mb-2">
                    <div className="card p-2 text-center">
                      👤 {s.name}
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-muted">Aucun élève trouvé</p>
              )}
            </div>
          </div>
        )}

        {/* INFO */}
        <div className="card shadow p-3">
          <h5>ℹ️ Informations importantes</h5>

          <ul className="mt-3">
            <li>Arriver 5 minutes avant l'heure</li>
            <li>Respecter les règles du bus</li>
            <li>Contacter l’administration en cas de problème</li>
          </ul>
        </div>

      </div>

    </DashboardLayout>
  );
}