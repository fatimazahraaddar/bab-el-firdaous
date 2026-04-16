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

export default function Statistics() {

  const revenueData = [
    { month: "Jan", value: 20000 },
    { month: "Fév", value: 25000 },
    { month: "Mar", value: 30000 },
    { month: "Avr", value: 40000 }
  ];

  const studentsData = [
    { name: "Primaire", value: 50 },
    { name: "Collège", value: 40 },
    { name: "Lycée", value: 30 }
  ];

  const COLORS = ["#0088FE", "#00C49F", "#FFBB28"];

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
                      <Cell key={index} fill={COLORS[index]} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>

            </div>
          </div>

          {/* 📈 Infos rapides */}
          <div className="col-md-6">
            <div className="card shadow p-4">

              <h5 className="mb-3">Résumé</h5>

              <ul>
                <li>Total élèves : 120</li>
                <li>Total enseignants : 15</li>
                <li>Bus actifs : 5</li>
                <li>Revenus : 40000 DH</li>
              </ul>

            </div>
          </div>

        </div>

      </div>
    </DashboardLayout>
  );
}
