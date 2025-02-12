import { createBrowserRouter } from "react-router-dom";
import MainLayout from "./components/MainLayout"; // Ensures Navbar and Footer persist
import App from "./App"; // Home page content
import Dogs from "./components/Dogs";
import Cats from "./components/Cats";
import OtherAnimals from "./components/OtherAnimals";
import Login from "./components/Login";
import Signup from "./components/Signup";
import Favorites from "./components/Favorites";
import NotFound from "./components/NotFound";
import AdoptionApplications from "./components/AdoptionApplications"; 
import AdoptionForm from "./components/AdoptionForm";
import PetContainer from "./components/PetContainer"; // Displays all available pets

const routes = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />, // Wraps all routes with Navbar and Footer
    children: [
      { path: "/", element: <App /> }, // Home page
      { path: "/dogs", element: <Dogs /> },
      { path: "/cats", element: <Cats /> },
      { path: "/other-animals", element: <OtherAnimals /> },
      { path: "/favorites", element: <Favorites /> },
      { path: "/login", element: <Login /> },
      { path: "/signup", element: <Signup /> },
      { path: "/adoption-form", element: <AdoptionForm /> },
      { path: "/adoption-applications", element: <AdoptionApplications /> },
      { path: "*", element: <NotFound /> }, // Handles 404 cases
    ],
  },
]);

export default routes;
