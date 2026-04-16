import DashboardLayout from "../../pages/Layouts/DashboardLayout";
import { useState } from "react";

export default function Profile() {

  const [student, setStudent] = useState({
    name: "Ahmed Ali",
    email: "ahmed@email.com",
    phone: "0600000000",
    class: "3ème A",
    transport: "Bus 2",
    parent: "Mohamed Ali",
    photo: null
  });

  const [preview, setPreview] = useState("https://via.placeholder.com/120");
  const [editing, setEditing] = useState(false);

  const handleChange = (e) => {
    setStudent({ ...student, [e.target.name]: e.target.value });
  };

  // 📸 UPLOAD PHOTO
  const handlePhotoChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setStudent({ ...student, photo: file });

    // preview image
    const imageUrl = URL.createObjectURL(file);
    setPreview(imageUrl);
  };

  const saveProfile = () => {
    setEditing(false);

    console.log("DATA À ENVOYER BACKEND:", student);

    alert("Profil mis à jour !");
  };

  return (
    <DashboardLayout userRole="student" userName={student.name}>
      <div className="container-fluid">

        {/* HEADER */}
        <div className="mb-4">
          <h2>👤 Mon Profil</h2>
          <p>Gérer vos informations personnelles</p>
        </div>

        <div className="row">

          {/* LEFT */}
          <div className="col-md-4">
            <div className="card shadow p-4 text-center">

              {/* IMAGE */}
              <img
                src={preview}
                alt="profile"
                className="rounded-circle mb-3"
                style={{ width: "120px", height: "120px", objectFit: "cover" }}
              />

              <h5>{student.name}</h5>
              <p className="text-muted">{student.class}</p>

              <span className="badge bg-primary mb-2">
                🎓 Étudiant
              </span>

              {/* INPUT FILE */}
              <input
                type="file"
                className="form-control mt-3"
                accept="image/*"
                onChange={handlePhotoChange}
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
                    onClick={saveProfile}
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
                    value={student.name}
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
                    value={student.email}
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
                    value={student.phone}
                    disabled={!editing}
                    onChange={handleChange}
                  />
                </div>

                <div className="col-md-6 mb-3">
                  <label>Classe</label>
                  <input
                    type="text"
                    className="form-control"
                    value={student.class}
                    disabled
                  />
                </div>

                <div className="col-md-6 mb-3">
                  <label>Transport</label>
                  <input
                    type="text"
                    className="form-control"
                    value={student.transport}
                    disabled
                  />
                </div>

                <div className="col-md-6 mb-3">
                  <label>Parent</label>
                  <input
                    type="text"
                    className="form-control"
                    value={student.parent}
                    disabled
                  />
                </div>

              </div>

            </div>
          </div>

        </div>

      </div>
    </DashboardLayout>
  );
}
