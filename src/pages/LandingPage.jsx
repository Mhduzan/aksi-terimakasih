import { useState } from 'react';
import { motion } from 'framer-motion';
import './LandingPage.css';

function LandingPage() {
  const [activeImage, setActiveImage] = useState('/images/img1.png');
  const [circleColor, setCircleColor] = useState('#017143');
  const [menuOpen, setMenuOpen] = useState(false);

  const products = [
    {
      id: 1, name: 'Green Series',
      title: "It's not just a coffee",
      subtitle: 'Aksi Terima Kasih',
      description: 'Bersama kita wujudkan rasa syukur melalui aksi nyata untuk Bumi dan sesama.',
      buttonText: 'Mulai Aksi',
      image: '/images/img1.png', thumb: '/images/thumb1.png', color: '#017143'
    },
    {
      id: 2, name: 'Pink Series',
      title: "It's not just a donation",
      subtitle: 'Aksi Peduli',
      description: 'Setiap donasi Anda sangat berarti bagi mereka yang membutuhkan.',
      buttonText: 'Donasi Sekarang',
      image: '/images/img2.png', thumb: '/images/thumb2.png', color: '#d752b1'
    },
    {
      id: 3, name: 'Blue Series',
      title: "It's not just a campaign",
      subtitle: 'Aksi Lingkungan',
      description: 'Selamatkan hutan, lautan, dan kehidupan untuk generasi mendatang.',
      buttonText: 'Gabung Relawan',
      image: '/images/img3.png', thumb: '/images/thumb3.png', color: '#0eb749'
    }
  ];

  const imgSlider = (image, color) => {
    setActiveImage(image);
    setCircleColor(color);
  };

  const navLinks = [
    ['/', 'Home'],
    ['/volunteers', 'Relawan'],
    ['/activities', 'Kampanye'],
    ['/donation', 'Donasi'],
    ['/emergency', 'Bantuan'],
  ];

  return (
    <section className="landing-section">
      <div className="circle" style={{ background: circleColor }} />

      {/* Overlay mobile */}
      <div
        className={`landing-nav-overlay${menuOpen ? ' open' : ''}`}
        onClick={() => setMenuOpen(false)}
      />

      {/* Mobile Drawer */}
      <nav className={`landing-nav-drawer${menuOpen ? ' open' : ''}`}>
        {navLinks.map(([href, label]) => (
          <a key={href} href={href} onClick={() => setMenuOpen(false)}>{label}</a>
        ))}
      </nav>

      {/* Header */}
      <header className="landing-header">
        <a href="/" className="logo">
          <img src="/images/logoterbaru.jpg" alt="Logo Aksi Terima Kasih" />
        </a>

        {/* Desktop Nav */}
        <ul className="nav-menu-landing">
          {navLinks.map(([href, label]) => (
            <li key={href}><a href={href}>{label}</a></li>
          ))}
        </ul>

        {/* Hamburger */}
        <button
          className="landing-hamburger"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          <span style={{ transform: menuOpen ? 'rotate(45deg) translate(5px, 5px)' : 'none' }} />
          <span style={{ opacity: menuOpen ? 0 : 1 }} />
          <span style={{ transform: menuOpen ? 'rotate(-45deg) translate(7px, -6px)' : 'none' }} />
        </button>
      </header>

      {/* Main Container */}
      <div className="landing-container">
        <div className="text-box">
          <motion.h2
            key={activeImage}
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            Its not just a Action <br />
            <span>Aksi Terima Kasih</span>
          </motion.h2>
          <motion.p
            key={activeImage + 'desc'}
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            Bersama relawan, kita ucapkan terima kasih pada Bumi melalui aksi nyata.
            Setiap aksi kecil adalah doa untuk masa depan.
          </motion.p>
          <motion.a
            href="/volunteers"
            className="btn-learn"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Mulai Aksi Sekarang
          </motion.a>
        </div>

        <div className="img-box">
          <motion.img
            key={activeImage}
            src={activeImage}
            className="starbucks"
            alt="Aksi Terima Kasih"
            initial={{ opacity: 0, scale: 0.8, rotate: -10 }}
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            transition={{ duration: 0.5, type: 'spring', stiffness: 100 }}
          />
        </div>
      </div>

      {/* Thumbnails */}
      <ul className="thumb-landing">
        {products.map((product) => (
          <li key={product.id}>
            <img
              src={product.thumb}
              alt={`Thumb ${product.id}`}
              onClick={() => imgSlider(product.image, product.color)}
            />
          </li>
        ))}
      </ul>

      {/* Social Media */}
      <ul className="social-landing">
        <li><a href="#"><img src="/images/facebook.png" alt="Facebook" /></a></li>
        <li><a href="#"><img src="/images/instagram.png" alt="Instagram" /></a></li>
        <li><a href="#"><img src="/images/twitter.png" alt="Twitter" /></a></li>
      </ul>
    </section>
  );
}

export default LandingPage;
