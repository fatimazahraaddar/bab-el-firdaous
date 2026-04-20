import React, { useState } from 'react';
import DashboardLayout from '../Layouts/DashboardLayout';
import {
  Users,
  TrendingUp,
  AlertCircle,
  DollarSign,
  Book,
  Calendar,
  CheckCircle,
} from 'lucide-react';
import './ParentDashboard.css';

export default function ParentDashboard() {
  const [selectedChild, setSelectedChild] = useState(1);

  const children = [
    {
      id: 1,
      name: 'Ahmed Benali',
      class: 'Classe 3A',
      avgGrade: 15.2,
      attendance: 94,
      pendingAssignments: 3,
      payments: 'Payé',
    },
    {
      id: 2,
      name: 'Fatima Benali',
      class: 'Classe 5B',
      avgGrade: 16.8,
      attendance: 98,
      pendingAssignments: 2,
      payments: 'Payé',
    },
  ];

  const selectedChildData = children.find((c) => c.id === selectedChild);

  const childStats = [
    {
      id: 1,
      title: 'Moyenne Générale',
      value: selectedChildData?.avgGrade || 0,
      suffix: '/20',
      icon: TrendingUp,
      color: '#4f46e5',
      bgColor: '#eef2ff',
    },
    {
      id: 2,
      title: 'Présence',
      value: selectedChildData?.attendance || 0,
      suffix: '%',
      icon: CheckCircle,
      color: '#10b981',
      bgColor: '#ecfdf5',
    },
    {
      id: 3,
      title: 'Devoirs En Attente',
      value: selectedChildData?.pendingAssignments || 0,
      icon: Book,
      color: '#f59e0b',
      bgColor: '#fffbeb',
    },
    {
      id: 4,
      title: 'Scolarité',
      value: selectedChildData?.payments || 'Non payé',
      icon: DollarSign,
      color: selectedChildData?.payments === 'Payé' ? '#10b981' : '#ef4444',
      bgColor: selectedChildData?.payments === 'Payé' ? '#ecfdf5' : '#fef2f2',
    },
  ];

  // Recent grades for selected child
  const recentGrades = [
    { subject: 'Mathématiques', grade: 16, date: '2026-04-08' },
    { subject: 'Français', grade: 14.5, date: '2026-04-09' },
    { subject: 'Sciences', grade: 15.8, date: '2026-04-10' },
    { subject: 'Histoire', grade: 16.2, date: '2026-04-11' },
  ];

  // Upcoming events
  const upcomingEvents = [
    {
      id: 1,
      title: 'Réunion Parents-Profs',
      date: '2026-04-20',
      type: 'meeting',
    },
    {
      id: 2,
      title: 'Examen mi-semestre',
      date: '2026-04-25',
      type: 'exam',
    },
    {
      id: 3,
      title: 'Fête scolaire',
      date: '2026-05-01',
      type: 'event',
    },
  ];

  // Absences and notifications
  const notifications = [
    {
      id: 1,
      message: 'Ahmed a oublié son uniforme aujourd\'hui',
      time: 'Il y a 2h',
      type: 'warning',
    },
    {
      id: 2,
      message: 'Excellente performance en Mathématiques!',
      time: 'Il y a 4h',
      type: 'success',
    },
    {
      id: 3,
      message: 'Rappel: Paiement de scolarité dû le 30 avril',
      time: 'Il y a 6h',
      type: 'info',
    },
  ];

  return (
    <DashboardLayout userRole="parent" userName="Parent Benali">
      <div className="parent-dashboard">
        {/* PAGE HEADER */}
        <div className="page-header">
          <div>
            <h1 className="page-title">Tableau de Bord Parent</h1>
            <p className="page-subtitle">Suivi de vos enfants et de leurs performances</p>
          </div>
        </div>

        {/* CHILDREN SELECTOR */}
        <div className="children-selector">
          {children.map((child) => (
            <button
              key={child.id}
              className={`child-button ${selectedChild === child.id ? 'active' : ''}`}
              onClick={() => setSelectedChild(child.id)}
            >
              <div className="child-avatar">
                {child.name.charAt(0)}
              </div>
              <div className="child-info">
                <p className="child-name">{child.name}</p>
                <span className="child-class">{child.class}</span>
              </div>
            </button>
          ))}
        </div>

        {/* SELECTED CHILD STATS */}
        <div className="stats-grid">
          {childStats.map((stat) => {
            const IconComponent = stat.icon;
            return (
              <div key={stat.id} className="stat-card">
                <div className="stat-icon" style={{ color: stat.color, backgroundColor: stat.bgColor }}>
                  <IconComponent size={28} />
                </div>
                <div className="stat-info">
                  <p className="stat-label">{stat.title}</p>
                  <h3 className="stat-value">
                    {stat.value}
                    {stat.suffix && <span className="stat-suffix">{stat.suffix}</span>}
                  </h3>
                </div>
              </div>
            );
          })}
        </div>

        {/* MAIN CONTENT */}
        <div className="dashboard-content">
          {/* GRADES */}
          <div className="card grades-card">
            <div className="card-header">
              <h3>📊 Notes Récentes</h3>
              <a href="#" className="view-link">Voir toutes</a>
            </div>
            <div className="grades-list">
              {recentGrades.map((item, index) => (
                <div key={index} className="grade-item">
                  <div className="grade-info">
                    <span className="grade-subject">{item.subject}</span>
                    <span className="grade-date">{new Date(item.date).toLocaleDateString('fr-FR')}</span>
                  </div>
                  <div className="grade-bar">
                    <div
                      className="grade-fill"
                      style={{
                        width: `${(item.grade / 20) * 100}%`,
                        backgroundColor:
                          item.grade >= 16
                            ? '#10b981'
                            : item.grade >= 14
                            ? '#8b5cf6'
                            : '#f59e0b',
                      }}
                    />
                  </div>
                  <span className="grade-value">{item.grade}/20</span>
                </div>
              ))}
            </div>
          </div>

          {/* EVENTS & NOTIFICATIONS */}
          <div className="side-content">
            {/* UPCOMING EVENTS */}
            <div className="card events-card">
              <div className="card-header">
                <h3>📅 Événements à Venir</h3>
                <a href="#" className="view-link">Gérer</a>
              </div>
              <div className="events-list">
                {upcomingEvents.map((event) => (
                  <div key={event.id} className={`event-item ${event.type}`}>
                    <div className="event-indicator"></div>
                    <div className="event-info">
                      <p className="event-title">{event.title}</p>
                      <span className="event-date">
                        {new Date(event.date).toLocaleDateString('fr-FR')}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* NOTIFICATIONS */}
            <div className="card notifications-card">
              <div className="card-header">
                <h3>🔔 Notifications</h3>
                <a href="#" className="view-link">Voir toutes</a>
              </div>
              <div className="notifications-list">
                {notifications.map((notif) => (
                  <div key={notif.id} className={`notification-item ${notif.type}`}>
                    <div className="notif-icon">
                      {notif.type === 'warning' && '⚠️'}
                      {notif.type === 'success' && '✅'}
                      {notif.type === 'info' && 'ℹ️'}
                    </div>
                    <div className="notif-content">
                      <p>{notif.message}</p>
                      <span className="notif-time">{notif.time}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* BOTTOM SECTION - PAYMENTS AND DOCUMENTS */}
        <div className="bottom-section">
          {/* PAYMENTS */}
          <div className="card payments-card">
            <div className="card-header">
              <h3>💰 Paiements</h3>
              <a href="#" className="view-link">Voir tout</a>
            </div>
            <div className="payments-list">
              {[
                { id: 1, description: 'Scolarité Année 2025-2026', amount: 15000, status: 'Payé', date: '2026-01-15' },
                { id: 2, description: 'Transport Scolaire', amount: 2000, status: 'Payé', date: '2026-02-15' },
                { id: 3, description: 'Activités Périscolaires', amount: 1000, status: 'En attente', date: '2026-04-30' },
              ].map((payment) => (
                <div key={payment.id} className="payment-item">
                  <div className="payment-info">
                    <p className="payment-desc">{payment.description}</p>
                    <span className={`payment-status ${payment.status.toLowerCase().replace(' ', '-')}`}>
                      {payment.status}
                    </span>
                  </div>
                  <div className="payment-detail">
                    <span className="payment-amount">{payment.amount} DZD</span>
                    <span className="payment-date">{new Date(payment.date).toLocaleDateString('fr-FR')}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* QUICK LINKS */}
          <div className="card quick-links-card">
            <div className="card-header">
              <h3>🔗 Accès Utiles</h3>
            </div>
            <div className="quick-links">
              <a href="#" className="quick-link">
                <span className="link-icon">📝</span>
                <span className="link-text">Voir les Devoirs</span>
              </a>
              <a href="#" className="quick-link">
                <span className="link-icon">💬</span>
                <span className="link-text">Contacter l'École</span>
              </a>
              <a href="#" className="quick-link">
                <span className="link-icon">📚</span>
                <span className="link-text">Ressources Scolaires</span>
              </a>
              <a href="#" className="quick-link">
                <span className="link-icon">⚙️</span>
                <span className="link-text">Paramètres du Compte</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
