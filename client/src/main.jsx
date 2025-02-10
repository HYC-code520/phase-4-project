import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import routes from "./routes.jsx"; // Import your route configuration
import "./styles/index.css"; // Import global styles

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RouterProvider router={routes} /> {/* Handles routing for the app */}
  </StrictMode>
);
