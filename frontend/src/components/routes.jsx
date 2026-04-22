import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../components/contextes/AuthProvider";

// ================= PUBLIC =================
import HomePage from "./pages/public/HomePage";
import AboutPage from "./pages/public/About";
import AnnouncementsPage from "./pages/public/Annoucement";
import ContactPage from "./pages/public/ContactPage";
import LoginPage from "./pages/public/LoginPage";
import RegisterPage from "./pages/public/RegisterPage";
import ForgotPasswordPage from "./pages/public/ForgetPasswordPage";

// ================= ADMIN =================
import AdminDashboard from "./pages/admin/AdminDashboard";
import AdminStudents from "./pages/admin/students";
import AdminSchedule from "./pages/admin/Scedule";
import AdminAnnouncements from "./pages/admin/Annoucements";
import AddAnnouncement from "./pages/admin/addAnoucement";
import EditAnnouncement from "./pages/admin/EditAnnoucment";
import AnnouncementDetails from "./pages/admin/annoucementDetails";
import AdminMessages from "./pages/admin/Message";
import AdminPayments from "./pages/admin/Payment";
import AdminTransport from "./pages/admin/Transport";
import BusDetails from "./pages/admin/BusDetails";
import EditTransport from "./pages/admin/EditTransport";
import AddTransport from "./pages/admin/AddTransport";
import AdminAbsences from "./pages/admin/absence";
import AdminAbsenceDetails from "./pages/admin/absenceDetails";
import AdminAbsenceStats from "./pages/admin/absenceStatique";
import AdminSettings from "./pages/admin/Settings";
import AddStudent from "./pages/admin/AddStudent";
import StudentDetails from "./pages/admin/StudentDetails";
import EditStudent from "./pages/admin/EditStudent";

// ================= PARENT =================
import ParentDashboard from "./pages/parent/Dashboard";
import ParentChildren from "./pages/parent/Children";
import ParentChildDetails from "./pages/parent/pt/enfantDetails";
import ParentMessages from "./pages/parent/Messages";
import ParentMessageConversation from "./pages/parent/messageConversation";
import ParentPayments from "./pages/parent/Payments";
import ParentProfile from "./pages/parent/Profile";
import ParentSettings from "./pages/parent/Settings";
import ChildAbsences from "./pages/parent/Absences";
import ChildAssignments from "./pages/parent/Assignments";

// 🔐 PROTECTED ROUTE
function ProtectedRoute({ children, role }) {
  const { user, loading } = useContext(AuthContext);

  if (loading) return <div>Loading...</div>;

  if (!user) return <Navigate to="/login" />;

  if (role && user.role !== role) return <Navigate to="/" />;

  return children;
}

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* ================= PUBLIC ================= */}
        <Route path="/" element={<HomePage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/announcements" element={<AnnouncementsPage />} />
        <Route path="/contact" element={<ContactPage />} />

        <Route
          path="/login"
          element={
            localStorage.getItem("token") ? (
              <Navigate to="/admin/dashboard" />
            ) : (
              <LoginPage />
            )
          }
        />

        <Route path="/register" element={<RegisterPage />} />
        <Route path="/forgot-password" element={<ForgotPasswordPage />} />

        {/* ================= ADMIN ================= */}
        <Route
          path="/admin/dashboard"
          element={
            <ProtectedRoute role="admin">
              <AdminDashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/students"
          element={
            <ProtectedRoute role="admin">
              <AdminStudents />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/schedule"
          element={
            <ProtectedRoute role="admin">
              <AdminSchedule />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/students/create"
          element={
            <ProtectedRoute role="admin">
              <AddStudent />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/students/:id"
          element={
            <ProtectedRoute role="admin">
              <StudentDetails />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/students/edit/:id"
          element={
            <ProtectedRoute role="admin">
              <EditStudent />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/announcements"
          element={
            <ProtectedRoute role="admin">
              <AdminAnnouncements />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/announcements/create"
          element={
            <ProtectedRoute role="admin">
              <AddAnnouncement />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/announcements/edit/:id"
          element={
            <ProtectedRoute role="admin">
              <EditAnnouncement />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/announcements/:id"
          element={
            <ProtectedRoute role="admin">
              <AnnouncementDetails />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/messages"
          element={
            <ProtectedRoute role="admin">
              <AdminMessages />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/payments"
          element={
            <ProtectedRoute role="admin">
              <AdminPayments />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/transport"
          element={
            <ProtectedRoute role="admin">
              <AdminTransport />
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin/transport/create"
          element={
            <ProtectedRoute role="admin">
              <AddTransport />
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin/transport/edit/:id"
          element={
            <ProtectedRoute role="admin">
              <EditTransport />
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin/transport/:id"
          element={
            <ProtectedRoute role="admin">
              <BusDetails />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/absences"
          element={
            <ProtectedRoute role="admin">
              <AdminAbsences />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/absences/:id"
          element={
            <ProtectedRoute role="admin">
              <AdminAbsenceDetails />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/absences/stats"
          element={
            <ProtectedRoute role="admin">
              <AdminAbsenceStats />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/settings"
          element={
            <ProtectedRoute role="admin">
              <AdminSettings />
            </ProtectedRoute>
          }
        />

        {/* ================= PARENT ================= */}
        <Route
          path="/parent/dashboard"
          element={
            <ProtectedRoute role="parent">
              <ParentDashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/parent/children"
          element={
            <ProtectedRoute role="parent">
              <ParentChildren />
            </ProtectedRoute>
          }
        />
        <Route
          path="/parent/child/:id"
          element={
            <ProtectedRoute role="parent">
              <ParentChildDetails />
            </ProtectedRoute>
          }
        />
        <Route
          path="/parent/messages"
          element={
            <ProtectedRoute role="parent">
              <ParentMessages />
            </ProtectedRoute>
          }
        />
        <Route
          path="/parent/messages/:id"
          element={
            <ProtectedRoute role="parent">
              <ParentMessageConversation />
            </ProtectedRoute>
          }
        />
        <Route
          path="/parent/payments"
          element={
            <ProtectedRoute role="parent">
              <ParentPayments />
            </ProtectedRoute>
          }
        />
        <Route
          path="/parent/profile"
          element={
            <ProtectedRoute role="parent">
              <ParentProfile />
            </ProtectedRoute>
          }
        />
        <Route
          path="/parent/settings"
          element={
            <ProtectedRoute role="parent">
              <ParentSettings />
            </ProtectedRoute>
          }
        />
        <Route
          path="/parent/absences"
          element={
            <ProtectedRoute role="parent">
              <ChildAbsences />
            </ProtectedRoute>
          }
        />
        <Route
          path="/parent/assignments"
          element={
            <ProtectedRoute role="parent">
              <ChildAssignments />
            </ProtectedRoute>
          }
        />

        {/* ================= DEFAULT ================= */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </BrowserRouter>
  );
}
