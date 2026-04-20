import DashboardLayout from "../../pages/Layouts/DashboardLayout";
import { useEffect, useState } from "react";
import axios from "axios";

export default function ParentProfile() {

  const [parent, setParent] = useState(null);
  const [preview, setPreview] = useState("https://via.placeholder.com/120");
  const [editing, setEditing] = useState(false);
  const [loading, setLoading] = useState(true);

  // 🔥 LOAD DATA
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem("token");

        const res = await axios.get("http://localhost:8000/api/user", {
          headers: {
            Authorization: `Bearer ${token}`,
            Accept: "application/json"
          }
        });

        setParent(res.data);
        setPreview(res.data.photo || "https://via.placeholder.com/120");

      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  // 🔄 LOADING
  if (loading || !parent) {
    return (
      <DashboardLayout userRole="parent" userName="Parent User">
        <div className="p-4">Chargement du profil...</div>
      </DashboardLayout>
    );
  }

  // 🔄 INPUT
  const handleChange = (e) => {
    setParent({ ...parent, [e.target.name]: e.target.value });
  };

  // 📸 PHOTO
  const handlePhoto = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setParent({ ...parent, photo: file });
    setPreview(URL.createObjectURL(file));
  };

  // 💾 SAVE
  const save = async () => {
    try {
      const token = localStorage.getItem("token");

      const formData = new FormData();
      formData.append("name", parent.name);
      formData.append("email", parent.email);
      formData.append("phone", parent.phone);

      if (parent.photo instanceof File) {
        formData.append("photo", parent.photo);
      }

      await axios.post("http://localhost:8000/api/profile/update", formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data"
        }
      });

      setEditing(false);
      alert("✅ Profil mis à jour");

    } catch (err) {
      console.error(err);
      alert("❌ Erreur lors de la mise à jour");
    }
  };

  return (
    <DashboardLayout userRole="parent" userName={parent.name}>

      <div className="premium-dashboard">

        {/* HEADER */}
        <div className="premium-header">
          <div>
            <h1>👨‍👩‍👧 Profil Parent</h1>
            <p>Gérez vos informations personnelles</p>
          </div>
        </div>

        <div className="premium-grid">

          {/* LEFT CARD */}
          <div className="premium-card profile-left">

            <img
              src={preview}
              alt="profile"
              className="profile-img"
            />

            <h3>{parent.name}</h3>

            <span className="badge bg-primary">
              Parent
            </span>

            {editing && (
              <input
                type="file"
                className="form-control mt-3"
                accept="image/*"
                onChange={handlePhoto}
              />
            )}

          </div>

          {/* RIGHT CARD */}
          <div className="premium-card">

            <div className="d-flex justify-content-between mb-3">
              <h4>Informations</h4>

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
                  value={parent.name || ""}
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
                  value={parent.email || ""}
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
                  value={parent.phone || ""}
                  disabled={!editing}
                  onChange={handleChange}
                />
              </div>

              {/* ENFANTS */}
              <div className="col-md-12">
                <label>Enfants</label>

                <div className="children-list">
                  {parent.children?.map((child, i) => (
                    <div key={i} className="child-item">
                      👨‍🎓 {child.name || child}
                    </div>
                  ))}
                </div>

              </div>

            </div>

          </div>

        </div>

      </div>

    </DashboardLayout>
  );
}