// File: src/components/SearchBar.js
import React from 'react';

function SearchBar({ value, onChange }) {
  return (
    <input
      type="text"
      className="form-control mb-3"
      placeholder="Search doctors by name or specialization"
      value={value}
      onChange={e => onChange(e.target.value)}
    />
  );
}

export default SearchBar;