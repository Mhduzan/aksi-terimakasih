import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useEffect } from 'react';
import { AuthProvider, useAuth } from './context/AuthContext';
import { GalleryProvider } from './context/GalleryContext';
import ProtectedRoute from './components/auth/ProtectedRoute';
import SharedNavbar from './components/layout/SharedNavbar';
import Footer from './components/layout/Footer';

import HomePage       from './pages/HomePage';
import VolunteersPage from './pages/VolunteersPage';
import ActivitiesPage from './pages/ActivitiesPage';
import DonationPage   from './pages/DonationPage';
import EmergencyPage  from './pages/EmergencyPage';
import LoginPage      from './pages/LoginPage';
import DashboardPage  from './pages/DashboardPage';
import TransaksiPage  from './pages/TransaksiPage';
import LaporanPage    from './pages/LaporanPage';
import DonaturPage    from './pages/DonaturPage';
import GaleriUploadPage from './pages/GaleriUploadPage';
import AnggotaPage    from './pages/admin/AnggotaPage';

import './App.css';

function PublicLayout({ children }) {
  return (
    <>
      <SharedNavbar />
      <main className="snav-offset">{children}</main>
      <Footer />
    </>
  );
}

function LoginRoute() {
  const { user, loading } = useAuth();
  if (loading) return null;
  if (user) return <Navigate to="/dashboard" replace />;
  return <LoginPage />;
}

function BackgroundAnimations() {
  return (
    <div style={{ position:'fixed', top:0, left:0, width:'100%', height:'100%', overflow:'hidden', zIndex:0, pointerEvents:'none' }}>
      {['🍃','🍂','🌿','🍃','🍂','🌿','🍃','🍂','🌿','🍃'].map((l,i)=>(
        <div key={i} className={`leaf leaf${i+1}`}>{l}</div>
      ))}
    </div>
  );
}

function AppRoutes() {
  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => entries.forEach(e => { if(e.isIntersecting) e.target.classList.add('active'); }),
      { threshold:0.1 }
    );
    document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
    return () => document.querySelectorAll('.reveal').forEach(el => observer.unobserve(el));
  }, []);

  return (
    <div className="app" style={{ position:'relative', zIndex:1 }}>
      <BackgroundAnimations />
      <Routes>
        {/* ── PUBLIC ── */}
        <Route path="/"           element={<PublicLayout><HomePage /></PublicLayout>} />
        <Route path="/volunteers" element={<PublicLayout><VolunteersPage /></PublicLayout>} />
        <Route path="/activities" element={<PublicLayout><ActivitiesPage /></PublicLayout>} />
        <Route path="/donation"   element={<PublicLayout><DonationPage /></PublicLayout>} />
        <Route path="/emergency"  element={<PublicLayout><EmergencyPage /></PublicLayout>} />

        {/* ── AUTH ── */}
        <Route path="/login" element={<LoginRoute />} />

        {/* ── PROTECTED — Anggota & Admin ── */}
        <Route path="/dashboard"      element={<ProtectedRoute><DashboardPage /></ProtectedRoute>} />
        <Route path="/transaksi"      element={<ProtectedRoute><TransaksiPage /></ProtectedRoute>} />
        <Route path="/transaksi/input"element={<ProtectedRoute><TransaksiPage /></ProtectedRoute>} />
        <Route path="/laporan"        element={<ProtectedRoute><LaporanPage /></ProtectedRoute>} />
        <Route path="/donatur"        element={<ProtectedRoute><DonaturPage /></ProtectedRoute>} />
        <Route path="/galeri-upload"  element={<ProtectedRoute><GaleriUploadPage /></ProtectedRoute>} />

        {/* ── PROTECTED — Admin Only ── */}
        <Route path="/admin/anggota"     element={<ProtectedRoute requiredRole="admin"><AnggotaPage /></ProtectedRoute>} />
        <Route path="/admin/pengaturan"  element={<ProtectedRoute requiredRole="admin"><AnggotaPage /></ProtectedRoute>} />

        {/* ── 404 ── */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </div>
  );
}

function App() {
  return (
    <Router>
      <AuthProvider>
        {/* GalleryProvider di luar AppRoutes agar foto bisa diakses semua halaman */}
        <GalleryProvider>
          <AppRoutes />
        </GalleryProvider>
      </AuthProvider>
    </Router>
  );
}

export default App;
