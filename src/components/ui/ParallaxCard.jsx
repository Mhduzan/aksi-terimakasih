import { useState, useRef } from 'react';
import { motion } from 'framer-motion';

function ParallaxCard({ image, title, subtitle, children }) {
  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);
  const [shadowX, setShadowX] = useState(0);
  const [shadowY, setShadowY] = useState(0);
  const [isHovering, setIsHovering] = useState(false);
  const cardRef = useRef(null);

  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    const maxRotate = 15;
    const rotateYValue = ((e.clientX - centerX) / (rect.width / 2)) * maxRotate;
    const rotateXValue = ((e.clientY - centerY) / (rect.height / 2)) * -maxRotate;
    const maxShadow = 25;
    const shadowXValue = ((e.clientX - centerX) / (rect.width / 2)) * maxShadow;
    const shadowYValue = ((e.clientY - centerY) / (rect.height / 2)) * maxShadow;
    setRotateX(rotateXValue);
    setRotateY(rotateYValue);
    setShadowX(shadowXValue);
    setShadowY(shadowYValue);
  };

  const handleMouseLeave = () => {
    setRotateX(0);
    setRotateY(0);
    setShadowX(0);
    setShadowY(0);
    setIsHovering(false);
  };

  const handleMouseEnter = () => setIsHovering(true);

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onMouseEnter={handleMouseEnter}
      style={{ perspective: '1000px', width: '100%', height: '100%', minHeight: '350px', cursor: 'pointer' }}
    >
      <motion.div
        animate={{ rotateX: rotateX, rotateY: rotateY, boxShadow: `${shadowX}px ${shadowY}px 40px rgba(0,0,0,0.3)` }}
        transition={{ type: 'spring', stiffness: 400, damping: 30 }}
        style={{
          transformStyle: 'preserve-3d',
          width: '100%',
          height: '100%',
          minHeight: '350px',
          borderRadius: '24px',
          overflow: 'hidden',
          background: `url(${image}) center/cover no-repeat`,
          position: 'relative'
        }}
      >
        <div style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, background: 'linear-gradient(135deg, rgba(10,76,92,0.4), rgba(26,107,122,0.3))', backdropFilter: 'blur(2px)' }} />
        <div style={{ position: 'relative', zIndex: 2, padding: '2rem', height: '100%', minHeight: '350px', display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', color: 'white', textShadow: '2px 2px 4px rgba(0,0,0,0.5)' }}>
          <motion.h3 animate={{ y: isHovering ? -10 : 0 }} style={{ fontSize: '1.8rem', fontWeight: 800, marginBottom: '0.5rem' }}>{title}</motion.h3>
          <motion.p animate={{ y: isHovering ? -5 : 0 }} style={{ fontSize: '0.9rem', opacity: 0.9 }}>{subtitle}</motion.p>
          {children}
        </div>
      </motion.div>
    </div>
  );
}

export default ParallaxCard;