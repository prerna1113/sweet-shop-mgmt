import { useState } from 'react';

function SearchFilter({ onSearch }) {
  const [name, setName] = useState('');
  const [category, setCategory] = useState('');
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');

  const handleSearch = () => {
    onSearch({ name, category, minPrice, maxPrice });
  };

  return (
    <div className="card p-3 mb-4">
      <h5>Search & Filter</h5>

      <input
        className="form-control mb-2"
        placeholder="Sweet name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />

      <input
        className="form-control mb-2"
        placeholder="Category"
        value={category}
        onChange={(e) => setCategory(e.target.value)}
      />

      <div className="row">
        <div className="col">
          <input
            className="form-control mb-2"
            placeholder="Min price"
            value={minPrice}
            onChange={(e) => setMinPrice(e.target.value)}
          />
        </div>
        <div className="col">
          <input
            className="form-control mb-2"
            placeholder="Max price"
            value={maxPrice}
            onChange={(e) => setMaxPrice(e.target.value)}
          />
        </div>
      </div>

      <button className="btn btn-secondary" onClick={handleSearch}>
        Apply Filters
      </button>
    </div>
  );
}

export default SearchFilter;
