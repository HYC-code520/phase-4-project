// Import React Router function to create routes
import { createBrowserRouter } from "react-router-dom";

// Import page components
import App from "./App";
import Dogs from "./components/Dogs";
import Cats from "./components/Cats";
import OtherAnimals from "./components/OtherAnimals";
import Login from "./components/Login";
import Signup from "./components/Signup";
import Favorites from "./components/Favorites";
import NotFound from "./components/NotFound";

// Define application routes
const routes = createBrowserRouter([
    
      {
        path: "/", // Root path ("/") handled by Home
        element: <App />,
      },
      {
        path: "/dogs", // "/dogs" page showing only dogs
        element: <Dogs />,
      },
      {
        path: "/cats", // "/cats" page showing only cats
        element: <Cats />,
      },
      {
        path: "/other-animals", // "/other-animals" page for other pets
        element: <OtherAnimals />,
      },
      {
        path: "/favorites", // "/favorites" page for saved pets
        element: <Favorites />,
      },
      {
        path: "/login", // "/login" page
        element: <Login />,
      },
      {
        path: "/signup", // "/signup" page
        element: <Signup />,
      },
      { 
        path: "*", 
        element: <NotFound /> 
      }, // Catch-all for 404
    ],
);

export default routes;
