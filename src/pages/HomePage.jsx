import HeroSection from '../components/layout/HeroSection';
import ActivityCard from '../components/cards/ActivityCard';
import VolunteerCard from '../components/cards/VolunteerCard';
import ParallaxCard from '../components/ui/ParallaxCard';
import { motion } from 'framer-motion';

function HomePage() {
  const campaigns = [
    { title: 'Hentikan Pencemar Plastik', date: 'Sepanjang 2026', location: 'Asia Tenggara', volunteers: 2300, status: 'berlangsung', image: 'https://images.unsplash.com/photo-1582213782179-e0d53f98f2ca?w=400' },
    { title: 'Lindungi Hutan Kalimantan', date: '15 Mei 2026', location: 'Kalimantan', volunteers: 150, status: 'aktif', image: 'https://images.unsplash.com/photo-1542273917363-3b1817f69a2d?w=400' },
    { title: 'Energi Bersih untuk Nelayan', date: '10 Juni 2026', location: 'Pulau Jawa', volunteers: 89, status: 'aktif', image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400' }
  ];

  const topVolunteers = [
    { name: 'Ahmad F.', role: 'Koordinator Hutan', location: 'Kalimantan', skills: ['Konservasi', 'Advokasi'], joinedDate: '2023', avatar: 'https://randomuser.me/api/portraits/men/1.jpg' },
    { name: 'Siti R.', role: 'Aktivis Laut', location: 'Bali', skills: ['Pembersihan Laut', 'Edukasi'], joinedDate: '2022', avatar: 'https://randomuser.me/api/portraits/women/1.jpg' },
    { name: 'Budi W.', role: 'Relawan Medis', location: 'Jawa Barat', skills: ['Kesehatan', 'Evakuasi'], joinedDate: '2024', avatar: 'https://randomuser.me/api/portraits/men/2.jpg' }
  ];

  const landscapes = [
    { image: 'https://images.unsplash.com/photo-1542273917363-3b1817f69a2d?w=800', title: 'Hutan Lestari', subtitle: 'Gerakan penanaman 10.000 pohon', action: 'Lihat Aksi →' },
    { image: 'https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=800', title: 'Bersihkan Laut', subtitle: 'Aksi bersih-bersih pantai serentak', action: 'Lihat Aksi →' },
    { image: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=800', title: 'Save The Mountain', subtitle: 'Menyelamatkan ekosistem gunung', action: 'Lihat Aksi →' },
    { image: 'https://images.unsplash.com/photo-1473496169904-658ba7c44d8a?w=800', title: 'Sungai Bersih', subtitle: 'Program normalisasi sungai', action: 'Lihat Aksi →' },
    { image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800', title: 'Desa Hijau', subtitle: 'Pemberdayaan desa berkelanjutan', action: 'Lihat Aksi →' },
    { image: 'https://images.unsplash.com/photo-1549366021-9f761d450615?w=800', title: 'Lindungi Satwa', subtitle: 'Konservasi habitat alami', action: 'Lihat Aksi →' }
  ];

  const galleryImages = [
    'https://images.unsplash.com/photo-1582510003544-4d00b7f74220?w=400',
    'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=400',
    'https://images.unsplash.com/photo-1534190239940-491ba9df1f7e?w=400',
    'https://images.unsplash.com/photo-1542273917363-3b1817f69a2d?w=400',
    'https://images.unsplash.com/photo-1473496169904-658ba7c44d8a?w=400',
    'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=400'
  ];

  return (
    <div>
      <HeroSection />
      
      {/* Parallax 3D Landscape */}
      <section className="section">
        <motion.div className="reveal fade-up" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}>
          <h2 className="section-title">🌄 Galeri Aksi 3D</h2>
          <p style={{ textAlign: 'center', marginBottom: '2rem', color: 'white', opacity: 0.9 }}>✨ Gerakkan mouse ke gambar untuk melihat efek 3D yang bergerak! ✨</p>
        </motion.div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', gap: '1rem', marginTop: '2rem' }}>
          {landscapes.map((item, index) => (
            <motion.div key={index} className="reveal fade-up" initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: index * 0.1 }}>
              <ParallaxCard image={item.image} title={item.title} subtitle={item.subtitle}>
                <button className="btn-view" style={{ marginTop: '1rem', width: 'auto', padding: '0.5rem 1.5rem', background: 'white', color: '#0a4c5c' }} onClick={() => alert(`Terima kasih tertarik dengan "${item.title}"!`)}>{item.action}</button>
              </ParallaxCard>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Campaign Section */}
      <section className="section">
        <motion.div className="reveal fade-up" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}>
          <h2 className="section-title">Kampanye Kami</h2>
        </motion.div>
        <div className="cards-grid">
          {campaigns.map((campaign, index) => (
            <div key={index} className="reveal fade-up" style={{ transitionDelay: `${index * 0.1}s` }}>
              <ActivityCard {...campaign} />
            </div>
          ))}
        </div>
      </section>

      {/* Gallery Section */}
      <section className="section">
        <motion.div className="reveal fade-up" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}>
          <h2 className="section-title">📸 Dokumentasi Aksi</h2>
          <p style={{ textAlign: 'center', marginBottom: '1.5rem', color: 'white', opacity: 0.8 }}>Momen-momen berharga para relawan dalam aksi kemanusiaan</p>
        </motion.div>
        <div className="gallery-grid">
          {galleryImages.map((img, index) => (
            <motion.div key={index} className="gallery-item" initial={{ opacity: 0, scale: 0.9 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ delay: index * 0.05 }} onClick={() => window.open(img, '_blank')}>
              <img src={img} alt={`Aksi ${index + 1}`} />
              <div className="gallery-overlay"><span>📸 Klik untuk lihat</span></div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Impact Stats */}
      <section className="section">
        <motion.div className="reveal scale" initial={{ opacity: 0, scale: 0.8 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
          <h2 className="section-title">Dampak Aksi Relawan</h2>
        </motion.div>
        <div className="stats-section">
          {[
            { number: '5.000+', label: 'Relawan Aktif', icon: '👥', delay: 0 },
            { number: '150+', label: 'Aksi & Investigasi', icon: '🎯', delay: 0.1 },
            { number: '50.000+', label: 'Pohon Terlindungi', icon: '🌳', delay: 0.2 },
            { number: '100.000+', label: 'Masyarakat Terbantu', icon: '🏠', delay: 0.3 }
          ].map((stat, index) => (
            <motion.div key={index} className="stat-card reveal fade-up" initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: stat.delay, duration: 0.5 }} whileHover={{ scale: 1.05 }}>
              <div style={{ fontSize: '2rem' }}>{stat.icon}</div>
              <motion.h3 initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} transition={{ delay: stat.delay + 0.2 }}>{stat.number}</motion.h3>
              <p>{stat.label}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Volunteers Section */}
      <section className="section">
        <motion.div className="reveal fade-right" initial={{ opacity: 0, x: -50 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
          <h2 className="section-title">Relawan Garda Terdepan</h2>
        </motion.div>
        <div className="cards-grid">
          {topVolunteers.map((volunteer, index) => (
            <div key={index} className="reveal fade-left" style={{ transitionDelay: `${index * 0.15}s` }}>
              <VolunteerCard {...volunteer} />
            </div>
          ))}
        </div>
      </section>

     
    {/* CTA Section - dengan logo bulat */}
<motion.section className="cta-section" initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
  <img 
    src="/images/logobulat.jpg" 
    alt="Logo Aksi Terima Kasih" 
    style={{ 
      width: '90px', 
      height: '90px',
      borderRadius: '50%',
      objectFit: 'cover',
      marginBottom: '1.5rem',
      display: 'inline-block',
      boxShadow: '0 4px 15px rgba(0,0,0,0.2)',
      border: '2px solid rgba(255,255,255,0.3)'
    }} 
  />
  <motion.h2 animate={{ scale: [1, 1.05, 1] }} transition={{ duration: 2, repeat: Infinity }}>Bergabung Menjadi Relawan Bumi</motion.h2>
  <p>Setiap aksi nyata membawa perubahan untuk generasi mendatang</p>
  <motion.button className="btn-large" whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>Gabung Sekarang</motion.button>
</motion.section>
    </div>
  );
}

export default HomePage;