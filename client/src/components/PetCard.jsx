import React, { useState } from 'react';

const PetCard = ({ pet, onImageClick }) => {
  const [isFavorite, setIsFavorite] = useState(false);

  const handleToggleFavorite = () => {
    setIsFavorite(!isFavorite);
  };

  return (
    <div className="pet-card">
      <div onClick={() => onImageClick(pet)}>
        <img src={pet.img_url} alt={`${pet.name}`} />
      </div>
      <h2>{pet.name}</h2>
      <p>Age: {pet.age}</p>
      <p>Type: {pet.animal_type}</p>
      <p>Breed: {pet.breed}</p>
      <p>Status: {pet.adoption_status}</p>
      <button onClick={handleToggleFavorite}>
        {isFavorite ? 'Unfavorite' : 'Favorite'}
      </button>
    </div>
  );
};

export default PetCard;