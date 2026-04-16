import DashboardLayout from '../../pages/Layouts/DashboardLayout';
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function AddParent() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    phone: "",
    email: "",
    job: ""
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(form);

    navigate('/admin/parents');
  };

  return (
    <DashboardLayout userRole="admin" userName="Admin User">
      <div className="container-fluid">

        <h2 className="mb-4">Ajouter parent</h2>

        <div className="card shadow p-4">

          <form onSubmit={handleSubmit}>

            <input type="text" name="name" className="form-control mb-3" placeholder="Nom" onChange={handleChange} />
            <input type="text" name="phone" className="form-control mb-3" placeholder="Téléphone" onChange={handleChange} />
            <input type="email" name="email" className="form-control mb-3" placeholder="Email" onChange={handleChange} />
            <input type="text" name="job" className="form-control mb-3" placeholder="Profession" onChange={handleChange} />

            <div className="text-end">
              <button className="btn btn-primary">Enregistrer</button>
            </div>

          </form>

        </div>

      </div>
    </DashboardLayout>
  );
}
