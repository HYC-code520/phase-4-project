// Import React Router function to create routes
import { createBrowserRouter } from "react-router-dom";

// Import MainLayout (wrapper for all pages, includes Navbar & Footer)
import MainLayout from "./components/MainLayout";

// Import page components
import Home from "./components/Home";
import Pets from "./pages/Pets";
import Dogs from "./components/Dogs";
import Cats from "./components/Cats";
import OtherAnimals from "./components/OtherAnimals";
import PetCard from "./components/PetCard";
import Login from "./components/Login";
import Signup from "./components/Signup";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Favorites from "./pages/Favorites";
import NotFound from "./components/NotFound";

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
        element: <PetCard />,
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
