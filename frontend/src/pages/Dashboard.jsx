import { useEffect, useState } from "react";
import api from "../api/api";
import SweetCard from "../components/SweetCard";
import SearchFilter from "../components/SearchFilter";
import AddSweet from "../components/AddSweet";
import { useAuth } from "../context/AuthContext";
const sweetImages = [
  "https://images.unsplash.com/photo-1606491956689-2ea866880c84",
  "https://images.unsplash.com/photo-1589308078055-972f9a3e1c92",
  "https://images.unsplash.com/photo-1598373182133-52452f7691ef",
  "https://images.unsplash.com/photo-1614707267537-b85aaf00c4b7",
  "https://images.unsplash.com/photo-1627308595229-7830a5c91f9f",
];

function Dashboard() {
  const [sweets, setSweets] = useState([]);
  const { user, logout } = useAuth();

  const fetchSweets = async () => {
    const res = await api.get("/sweets");
    setSweets(res.data);
  };

  useEffect(() => {
    fetchSweets();
  }, []);

  const handlePurchase = async (id) => {
    try {
      await api.post(`/sweets/${id}/purchase`, { quantity: 1 });
      fetchSweets();
    } catch (error) {
      alert(error.response?.data?.message || "Purchase failed");
    }
  };

  const handleSearch = async (filters) => {
    const params = new URLSearchParams(filters).toString();
    const res = await api.get(`/sweets/search?${params}`);
    setSweets(res.data);
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this sweet?")) return;
    await api.delete(`/sweets/${id}`);
    fetchSweets();
  };

  const handleEdit = (sweet) => {
    console.log("Edit clicked", sweet);
  };

  return (
    <div className="container mt-4">
      <h2 className="mb-3">Available Sweets</h2>

      {user && <AddSweet onAdded={fetchSweets} />}

      <SearchFilter onSearch={handleSearch} />

      <div className="row">
        {sweets.map((sweet, index) => (
          <div className="col-md-3 mb-4" key={sweet._id}>
            <SweetCard
              sweet={sweet}
              image={sweetImages[index % sweetImages.length]}
              onPurchase={handlePurchase}
              onEdit={handleEdit}
              onDelete={handleDelete}
            />
          </div>
        ))}
      </div>
    </div>
  );
}

export default Dashboard;