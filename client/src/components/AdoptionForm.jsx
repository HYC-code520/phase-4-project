// Everything a user have
// Need to log in first to apply for the adoption
// Need adoption button

import { useState } from "react";

function AdoptionForm() {
  const initialFormData = {
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
  };

  const [formData, setFormData] = useState(initialFormData);
  const [errors, setErrors] = useState({}); // To store form validation errors
  const [isSubmitted, setIsSubmitted] = useState(false);

  function handleChange(event) {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  }

////// The validation here is for the front end and user to see


  function validateForm() {
    let formErrors = {};
    if (!formData.petName) formErrors.petName = "Pet name is required.";
    if (!formData.fullName) formErrors.fullName = "Full name is required.";
    if (!formData.email.includes("@")) formErrors.email = "Please enter a valid email.";
    if (!formData.phoneNumber) formErrors.phoneNumber = "Phone number is required.";
    if (!formData.address) formErrors.address = "Address is required.";
    if (!formData.city) formErrors.city = "City is required.";
    if (!formData.state) formErrors.state = "State is required.";
    if (!formData.zip) formErrors.zip = "Zip code is required.";
    return formErrors;
  }

  function handleSubmit(event) {
    event.preventDefault();
    const formErrors = validateForm();
    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors); // Show errors to the user
    } else {
      setErrors({});
      setIsSubmitted(true);
      console.log("Adoption form submitted:", formData);
      setFormData(initialFormData); // Reset form after submission
    }
  }

  return (
    <div>
      <h2>Adoption Form</h2>
      {isSubmitted && <p style={{ color: "green" }}>Form submitted successfully!</p>}
      <form onSubmit={handleSubmit}>
        <label>
          Pet Name:
          <input type="text" name="petName" value={formData.petName} onChange={handleChange} />
          {errors.petName && <p style={{ color: "red" }}>{errors.petName}</p>}
        </label>
        <br />
        <label>
          Full Name:
          <input type="text" name="fullName" value={formData.fullName} onChange={handleChange} />
          {errors.fullName && <p style={{ color: "red" }}>{errors.fullName}</p>}
        </label>
        <br />
        <label>
          Email:
          <input type="email" name="email" value={formData.email} onChange={handleChange} />
          {errors.email && <p style={{ color: "red" }}>{errors.email}</p>}
        </label>
        <br />
        <label>
          Phone Number:
          <input type="tel" name="phoneNumber" value={formData.phoneNumber} onChange={handleChange} />
          {errors.phoneNumber && <p style={{ color: "red" }}>{errors.phoneNumber}</p>}
        </label>
        <br />
        <label>
          Address:
          <input type="text" name="address" value={formData.address} onChange={handleChange} />
          {errors.address && <p style={{ color: "red" }}>{errors.address}</p>}
        </label>
        <br />
        <label>
          City:
          <input type="text" name="city" value={formData.city} onChange={handleChange} />
          {errors.city && <p style={{ color: "red" }}>{errors.city}</p>}
        </label>
        <br />
        <label>
          State:
          <input type="text" name="state" value={formData.state} onChange={handleChange} />
          {errors.state && <p style={{ color: "red" }}>{errors.state}</p>}
        </label>
        <br />
        <label>
          Zip Code:
          <input type="text" name="zip" value={formData.zip} onChange={handleChange} />
          {errors.zip && <p style={{ color: "red" }}>{errors.zip}</p>}
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
