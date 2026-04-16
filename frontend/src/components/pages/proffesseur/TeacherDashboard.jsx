import React, { useState } from 'react';
import DashboardLayout from '../Layouts/DashboardLayout';
import {
  Users,
  BookOpen,
  TrendingUp,
  Clock,
  CheckCircle,
  AlertCircle,
} from 'lucide-react';
import './TeacherDashboard.css';

export default function TeacherDashboard() {
  const stats = [
    {
      id: 1,
      title: 'Mes Classes',
      value: '4',
      icon: Users,
      color: '#4f46e5',
      bgColor: '#eef2ff',
    },
    {
      id: 2,
      title: 'Total Élèves',
      value: '128',
      icon: Users,
      color: '#10b981',
      bgColor: '#ecfdf5',
    },
    {
      id: 3,
      title: 'Devoirs Actifs',
      value: '12',
      icon: BookOpen,
      color: '#f59e0b',
      bgColor: '#fffbeb',
    },
    {
      id: 4,
      title: 'Élèves Absents',
      value: '5',
      icon: AlertCircle,
      color: '#ef4444',
      bgColor: '#fef2f2',
    },
  ];

  const classes = [
    {
      id: 1,
      name: 'Classe 3A - Mathématiques',
      students: 32,
      avgGrade: 15.2,
      lastClass: '2026-04-14 10:00',
      status: 'Actif',
    },
    {
      id: 2,
      name: 'Classe 3B - Mathématiques',
      students: 30,
      avgGrade: 14.8,
      lastClass: '2026-04-14 11:30',
      status: 'Actif',
    },
    {
      id: 3,
      name: 'Classe 4A - Algèbre',
      students: 28,
      avgGrade: 16.1,
      lastClass: '2026-04-13 14:00',
      status: 'Programmé',
    },
    {
      id: 4,
      name: 'Classe 5B - Géométrie',
      students: 38,
      avgGrade: 13.9,
      lastClass: '2026-04-12 09:00',
      status: 'Terminé',
    },
  ];

  const recentActivities = [
    {
      id: 1,
      action: 'Devoir créé',
      detail: 'Exercices de géométrie pour 3A',
      time: 'Il y a 2h',
      icon: '✏️',
    },
    {
      id: 2,
      action: 'Notes entrées',
      detail: 'Évaluation de 3B (15 copies)',
      time: 'Il y a 4h',
      icon: '📝',
    },
    {
      id: 3,
      action: 'Absence marquée',
      detail: '5 élèves absents dans 4A',
      time: 'Il y a 6h',
      icon: '⚠️',
    },
    {
      id: 4,
      action: 'Message envoyé',
      detail: 'Rappel aux parents sur les paiements',
      time: 'Hier',
      icon: '💬',
    },
  ];

  const pendingTasks = [
    {
      id: 1,
      title: 'Corriger les copies de 3A',
      priority: 'high',
      dueDate: '2026-04-16',
    },
    {
      id: 2,
      title: 'Mettre à jour la feuille de présence',
      priority: 'medium',
      dueDate: '2026-04-15',
    },
    {
      id: 3,
      title: 'Préparer le contrôle de 5B',
      priority: 'medium',
      dueDate: '2026-04-17',
    },
  ];

  return (
    <DashboardLayout userRole="teacher" userName="Pr. Mustapha Ahmed">
      <div className="teacher-dashboard">
        {/* PAGE HEADER */}
        <div className="page-header">
          <div>
            <h1 className="page-title">Mon Tableau de bord Enseignant</h1>
            <p className="page-subtitle">Gestion de vos classes et de vos élèves</p>
          </div>
        </div>

        {/* STATISTICS GRID */}
        <div className="stats-grid">
          {stats.map((stat) => {
            const IconComponent = stat.icon;
            return (
              <div key={stat.id} className="stat-card">
                <div className="stat-icon" style={{ color: stat.color, backgroundColor: stat.bgColor }}>
                  <IconComponent size={28} />
                </div>
                <div className="stat-info">
                  <p className="stat-label">{stat.title}</p>
                  <h3 className="stat-value">{stat.value}</h3>
                </div>
              </div>
            );
          })}
        </div>

        {/* MAIN CONTENT */}
        <div className="dashboard-content">
          {/* MY CLASSES */}
          <div className="card classes-card">
            <div className="card-header">
              <h3>📚 Mes Classes</h3>
              <a href="#" className="view-link">Gérer</a>
            </div>
            <div className="classes-list">
              {classes.map((cls) => (
                <div key={cls.id} className="class-item">
                  <div className="class-header">
                    <h4>{cls.name}</h4>
                    <span className={`status-badge ${cls.status.toLowerCase()}`}>
                      {cls.status}
                    </span>
                  </div>
                  <div className="class-info">
                    <div className="info-group">
                      <span className="info-label">Élèves:</span>
                      <span className="info-value">{cls.students}</span>
                    </div>
                    <div className="info-group">
                      <span className="info-label">Moyenne:</span>
                      <span className="info-value">{cls.avgGrade}/20</span>
                    </div>
                    <div className="info-group">
                      <span className="info-label">Dernier cours:</span>
                      <span className="info-value">
                        {new Date(cls.lastClass).toLocaleDateString('fr-FR')}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* RECENT ACTIVITIES & TASKS */}
          <div className="side-cards">
            {/* RECENT ACTIVITIES */}
            <div className="card activities-card">
              <div className="card-header">
                <h3>⚡ Activités Récentes</h3>
                <a href="#" className="view-link">Voir tout</a>
              </div>
              <div className="activities-list">
                {recentActivities.map((activity) => (
                  <div key={activity.id} className="activity-item">
                    <span className="activity-icon">{activity.icon}</span>
                    <div className="activity-content">
                      <p className="activity-action">{activity.action}</p>
                      <p className="activity-detail">{activity.detail}</p>
                    </div>
                    <span className="activity-time">{activity.time}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* PENDING TASKS */}
            <div className="card tasks-card">
              <div className="card-header">
                <h3>✓ Tâches Urgentes</h3>
                <a href="#" className="view-link">Ajouter</a>
              </div>
              <div className="tasks-list">
                {pendingTasks.map((task) => (
                  <div key={task.id} className="task-item">
                    <input type="checkbox" />
                    <div className="task-content">
                      <p>{task.title}</p>
                      <span className="task-date">
                        {new Date(task.dueDate).toLocaleDateString('fr-FR')}
                      </span>
                    </div>
                    <span className={`priority ${task.priority}`}>
                      {task.priority === 'high' ? '🔴' : '🟡'}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
