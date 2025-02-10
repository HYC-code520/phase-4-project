import { useState } from "react";

function Signup() {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    phoneNumber: "",
    address: "",
    city: "",
    state: "",
    zip: "",
    agreedToTerms: false,
  });

  function handleChange(event) {
    const { name, value, type, checked } = event.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  }

  function handleSubmit(event) {
    event.preventDefault();
    console.log("Signup form submitted:", formData);
  }

  return (
    <div>
      <h2>Signup Form</h2>
      <form onSubmit={handleSubmit}>
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
          Password:
          <input type="password" name="password" value={formData.password} onChange={handleChange} />
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
          <input type="checkbox" name="agreedToTerms" checked={formData.agreedToTerms} onChange={handleChange} />
          I agree to the terms and conditions
        </label>
        <br />
        <button type="submit" disabled={!formData.agreedToTerms}>
          Create Account
        </button>
      </form>
    </div>
  );
}

export default Signup;
