import Navbar from './components/Navbar';
import Footer from './components/Footer';
import "./styles/App.css";

function App({ children }) {
  return (
    <div className="app-container">
      <Navbar />
      <main className="main-content">
        {children} {/* This will render the specific page's content */}
      </main>
      <Footer />
    </div>
  );
}

export default App;
