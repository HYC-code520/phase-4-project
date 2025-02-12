import { useState } from "react";

function Signup() {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
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
          Zip Code:
          <input type="text" name="zip" value={formData.zip} onChange={handleChange} />
        </label>
        <br />
        <br />
        <label>
          <input type="checkbox" name="agreedToTerms" checked={formData.agreedToTerms} onChange={handleChange} />
          Yes, I agree to receiving email and other marketing communications. 
          <br />
          I certify that I am over 18 years old and I have read and agree with the Terms & Conditions and Purina Perks Terms and Conditions. (Required)
          <br />
By clicking Create Account you acknowledge you have read our Privacy Policy, Notice at Collection.
        </label>
        <br />
        <br />
        <button type="submit" disabled={!formData.agreedToTerms}>
          Create Account
        </button>
      </form>
    </div>
  );
}

export default Signup;
