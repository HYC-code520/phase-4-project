import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import "./styles/App.css"
import PetContainer from './components/PetContainer'
import Cats from './components/Cats'
import NavBar from './components/NavBar'
import Footer from './components/Footer'

function App() {
  return (
    <div>
      <NavBar />
      <main>
        <h1>Welcome to the Pet Adoption App! 🐶🐱</h1>
        <p>Find your next furry friend today!</p>
      </main>
      <Footer />
    </div>
  );
}

export default App;