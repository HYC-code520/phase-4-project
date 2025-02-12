import { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import Navbar from "./Navbar"; // Ensure your Navbar file is named correctly
import Footer from "./Footer";

function MainLayout() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    fetch("/api/session", { credentials: "include" })
      .then((res) => (res.ok ? res.json() : Promise.reject()))
      .then((data) => setUser(data))
      .catch(() => setUser(null));
  }, []);

  function handleLogout() {
    fetch("/api/logout", { method: "DELETE", credentials: "include" })
      .then(() => setUser(null));
  }

  return (
    <div>
      <Navbar user={user} handleLogout={handleLogout} />
      <main>
        {/* Passing user state and updater via Outlet context */}
        <Outlet context={{ user, setUser }} />
      </main>
      <Footer />
    </div>
  );
}

export default MainLayout;
