import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from './pages/Home';
import Characters from "./pages/Characters";
import CharacterDetail from "./pages/CharacterDetail";
import Episodes from "./pages/Episodes";
import EpisodeDetail from "./pages/EpisodeDetail";
import Locations from "./pages/Locations";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

export default function App() {
  return(
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/characters" element={<Characters />} />
        <Route path="/characters/:id" element={<CharacterDetail />} />
        <Route path="/episodes" element={<Episodes />} />
        <Route path="/episodes/:id" element={<EpisodeDetail />} />
        <Route path="/locations" element={<Locations />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  )
}