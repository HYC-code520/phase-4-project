import React, { useEffect, useState } from 'react';
import PetCard from './PetCard';
import FilterBar from './FilterBar';

const PetContainer = () => {
  const [pets, setPets] = useState([]);
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    fetch('http://localhost:5555/pets') // Adjust the endpoint according to your backend API
      .then(response => response.json())
      .then(data => setPets(data))
      .catch(error => console.error('Error fetching pets:', error));
  }, []);

  const filteredPets = pets.filter(pet => {
    if (filter === 'all') return true;
    return pet.animal_type === filter;
  });

  return (
    <div>
      <FilterBar filter={filter} setFilter={setFilter} />
      <div className="pet-cards-container">
        {filteredPets.map(pet => (
          <PetCard key={pet.id} pet={pet} />
        ))}
      </div>
    </div>
  );
};

export default PetContainer;