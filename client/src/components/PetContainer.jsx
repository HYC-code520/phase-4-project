import React, { useEffect, useState } from 'react';
import PetCard from './PetCard';

const PetContainer = () => {
  const [pets, setPets] = useState([]);

  useEffect(() => {
    fetch('http://localhost:5555/pets') // Adjust the endpoint according to your backend API
      .then(response => response.json())
      .then(data => setPets(data))
      .catch(error => console.error('Error fetching pets:', error));
  }, []);

  return (
    <div className="pet-cards-container">
      {pets.map(pet => (
        <PetCard key={pet.id} pet={pet} />
      ))}
    </div>
  );
};

export default PetContainer;