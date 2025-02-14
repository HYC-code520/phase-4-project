import React, { useEffect, useState } from 'react';

const PetCard = ({ pet, onImageClick, onToggleFavorite, favorites }) => {
  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    if (favorites && pet) {
      const fav = favorites.find(fav => fav.pet.id === pet.id);
      setIsFavorite(!!fav);
    }
  }, [favorites, pet.id]);

  const handleFavoriteClick = () => {
    if (onToggleFavorite) {
      onToggleFavorite(pet);
    }
  };

  const handleImageClick = (e) => {
    e.preventDefault();
    e.currentTarget.scrollIntoView({ behavior: 'smooth', block: 'start' }); // Scrolls the pet card into view
    if (onImageClick) {
      onImageClick(pet);
    }
  };

  return (
    <div className="pet-card">
      <div onClick={handleImageClick}>
        <img src={pet.img_url} alt={pet.name} />
      </div>
      <h2>{pet.name}</h2>
      <p>Age: {pet.age}</p>
      <p>Type: {pet.animal_type}</p>
      <p>Breed: {pet.breed}</p>
      <p>Status: {pet.adoption_status}</p>
      <button
        className="favorite-button"
        onClick={handleFavoriteClick}
        style={{
          background: 'none',
          border: 'none',
          fontSize: '24px',
          cursor: 'pointer',
        }}
      >
        {isFavorite ? '🧡' : '🤍'}
      </button>
    </div>
  );
};

export default PetCard;
