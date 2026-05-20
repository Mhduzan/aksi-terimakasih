import { useState } from 'react';
import { motion } from 'framer-motion';

function VolunteerCard({ name, role, location, skills, joinedDate }) {
  const [isFlipped, setIsFlipped] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    setMousePosition({ x: x * 20, y: y * 20 });
  };

  return (
    <motion.div
      className="volunteer-card"
      initial={{ opacity: 0, rotateY: 90 }}
      whileInView={{ opacity: 1, rotateY: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, type: "spring", stiffness: 100 }}
      animate={{
        rotateX: isHovering ? mousePosition.y : 0,
        rotateY: isHovering ? mousePosition.x : 0,
      }}
      onMouseMove={handleMouseMove}
      onHoverStart={() => setIsHovering(true)}
      onHoverEnd={() => {
        setIsHovering(false);
        setMousePosition({ x: 0, y: 0 });
      }}
      onClick={() => setIsFlipped(!isFlipped)}
      style={{ transformStyle: 'preserve-3d', cursor: 'pointer' }}
    >
      <motion.div
        animate={{ rotateY: isFlipped ? 180 : 0 }}
        transition={{ duration: 0.8, type: "spring", stiffness: 80 }}
        style={{ backfaceVisibility: 'hidden' }}
      >
        {/* Front Side */}
        <div style={{ display: isFlipped ? 'none' : 'block' }}>
          <motion.div 
            className="volunteer-avatar"
            animate={{ scale: isHovering ? 1.05 : 1 }}
            transition={{ duration: 0.2 }}
          >
            <motion.div 
              className="avatar-placeholder"
              animate={{ 
                rotate: isHovering ? 360 : 0,
                scale: isHovering ? 1.1 : 1
              }}
              transition={{ duration: 0.5 }}
            >
              {name?.[0] || '👤'}
            </motion.div>
          </motion.div>
          <h3>{name}</h3>
          <p className="volunteer-role">{role}</p>
          <p className="volunteer-location">📍 {location}</p>
          <div className="volunteer-skills">
            {skills?.map((skill, index) => (
              <motion.span 
                key={index} 
                className="skill-tag"
                whileHover={{ scale: 1.1, x: 2 }}
              >
                {skill}
              </motion.span>
            ))}
          </div>
          <p className="volunteer-joined">🌟 Bergabung: {joinedDate}</p>
          <motion.button 
            className="btn-view"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={(e) => {
              e.stopPropagation();
              setIsFlipped(true);
            }}
          >
            🚀 Klik untuk Info 3D
          </motion.button>
        </div>

        {/* Back Side */}
        <div 
          style={{ 
            display: isFlipped ? 'block' : 'none',
            transform: 'rotateY(180deg)',
            position: 'relative'
          }}
        >
          <motion.div 
            className="volunteer-avatar"
            style={{ background: 'linear-gradient(135deg, #fe0979, #00f2fe)' }}
          >
            <div className="avatar-placeholder" style={{ animation: 'none' }}>✨🏆✨</div>
          </motion.div>
          <h3 style={{ color: '#fe0979' }}>🌟 TERIMA KASIH! 🌟</h3>
          <p style={{ padding: '0 1.5rem', marginTop: '1rem', color: '#00f2fe' }}>
            {name} telah berkontribusi dalam:
          </p>
          <ul style={{ padding: '0 2rem', marginTop: '0.5rem', color: 'white' }}>
            <li>📊 200+ jam relawan</li>
            <li>🌍 15+ aksi kemanusiaan</li>
            <li>🏆 Best Volunteer 2025</li>
            <li>💚 Menyelamatkan 500+ pohon</li>
          </ul>
          <motion.button 
            className="btn-view" 
            onClick={(e) => {
              e.stopPropagation();
              setIsFlipped(false);
            }}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            style={{ marginTop: '1.5rem', background: '#fe0979' }}
          >
            🔄 Kembali
          </motion.button>
        </div>
      </motion.div>
    </motion.div>
  );
}

export default VolunteerCard;