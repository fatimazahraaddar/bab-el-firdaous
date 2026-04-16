
import './App.css';
import './components/ui/global.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import AppRoutes from './components/routes';
import ProtectedRoute from "./components/ProtectedRoute";
import { Route } from 'react-router-dom';
import Dashboard from './components/pages/admin/Dashboard';
import { AuthProvider } from './components/contextes/AuthProvider';

function App() {
  return (
    <AuthProvider>
      <AppRoutes />
    </AuthProvider>
  );
}

export default App;
