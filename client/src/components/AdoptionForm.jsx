import { useState } from "react";

function AdoptionForm() {
  const initialFormData = {
    full_name: "",
    email: "",
    phone_number: "",
    address: "",
    city: "",
    state: "",
    zip_code: "",
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
      setIsSubmitted(true);
      console.log("Adoption form submitted:", formData);

      // TODO: Add an actual API POST request to send the form data to the backend

      setFormData(initialFormData); // Reset form
    }
  }

  return (
    <div>
      <h2>Adoption Form</h2>
      {isSubmitted && <p style={{ color: "green" }}>Form submitted successfully!</p>}
      <form onSubmit={handleSubmit}>
        <label>
          Full Name:
          <input type="text" name="full_name" value={formData.full_name} onChange={handleChange} />
          {errors.full_name && <p style={{ color: "red" }}>{errors.full_name}</p>}
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
