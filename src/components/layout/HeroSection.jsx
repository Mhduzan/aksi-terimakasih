import { useState, useRef } from 'react';
import { motion } from 'framer-motion';

function HeroSection() {
  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);
  const [mouseX, setMouseX] = useState(0);
  const [mouseY, setMouseY] = useState(0);
  const heroRef = useRef(null);

  const handleMouseMove = (e) => {
    if (!heroRef.current) return;
    const rect = heroRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    const maxRotate = 6;
    const rotateYValue = ((e.clientX - centerX) / (rect.width / 2)) * maxRotate;
    const rotateXValue = ((e.clientY - centerY) / (rect.height / 2)) * -maxRotate;
    setRotateX(rotateXValue);
    setRotateY(rotateYValue);
    setMouseX((e.clientX - centerX) / 25);
    setMouseY((e.clientY - centerY) / 25);
  };

  const handleMouseLeave = () => {
    setRotateX(0);
    setRotateY(0);
    setMouseX(0);
    setMouseY(0);
  };

  return (
    <div 
      className="hero-section" 
      ref={heroRef} 
      onMouseMove={handleMouseMove} 
      onMouseLeave={handleMouseLeave}
      style={{
        position: 'relative',
        width: '100%',
        minHeight: '100vh',
        overflow: 'hidden',
        display: 'flex',
        alignItems: 'flex-start', // Mulai dari atas
        justifyContent: 'center',
        paddingTop: '80px' // Jarak dari navbar
      }}
    >
      {/* Background Gambar */}
      <motion.div
        animate={{ x: mouseX * 15, y: mouseY * 15, scale: 1.02 }}
        transition={{ type: 'spring', stiffness: 80, damping: 25 }}
        style={{
          position: 'absolute',
          top: '-5%',
          left: '-5%',
          width: '110%',
          height: '110%',
          backgroundImage: 'url("/images/hero-bg.jpg")',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          zIndex: 0,
        }}
      />

      {/* Konten - Card kecil di atas */}
      <motion.div
        animate={{ rotateX: rotateX, rotateY: rotateY }}
        transition={{ type: 'spring', stiffness: 300, damping: 25 }}
        style={{
          position: 'relative',
          zIndex: 2,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          background: 'rgba(255, 255, 255, 0.1)',
          backdropFilter: 'blur(8px)',
          borderRadius: '30px',
          border: '1px solid rgba(255, 255, 255, 0.2)',
          padding: '1rem 1.8rem !important',
          width: 'auto !important',
          maxWidth: '300px !important',
          margin: '0 auto !important',
          boxShadow: '0 8px 20px rgba(0,0,0,0.1)'
        }}
      >
        {/* LOGO */}
        <img 
          src="/images/logobulat.jpg" 
          alt="Logo Aksi Terima Kasih" 
          style={{ 
            width: '90px',
            height: '90px',
            borderRadius: '50%',
            objectFit: 'cover',
            marginBottom: '0.5rem',
            display: 'block',
            boxShadow: '0 5px 15px rgba(0,0,0,0.15)',
            border: '2px solid rgba(255,255,255,0.3)'
          }} 
        />
        
        {/* Tulisan */}
        <h1 style={{
          fontSize: '1.2rem',
          fontWeight: 600,
          textAlign: 'center',
          background: 'linear-gradient(135deg, #ffffff, #a8d8ff)',
          WebkitBackgroundClip: 'text',
          backgroundClip: 'text',
          color: 'transparent',
          margin: 0,
          padding: 0,
          letterSpacing: '0.5px'
        }}>
          Aksi Terima Kasih
        </h1>
      </motion.div>
    </div>
  );
}

export default HeroSection;