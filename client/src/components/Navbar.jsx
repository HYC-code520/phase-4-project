import { NavLink } from "react-router-dom";
import "../styles/Navbar.css";

function Navbar({ user, handleLogout }) {
  return (
    <nav className="navbar">
      <div className="nav-logo">
        <NavLink to="/">Home</NavLink>
      </div>
      <ul className="nav-links">
        <li><NavLink to="/dogs">Dogs</NavLink></li>
        <li><NavLink to="/cats">Cats</NavLink></li>

        {/* below code show applications button to the admin only */}
        {
          user?.is_admin
          ?
          <li><NavLink to="/adoption-applications">Adoption Applications</NavLink></li>
          :
          null
        }

        {
          user?
          <li><NavLink to="/favorites">❤</NavLink></li>
          :
          null
        }
        
        {user ? (
          <>
            <li>Hello, {user.name}!</li>
            <li><button onClick={handleLogout}>Logout</button></li> 
          </>
        ) : (
          <>
            <li><NavLink to="/signup">Sign Up</NavLink></li>
            <li><NavLink to="/login">Log In</NavLink></li>
          </>
        )}
      </ul>
    </nav>
  );
}

export default Navbar;
