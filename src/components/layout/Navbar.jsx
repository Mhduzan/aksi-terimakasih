import { useState } from 'react';

function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="navbar">
      <div className="nav-container">
        <div className="nav-logo">
          <span className="logo-icon">🌏</span>
          <span className="logo-text">Aksi</span> Terima Kasih
        </div>
        
        <div className={`nav-menu ${isMenuOpen ? 'active' : ''}`}>
          <a href="/">Beranda</a>
          <a href="/volunteers">Relawan</a>
          <a href="/activities">Kampanye</a>
          <a href="/donation">Donasi</a>
          <a href="/emergency">🚨 Bantuan</a>
          <a href="/login" className="btn-login">Masuk</a>
          <a href="/register" className="btn-register">Daftar</a>
        </div>
        
        <button className="menu-toggle" onClick={() => setIsMenuOpen(!isMenuOpen)}>
          ☰
        </button>
      </div>
    </nav>
  );
}

export default Navbar;