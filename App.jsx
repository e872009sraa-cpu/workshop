import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import ProtectedRoute from './components/ProtectedRoute';
import Workshops from './pages/Workshops';
import WorkshopDetails from './pages/WorkshopDetails';
import Login from './pages/Login';
import Register from './pages/Register';
import MyRegistrations from './pages/MyRegistrations';
import Dashboard from './pages/Dashboard';

export default function App() {
  return (
    <>
      <Navbar />
      <div className="container py-4">
        <Routes>
          <Route path="/" element={<Workshops />} />
          <Route path="/workshops/:id" element={<WorkshopDetails />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/my-registrations" element={<ProtectedRoute><MyRegistrations /></ProtectedRoute>} />
          <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
        </Routes>
      </div>
    </>
  );
}