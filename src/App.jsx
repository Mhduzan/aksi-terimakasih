import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useEffect } from 'react';
import SharedNavbar from './components/layout/SharedNavbar';
import Footer from './components/layout/Footer';
import HomePage from './pages/HomePage';
import VolunteersPage from './pages/VolunteersPage';
import ActivitiesPage from './pages/ActivitiesPage';
import DonationPage from './pages/DonationPage';
import EmergencyPage from './pages/EmergencyPage';
import './App.css';

function BackgroundAnimations() {
  return (
    <div style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', overflow: 'hidden', zIndex: 0, pointerEvents: 'none' }}>
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
      <div className="raindrop rain1">💧</div>
      <div className="raindrop rain2">💧</div>
      <div className="raindrop rain3">💧</div>
      <div className="raindrop rain4">💧</div>
      <div className="raindrop rain5">💧</div>
      <div className="sparkle sparkle1">✨</div>
      <div className="sparkle sparkle2">⭐</div>
      <div className="sparkle sparkle3">✨</div>
      <div className="sparkle sparkle4">💫</div>
      <div className="sparkle sparkle5">✨</div>
    </div>
  );
}

function App() {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) entry.target.classList.add('active');
        });
      },
      { threshold: 0.1, rootMargin: '0px 0px -50px 0px' }
    );
    const revealElements = document.querySelectorAll('.reveal');
    revealElements.forEach((el) => observer.observe(el));
    return () => revealElements.forEach((el) => observer.unobserve(el));
  }, []);

  return (
    <Router>
      <BackgroundAnimations />
      <div className="app" style={{ position: 'relative', zIndex: 1 }}>
        {/* Navbar global — muncul di semua halaman */}
        <SharedNavbar />

        <main className="main-content snav-offset">
          <Routes>
            <Route path="/"           element={<HomePage />} />
            <Route path="/volunteers" element={<VolunteersPage />} />
            <Route path="/activities" element={<ActivitiesPage />} />
            <Route path="/donation"   element={<DonationPage />} />
            <Route path="/emergency"  element={<EmergencyPage />} />
          </Routes>
        </main>

        <Footer />
      </div>
    </Router>
  );
}

export default App;
