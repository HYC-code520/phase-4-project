import React, { useEffect, useState } from 'react';
import PetCard from './PetCard';
import FilterBar from './FilterBar';
import AdoptionForm from './AdoptionForm';

const PetContainer = () => {
  const [pets, setPets] = useState([]);
  const [filter, setFilter] = useState('all');
  const [selectedPet, setSelectedPet] = useState(null);

  useEffect(() => {
    fetch('/api/pets') // Adjust the endpoint according to your backend API
      .then(response => response.json())
      .then(data => setPets(data))
      .catch(error => console.error('Error fetching pets:', error));
  }, []);

  const filteredPets = pets.filter(pet => {
    if (filter === 'all') return true;
    return pet.animal_type === filter;
  });

  const handlePetClick = (pet) => {
    setSelectedPet(pet);
  };

  const handleBackClick = () => {
    setSelectedPet(null);
  };

  const handleToggleFavorite = (petId) => {
    // This function can be implemented to handle favorite toggle
  };

  return (
    <div>
      <FilterBar filter={filter} setFilter={setFilter} />
      <div className="pet-cards-container">
        {selectedPet ? (
          <div className="selected-pet-container">
            <button onClick={handleBackClick}>Back</button>
            <div className="selected-pet">
              <PetCard pet={selectedPet} onToggleFavorite={handleToggleFavorite} />
            </div>
            <div className="adoption-form">
              <AdoptionForm petName={selectedPet.name} />
            </div>
          </div>
        ) : (
          filteredPets.map(pet => (
            <div key={pet.id} className="pet-card-container">
              <PetCard pet={pet} onImageClick={handlePetClick} onToggleFavorite={handleToggleFavorite} />
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default PetContainer;