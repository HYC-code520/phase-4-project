import { Routes, Route, Link, useOutletContext } from "react-router-dom";
import PetContainer from './components/PetContainer';
import AdoptionPage from './components/AdoptionPage';
import "./styles/App.css";

function App() {
  const { user } = useOutletContext();  // Retrieve user from Outlet context

  return (
    <div className="app-container">
      <Routes>
        <Route
          path="/"
          element={
            <>
              <div className="home-intro">
                <div className="image-container">
                  <img 
                    src="/Home-Image.png" 
                    alt="Home Page Banner" 
                    style={{ maxWidth: "100%", height: "auto"}} 
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
                  style={{ maxWidth: "100%", height: "auto" }} 
                />
                <img 
                  src="/clickable-to-dogsandcats-page.png" 
                  alt="Home Page brings you to dogs and cats page" 
                  style={{ maxWidth: "100%", height: "auto" }} 
                />

                {/* Clickable areas */}
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

              {/* PetContainer displays pet cards on the homepage */}
              <main className="main-content">
                <PetContainer />
              </main>
            </>
          }
        />

        {/* Adoption Route for individual pet */}
        <Route path="/adoption/:petId" element={<AdoptionPage />} />
      </Routes>

      {/* Contact Us Section */}
      <img 
        src="/contact-us.png" 
        alt="Contact info" 
        style={{ maxWidth: "100%", height: "auto", marginTop: "20px" }} 
      />
    </div>
  );
}

export default App;
