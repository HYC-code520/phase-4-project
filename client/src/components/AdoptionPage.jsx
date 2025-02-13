import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import AdoptionForm from './AdoptionForm';

function AdoptionPage() {
  const { petId } = useParams();
  const [pet, setPet] = useState(null);

  useEffect(() => {
    fetch(`/api/pets/${petId}`)
      .then(response => response.json())
      .then(data => setPet(data))
      .catch(error => console.error('Error fetching pet:', error));
  }, [petId]);

  if (!pet) return <p>Loading...</p>;

  return (
    <div className="adoption-page">
      <h2>Adopt {pet.name}</h2>
      <div className="adoption-content">
        <img src={pet.img_url} alt={pet.name} />
        <AdoptionForm petName={pet.name} />
      </div>
    </div>
  );
}

export default AdoptionPage;
