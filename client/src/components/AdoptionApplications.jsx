import { useState, useEffect } from "react";
import "../styles/AdoptionApplications.css"; // Ensure to create this file for styles

function AdoptionApplications() {
  const [applications, setApplications] = useState([]);
  const [showDetails, setShowDetails] = useState({});

  useEffect(() => {
    fetch("/api/adoption_forms")
      .then((response) => response.json())
      .then((data) => setApplications(data))
      .catch((error) => console.error("Error fetching applications:", error));
  }, []);

  const toggleDetails = (id) => {
    setShowDetails((prevState) => ({
      ...prevState,
      [id]: !prevState[id],
    }));
  };

  if (applications.length === 0) {
    return <p className="loading">Loading applications...</p>;
  }

  return (
    <div className="adoption-applications-container">
      <h2>Review Adoption Applications</h2>
      <div className="application-cards">
        {applications.map((app) => (
          <div key={app.id} className="application-card">
            <h3 className="applicant-name">{app.full_name}</h3>
            <p><strong>Status:</strong> {app.status}</p>
            <p><strong>Email:</strong> {app.email}</p>
            <button
              className="toggle-button"
              onClick={() => toggleDetails(app.id)}
            >
              {showDetails[app.id] ? "Hide Details" : "Show Details"}
            </button>

            {showDetails[app.id] && (
              <div className="details">
                <p><strong>Phone Number:</strong> {app.phone_number}</p>
                <p><strong>Address:</strong> {app.address}, {app.city}, {app.state} {app.zip_code}</p>
                <p><strong>Type of Residence:</strong> {app.residence_type}</p>
                <p><strong>Number of Household Members:</strong> {app.family_members}</p>
                <p><strong>Has Other Pets:</strong> {app.has_other_pets ? "Yes" : "No"}</p>
                <p><strong>Hours Pet Will Be Alone:</strong> {app.pet_alone_hours} hours</p>
                <p><strong>Where Will the Pet Sleep:</strong> {app.pet_sleeping_place}</p>
                <p><strong>Previously Adopted a Pet:</strong> {app.has_previous_adoption ? "Yes" : "No"}</p>
                <p><strong>Reason for Adoption:</strong> {app.reason_for_adoption}</p>
                <p><strong>Landlord Permission:</strong> {app.landlord_permission ? "Yes" : "No"}</p>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default AdoptionApplications;
