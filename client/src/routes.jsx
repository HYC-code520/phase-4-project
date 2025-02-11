import { createBrowserRouter } from "react-router-dom";
import App from "./App";
import Dogs from "./components/Dogs";
import Cats from "./components/Cats";
import OtherAnimals from "./components/OtherAnimals";
import Login from "./components/Login";
import Signup from "./components/Signup";
import Favorites from "./components/Favorites";
import NotFound from "./components/NotFound";
import AdoptionApplications from "./components/AdoptionApplications"; 

const routes = createBrowserRouter([
  {
    path: "/",
    element: (
      <App>
        <h1>Welcome to the Pet Adoption App! 🐶🐱</h1>
        <p>Find your next furry friend today!</p>
      </App>
    ),
  },
  {
    path: "/dogs",
    element: (
      <App>
        <Dogs />
      </App>
    ),
  },
  {
    path: "/cats",
    element: (
      <App>
        <Cats />
      </App>
    ),
  },
  {
    path: "/other-animals",
    element: (
      <App>
        <OtherAnimals />
      </App>
    ),
  },
  {
    path: "/favorites",
    element: (
      <App>
        <Favorites />
      </App>
    ),
  },
  {
    path: "/login",
    element: (
      <App>
        <Login />
      </App>
    ),
  },
  {
    path: "/signup",
    element: (
      <App>
        <Signup />
      </App>
    ),
  },
  {
    path: "/adoption-applications",
    element: (
      <App>
        <AdoptionApplications />
      </App>
    ),
  },
  {
    path: "*",
    element: (
      <App>
        <NotFound />
      </App>
    ),
  },
]);

export default routes;
