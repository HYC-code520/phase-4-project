import { useOutletContext } from "react-router-dom";
import { useEffect, useState } from "react";
import PetCard from './PetCard';

function Favorites() {
  const { user } = useOutletContext();
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    if (user) {
      fetch(`/api/favorites?user_id=${user.id}`, { credentials: "include" })
        .then((response) => response.json())
        .then((data) => {
          const uniqueFavorites = Array.from(new Set(data.map(fav => fav.pet.id)))
            .map(id => data.find(fav => fav.pet.id === id));
          setFavorites(uniqueFavorites);
        })
        .catch((error) => console.error("Error fetching favorites:", error));
    }
  }, [user]);

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
    <div className="favorites-page">
      <h2>Your Favorites</h2>
      <div className="pet-cards-container">
        {favorites.map(fav => (
          <PetCard 
            key={`${fav.id}-${fav.pet.id}`}
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
