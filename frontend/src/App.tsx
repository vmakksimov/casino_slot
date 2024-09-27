import './App.css';
import './index.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from './pages/Home';
import SimulationSection from './components/casino/SimulationSection';
import PlaySection from './components/casino/PlaySection';
import ErrorPage from './components/404/404';

function App() {
  
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/play" element={<PlaySection />} />
        <Route path="/simulation" element={<SimulationSection />} />
        <Route path="*" element={<ErrorPage />} />
      </Routes>
    </Router>
  )
}

export default App
