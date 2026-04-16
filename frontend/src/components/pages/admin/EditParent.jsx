import DashboardLayout from '../../pages/Layouts/DashboardLayout';
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

export default function EditParent() {
  const navigate = useNavigate();
  const { id } = useParams();

  const [form, setForm] = useState({
    name: "Mohamed Benali",
    phone: "0600000000",
    email: "mohamed@gmail.com",
    job: "Ingénieur"
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Edit ID:", id, form);

    navigate('/admin/parents');
  };

  return (
    <DashboardLayout userRole="admin" userName="Admin User">
      <div className="container-fluid">

        <h2 className="mb-4">Modifier parent</h2>

        <div className="card shadow p-4">

          <form onSubmit={handleSubmit}>

            <input type="text" name="name" value={form.name} className="form-control mb-3" onChange={handleChange} />
            <input type="text" name="phone" value={form.phone} className="form-control mb-3" onChange={handleChange} />
            <input type="email" name="email" value={form.email} className="form-control mb-3" onChange={handleChange} />
            <input type="text" name="job" value={form.job} className="form-control mb-3" onChange={handleChange} />

            <div className="text-end">
              <button className="btn btn-primary">Modifier</button>
            </div>

          </form>

        </div>

      </div>
    </DashboardLayout>
  );
}
