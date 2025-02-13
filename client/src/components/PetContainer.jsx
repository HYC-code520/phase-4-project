import  { useEffect, useState } from 'react';
import { useOutletContext } from "react-router-dom";
import PetCard from './PetCard';
import FilterBar from './FilterBar';
import AdoptionForm from './AdoptionForm';

const PetContainer = () => {
  const { user } = useOutletContext();
  const [pets, setPets] = useState([]);
  const [filter, setFilter] = useState('all');
  const [selectedPet, setSelectedPet] = useState(null);
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    fetch('/api/pets')
      .then(response => response.json())
      .then(data => setPets(data))
      .catch(error => console.error('Error fetching pets:', error));
  }, []);

  // Fetch favorites for the logged-in user
  useEffect(() => {
    if (user) {
      fetch(`/api/favorites?user_id=${user.id}`, { credentials: "include" })
        .then(response => response.json())
        .then(data => setFavorites(data))
        .catch(error => console.error('Error fetching favorites:', error));
    }
  }, [user]);

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

  const handleToggleFavorite = (pet) => {
    if (!user) {
      alert("Please log in to favorite pets");
      return;
    }
    // Use functional update for favorites state
    setFavorites((prevFavorites) => {
      const existingFavorite = prevFavorites.find(fav => fav.pet.id === pet.id);
      if (existingFavorite) {
        // Unfavorite: call DELETE endpoint
        fetch(`/api/favorites/${existingFavorite.id}`, {
          method: "DELETE",
          credentials: "include"
        })
          .then(res => {
            if (res.ok) {
              // Remove the unfavorited pet from state
              setFavorites(prev => prev.filter(fav => fav.id !== existingFavorite.id));
            }
          })
          .catch(err => console.error("Error unfavoriting:", err));
        return prevFavorites; // Return unchanged immediately; deletion will update state below
      } else {
        // Favorite: call POST endpoint
        fetch("/api/favorites", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
          body: JSON.stringify({ user_id: user.id, pet_id: pet.id })
        })
          .then(res => res.json())
          .then(data => {
            if (!data.error) {
              // Use functional update to add new favorite
              setFavorites(prev => [...prev, data]);
            }
          })
          .catch(err => console.error("Error favoriting:", err));
        return prevFavorites;
      }
    });
  };

  return (
    <div>
      <FilterBar filter={filter} setFilter={setFilter} />
      <div className="pet-cards-container">
        {selectedPet ? (
          <div className="selected-pet-container">
            <button onClick={handleBackClick}>Back</button>
            <div className="selected-pet">
              <PetCard 
                pet={selectedPet} 
                onToggleFavorite={handleToggleFavorite} 
                favorites={favorites} 
              />
            </div>
            <div className="adoption-form">
              <AdoptionForm petName={selectedPet.name} />
            </div>
          </div>
        ) : (
          filteredPets.map(pet => (
            <div key={pet.id} className="pet-card-container">
              <PetCard 
                pet={pet} 
                onImageClick={handlePetClick} 
                onToggleFavorite={handleToggleFavorite} 
                favorites={favorites} 
              />
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default PetContainer;
