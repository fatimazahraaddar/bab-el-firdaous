import DashboardLayout from "../../pages/Layouts/DashboardLayout";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function AddStudent() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    level: "",
    class_id: "",
    parent_name: "",
    parent_email: "",
    parent_phone: "",
    phone: "",
    address: "",
    transport: "pieton",
    bus_id: "",
  });

  const [loading, setLoading] = useState(false);

  // 🔄 handle change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  // 🚀 SUBMIT CORRIGÉ
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const token = localStorage.getItem("token");

      const res = await fetch("http://localhost:8000/api/students", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (!res.ok) {
        const errorMsg =
          data?.errors
            ? Object.values(data.errors)[0]?.[0]
            : data?.message;

        alert(errorMsg || "Erreur serveur");
        setLoading(false);
        return;
      }

      // 🔥 SAFE DATA
      const email = data?.parent_login?.email || "N/A";
      const password = data?.parent_login?.password || "N/A";

      alert(`Parent créé\n\nEmail: ${email}\nMot de passe: ${password}`);

      // 🔥 RESET FORM
      setForm({
        name: "",
        email: "",
        password: "",
        level: "",
        class_id: "",
        parent_name: "",
        parent_email: "",
        parent_phone: "",
        phone: "",
        address: "",
        transport: "pieton",
        bus_id: "",
      });

      navigate("/admin/students");

    } catch (err) {
      console.error("SUBMIT ERROR:", err);
      alert("Erreur serveur");
    } finally {
      setLoading(false);
    }
  };

  return (
    <DashboardLayout userRole="admin" userName="Admin User">
      <div className="container-fluid">
        <h2 className="mb-4">Ajouter un élève</h2>

        <div className="card shadow p-4">
          <form onSubmit={handleSubmit}>

            <input
              name="name"
              className="form-control mb-3"
              placeholder="Nom élève"
              onChange={handleChange}
              value={form.name}
              required
            />

            <input
              name="email"
              className="form-control mb-3"
              placeholder="Email élève"
              onChange={handleChange}
              value={form.email}
              required
            />

            <input
              type="password"
              name="password"
              className="form-control mb-3"
              placeholder="Mot de passe élève"
              onChange={handleChange}
              value={form.password}
              required
            />

            {/* Niveau */}
            <select
              name="level"
              className="form-select mb-3"
              onChange={handleChange}
              value={form.level}
              required
            >
              <option value="">Niveau</option>
              <option value="primaire">Primaire</option>
              <option value="college">Collège</option>
              <option value="lycee">Lycée</option>
            </select>

            {/* Classe (manuel) */}
            <select
              name="class_id"
              className="form-select mb-3"
              onChange={handleChange}
              value={form.class_id}
              required
            >
              <option value="">Classe</option>

              <option value="1">1ère année primaire</option>
              <option value="2">2ème année primaire</option>
              <option value="3">3ème année primaire</option>
              <option value="4">4ème année primaire</option>
              <option value="5">5ème année primaire</option>
              <option value="6">6ème année primaire</option>

              <option value="7">1ère année collège</option>
              <option value="8">2ème année collège</option>
              <option value="9">3ème année collège</option>

              <option value="10">Tronc commun</option>
              <option value="11">1ère année bac</option>
              <option value="12">2ème année bac</option>
            </select>

            {/* Parent */}
            <input
              name="parent_name"
              className="form-control mb-3"
              placeholder="Nom du parent"
              onChange={handleChange}
              value={form.parent_name}
              required
            />

            <input
              name="parent_email"
              className="form-control mb-3"
              placeholder="Email du parent"
              onChange={handleChange}
              value={form.parent_email}
              required
            />

            <input
              name="parent_phone"
              className="form-control mb-3"
              placeholder="Téléphone parent"
              onChange={handleChange}
              value={form.parent_phone}
              required
            />

            {/* Élève */}
            <input
              name="phone"
              className="form-control mb-3"
              placeholder="Téléphone élève"
              onChange={handleChange}
              value={form.phone}
            />

            <textarea
              name="address"
              className="form-control mb-3"
              placeholder="Adresse"
              onChange={handleChange}
              value={form.address}
            />

            {/* Bouton */}
            <div className="text-end">
              <button className="btn btn-primary" disabled={loading}>
                {loading ? "Enregistrement..." : "Enregistrer"}
              </button>
            </div>

          </form>
        </div>
      </div>
    </DashboardLayout>
  );
}