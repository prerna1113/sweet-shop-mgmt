import { useState, useEffect } from "react";

function AdminSweetForm({ onSubmit, editingSweet }) {
  const [form, setForm] = useState({
    name: "",
    category: "",
    price: "",
    quantity: "",
  });

  useEffect(() => {
    if (editingSweet) {
      setForm(editingSweet);
    }
  }, [editingSweet]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(form);
    setForm({ name: "", category: "", price: "", quantity: "" });
  };

  return (
    <form onSubmit={handleSubmit} className="card p-3 mb-4">
      <h5>{editingSweet ? "Update Sweet" : "Add New Sweet"}</h5>

      <input
        className="form-control mb-2"
        name="name"
        placeholder="Name"
        value={form.name}
        onChange={handleChange}
        required
      />

      <input
        className="form-control mb-2"
        name="category"
        placeholder="Category"
        value={form.category}
        onChange={handleChange}
        required
      />

      <input
        className="form-control mb-2"
        name="price"
        type="number"
        placeholder="Price"
        value={form.price}
        onChange={handleChange}
        required
      />

      <input
        className="form-control mb-3"
        name="quantity"
        type="number"
        placeholder="Quantity"
        value={form.quantity}
        onChange={handleChange}
        required
      />

      <button className="btn btn-dark">
        {editingSweet ? "Update" : "Add"}
      </button>
    </form>
  );
}

export default AdminSweetForm;
