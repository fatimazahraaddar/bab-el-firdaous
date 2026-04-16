import React, { useState } from 'react';
import DashboardLayout from '../Layouts/DashboardLayout';
import {
  BookOpen,
  Calendar,
  FileText,
  AlertCircle,
  TrendingUp,
  Clock,
  CheckCircle,
  ArrowRight,
} from 'lucide-react';
import './StudentDashboard.css';

export default function StudentDashboard() {
  // Student Overview Stats
  const stats = [
    {
      id: 1,
      title: 'Moyenne Générale',
      value: '15.2/',
      suffix: '20',
      icon: TrendingUp,
      color: '#4f46e5',
      bgColor: '#eef2ff',
    },
    {
      id: 2,
      title: 'Présence',
      value: '94',
      suffix: '%',
      icon: CheckCircle,
      color: '#10b981',
      bgColor: '#ecfdf5',
    },
    {
      id: 3,
      title: 'Devoirs Actifs',
      value: '5',
      icon: FileText,
      color: '#f59e0b',
      bgColor: '#fffbeb',
    },
    {
      id: 4,
      title: 'Paiements Dus',
      value: '0',
      icon: AlertCircle,
      color: '#8b5cf6',
      bgColor: '#faf5ff',
    },
  ];

  // Upcoming Assignments
  const assignments = [
    {
      id: 1,
      subject: 'Mathématiques',
      title: 'Problèmes de géométrie',
      dueDate: '2026-04-16',
      priority: 'high',
      teacher: 'Pr. Ahmed',
    },
    {
      id: 2,
      subject: 'Français',
      title: 'Rédaction sur la nature',
      dueDate: '2026-04-18',
      priority: 'medium',
      teacher: 'Pr. Fatima',
    },
    {
      id: 3,
      subject: 'Histoire',
      title: 'Résumé du chapitre 5',
      dueDate: '2026-04-20',
      priority: 'low',
      teacher: 'Pr. Hassan',
    },
  ];

  // Today's Schedule
  const todaySchedule = [
    {
      id: 1,
      subject: 'Mathématiques',
      teacher: 'Pr. Ahmed',
      time: '08:00 - 09:30',
      room: 'A101',
    },
    {
      id: 2,
      subject: 'Français',
      teacher: 'Pr. Fatima',
      time: '09:45 - 11:15',
      room: 'B205',
    },
    {
      id: 3,
      subject: 'Histoire',
      teacher: 'Pr. Hassan',
      time: '11:30 - 13:00',
      room: 'C310',
    },
    {
      id: 4,
      subject: 'Éducation Physique',
      teacher: 'Pr. Mohamed',
      time: '14:00 - 15:30',
      room: 'Gymnase',
    },
  ];

  // Recent Grades
  const recentGrades = [
    { subject: 'Mathématiques', grade: 16, date: '2026-04-08' },
    { subject: 'Français', grade: 14.5, date: '2026-04-09' },
    { subject: 'Sciences', grade: 15.8, date: '2026-04-10' },
  ];

  const daysUntilExam = 45;
  const attendanceRate = 94;

  return (
    <DashboardLayout userRole="student" userName="Ahmed Benali">
      <div className="student-dashboard">
        {/* PAGE HEADER */}
        <div className="page-header">
          <div>
            <h1 className="page-title">Mon Tableau de bord</h1>
            <p className="page-subtitle">
              Suivi de vos études et de vos performances
            </p>
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
          {/* TODAY'S SCHEDULE */}
          <div className="card schedule-card">
            <div className="card-header">
              <h3>📅 Emploi du jour</h3>
              <a href="#" className="view-link">Voir tout</a>
            </div>
            <div className="schedule-list">
              {todaySchedule.map((session, index) => (
                <div key={session.id} className="schedule-item">
                  <div className="schedule-time">
                    <span>{session.time}</span>
                  </div>
                  <div className="schedule-dot"></div>
                  <div className="schedule-content">
                    <h4>{session.subject}</h4>
                    <p>{session.teacher} • Salle {session.room}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* UPCOMING ASSIGNMENTS */}
          <div className="card assignments-card">
            <div className="card-header">
              <h3>📝 Devoirs à faire</h3>
              <a href="#" className="view-link">Voir tous</a>
            </div>
            <div className="assignments-list">
              {assignments.map((assignment) => (
                <div key={assignment.id} className="assignment-item">
                  <div className="assignment-header">
                    <h4>{assignment.title}</h4>
                    <span className={`priority-badge ${assignment.priority}`}>
                      {assignment.priority === 'high' ? '🔴' : assignment.priority === 'medium' ? '🟡' : '🟢'}
                    </span>
                  </div>
                  <p className="assignment-meta">
                    {assignment.subject} • {assignment.teacher}
                  </p>
                  <div className="assignment-footer">
                    <span className="due-date">
                      <Calendar size={14} />
                      {new Date(assignment.dueDate).toLocaleDateString('fr-FR')}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* BOTTOM SECTION */}
        <div className="bottom-section">
          {/* RECENT GRADES */}
          <div className="card grades-card">
            <div className="card-header">
              <h3>📊 Notes récentes</h3>
              <a href="#" className="view-link">Voir toutes</a>
            </div>
            <div className="grades-list">
              {recentGrades.map((item, index) => (
                <div key={index} className="grade-item">
                  <div className="grade-subject">{item.subject}</div>
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
                  <div className="grade-value">{item.grade}/20</div>
                </div>
              ))}
            </div>
          </div>

          {/* QUICK STATS */}
          <div className="card quick-stats-card">
            <div className="card-header">
              <h3>⚡ En bref</h3>
            </div>
            <div className="quick-info">
              <div className="info-item">
                <div className="info-icon">📚</div>
                <div className="info-text">
                  <p>Examen Fin d'année</p>
                  <span>{daysUntilExam} jours</span>
                </div>
              </div>
              <div className="info-item">
                <div className="info-icon">✅</div>
                <div className="info-text">
                  <p>Taux de présence</p>
                  <span>{attendanceRate}%</span>
                </div>
              </div>
              <div className="info-item">
                <div className="info-icon">💰</div>
                <div className="info-text">
                  <p>Scolarité</p>
                  <span className="text-success">Payée</span>
                </div>
              </div>
            </div>
          </div>

          {/* ANNOUNCEMENTS */}
          <div className="card announcements-card">
            <div className="card-header">
              <h3>📢 Annonces</h3>
              <a href="#" className="view-link">Voir plus</a>
            </div>
            <div className="announcements-list">
              <div className="announcement-item">
                <span className="announcement-badge">Important</span>
                <p>Réunion parents-profs le 20 avril à 14h</p>
              </div>
              <div className="announcement-item">
                <span className="announcement-badge">Info</span>
                <p>Nouvel horaire d'ouverture de la bibliothèque</p>
              </div>
              <div className="announcement-item">
                <span className="announcement-badge">Rappel</span>
                <p>N'oubliez pas votre uniforme le lundi!</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
