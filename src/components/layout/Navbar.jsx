import { useState, useEffect } from 'react';

function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      zIndex: 1000,
      padding: '1rem 5%',
      background: scrolled ? '#ffffff' : 'transparent',
      boxShadow: scrolled ? '0 2px 20px rgba(0,0,0,0.05)' : 'none',
      transition: 'all 0.3s ease'
    }}>
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        maxWidth: '1200px',
        margin: '0 auto'
      }}>
        {/* Logo - Hati Merah + Tulisan Putih */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <div style={{
            width: '40px',
            height: '40px',
            background: '#E74C3C',
            borderRadius: '12px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '1.5rem'
          }}>
            ❤️
          </div>
          <div>
            <span style={{ 
              fontSize: '1.25rem', 
              fontWeight: 700, 
              color: scrolled ? '#E74C3C' : '#E74C3C',
              letterSpacing: '-0.3px'
            }}>
              Yayasan
            </span>
            <span style={{ 
              fontSize: '1.25rem', 
              fontWeight: 400, 
              color: scrolled ? '#333' : '#ffffff'
            }}>
              Peduli
            </span>
          </div>
        </div>

        {/* Navigation Links */}
        <div style={{ display: 'flex', gap: '2rem', alignItems: 'center' }}>
          <a href="/" style={{ 
            color: scrolled ? '#333' : '#ffffff', 
            textDecoration: 'none', 
            fontSize: '0.9rem',
            fontWeight: 500
          }}>Beranda</a>
          <a href="/about" style={{ 
            color: scrolled ? '#333' : '#ffffff', 
            textDecoration: 'none', 
            fontSize: '0.9rem',
            fontWeight: 500
          }}>Tentang Kami</a>
          <a href="/programs" style={{ 
            color: scrolled ? '#333' : '#ffffff', 
            textDecoration: 'none', 
            fontSize: '0.9rem',
            fontWeight: 500
          }}>Program</a>
          <a href="/volunteer" style={{ 
            color: scrolled ? '#333' : '#ffffff', 
            textDecoration: 'none', 
            fontSize: '0.9rem',
            fontWeight: 500
          }}>Relawan</a>
          <a href="/donation" style={{ 
            color: '#E74C3C', 
            textDecoration: 'none', 
            fontSize: '0.9rem', 
            fontWeight: 600,
            background: scrolled ? 'rgba(231,76,60,0.1)' : 'rgba(255,255,255,0.2)',
            padding: '0.5rem 1rem',
            borderRadius: '8px'
          }}>Donasi ❤️</a>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;