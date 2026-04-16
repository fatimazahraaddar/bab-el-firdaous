import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

// ================= PUBLIC =================
import HomePage from './pages/public/HomePage';
import AboutPage from './pages/public/About';
import AnnouncementsPage from './pages/public/Annoucement';
import ContactPage from './pages/public/ContactPage';
import LoginPage from './pages/public/LoginPage';
import RegisterPage from './pages/public/RegisterPage';
import ForgotPasswordPage from './pages/public/ForgetPasswordPage';

// ================= STUDENT =================
import StudentDashboard from './pages/Student/StudentDashboard';
import Assignments from './pages/Student/Assignment';
import Timetable from './pages/Student/TimeTable';
import Messages from './pages/Student/Message';
import Payment from './pages/Student/Payment';
import Notes from './pages/Student/Notes';
import Absence from './pages/Student/Absence';
import StudentTransport from './pages/Student/Transport';
import Profile from './pages/Student/Profile';
import Settings from './pages/Student/Settings';
import MessageConversation from './pages/Student/MessageConversation';
import StudentAnnouncements from './pages/Student/Annoucement';

// ================= TEACHER =================
import TeacherDashboard from './pages/proffesseur/TeacherDashboard';
import TeacherStudents from './pages/proffesseur/student';
import TeacherAssignments from './pages/proffesseur/Assignment';
import TeacherSchedule from './pages/proffesseur/timeTable';
import TeacherMessages from './pages/proffesseur/message';
import TeacherAbsences from './pages/proffesseur/absence';
import TeacherProfile from './pages/proffesseur/profile';
import TeacherSettings from './pages/proffesseur/setting';
import TeacherMessageConversation from './pages/proffesseur/messageConversation';

// ================= ADMIN =================
import AdminDashboard from './pages/admin/AdminDashboard';
import AdminStudents from './pages/admin/students';
import AdminTeachers from './pages/admin/Teacher';
import AdminSchedule from './pages/admin/TimeTable';
import AdminAnnouncements from './pages/admin/Annoucements';
import AdminMessages from './pages/admin/Message';
import AdminPayments from './pages/admin/Payment';
import AdminTransport from './pages/admin/Transport';
import AdminAbsences from './pages/admin/absence';
import AdminSettings from './pages/admin/Settings';

// ================= PARENT =================
import ParentDashboard from './pages/parent/ParentDashboard';
import ParentChildren from './pages/parent/enfant';
import ParentChildDetails from './pages/parent/enfantDetails';
import ParentNotes from './pages/parent/enfantNotes';
import ParentAssignments from './pages/parent/enfantAssignment';
import ParentTimetable from './pages/parent/enfantTimeTable';
import ParentMessages from './pages/parent/message';
import ParentMessageConversation from './pages/parent/messageConversation';
import ParentNotifications from './pages/parent/Notification';
import ParentPayments from './pages/parent/payment';
import ParentPaymentDetails from './pages/parent/paymentDetails';
import ParentProfile from './pages/parent/Profile';
import ParentSettings from './pages/parent/Settings';
import ChildAbsences from './pages/parent/enfantAbsence';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>

        {/* ================= PUBLIC ================= */}
        <Route path="/" element={<HomePage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/announcements" element={<AnnouncementsPage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/forgot-password" element={<ForgotPasswordPage />} />

        {/* ================= STUDENT ================= */}
        <Route path="/student/dashboard" element={<StudentDashboard />} />
        <Route path="/student/assignments" element={<Assignments />} />
        <Route path="/student/schedule" element={<Timetable />} />
        <Route path="/student/messages" element={<Messages />} />
        <Route path="/student/messages/:id" element={<MessageConversation />} />
        <Route path="/student/payments" element={<Payment />} />
        <Route path="/student/grades" element={<Notes />} />
        <Route path="/student/absences" element={<Absence />} />
        <Route path="/student/announcements" element={<StudentAnnouncements />} />
        <Route path="/student/transport" element={<StudentTransport />} />
        <Route path="/student/profile" element={<Profile />} />
        <Route path="/student/settings" element={<Settings />} />

        {/* ================= TEACHER ================= */}
        <Route path="/teacher/dashboard" element={<TeacherDashboard />} />
        <Route path="/teacher/students" element={<TeacherStudents />} />
        <Route path="/teacher/assignments" element={<TeacherAssignments />} />
        <Route path="/teacher/schedule" element={<TeacherSchedule />} />
        <Route path="/teacher/messages" element={<TeacherMessages />} />
        <Route path="/teacher/messages/:id" element={<TeacherMessageConversation />} />
        <Route path="/teacher/absences" element={<TeacherAbsences />} />
        <Route path="/teacher/profile" element={<TeacherProfile />} />
        <Route path="/teacher/settings" element={<TeacherSettings />} />

        {/* ================= ADMIN ================= */}
        <Route path="/admin/dashboard" element={<AdminDashboard />} />
        <Route path="/admin/students" element={<AdminStudents />} />
        <Route path="/admin/teachers" element={<AdminTeachers />} />
        <Route path="/admin/schedule" element={<AdminSchedule />} />
        <Route path="/admin/announcements" element={<AdminAnnouncements />} />
        <Route path="/admin/messages" element={<AdminMessages />} />
        <Route path="/admin/payments" element={<AdminPayments />} />
        <Route path="/admin/transport" element={<AdminTransport />} />
        <Route path="/admin/absences" element={<AdminAbsences />} />
        <Route path="/admin/settings" element={<AdminSettings />} />

        {/* ================= PARENT ================= */}
        <Route path="/parent/dashboard" element={<ParentDashboard />} />
        <Route path="/parent/children" element={<ParentChildren />} />
        <Route path="/parent/children/:id" element={<ParentChildDetails />} />
        <Route path="/parent/notes" element={<ParentNotes />} />
        <Route path="/parent/absences" element={<ChildAbsences />} />
        <Route path="/parent/assignments" element={<ParentAssignments />} />
        <Route path="/parent/timetable" element={<ParentTimetable />} />
        <Route path="/parent/messages" element={<ParentMessages />} />
        <Route path="/parent/messages/:id" element={<ParentMessageConversation />} />
        <Route path="/parent/notifications" element={<ParentNotifications />} />
        <Route path="/parent/payments" element={<ParentPayments />} />
        <Route path="/parent/payments/:id" element={<ParentPaymentDetails />} />
        <Route path="/parent/profile" element={<ParentProfile />} />
        <Route path="/parent/settings" element={<ParentSettings />} />

      </Routes>
    </BrowserRouter>
  );
}