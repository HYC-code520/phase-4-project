import Navbar from "./Navbar";
import Footer from "./Footer";

function NotFound() {
  return (
    <div>
      <Navbar />
      <main>
        <h1>404 - Page Not Found</h1>
        <p>Oops! The page you're looking for doesn't exist.</p>
        <a href="/" >
          Go back to Home
        </a>
      </main>
      <Footer />
    </div>
  );
}

export default NotFound;
