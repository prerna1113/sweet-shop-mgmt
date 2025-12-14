import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';

function Navbar({ onShowLogin, onShowRegister, onShowDashboard }) {
  const { user, logout } = useContext(AuthContext);

  return (
    <nav className="navbar navbar-dark bg-dark px-3">
      <span className="navbar-brand">Sweet Shop</span>

      <div>
        {!user && (
          <>
            <button
              className="btn btn-outline-light me-2"
              onClick={onShowLogin}
            >
              Login
            </button>
            <button
              className="btn btn-outline-light"
              onClick={onShowRegister}
            >
              Register
            </button>
          </>
        )}

        {user && (
          <>
            <button
              className="btn btn-outline-light me-2"
              onClick={onShowDashboard}
            >
              Dashboard
            </button>
            <button
              className="btn btn-danger"
              onClick={logout}
            >
              Logout
            </button>
          </>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
