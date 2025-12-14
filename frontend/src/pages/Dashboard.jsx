import { useEffect, useState } from 'react';
import api from '../api/api';
import SweetCard from '../components/SweetCard';

function Dashboard() {
  const [sweets, setSweets] = useState([]);

  const fetchSweets = async () => {
    const res = await api.get('/sweets');
    setSweets(res.data);
  };

  useEffect(() => {
    fetchSweets();
  }, []);

  const handlePurchase = async (id) => {
    try {
      await api.post(`/sweets/${id}/purchase`, { quantity: 1 });
      fetchSweets(); // refresh stock
    } catch (error) {
      alert(error.response?.data?.message || 'Purchase failed');
    }
  };

  return (
    <div>
      <h2 className="mb-3">Available Sweets</h2>

      {sweets.map((sweet) => (
        <SweetCard
          key={sweet._id}
          sweet={sweet}
          onPurchase={handlePurchase}
        />
      ))}
    </div>
  );
}

export default Dashboard;
