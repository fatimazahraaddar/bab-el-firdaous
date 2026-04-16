import React, { useState } from 'react';
import DashboardLayout from '../Layouts/DashboardLayout';
import {
  Users,
  TrendingUp,
  DollarSign,
  AlertCircle,
  Calendar,
  MessageSquare,
  ArrowUpRight,
  ArrowDownRight,
  MoreVertical,
  CheckCircle,
} from 'lucide-react';
import './AdminDashboard.css';

export default function AdminDashboard() {
  const [selectedPeriod, setSelectedPeriod] = useState('month');

  // Statistics Cards Data
  const stats = [
    {
      id: 1,
      title: 'Total Élèves',
      value: '1,245',
      change: '+12.5%',
      isPositive: true,
      icon: Users,
      color: '#4f46e5',
      bgColor: '#eef2ff',
      description: 'Dans ce mois-ci',
    },
    {
      id: 2,
      title: 'Revenus',
      value: '$12,450',
      change: '+8.2%',
      isPositive: true,
      icon: DollarSign,
      color: '#10b981',
      bgColor: '#ecfdf5',
      description: 'Paiements reçus',
    },
    {
      id: 3,
      title: 'Absences',
      value: '234',
      change: '-4.3%',
      isPositive: true,
      icon: AlertCircle,
      color: '#f59e0b',
      bgColor: '#fffbeb',
      description: 'Ce mois-ci',
    },
    {
      id: 4,
      title: 'Enseignants',
      value: '48',
      change: '+2.1%',
      isPositive: true,
      icon: Users,
      color: '#8b5cf6',
      bgColor: '#faf5ff',
      description: 'Actifs',
    },
  ];

  // Recent Activities
  const activities = [
    {
      id: 1,
      message: 'Nouvel étudiant inscrit',
      student: 'Ahmed Mohamed',
      timestamp: 'Il y a 2h',
      icon: CheckCircle,
      color: '#10b981',
    },
    {
      id: 2,
      message: 'Paiement reçu de',
      student: 'Fatima Ali',
      amount: '+$500',
      timestamp: 'Il y a 4h',
      icon: DollarSign,
      color: '#4f46e5',
    },
    {
      id: 3,
      message: 'Absence marquée pour',
      student: 'Ibrahim Hassan',
      timestamp: 'Il y a 6h',
      icon: AlertCircle,
      color: '#f59e0b',
    },
    {
      id: 4,
      message: 'Assignement créé par',
      student: 'Pr. Mustapha',
      timestamp: 'Il y a 8h',
      icon: Calendar,
      color: '#8b5cf6',
    },
  ];

  // Class Performance
  const classPerformance = [
    {
      id: 1,
      name: 'Classe 3A',
      students: 35,
      avgGrade: 15.2,
      performance: 85,
    },
    {
      id: 2,
      name: 'Classe 3B',
      students: 32,
      avgGrade: 14.8,
      performance: 80,
    },
    {
      id: 3,
      name: 'Classe 4A',
      students: 38,
      avgGrade: 16.1,
      performance: 90,
    },
    {
      id: 4,
      name: 'Classe 5B',
      students: 36,
      avgGrade: 13.9,
      performance: 72,
    },
  ];

  // Upcoming Events
  const upcomingEvents = [
    {
      id: 1,
      title: 'Réunion Parents-Profs',
      date: '2026-04-20',
      time: '14:00',
      participants: 45,
    },
    {
      id: 2,
      title: 'Examen mi-semestre',
      date: '2026-04-25',
      time: '08:00',
      participants: 120,
    },
    {
      id: 3,
      title: 'Fête scolaire',
      date: '2026-05-01',
      time: '16:00',
      participants: 250,
    },
  ];

  return (
    <DashboardLayout userRole="admin" userName="Admin User">
      <div className="admin-dashboard">
        {/* PAGE HEADER */}
        <div className="page-header">
          <div>
            <h1 className="page-title">Tableau de bord</h1>
            <p className="page-subtitle">
              Bienvenue, Admin! Voici un aperçu de votre école
            </p>
          </div>
          <div className="header-actions">
            <select
              value={selectedPeriod}
              onChange={(e) => setSelectedPeriod(e.target.value)}
              className="period-select"
            >
              <option value="week">Cette semaine</option>
              <option value="month">Ce mois</option>
              <option value="year">Cette année</option>
            </select>
          </div>
        </div>

        {/* STATISTICS GRID */}
        <div className="stats-grid">
          {stats.map((stat) => {
            const IconComponent = stat.icon;
            return (
              <div key={stat.id} className="stat-card">
                <div className="stat-header">
                  <div
                    className="stat-icon"
                    style={{
                      backgroundColor: stat.bgColor,
                      color: stat.color,
                    }}
                  >
                    <IconComponent size={28} />
                  </div>
                  <button className="stat-menu">
                    <MoreVertical size={16} />
                  </button>
                </div>

                <div className="stat-content">
                  <p className="stat-label">{stat.title}</p>
                  <h2 className="stat-value">{stat.value}</h2>
                  <p className="stat-description">{stat.description}</p>
                </div>

                <div className="stat-footer">
                  <span
                    className={`stat-change ${
                      stat.isPositive ? 'positive' : 'negative'
                    }`}
                  >
                    {stat.isPositive ? (
                      <ArrowUpRight size={16} />
                    ) : (
                      <ArrowDownRight size={16} />
                    )}
                    {stat.change}
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        {/* MIDDLE SECTION */}
        <div className="middle-section">
          {/* RECENT ACTIVITIES */}
          <div className="card activities-card">
            <div className="card-header">
              <h3>Activités Récentes</h3>
              <a href="#" className="view-all">
                Voir tout
              </a>
            </div>
            <div className="activities-list">
              {activities.map((activity) => {
                const IconComponent = activity.icon;
                return (
                  <div key={activity.id} className="activity-item">
                    <div
                      className="activity-icon"
                      style={{ color: activity.color }}
                    >
                      <IconComponent size={20} />
                    </div>
                    <div className="activity-content">
                      <p className="activity-message">{activity.message}</p>
                      <span className="activity-student">
                        {activity.student}
                        {activity.amount && (
                          <span className="activity-amount">
                            {activity.amount}
                          </span>
                        )}
                      </span>
                    </div>
                    <span className="activity-time">{activity.timestamp}</span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* CLASS PERFORMANCE */}
          <div className="card performance-card">
            <div className="card-header">
              <h3>Performance par Classe</h3>
              <a href="#" className="view-all">
                Voir tout
              </a>
            </div>
            <div className="performance-table">
              {classPerformance.map((cls) => (
                <div key={cls.id} className="performance-row">
                  <div className="performance-info">
                    <p className="class-name">{cls.name}</p>
                    <span className="student-count">
                      {cls.students} élèves
                    </span>
                  </div>
                  <div className="performance-data">
                    <div className="progress-bar">
                      <div
                        className="progress-fill"
                        style={{
                          width: `${cls.performance}%`,
                          backgroundColor:
                            cls.performance >= 85
                              ? '#10b981'
                              : cls.performance >= 70
                              ? '#f59e0b'
                              : '#ef4444',
                        }}
                      />
                    </div>
                    <span className="avg-grade">{cls.avgGrade}/20</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* BOTTOM SECTION */}
        <div className="bottom-section">
          {/* UPCOMING EVENTS */}
          <div className="card events-card">
            <div className="card-header">
              <h3>Événements à Venir</h3>
              <a href="#" className="view-all">
                Voir tout
              </a>
            </div>
            <div className="events-list">
              {upcomingEvents.map((event) => (
                <div key={event.id} className="event-item">
                  <div className="event-date">
                    <span className="event-day">
                      {new Date(event.date).toLocaleDateString('fr-FR', {
                        day: '2-digit',
                      })}
                    </span>
                    <span className="event-month">
                      {new Date(event.date).toLocaleDateString('fr-FR', {
                        month: 'short',
                      })}
                    </span>
                  </div>
                  <div className="event-details">
                    <h4>{event.title}</h4>
                    <p>
                      {event.time} • {event.participants} participants
                    </p>
                  </div>
                  <button className="event-action">→</button>
                </div>
              ))}
            </div>
          </div>

          {/* QUICK STATS */}
          <div className="card quick-stats-card">
            <div className="card-header">
              <h3>Résumé Rapide</h3>
            </div>
            <div className="quick-stats">
              <div className="quick-stat-item">
                <span className="quick-label">Taux de présence</span>
                <span className="quick-value">94.2%</span>
                <div className="mini-stat-bar">
                  <div
                    className="mini-stat-fill"
                    style={{ width: '94.2%', backgroundColor: '#10b981' }}
                  />
                </div>
              </div>
              <div className="quick-stat-item">
                <span className="quick-label">Taux de paiement</span>
                <span className="quick-value">87.5%</span>
                <div className="mini-stat-bar">
                  <div
                    className="mini-stat-fill"
                    style={{ width: '87.5%', backgroundColor: '#4f46e5' }}
                  />
                </div>
              </div>
              <div className="quick-stat-item">
                <span className="quick-label">Moyenne générale</span>
                <span className="quick-value">15.1/20</span>
                <div className="mini-stat-bar">
                  <div
                    className="mini-stat-fill"
                    style={{ width: '75.5%', backgroundColor: '#8b5cf6' }}
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
