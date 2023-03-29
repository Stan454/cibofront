import NavBar from './Components/NavBar';
import Dishes from './Pages/Dishes';
import Home from './Pages/Home';
import Reservations from './Pages/Reservations';
import { Route, Routes } from "react-router-dom";

function App() {
  return (
    <>
    <NavBar />
    <div className="container">
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/Dishes' element={<Dishes />} />
        <Route path='/Reservations' element={<Reservations />} />
      </Routes>
    </div>
    </>
  )
}

export default App;
