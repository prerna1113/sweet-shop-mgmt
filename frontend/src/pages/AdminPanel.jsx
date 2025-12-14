import { useEffect, useState } from "react";
import api from "../api/api";
import AdminSweetForm from "../components/AdminSweetForm";

function AdminPanel() {
  const [sweets, setSweets] = useState([]);
  const [editingSweet, setEditingSweet] = useState(null);

  const fetchSweets = async () => {
    const res = await api.get("/sweets");
    setSweets(res.data);
  };

  useEffect(() => {
    fetchSweets();
  }, []);

  const handleAddOrUpdate = async (data) => {
    if (editingSweet) {
      await api.put(`/sweets/${editingSweet._id}`, data);
    } else {
      await api.post("/sweets", data);
    }
    setEditingSweet(null);
    fetchSweets();
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this sweet?")) return;
    await api.delete(`/sweets/${id}`);
    fetchSweets();
  };

  return (
    <div>
      <h2 className="mb-3">Admin Panel</h2>

      <AdminSweetForm
        onSubmit={handleAddOrUpdate}
        editingSweet={editingSweet}
      />

      <table className="table table-bordered">
        <thead>
          <tr>
            <th>Name</th>
            <th>Category</th>
            <th>₹</th>
            <th>Qty</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          {sweets.map((s) => (
            <tr key={s._id}>
              <td>{s.name}</td>
              <td>{s.category}</td>
              <td>{s.price}</td>
              <td>{s.quantity}</td>
              <td>
                <button
                  className="btn btn-sm btn-warning me-2"
                  onClick={() => setEditingSweet(s)}
                >
                  Edit
                </button>

                <button
                  className="btn btn-sm btn-danger"
                  onClick={() => handleDelete(s._id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default AdminPanel;
