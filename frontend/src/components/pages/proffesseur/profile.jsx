import DashboardLayout from "../../pages/Layouts/DashboardLayout";
import { useState } from "react";

export default function TeacherProfile() {

  const [teacher, setTeacher] = useState({
    name: "Mr Karim",
    email: "karim@email.com",
    phone: "0600000000",
    subject: "Math",
    classes: "3A, 4B",
    bio: "Professeur expérimenté en mathématiques",
    photo: null
  });

  const [preview, setPreview] = useState("https://via.placeholder.com/120");
  const [editing, setEditing] = useState(false);

  const handleChange = (e) => {
    setTeacher({ ...teacher, [e.target.name]: e.target.value });
  };

  // 📸 Upload photo
  const handlePhoto = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setTeacher({ ...teacher, photo: file });
    setPreview(URL.createObjectURL(file));
  };

  const save = () => {
    console.log("DATA:", teacher);
    setEditing(false);
    alert("Profil mis à jour !");
  };

  return (
    <DashboardLayout userRole="teacher" userName={teacher.name}>
      <div className="container-fluid">

        {/* HEADER */}
        <div className="mb-4">
          <h2>👩‍🏫 Profil Professeur</h2>
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

              <h5>{teacher.name}</h5>
              <p className="text-muted">{teacher.subject}</p>

              <span className="badge bg-primary">
                👩‍🏫 Professeur
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
                    value={teacher.name}
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
                    value={teacher.email}
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
                    value={teacher.phone}
                    disabled={!editing}
                    onChange={handleChange}
                  />
                </div>

                <div className="col-md-6 mb-3">
                  <label>Matière</label>
                  <input
                    type="text"
                    name="subject"
                    className="form-control"
                    value={teacher.subject}
                    disabled={!editing}
                    onChange={handleChange}
                  />
                </div>

                <div className="col-md-6 mb-3">
                  <label>Classes</label>
                  <input
                    type="text"
                    name="classes"
                    className="form-control"
                    value={teacher.classes}
                    disabled={!editing}
                    onChange={handleChange}
                  />
                </div>

                <div className="col-md-12 mb-3">
                  <label>Bio</label>
                  <textarea
                    name="bio"
                    className="form-control"
                    rows="3"
                    value={teacher.bio}
                    disabled={!editing}
                    onChange={handleChange}
                  ></textarea>
                </div>

              </div>

            </div>
          </div>

        </div>

      </div>
    </DashboardLayout>
  );
}
