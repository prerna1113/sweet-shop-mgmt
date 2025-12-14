import { useState } from "react";
import api from "../api/api";

function AddSweet({ onAdded }) {
  const [form, setForm] = useState({
    name: "",
    category: "",
    price: "",
    quantity: "",
  });

  const submit = async (e) => {
    e.preventDefault();
    await api.post("/sweets", form);
    onAdded();
  };

  return (
    <form onSubmit={submit} className="mb-4">
      <input className="form-control mb-2" placeholder="Name"
        onChange={(e)=>setForm({...form,name:e.target.value})} />
      <input className="form-control mb-2" placeholder="Category"
        onChange={(e)=>setForm({...form,category:e.target.value})} />
      <input className="form-control mb-2" placeholder="Price"
        onChange={(e)=>setForm({...form,price:e.target.value})} />
      <input className="form-control mb-2" placeholder="Quantity"
        onChange={(e)=>setForm({...form,quantity:e.target.value})} />
      <button className="btn btn-success">Add Sweet</button>
    </form>
  );
}

export default AddSweet;
