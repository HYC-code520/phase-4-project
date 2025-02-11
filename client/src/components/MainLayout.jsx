//Ariel: 

// NavBar.jsx 1
// Footer.jsx 3
// Signup
// LogIn

// Home.jsx 2

// NotFound.jsx
// Favorites.jsx
// FilterBar.jsx

import Navbar from "./Navbar";
import Footer from "./Footer";
import { Outlet } from "react-router-dom"; // Outlet is where the individual page content will render

function MainLayout() {
  return (
    <div>
      <Navbar />
      <main>
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}

export default MainLayout;
