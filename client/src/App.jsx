import { Link, useOutletContext } from "react-router-dom";
import PetContainer from './components/PetContainer';
import "./styles/App.css";

function App() {
  const { user } = useOutletContext();  // Retrieve user from Outlet context

  return (
    <div className="app-container">
      <div className="home-intro">
        <div className="image-container">
          <img 
            src="/Home-Image.png" 
            alt="Home Page Banner" 
            style={{ maxWidth: "100%", height: "auto", marginBottom: "20px" }} 
          />
          {!user && (
            <Link to="/signup">
              <button className="signup-button">Sign Up</button>
            </Link>
          )}
        </div>
        
        <img 
          src="/why-us.png" 
          alt="Why Choose Us" 
          style={{ maxWidth: "100%", height: "auto", marginTop: "20px" }} 
        />

        <img 
          src="/adoptor-review.png" 
          alt="Adopter Review" 
          style={{ maxWidth: "100%", height: "auto", marginTop: "20px" }} 
        />
        <img 
          src="/clickable-to-dogsandcats-page.png" 
          alt="Home Page brings you to dogs and cats page" 
          style={{ maxWidth: "100%", height: "auto", marginTop: "20px" }} 
        />
      </div>

      <main className="main-content">
        <PetContainer />
      </main>

      <img 
        src="/contact-us.png" 
        alt="Contact info" 
        style={{ maxWidth: "100%", height: "auto", marginTop: "20px" }} 
      />
    </div>
  );
}

export default App;
