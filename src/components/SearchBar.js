// File: src/components/SearchBar.jsx
// =============================
import React from 'react';

function SearchBar({ value, onChange }) {
  return (
    <input
      type="text"
      className="form-control my-3"
      placeholder="Search by name or specialization"
      value={value}
      onChange={(e) => onChange(e.target.value)}
    />
  );
}

export default SearchBar;