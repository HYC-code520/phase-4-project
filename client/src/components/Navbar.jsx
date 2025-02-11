import { NavLink } from 'react-router-dom';
import '../styles/Navbar.css';

function Navbar() {
    return (
      <nav className="navbar">
        <div className="nav-logo">
          <NavLink to="/">Home</NavLink>
        </div>
        <ul className="nav-links">
          <li>
            <NavLink to="/dogs">Dogs</NavLink>
          </li>
          <li>
            <NavLink to="/cats">Cats</NavLink>
          </li>
          <li>
            <NavLink to="/other-animals">Other Animals</NavLink>
          </li>

          <li>
            <NavLink to="/adoption-applications">Adoption Applications</NavLink>
          </li>

          <li>
            <NavLink to="/favorites"> ❤ </NavLink>
          </li>

          <li>
            <NavLink to="/signup">Sign Up</NavLink>
          </li>
          <li>
            <NavLink to="/login">Log In</NavLink>
          </li>
        </ul>
      </nav>
    );
  }
  

export default Navbar;
