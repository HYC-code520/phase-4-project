// Everything a user have
// Need to log in first to apply for the adoption
// Need adoption button

import { useState, useEffect } from "react";

function AdoptionForm({ petName }) {
  const initialFormData = {
    petName: petName || "",
    fullName: "",
    age: "",
    email: "",
    phoneNumber: "",
    address: "",
    city: "",
    state: "",
    zipCode: "",
    residence_type: "house", // Default value
    family_members: 1,
    has_other_pets: false,
    pet_alone_hours: 0,
    pet_sleeping_place: "",
    has_previous_adoption: false,
    reason_for_adoption: "",
    landlord_permission: false,
  };

  const [formData, setFormData] = useState(initialFormData);
  const [errors, setErrors] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false);

  useEffect(() => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      petName: petName,
    }));
  }, [petName]);

  function handleChange(event) {
    const { name, value, type, checked } = event.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  }

  function validateForm() {
    let formErrors = {};
    if (!formData.full_name) formErrors.full_name = "Full name is required.";
    if (!formData.age || formData.age <= 0) formErrors.age = "Age must be a positive number.";
    if (!formData.email.includes("@")) formErrors.email = "Please enter a valid email.";
    if (!formData.phone_number) formErrors.phone_number = "Phone number is required.";
    if (!formData.address) formErrors.address = "Address is required.";
    if (!formData.city) formErrors.city = "City is required.";
    if (!formData.state) formErrors.state = "State is required.";
    if (!formData.zip_code) formErrors.zip_code = "Zip code is required.";
    if (!formData.reason_for_adoption) formErrors.reason_for_adoption = "Please provide a reason for adoption.";
    return formErrors;
  }


  function handleSubmit(event) {
    event.preventDefault();
    const formErrors = validateForm();
    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors);
    } else {
      setErrors({});
      setIsSubmitted(false);
  
      const userId = 1; // Replace with the actual logged-in user ID
      const formDataWithUserId = { ...formData, user_id: userId, pet_id: 5 }; // Add `user_id` and `pet_id`
  
      console.log("Form data to be submitted:", formDataWithUserId);
  
      fetch('http://localhost:5555/adoption_forms', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formDataWithUserId),
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error('Failed to submit the form.');
          }
          return response.json();
        })
        .then((data) => {
          console.log('Form submitted successfully:', data);
          setIsSubmitted(true);
          setFormData(initialFormData);
        })
        .catch((error) => {
          console.error('Error submitting form:', error);
          alert('There was an error submitting your form. Please try again.');
        });
    }
  }
  
  
  return (
    <div>
      <h2>Adoption Form</h2>
      {isSubmitted && <p style={{ color: "green" }}>Form submitted successfully!</p>}
      <form onSubmit={handleSubmit}>
        <label>
          Pet Name:
          <input type="text" name="petName" value={formData.petName} onChange={handleChange} readOnly />
          Full Name:
          <input type="text" name="full_name" value={formData.full_name} onChange={handleChange} />
          {errors.full_name && <p style={{ color: "red" }}>{errors.full_name}</p>}
        </label>
        <br />
        <label>
          Age:
          <input type="number" name="age" value={formData.age} onChange={handleChange} />
          {errors.age && <p style={{ color: "red" }}>{errors.age}</p>}
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
          <input type="tel" name="phone_number" value={formData.phone_number} onChange={handleChange} />
          {errors.phone_number && <p style={{ color: "red" }}>{errors.phone_number}</p>}
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
          <input type="text" name="zip_code" value={formData.zip_code} onChange={handleChange} />
          {errors.zip_code && <p style={{ color: "red" }}>{errors.zip_code}</p>}
        </label>
        <br />
        <label>
          Type of Residence:
          <select name="residence_type" value={formData.residence_type} onChange={handleChange}>
            <option value="house">House</option>
            <option value="apartment">Apartment</option>
            <option value="condo">Condo</option>
          </select>
        </label>
        <br />
        <label>
          Number of Household Members:
          <input type="number" name="family_members" value={formData.family_members} onChange={handleChange} />
        </label>
        <br />
        <label>
          Do you have other pets?
          <input type="checkbox" name="has_other_pets" checked={formData.has_other_pets} onChange={handleChange} />
        </label>
        <br />
        <label>
          How many hours per day will the pet be alone?
          <input type="number" name="pet_alone_hours" value={formData.pet_alone_hours} onChange={handleChange} />
        </label>
        <br />
        <label>
          Where will the pet sleep?
          <input type="text" name="pet_sleeping_place" value={formData.pet_sleeping_place} onChange={handleChange} />
        </label>
        <br />
        <label>
          Have you adopted a pet before?
          <input type="checkbox" name="has_previous_adoption" checked={formData.has_previous_adoption} onChange={handleChange} />
        </label>
        <br />
        <label>
          Reason for Adoption:
          <textarea name="reason_for_adoption" value={formData.reason_for_adoption} onChange={handleChange} />
          {errors.reason_for_adoption && <p style={{ color: "red" }}>{errors.reason_for_adoption}</p>}
        </label>
        <br />
        <label>
          Do you have landlord permission?
          <input type="checkbox" name="landlord_permission" checked={formData.landlord_permission} onChange={handleChange} />
        </label>
        <br />
        <button type="submit">Submit Application</button>
      </form>
    </div>
  );
}

export default AdoptionForm;
