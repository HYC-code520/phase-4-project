import { useOutletContext } from "react-router-dom";
import { useEffect, useState } from "react";
import PetCard from './PetCard';

function Favorites() {
  const { user } = useOutletContext();
  const [favorites, setFavorites] = useState([]);

  // Fetch the current user's favorites
  useEffect(() => {
    if (user) {
      fetch(`/api/favorites?user_id=${user.id}`, { credentials: "include" })
        .then((response) => response.json())
        .then((data) => setFavorites(data))
        .catch((error) => console.error("Error fetching favorites:", error));
    }
  }, [user]);

  // Handler to unfavorite from Favorites page
  const handleToggleFavorite = (pet) => {
    const favorite = favorites.find(fav => fav.pet.id === pet.id);
    if (favorite) {
      fetch(`/api/favorites/${favorite.id}`, {
        method: "DELETE",
        credentials: "include"
      })
        .then(res => {
          if (res.ok) {
            setFavorites(prev => prev.filter(fav => fav.id !== favorite.id));
          }
        })
        .catch(err => console.error("Error unfavoriting:", err));
    }
  };

  if (!user) {
    return <p>You must be logged in to view your favorites.</p>;
  }

  return (
    <div>
      <h2>Your Favorites</h2>
      <div className="pet-cards-container">
        {favorites.map(fav => (
          <PetCard 
            key={fav.pet.id} 
            pet={fav.pet} 
            favorites={favorites} 
            onToggleFavorite={handleToggleFavorite} 
          />
        ))}
      </div>
    </div>
  );
}

export default Favorites;
