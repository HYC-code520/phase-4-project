import React, { useEffect, useState } from 'react';
import { useOutletContext } from "react-router-dom";
import PetCard from './PetCard';

const Cats = () => {
  const { user } = useOutletContext();
  const [cats, setCats] = useState([]);
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    fetch('/api/pets')
      .then(response => response.json())
      .then(data => {
        const catsData = data.filter(pet => pet.animal_type === 'Cat');
        setCats(catsData);
      })
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

  const handleToggleFavorite = (pet) => {
    if (!user) {
      alert("Please log in to favorite pets");
      return;
    }
    const existingFavorite = favorites.find(fav => fav.pet.id === pet.id);
    if (existingFavorite) {
      // Unfavorite
      fetch(`/api/favorites/${existingFavorite.id}`, {
        method: "DELETE",
        credentials: "include"
      })
        .then(res => {
          if (res.ok) {
            setFavorites(prev => prev.filter(fav => fav.id !== existingFavorite.id));
          }
        })
        .catch(err => console.error("Error unfavoriting:", err));
    } else {
      // Favorite
      fetch("/api/favorites", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ user_id: user.id, pet_id: pet.id })
      })
        .then(res => res.json())
        .then(data => {
          if (!data.error) {
            setFavorites(prev => [...prev, data]);
          }
        })
        .catch(err => console.error("Error favoriting:", err));
    }
  };

  return (
    <div className="pet-cards-container">
      {cats.map(cat => (
        <div key={cat.id} className="pet-card-container">
          <PetCard 
            pet={cat} 
            favorites={favorites} 
            onToggleFavorite={handleToggleFavorite} 
          />
        </div>
      ))}
    </div>
  );
};

export default Cats;
