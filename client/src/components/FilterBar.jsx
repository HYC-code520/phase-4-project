import React from 'react';

const FilterBar = ({ filter, setFilter }) => {
  const handleFilterChange = (event) => {
    setFilter(event.target.value);
  };

  return (
    <div className="filter-bar">
      <label htmlFor="filter">Filter by:</label>
      <select id="filter" value={filter} onChange={handleFilterChange}>
        <option value="all">All</option>
        <option value="cat">Cats</option>
        <option value="dog">Dogs</option>
      </select>
    </div>
  );
};

export default FilterBar;