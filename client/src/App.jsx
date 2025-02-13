import Navbar from './components/Navbar';
import Footer from './components/Footer';
import { Link } from "react-router-dom";
import PetContainer from './components/PetContainer'; // Import the PetContainer component
import "./styles/App.css";

function App() {
  return (
    <div className="app-container">
      <div className="home-intro" style={{ textAlign: "center" }}>
        <img 
          src="/Home-Image.png" 
          alt="Home Page Banner" 
          style={{ maxWidth: "100%", height: "auto", marginBottom: "20px" }} 
        />
        <img 
          src="/why-us.png" 
          alt="Why Choose Us" 
          style={{ maxWidth: "100%", height: "auto", marginTop: "20px" }} 
        />        

        {/* Add adoptor-review image below */}
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

        {/* Clickable areas on the image */}
        <Link to="/dogs">
          <div className="clickable-area dogs" />
        </Link>
        <Link to="/cats">
          <div className="clickable-area cats" />
        </Link>
        <Link to="/favorites">
          <div className="clickable-area favorites" />
        </Link>

      </div>
      <main className="main-content">
        <PetContainer /> {/* Render the PetContainer component */}
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
