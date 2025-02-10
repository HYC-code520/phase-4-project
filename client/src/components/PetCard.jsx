import React from 'react';

const PetCard = ({ pet }) => {
  return (
    <div className="pet-card">
      <img src={pet.img_url} alt={`${pet.name}`} />
      <h2>{pet.name}</h2>
      <p>Age: {pet.age}</p>
      <p>Type: {pet.animal_type}</p>
      <p>Breed: {pet.breed}</p>
      <p>Status: {pet.adoption_status}</p>
    </div>
  );
};

export default PetCard;