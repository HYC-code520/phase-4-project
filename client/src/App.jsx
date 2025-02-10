import Navbar from './components/Navbar'
import Footer from './components/Footer'
import PetContainer from './components/PetContainer'
// import Dogs from './components/Dogs'
// import Cats from './components/Cats'
// import OtherAnimals from './components/OtherAnimals'

import "./styles/App.css"


function App() {
  return (
    <div>
      <Navbar />
      <main>
        <h1>Welcome to the Pet Adoption App! 🐶🐱</h1>
        <p>Find your next furry friend today!</p>
      </main>
      {/* <body>
        {/* <Dogs />
        <Cats />
        <OtherAnimals /> */}
      {/*</body> */}
      <Footer />
    </div>
    
  );
}

export default App;