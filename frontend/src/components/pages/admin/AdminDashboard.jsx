import React, { useState, useEffect } from 'react';
import DashboardLayout from '../Layouts/DashboardLayout';
import axios from "axios";
import {
  Users,
  DollarSign,
  AlertCircle,
  Calendar,
  CheckCircle,
  ArrowUpRight,
  ArrowDownRight
} from 'lucide-react';
import './AdminDashboard.css';

export default function AdminDashboard() {
  const API_BASE = import.meta.env.VITE_API_BASE_URL || "http://127.0.0.1:8000";

  const [data, setData] = useState({
  stats: [],
  activities: [],
  classes: [],
  events: []
});

  const [loading, setLoading] = useState(true);
  const [period, setPeriod] = useState("month");

  const iconMap = {
    Users,
    DollarSign,
    AlertCircle,
    Calendar,
    CheckCircle
  };

  useEffect(() => {
    const fetchDashboard = async () => {
      setLoading(true);

      try {
        const token = localStorage.getItem("token");
        const res = await axios.get(
          `${API_BASE}/api/dashboard?period=${period}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              Accept: "application/json",
            },
          }
        );

        setData(res.data);

      } catch (err) {
        console.error("Dashboard error:", err.response?.data || err);

        // 🔥 si token invalide → logout
        if (err.response?.status === 401) {
          localStorage.removeItem("token");
          localStorage.removeItem("user");
          window.location.href = "/login";
        }

      } finally {
        setLoading(false);
      }
    };

    fetchDashboard();
  }, [API_BASE, period]);

  // 🔄 LOADING
  if (loading) {
    return (
      <DashboardLayout userRole="admin" userName="Admin User">
        <div className="loading">
          Chargement du dashboard...
        </div>
      </DashboardLayout>
    );
  }

return (
  <DashboardLayout>
    <div className="premium-dashboard">

      {/* HEADER */}
      <div className="premium-header">
        <div>
          <h1 style={{color:"#3e199d"}}>Dashboard</h1>
          <p>Bienvenue 👋 voici un aperçu de votre école</p>
        </div>

        <select value={period} onChange={(e) => setPeriod(e.target.value)}>
          <option value="week">Semaine</option>
          <option value="month">Mois</option>
          <option value="year">Année</option>
        </select>
      </div>

      {/* STATS */}
      <div className="premium-stats">
        {data.stats.map((stat, i) => {
          const Icon = iconMap[stat.icon] || Users;

          return (
            <div key={i} className="premium-card stat">
              <div className="stat-left">
                <Icon size={22} />
              </div>

              <div className="stat-content">
                <h2>{stat.value}</h2>
                <p>{stat.title}</p>
              </div>

              <div className={stat.isPositive ? "trend up" : "trend down"}>
                {stat.change}
              </div>
            </div>
          );
        })}
      </div>

      {/* MAIN GRID */}
      <div className="premium-grid">

        {/* ACTIVITIES */}
        <div className="premium-card large">
          <h3>Activités récentes</h3>

          {data.activities.map((a, i) => (
            <div key={i} className="activity-row">
              <div className="dot" />
              <div>
                <p>{a.message}</p>
                <small>{a.time}</small>
              </div>
            </div>
          ))}
        </div>

        {/* CLASSES */}
        <div className="premium-card">
          <h3>Performance</h3>

          {data.classes.map((c, i) => (
            <div key={i} className="class-row">
              <div className="class-head">
                <span>{c.name}</span>
                <span>{c.avg}/20</span>
              </div>

              <div className="bar">
                <div style={{ width: `${c.performance}%` }} />
              </div>
            </div>
          ))}
        </div>

      </div>

      {/* EVENTS */}
      <div className="premium-card">
        <h3>Événements</h3>

        <div className="events">
          {data.events.map((e, i) => (
            <div key={i} className="event">
              <strong>{e.title}</strong>
              <p>{e.date}</p>
              <small>{e.time}</small>
            </div>
          ))}
        </div>
      </div>

    </div>
  </DashboardLayout>
);
        }
