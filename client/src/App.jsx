import Navbar from './components/Navbar';
import Footer from './components/Footer';
import PetContainer from './components/PetContainer'; // Import the PetContainer component
import "./styles/App.css";

function App() {
  return (
    <div className="app-container">
      <Navbar />
      <main className="main-content">
        <PetContainer /> {/* Render the PetContainer component */}
      </main>
      <Footer />
    </div>
  );
}

export default App;
