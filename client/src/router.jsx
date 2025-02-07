// Import React Router function to create routes
import { createBrowserRouter } from "react-router-dom";

// Import MainLayout (wrapper for all pages, includes Navbar & Footer)
import MainLayout from "./components/MainLayout";

// Import page components
import Home from "./pages/Home";
import Pets from "./pages/Pets";
import Dogs from "./pages/Dogs";
import Cats from "./pages/Cats";
import OtherAnimals from "./pages/OtherAnimals";
import PetProfile from "./pages/PetProfile";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Favorites from "./pages/Favorites";
import NotFound from "./pages/NotFound";

// Define application routes
const routes = createBrowserRouter([
  {
    path: "/", // Root path ("/") handled by MainLayout
    element: <MainLayout />, // Wraps all pages inside MainLayout
    errorElement: <NotFound />, // Handles invalid URLs (404 page)
    children: [      
      {
        path: "", // Root path ("/") handled by Home
        element: <Home />,
      },
      {
        path: "pets", // "/pets" page showing all pets
        element: <Pets />,
      },
      {
        path: "pets/:id", // "/pets/:id" for individual pet profiles
        element: <PetProfile />,
      },
      {
        path: "dogs", // "/dogs" page showing only dogs
        element: <Dogs />,
      },
      {
        path: "cats", // "/cats" page showing only cats
        element: <Cats />,
      },
      {
        path: "other-animals", // "/other-animals" page for other pets
        element: <OtherAnimals />,
      },
      {
        path: "favorites", // "/favorites" page for saved pets
        element: <Favorites />,
      },
      {
        path: "login", // "/login" page
        element: <Login />,
      },
      {
        path: "signup", // "/signup" page
        element: <Signup />,
      },
      {
        path: "about", // "/about" page
        element: <About />,
      },
      {
        path: "contact", // "/contact" page
        element: <Contact />,
      },
    ],
  },
]);

export default routes;
