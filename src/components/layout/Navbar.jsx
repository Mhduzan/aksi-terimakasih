import { useState, useEffect } from 'react';

function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Tutup menu saat resize ke desktop
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 768) setMenuOpen(false);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <>
      {/* Overlay saat menu mobile terbuka */}
      {menuOpen && (
        <div
          onClick={() => setMenuOpen(false)}
          style={{
            position: 'fixed', inset: 0,
            background: 'rgba(0,0,0,0.4)',
            zIndex: 998,
          }}
        />
      )}

      <nav style={{
        position: 'fixed',
        top: 0, left: 0, right: 0,
        zIndex: 999,
        padding: '1rem 5%',
        background: scrolled ? '#ffffff' : 'transparent',
        boxShadow: scrolled ? '0 2px 20px rgba(0,0,0,0.08)' : 'none',
        transition: 'all 0.3s ease',
      }}>
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          maxWidth: '1200px',
          margin: '0 auto',
        }}>
          {/* Logo */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <div style={{
              width: '40px', height: '40px',
              background: '#E74C3C',
              borderRadius: '12px',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: '1.5rem', flexShrink: 0,
            }}>❤️</div>
            <div>
              <span style={{ fontSize: '1.1rem', fontWeight: 700, color: '#E74C3C' }}>Yayasan</span>
              <span style={{ fontSize: '1.1rem', fontWeight: 400, color: scrolled ? '#333' : '#fff' }}>Peduli</span>
            </div>
          </div>

          {/* Desktop Nav */}
          <div style={{
            display: 'flex', gap: '2rem', alignItems: 'center',
          }} className="navbar-desktop-links">
            {['/', '/about', '/programs', '/volunteer'].map((href, i) => (
              <a key={i} href={href} style={{
                color: scrolled ? '#333' : '#fff',
                textDecoration: 'none', fontSize: '0.9rem', fontWeight: 500,
              }}>
                {['Beranda','Tentang Kami','Program','Relawan'][i]}
              </a>
            ))}
            <a href="/donation" style={{
              color: '#E74C3C', textDecoration: 'none',
              fontSize: '0.9rem', fontWeight: 600,
              background: scrolled ? 'rgba(231,76,60,0.1)' : 'rgba(255,255,255,0.2)',
              padding: '0.5rem 1rem', borderRadius: '8px',
            }}>Donasi ❤️</a>
          </div>

          {/* Hamburger Button */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="navbar-hamburger"
            style={{
              display: 'none',
              background: 'transparent', border: 'none',
              cursor: 'pointer', padding: '8px', zIndex: 1000,
            }}
            aria-label="Toggle menu"
          >
            <span style={{
              display: 'block', width: '24px', height: '2px',
              background: scrolled ? '#333' : '#fff',
              margin: '5px 0', transition: 'all 0.3s',
              transform: menuOpen ? 'rotate(45deg) translate(5px, 5px)' : 'none',
            }} />
            <span style={{
              display: 'block', width: '24px', height: '2px',
              background: scrolled ? '#333' : '#fff',
              margin: '5px 0', transition: 'all 0.3s',
              opacity: menuOpen ? 0 : 1,
            }} />
            <span style={{
              display: 'block', width: '24px', height: '2px',
              background: scrolled ? '#333' : '#fff',
              margin: '5px 0', transition: 'all 0.3s',
              transform: menuOpen ? 'rotate(-45deg) translate(7px, -6px)' : 'none',
            }} />
          </button>
        </div>

        {/* Mobile Dropdown Menu */}
        <div style={{
          display: 'none',
          flexDirection: 'column',
          background: '#fff',
          borderRadius: '12px',
          marginTop: '1rem',
          padding: menuOpen ? '1rem' : '0',
          maxHeight: menuOpen ? '400px' : '0',
          overflow: 'hidden',
          transition: 'max-height 0.3s ease, padding 0.3s ease',
          boxShadow: '0 8px 25px rgba(0,0,0,0.12)',
        }} className="navbar-mobile-menu">
          {[['/', 'Beranda'],['/about','Tentang Kami'],['/programs','Program'],['/volunteer','Relawan']].map(([href, label]) => (
            <a key={href} href={href} style={{
              color: '#333', textDecoration: 'none',
              fontSize: '1rem', fontWeight: 500,
              padding: '0.75rem 0.5rem',
              borderBottom: '1px solid rgba(0,0,0,0.06)',
              display: 'block',
            }}>{label}</a>
          ))}
          <a href="/donation" style={{
            color: '#fff', textDecoration: 'none',
            fontSize: '1rem', fontWeight: 600,
            padding: '0.75rem 1rem', borderRadius: '8px',
            background: '#E74C3C', textAlign: 'center',
            display: 'block', marginTop: '0.5rem',
          }}>Donasi ❤️</a>
        </div>
      </nav>

      <style>{`
        @media (max-width: 768px) {
          .navbar-desktop-links { display: none !important; }
          .navbar-hamburger { display: block !important; }
          .navbar-mobile-menu { display: flex !important; }
        }
      `}</style>
    </>
  );
}

export default Navbar;
