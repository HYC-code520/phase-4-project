// Everything a user have
// Need to log in first to apply for the adoption
// Need adoption button

import { useState, useEffect } from "react";

function AdoptionForm({ petName }) {
  const [formData, setFormData] = useState({
    petName: "",
    fullName: "",
    email: "",
    phoneNumber: "",
    address: "",
    city: "",
    state: "",
    zip: "",
    residenceType: "house", // Default value
    householdMembers: 1,
    otherPets: "no",
    petAloneHours: 0,
    petSleepingPlace: "",
    previousAdoption: "no",
  });

  useEffect(() => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      petName: petName,
    }));
  }, [petName]);

  function handleChange(event) {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  }

  function handleSubmit(event) {
    event.preventDefault();
    console.log("Adoption form submitted:", formData);
  }

  return (
    <div>
      <h2>Adoption Form</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Pet Name:
          <input type="text" name="petName" value={formData.petName} onChange={handleChange} readOnly />
        </label>
        <br />
        <label>
          Full Name:
          <input type="text" name="fullName" value={formData.fullName} onChange={handleChange} />
        </label>
        <br />
        <label>
          Email:
          <input type="email" name="email" value={formData.email} onChange={handleChange} />
        </label>
        <br />
        <label>
          Phone Number:
          <input type="tel" name="phoneNumber" value={formData.phoneNumber} onChange={handleChange} />
        </label>
        <br />
        <label>
          Address:
          <input type="text" name="address" value={formData.address} onChange={handleChange} />
        </label>
        <br />
        <label>
          City:
          <input type="text" name="city" value={formData.city} onChange={handleChange} />
        </label>
        <br />
        <label>
          State:
          <input type="text" name="state" value={formData.state} onChange={handleChange} />
        </label>
        <br />
        <label>
          Zip Code:
          <input type="text" name="zip" value={formData.zip} onChange={handleChange} />
        </label>
        <br />
        <label>
          Type of Residence:
          <select name="residenceType" value={formData.residenceType} onChange={handleChange}>
            <option value="house">House</option>
            <option value="apartment">Apartment</option>
            <option value="condo">Condo</option>
          </select>
        </label>
        <br />
        <label>
          Number of Household Members:
          <input
            type="number"
            name="householdMembers"
            value={formData.householdMembers}
            onChange={handleChange}
          />
        </label>
        <br />
        <label>
          Do you have other pets?
          <select name="otherPets" value={formData.otherPets} onChange={handleChange}>
            <option value="yes">Yes</option>
            <option value="no">No</option>
          </select>
        </label>
        <br />
        <label>
          How many hours per day will the pet be alone?
          <input type="number" name="petAloneHours" value={formData.petAloneHours} onChange={handleChange} />
        </label>
        <br />
        <label>
          Where will the pet sleep?
          <input type="text" name="petSleepingPlace" value={formData.petSleepingPlace} onChange={handleChange} />
        </label>
        <br />
        <label>
          Have you adopted a pet before?
          <select name="previousAdoption" value={formData.previousAdoption} onChange={handleChange}>
            <option value="yes">Yes</option>
            <option value="no">No</option>
          </select>
        </label>
        <br />
        <button type="submit">Submit Application</button>
      </form>
    </div>
  );
}

export default AdoptionForm;
