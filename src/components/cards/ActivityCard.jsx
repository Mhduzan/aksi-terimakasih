import { useState } from 'react';
import { motion } from 'framer-motion';

function ActivityCard({ title, date, location, volunteers, image, status }) {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <motion.div className="activity-card" initial={{ opacity: 0, scale: 0.9 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ duration: 0.4 }} whileHover={{ y: -8 }}>
      <div style={{ position: 'relative', minHeight: '160px' }}>
        <img src={image || 'https://images.unsplash.com/photo-1582213782179-e0d53f98f2ca?w=400'} alt={title} style={{ width: '100%', height: '160px', objectFit: 'cover' }} />
        <span className="status-badge" style={{ position: 'absolute', top: '10px', right: '10px' }}>{status === 'aktif' ? '🔴 AKTIF' : status === 'berlangsung' ? '🟡 BERLANGSUNG' : '⚪ SELESAI'}</span>
      </div>
      <div className="activity-info">
        <h3>{title}</h3>
        <p>📅 {date}</p>
        <p>📍 {location}</p>
        <p>👥 {volunteers} relawan</p>
        {isExpanded && (<motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} transition={{ duration: 0.3 }} style={{ marginTop: '1rem', padding: '1rem', background: 'rgba(0,0,0,0.2)', borderRadius: '12px' }}><p>📋 Informasi lengkap tentang kegiatan ini akan segera diupdate.</p></motion.div>)}
        <button className="btn-join" onClick={() => setIsExpanded(!isExpanded)}>{isExpanded ? 'Sembunyikan' : 'Lihat Detail'}</button>
      </div>
    </motion.div>
  );
}

export default ActivityCard;