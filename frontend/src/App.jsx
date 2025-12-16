import { useState, useContext } from "react";
import Navbar from "./components/Navbar";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import { AuthContext } from "./context/AuthContext";
import AdminPanel from "./pages/AdminPanel";

function App() {
  const { user } = useContext(AuthContext);
  const [page, setPage] = useState("login");

  
  const [editingSweet, setEditingSweet] = useState(null);

  return (
    <>
      <Navbar
        onShowLogin={() => setPage("login")}
        onShowRegister={() => setPage("register")}
        onShowDashboard={() => setPage("dashboard")}
      />

      <div className="container mt-4">
        {!user && page === "login" && <Login />}
        {!user && page === "register" && <Register />}

        {user && page === "dashboard" && (
          <Dashboard
            onEditSweet={(sweet) => {
              setEditingSweet(sweet);   
              setPage("admin");         
            }}
          />
        )}

        {user?.role === "admin" && page === "admin" && (
          <AdminPanel
  editingSweet={editingSweet}
  setEditingSweet={setEditingSweet}
  clearEditing={() => setEditingSweet(null)}
/>
        )}
      </div>
    </>
  );
}

export default App;
