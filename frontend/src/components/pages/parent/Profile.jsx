import DashboardLayout from "../../pages/Layouts/DashboardLayout";
import { useState } from "react";

export default function ParentProfile() {

  const [parent, setParent] = useState({
    name: "Mohamed Ali",
    email: "parent@email.com",
    phone: "0600000000",
    children: ["Ahmed Ali", "Sara Ali"],
    photo: null
  });

  const [preview, setPreview] = useState("https://via.placeholder.com/120");
  const [editing, setEditing] = useState(false);

  const handleChange = (e) => {
    setParent({ ...parent, [e.target.name]: e.target.value });
  };

  // 📸 upload photo
  const handlePhoto = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setParent({ ...parent, photo: file });
    setPreview(URL.createObjectURL(file));
  };

  const save = () => {
    console.log(parent);
    setEditing(false);
    alert("Profil mis à jour !");
  };

  return (
    <DashboardLayout userRole="parent" userName={parent.name}>
      <div className="container-fluid">

        {/* HEADER */}
        <div className="mb-4">
          <h2>👨‍👩‍👧 Profil Parent</h2>
          <p>Gérer vos informations</p>
        </div>

        <div className="row">

          {/* LEFT */}
          <div className="col-md-4">
            <div className="card shadow p-4 text-center">

              <img
                src={preview}
                alt="profile"
                className="rounded-circle mb-3"
                style={{ width: "120px", height: "120px", objectFit: "cover" }}
              />

              <h5>{parent.name}</h5>

              <span className="badge bg-primary">
                👨‍👩‍👧 Parent
              </span>

              <input
                type="file"
                className="form-control mt-3"
                accept="image/*"
                onChange={handlePhoto}
              />

            </div>
          </div>

          {/* RIGHT */}
          <div className="col-md-8">
            <div className="card shadow p-4">

              <div className="d-flex justify-content-between mb-3">
                <h5>Informations</h5>

                {!editing ? (
                  <button
                    className="btn btn-warning"
                    onClick={() => setEditing(true)}
                  >
                    ✏️ Modifier
                  </button>
                ) : (
                  <button
                    className="btn btn-success"
                    onClick={save}
                  >
                    💾 Enregistrer
                  </button>
                )}
              </div>

              <div className="row">

                <div className="col-md-6 mb-3">
                  <label>Nom</label>
                  <input
                    type="text"
                    name="name"
                    className="form-control"
                    value={parent.name}
                    disabled={!editing}
                    onChange={handleChange}
                  />
                </div>

                <div className="col-md-6 mb-3">
                  <label>Email</label>
                  <input
                    type="email"
                    name="email"
                    className="form-control"
                    value={parent.email}
                    disabled={!editing}
                    onChange={handleChange}
                  />
                </div>

                <div className="col-md-6 mb-3">
                  <label>Téléphone</label>
                  <input
                    type="text"
                    name="phone"
                    className="form-control"
                    value={parent.phone}
                    disabled={!editing}
                    onChange={handleChange}
                  />
                </div>

                <div className="col-md-12 mb-3">
                  <label>Enfants</label>
                  <ul className="list-group">
                    {parent.children.map((child, i) => (
                      <li key={i} className="list-group-item">
                        👨‍🎓 {child}
                      </li>
                    ))}
                  </ul>
                </div>

              </div>

            </div>
          </div>

        </div>

      </div>
    </DashboardLayout>
  );
}
