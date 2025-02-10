import React, { useEffect, useState } from 'react';
import PetCard from './PetCard';

const Cats = () => {
  const [cats, setCats] = useState([]);

  useEffect(() => {
    fetch('http://localhost:5555/pets') // Adjust the endpoint according to your backend API
      .then(response => response.json())
      .then(data => {
        const catsData = data.filter(pet => pet.animal_type === 'cat');
        setCats(catsData);
      })
      .catch(error => console.error('Error fetching pets:', error));
  }, []);

  return (
    <div className="pet-cards-container">
      {cats.map(cat => (
        <PetCard key={cat.id} pet={cat} />
      ))}
    </div>
  );
};

export default Cats;