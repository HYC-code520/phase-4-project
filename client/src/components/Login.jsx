import { useState } from "react";
import { useNavigate } from "react-router-dom"; // Added for navigation after successful login

function Login() {
  // State to hold the form input values for email and password
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  // State to hold any error messages for display
  const [error, setError] = useState(null);
  // useNavigate hook allows redirection after login
  const navigate = useNavigate();

  // Updates formData state when the user types into the form fields
  function handleChange(event) {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  }

  // Handles form submission
  function handleSubmit(event) {
    event.preventDefault();

    // Sends a POST request to the Flask backend's /login endpoint with the form data
    fetch("http://localhost:5555/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json", // Tells the server that we're sending JSON
      },
      credentials: "include", // Ensures cookies are included so that session data (user login) is maintained
      body: JSON.stringify(formData), // Converts the form data to a JSON string
    })
      .then((res) => {
        // If the response is not OK, extract and throw an error message
        if (!res.ok) {
          return res.json().then((err) => {
            throw new Error(err.error || "Login failed");
          });
        }
        // Parse the JSON response if the request is successful
        return res.json();
      })
      .then((data) => {
        console.log("Login successful:", data);
        // Redirect the user to a protected route ("/") after successful login
        navigate("/"); 
      })
      .catch((error) => {
        console.error("Error logging in:", error);
        // Set the error state to display an error message on the UI
        setError(error.message);
      });
  }

  return (
    <div>
      <h2>Login</h2>
      {/* Display an error message if there's an error */}
      {error && <p style={{ color: "red" }}>{error}</p>}
      <form onSubmit={handleSubmit}>
        <label>
          Email:
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required // Makes the field required
          />
        </label>
        <br />
        <label>
          Password:
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required // Makes the field required
          />
        </label>
        <br />
        <button type="submit">Login</button>
      </form>
    </div>
  );
}

export default Login;
