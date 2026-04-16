import { NavLink, useLocation } from "react-router-dom";
import { useState } from "react";
import './DashboardLayout.css';
import logoEcole from '../../../assets/logoEcole.jpg';

export default function DashboardLayout({ children, userRole, userName }) {
  const location = useLocation();
  const [sidebarOpen, setSidebarOpen] = useState(true);

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
      { href: "/admin/teachers", label: "Enseignants", icon: "👩‍🏫" },
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
      { href: "/parent/notes", label: "Notes", icon: "📊" },
      { href: "/parent/absences", label: "Absences", icon: "⚠️" },
      { href: "/parent/assignments", label: "Devoirs", icon: "📝" },
      { href: "/parent/timetable", label: "Emploi du temps", icon: "📅" },
      { href: "/parent/messages", label: "Messages", icon: "💬" },
      { href: "/parent/notifications", label: "Notifications", icon: "🔔" },
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
          <div className="dashboard-sidebar-brand-logo">
          <img src={logoEcole} alt="Logo" className="logo_img"/>
          </div>
          <div className="dashboard-sidebar-brand-title">Groupe Scolaire Bab El Firdaouss</div>
        </div>

        <nav className="sidebar-nav">
          {items.map((item) => (
            <NavLink
              key={item.href}
              to={item.href}
              className={({ isActive }) => `sidebar-link ${isActive ? 'active' : ''}`}
            >
              <span className="icon">{item.icon}</span>
              <span>{item.label}</span>
            </NavLink>
          ))}
        </nav>

        <div className="sidebar-footer">
          <div className="sidebar-profile">
            <img
              src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${userName}`}
              alt={userName}
              className="sidebar-avatar"
            />
            <div className="sidebar-user">
              <p className="sidebar-user-name">{userName}</p>
              <p className="sidebar-user-role">{userRole}</p>
            </div>
          </div>
          <NavLink to="/login" className="sidebar-logout">
            Déconnexion
          </NavLink>
        </div>
      </aside>

      {/* MAIN CONTENT */}
      <div className="dashboard-main">
        {/* HEADER */}
        <header className="dashboard-header">
          <button
            className="sidebar-toggle"
            onClick={() => setSidebarOpen(!sidebarOpen)}
          >
            ☰
          </button>
          <h1 className="dashboard-title">
            {items.find(item => item.href === location.pathname)?.label || 'Dashboard'}
          </h1>

          <div className="dashboard-actions">
            <input
              type="text"
              placeholder="Rechercher..."
              className="dashboard-search"
            />
            <button className="dashboard-action-btn">🔔</button>
            <button className="dashboard-action-btn">⚙️</button>
            <img
              src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${userName}`}
              alt={userName}
              className="dashboard-avatar"
            />
          </div>
        </header>

        {/* CONTENT */}
        <div className="dashboard-content">
          {children}
        </div>
      </div>
    </div>
  );
}
