import { NavLink, useLocation } from "react-router-dom";
import { useState, useContext } from "react";
import { AuthContext } from "../../contextes/AuthProvider";
import './DashboardLayout.css';
import logoEcole from '../../../assets/logoEcole.jpg';
import { useNavigate } from "react-router-dom";

export default function DashboardLayout({ children }) {

  const { user } = useContext(AuthContext);
  const location = useLocation();
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const { logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = async () => {
  await logout(); // 🔥 supprime token + appel API
  navigate("/login"); // 🔥 redirection
};

  // 🔥 récupérer role dynamiquement
  const userRole = user?.role || "admin";
  const userName = user?.name || "User";

  const navItems = {
    student: [
      { href: "/student/dashboard", label: "Dashboard", icon: "📊" },
      { href: "/student/schedule", label: "Emploi du temps", icon: "📅" },
      { href: "/student/announcements", label: "Annonces", icon: "📢" },
      { href: "/student/payments", label: "Paiements", icon: "💰" },
      { href: "/student/grades", label: "Notes", icon: "📊" },
      { href: "/student/absences", label: "Absences", icon: "⚠️" },
      { href: "/student/transport", label: "Transport", icon: "🚌" },
      { href: "/student/messages", label: "Messages", icon: "💬" },
      { href: "/student/profile", label: "Profil", icon: "👤" },
      { href: "/student/settings", label: "Paramètres", icon: "⚙️" },
    ],
    teacher: [
      { href: "/teacher/dashboard", label: "Dashboard", icon: "📊" },
      { href: "/teacher/students", label: "Élèves", icon: "👨‍🎓" },
      { href: "/teacher/assignments", label: "Devoirs", icon: "📝" },
      { href: "/teacher/schedule", label: "Emploi du temps", icon: "📅" },
      { href: "/teacher/messages", label: "Messages", icon: "💬" },
      { href: "/teacher/absences", label: "Absences", icon: "⚠️" },
      { href: "/teacher/profile", label: "Profil", icon: "👤" },
      { href: "/teacher/settings", label: "Paramètres", icon: "⚙️" },
    ],
    admin: [
      { href: "/admin/dashboard", label: "Dashboard", icon: "📊" },
      { href: "/admin/students", label: "Élèves", icon: "👨‍🎓" },
      { href: "/admin/schedule", label: "Emploi du temps", icon: "📅" },
      { href: "/admin/announcements", label: "Annonces", icon: "📢" },
      { href: "/admin/messages", label: "Messages", icon: "💬" },
      { href: "/admin/payments", label: "Paiements", icon: "💰" },
      { href: "/admin/transport", label: "Transport", icon: "🚌" },
      { href: "/admin/absences", label: "Absences", icon: "⚠️" },
      { href: "/admin/settings", label: "Paramètres", icon: "⚙️" },
    ],
    parent: [
      { href: "/parent/dashboard", label: "Dashboard", icon: "📊" },
      { href: "/parent/children", label: "Mes enfants", icon: "👨‍👧" },
      { href: "/parent/absences", label: "Absences", icon: "⚠️" },
      { href: "/parent/assignments", label: "Devoirs", icon: "📝" },
      { href: "/parent/messages", label: "Messages", icon: "💬" },
      { href: "/parent/payments", label: "Paiements", icon: "💰" },
      { href: "/parent/profile", label: "Profil", icon: "👤" },
      { href: "/parent/settings", label: "Paramètres", icon: "⚙️" },
    ],
  };

  const items = navItems[userRole] || [];

  return (
    <div className="dashboard-layout">

      {/* SIDEBAR */}
      <aside className={`dashboard-sidebar ${sidebarOpen ? 'open' : 'closed'}`}>
        
        <div className="dashboard-sidebar-brand">
          <img src={logoEcole} alt="Logo" className="logo_img"/>
          <div className="dashboard-sidebar-brand-title">
            Groupe Scolaire Bab El Firdaouss
          </div>
        </div>

        <nav className="sidebar-nav">
          {items.map((item) => (
            <NavLink
              key={item.href}
              to={item.href}
              className={({ isActive }) =>
                `sidebar-link ${isActive ? 'active' : ''}`
              }
            >
              <span>{item.icon}</span>
              <span>{item.label}</span>
            </NavLink>
          ))}
        </nav>

  <div className="sidebar-footer">
  <div className="sidebar-profile">
   
    <div className="sidebar-user">
      <p className="sidebar-user-name">{userName}</p>
      <p className="sidebar-user-role">{userRole}</p>
    </div>
  </div>

  <button onClick={handleLogout} className="sidebar-logout">
  Déconnexion
</button>
</div>

      </aside>

      {/* MAIN */}
      <div className="dashboard-main">
        <header className="dashboard-header">
          <button onClick={() => setSidebarOpen(!sidebarOpen)}>☰</button>
          <h1>
            {items.find(i => i.href === location.pathname)?.label || "Dashboard"}
          </h1>
        </header>

        <div className="dashboard-content">
          {children}
        </div>
      </div>
    </div>
  );
}
