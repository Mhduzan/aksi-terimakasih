import { useState } from 'react';
import { motion } from 'framer-motion';

function VolunteerCard({ name, role, location, avatar, skills, joinedDate }) {
  const [isFlipped, setIsFlipped] = useState(false);

  return (
    <motion.div
      className="volunteer-card"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      whileHover={{ y: -8 }}
      onClick={() => setIsFlipped(!isFlipped)}
    >
      <motion.div animate={{ rotateY: isFlipped ? 180 : 0 }} transition={{ duration: 0.6, type: "spring", stiffness: 100 }} style={{ transformStyle: 'preserve-3d' }}>
        {/* Front Side */}
        <div style={{ display: isFlipped ? 'none' : 'block' }}>
          <div className="volunteer-avatar">
            {avatar ? (
              <img src={avatar} alt={name} style={{ width: '80px', height: '80px', borderRadius: '50%', objectFit: 'cover', margin: '0 auto', display: 'block' }} />
            ) : (
              <div className="avatar-placeholder">{name?.[0] || '👤'}</div>
            )}
          </div>
          <h3>{name}</h3>
          <p className="volunteer-role">{role}</p>
          <p className="volunteer-location">📍 {location}</p>
          <div className="volunteer-skills">
            {skills?.map((skill, index) => (<span key={index} className="skill-tag">{skill}</span>))}
          </div>
          <p className="volunteer-joined">Bergabung: {joinedDate}</p>
          <button className="btn-view">Klik untuk detail ➜</button>
        </div>

        {/* Back Side */}
        <div style={{ display: isFlipped ? 'block' : 'none', transform: 'rotateY(180deg)' }}>
          <div className="volunteer-avatar" style={{ background: 'linear-gradient(135deg, #fe0979, #00f2fe)' }}>
            <div className="avatar-placeholder" style={{ animation: 'none' }}>✨</div>
          </div>
          <h3 style={{ color: '#fe0979' }}>Terima Kasih!</h3>
          <p style={{ padding: '0 1rem', marginTop: '0.5rem', color: 'white' }}>{name} telah berkontribusi dalam berbagai aksi kemanusiaan.</p>
          <button className="btn-view" onClick={(e) => { e.stopPropagation(); setIsFlipped(false); }} style={{ marginTop: '1rem', background: '#fe0979', color: 'white', border: 'none' }}>Kembali ➜</button>
        </div>
      </motion.div>
    </motion.div>
  );
}

export default VolunteerCard;