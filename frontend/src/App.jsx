import { useState } from 'react';
import Navbar from './components/Navbar';
import Login from './pages/Login';
import Register from './pages/Register';

function App() {
  const [page, setPage] = useState('login');

  return (
    <>
      <Navbar
        onShowLogin={() => setPage('login')}
        onShowRegister={() => setPage('register')}
        onShowDashboard={() => setPage('dashboard')}
      />

      <div className="container mt-4">
        {page === 'login' && <Login />}
        {page === 'register' && <Register />}
        {page === 'dashboard' && <h2>Dashboard coming next</h2>}
      </div>
    </>
  );
}

export default App;
