import { NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../AuthContext';

export default function Navbar() {
  const { user, logout, isOrganizer } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate('/login');
  };

  return (
    <nav className="navbar navbar-expand navbar-dark bg-dark px-3">
      <div className="navbar-nav me-auto">
        <NavLink className="nav-link" to="/">Workshops</NavLink>
        {user && !isOrganizer && (
          <NavLink className="nav-link" to="/my-registrations">My Registrations</NavLink>
        )}
        {isOrganizer && <NavLink className="nav-link" to="/dashboard">Dashboard</NavLink>}
      </div>
      <div className="navbar-nav">
        {!user ? (
          <>
            <NavLink className="nav-link" to="/login">Login</NavLink>
            <NavLink className="nav-link" to="/register">Register</NavLink>
          </>
        ) : (
          <button className="btn btn-outline-light btn-sm" onClick={handleLogout}>Logout</button>
        )}
      </div>
    </nav>
  );
}