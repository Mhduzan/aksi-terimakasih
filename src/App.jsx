import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useEffect } from 'react';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import HomePage from './pages/HomePage';
import VolunteersPage from './pages/VolunteersPage';
import ActivitiesPage from './pages/ActivitiesPage';
import DonationPage from './pages/DonationPage';
import EmergencyPage from './pages/EmergencyPage';
import './App.css';

// Background Animations: Daun Jatuh + Rintik Hujan + Sparkle
function BackgroundAnimations() {
  return (
    <div style={{ 
      position: 'fixed', 
      top: 0, 
      left: 0, 
      width: '100%', 
      height: '100%', 
      overflow: 'hidden', 
      zIndex: 0, 
      pointerEvents: 'none' 
    }}>
      {/* Daun-daun Jatuh */}
      <div className="leaf leaf1">🍃</div>
      <div className="leaf leaf2">🍂</div>
      <div className="leaf leaf3">🌿</div>
      <div className="leaf leaf4">🍃</div>
      <div className="leaf leaf5">🍂</div>
      <div className="leaf leaf6">🌿</div>
      <div className="leaf leaf7">🍃</div>
      <div className="leaf leaf8">🍂</div>
      <div className="leaf leaf9">🌿</div>
      <div className="leaf leaf10">🍃</div>

      {/* Rintik Hujan */}
      <div className="raindrop rain1">💧</div>
      <div className="raindrop rain2">💧</div>
      <div className="raindrop rain3">💧</div>
      <div className="raindrop rain4">💧</div>
      <div className="raindrop rain5">💧</div>
      <div className="raindrop rain6">💧</div>
      <div className="raindrop rain7">💧</div>
      <div className="raindrop rain8">💧</div>
      <div className="raindrop rain9">💧</div>
      <div className="raindrop rain10">💧</div>
      <div className="raindrop rain11">💧</div>
      <div className="raindrop rain12">💧</div>
      <div className="raindrop rain13">💧</div>
      <div className="raindrop rain14">💧</div>
      <div className="raindrop rain15">💧</div>

      {/* Partikel Berkilau */}
      <div className="sparkle sparkle1">✨</div>
      <div className="sparkle sparkle2">⭐</div>
      <div className="sparkle sparkle3">✨</div>
      <div className="sparkle sparkle4">💫</div>
      <div className="sparkle sparkle5">✨</div>
      <div className="sparkle sparkle6">⭐</div>
      <div className="sparkle sparkle7">✨</div>
      <div className="sparkle sparkle8">💫</div>
      <div className="sparkle sparkle9">✨</div>
      <div className="sparkle sparkle10">⭐</div>
    </div>
  );
}

function App() {
  // Scroll Reveal Effect
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('active');
          }
        });
      },
      { threshold: 0.1, rootMargin: '0px 0px -50px 0px' }
    );

    const revealElements = document.querySelectorAll('.reveal');
    revealElements.forEach((el) => observer.observe(el));

    return () => {
      revealElements.forEach((el) => observer.unobserve(el));
    };
  }, []);

  return (
    <Router>
      <BackgroundAnimations />
      <div className="app" style={{ position: 'relative', zIndex: 1 }}>
        <Navbar />
        <main className="main-content">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/volunteers" element={<VolunteersPage />} />
            <Route path="/activities" element={<ActivitiesPage />} />
            <Route path="/donation" element={<DonationPage />} />
            <Route path="/emergency" element={<EmergencyPage />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;