import { useState, useEffect } from 'react';
import './SharedNavbar.css';

const navLinks = [
  { href: '/',            label: 'Home' },
  { href: '/volunteers',  label: 'Relawan' },
  { href: '/activities',  label: 'Kampanye' },
  { href: '/donation',    label: 'Donasi' },
  { href: '/emergency',   label: 'Bantuan' },
];

function SharedNavbar() {
  const [menuOpen, setMenuOpen]   = useState(false);
  const [scrolled, setScrolled]   = useState(false);
  const currentPath = window.location.pathname;

  useEffect(() => {
    const onScroll  = () => setScrolled(window.scrollY > 60);
    const onResize  = () => { if (window.innerWidth > 768) setMenuOpen(false); };
    window.addEventListener('scroll', onScroll);
    window.addEventListener('resize', onResize);
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onResize);
    };
  }, []);

  // Tutup menu saat klik di luar
  useEffect(() => {
    if (!menuOpen) return;
    const close = (e) => {
      if (!e.target.closest('.snav-drawer') && !e.target.closest('.snav-hamburger')) {
        setMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', close);
    return () => document.removeEventListener('mousedown', close);
  }, [menuOpen]);

  return (
    <>
      {/* Overlay gelap */}
      {menuOpen && (
        <div className="snav-overlay" onClick={() => setMenuOpen(false)} />
      )}

      <header className={`snav${scrolled ? ' snav--scrolled' : ''}`}>
        <div className="snav-inner">

          {/* Logo */}
          <a href="/" className="snav-logo">
            <img src="/images/logoterbaru.jpg" alt="Logo" />
            <span className="snav-logo-text">
              Aksi<strong>Terima Kasih</strong>
            </span>
          </a>

          {/* Desktop links */}
          <ul className="snav-links">
            {navLinks.map(({ href, label }) => (
              <li key={href}>
                <a
                  href={href}
                  className={`snav-link${currentPath === href ? ' snav-link--active' : ''}`}
                >
                  {label}
                  <span className="snav-link-bar" />
                </a>
              </li>
            ))}
          </ul>

          {/* Desktop CTA buttons */}
          <div className="snav-btns">
            <a href="/login"    className="snav-btn snav-btn--ghost">Masuk</a>
            <a href="/register" className="snav-btn snav-btn--solid">Daftar</a>
          </div>

          {/* Hamburger */}
          <button
            className={`snav-hamburger${menuOpen ? ' snav-hamburger--open' : ''}`}
            onClick={() => setMenuOpen(v => !v)}
            aria-label="Toggle menu"
          >
            <span /><span /><span />
          </button>
        </div>

        {/* Mobile Drawer */}
        <nav className={`snav-drawer${menuOpen ? ' snav-drawer--open' : ''}`}>
          {navLinks.map(({ href, label }) => (
            <a
              key={href}
              href={href}
              className={`snav-drawer-link${currentPath === href ? ' snav-drawer-link--active' : ''}`}
              onClick={() => setMenuOpen(false)}
            >
              {label}
            </a>
          ))}
          <div className="snav-drawer-btns">
            <a href="/login"    className="snav-btn snav-btn--ghost-dark">Masuk</a>
            <a href="/register" className="snav-btn snav-btn--solid">Daftar</a>
          </div>
        </nav>
      </header>
    </>
  );
}

export default SharedNavbar;
