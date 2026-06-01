import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Login from './pages/Login';
import MapSearch from './pages/MapSearch';
import Dashboard from './pages/Dashboard';
import Browse from './pages/Browse';
import About from './pages/About';
import Contact from './pages/Contact';
import CropStudy from './pages/CropStudy';

const App = () => {
  return (
    <Router>
      <div className="app-wrapper">
        <Navbar />
        <main className="page-main" style={{ display: 'flex', flexDirection: 'column' }}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/search" element={<MapSearch />} />
            <Route path="/browse" element={<Browse />} />
            <Route path="/study" element={<CropStudy />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/profile" element={<Dashboard />} />
          </Routes>
          <Footer />
        </main>
      </div>
    </Router>
  );
};

export default App;

