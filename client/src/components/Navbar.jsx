import { NavLink } from 'react-router-dom'

function Navbar() {
    return (
        <nav>
            <div>
                <NavLink to="/">
                    Home
                </NavLink>
            </div>

        <ul>
            <li>
                <NavLink to="/dogs">
                    Dogs
                </NavLink>
            </li>
            <li>
                <NavLink to="/cats">
                    Cats
                </NavLink>
            </li>
            <li>
                <NavLink to="/other-animals">
                    Other Animals
                </NavLink>
            </li>

            <div>
                <NavLink to="/signup">
                    Sign Up
                </NavLink>
            </div>
            
            <div>
                <NavLink to="login">
                    Log In
                </NavLink>
            </div>


        </ul>





        </nav>
    )
}

export default Navbar;