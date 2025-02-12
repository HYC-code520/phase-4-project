import React, { useEffect, useState } from 'react';
import PetCard from './PetCard';

const Dogs = () => {
  const [dogs, setDogs] = useState([]);

  useEffect(() => {
    fetch('/api/pets') // Adjust the endpoint according to your backend API
      .then(response => response.json())
      .then(data => {
        const dogsData = data.filter(pet => pet.animal_type === 'Dog');
        setDogs(dogsData);
      })
      .catch(error => console.error('Error fetching pets:', error));
  }, []);

  return (
    <div className="pet-cards-container">
      {dogs.map(dog => (
        <PetCard key={dog.id} pet={dog} />
      ))}
    </div>
  );
};

export default Dogs;