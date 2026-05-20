import { useState } from 'react';
import { motion } from 'framer-motion';

function ActivityCard({ title, date, location, volunteers, image, status }) {
  const [isHovered, setIsHovered] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <motion.div 
      className="activity-card"
      initial={{ opacity: 0, scale: 0.9 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.4 }}
      whileHover={{ y: -8, transition: { duration: 0.2 } }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
    >
      <motion.div 
        className="activity-image"
        animate={{ 
          scale: isHovered ? 1.05 : 1,
          rotate: isHovered ? 2 : 0
        }}
        transition={{ duration: 0.3 }}
        style={{ cursor: 'pointer' }}
        onClick={() => setIsExpanded(!isExpanded)}
      >
        {image || (
          <motion.span
            animate={{ 
              rotate: isHovered ? 360 : 0,
              scale: isHovered ? 1.2 : 1
            }}
            transition={{ duration: 0.5 }}
          >
            🌍
          </motion.span>
        )}
      </motion.div>
      
      <div className="activity-info">
        <motion.h3
          animate={{ color: isHovered ? '#f9a826' : '#0f3b2c' }}
          transition={{ duration: 0.2 }}
        >
          {title}
        </motion.h3>
        
        <motion.div
          animate={{ height: isExpanded ? 'auto' : 'auto' }}
          transition={{ duration: 0.3 }}
        >
          <p>📅 {date}</p>
          <p>📍 {location}</p>
          <p>👥 {volunteers} relawan</p>
          
          {isExpanded && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              transition={{ duration: 0.3 }}
              style={{ marginTop: '1rem', padding: '1rem', background: '#e8f0e8', borderRadius: '8px' }}
            >
              <p style={{ fontWeight: 'bold' }}>📋 Detail Kegiatan:</p>
              <p>Lokasi pengungsian: Balai Desa</p>
              <p>Kebutuhan: Makanan, selimut, obat</p>
              <p>Koordinasi: Posko Utama</p>
            </motion.div>
          )}
        </motion.div>
        
        <button 
          className="btn-join"
          onClick={(e) => {
            e.stopPropagation();
            alert(`Terima kasih! Anda akan bergabung di kegiatan ${title}`);
          }}
        >
          {isHovered ? '🚀 Gabung Sekarang' : '➕ Gabung'}
        </button>
        
        <motion.p 
          className="status-badge"
          animate={{ 
            scale: isHovered ? [1, 1.1, 1] : 1,
            backgroundColor: status === 'aktif' ? '#10b981' : '#f59e0b'
          }}
          transition={{ duration: 0.5, repeat: isHovered ? Infinity : 0 }}
        >
          {status === 'aktif' ? '🔴 AKTIF' : status === 'berlangsung' ? '🟡 BERLANGSUNG' : '⚪ SELESAI'}
        </motion.p>
      </div>
    </motion.div>
  );
}

export default ActivityCard;