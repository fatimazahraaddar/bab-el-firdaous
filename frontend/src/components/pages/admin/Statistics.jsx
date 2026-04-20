import DashboardLayout from '../../pages/Layouts/DashboardLayout';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell
} from "recharts";
import { useState, useEffect } from "react";

export default function Statistics() {

  const [revenueData, setRevenueData] = useState([]);
  const [studentsData, setStudentsData] = useState([]);
  const [summary, setSummary] = useState({});
  const [loading, setLoading] = useState(true);

  const COLORS = ["#0088FE", "#00C49F", "#FFBB28"];

  // 🔄 FETCH DATA
  useEffect(() => {
    fetch("http://localhost:8000/api/statistics")
      .then(res => res.json())
      .then(data => {
        setRevenueData(data.revenue);
        setStudentsData(data.students);
        setSummary(data.summary);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <DashboardLayout>
        <div className="text-center mt-5">Chargement des statistiques...</div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div className="container-fluid">

        <h2 className="mb-4">Statistiques</h2>

        {/* 📊 Revenus */}
        <div className="card shadow p-4 mb-4">
          <h5 className="mb-3">Revenus mensuels</h5>

          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={revenueData}>
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="value" fill="#0d6efd" />
            </BarChart>
          </ResponsiveContainer>

        </div>

        <div className="row">

          {/* 👨‍🎓 Répartition élèves */}
          <div className="col-md-6">
            <div className="card shadow p-4">

              <h5 className="mb-3">Répartition des élèves</h5>

              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={studentsData}
                    dataKey="value"
                    outerRadius={100}
                    label
                  >
                    {studentsData.map((entry, index) => (
                      <Cell key={index} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>

            </div>
          </div>

          {/* 📈 Résumé */}
          <div className="col-md-6">
            <div className="card shadow p-4">

              <h5 className="mb-3">Résumé</h5>

              <ul>
                <li>Total élèves : {summary.students}</li>
                <li>Total enseignants : {summary.teachers}</li>
                <li>Bus actifs : {summary.buses}</li>
                <li>Revenus : {summary.revenue} DH</li>
              </ul>

            </div>
          </div>

        </div>

      </div>
    </DashboardLayout>
  );
}