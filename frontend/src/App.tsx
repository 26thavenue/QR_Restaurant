import './App.css'
import { Home, Browse } from './pages';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from "./components/Navbar"
import { URLS } from './lib/constants';

function App() {
  return (
    <Router>
     <Navbar/>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path={URLS.MENU} element={<Browse />} />
        {/* <Route path="/contact" element={<Contact />} /> */}
      </Routes>
    </Router>
  );
}
export default App
