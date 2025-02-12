import Navbar from './components/Navbar';
import Footer from './components/Footer';
import PetContainer from './components/PetContainer'; // Import the PetContainer component
import "./styles/App.css";

function App() {
  return (
    <div className="app-container">

      <main className="main-content">
        <PetContainer /> {/* Render the PetContainer component */}
      </main>
    </div>
  );
}

export default App;
