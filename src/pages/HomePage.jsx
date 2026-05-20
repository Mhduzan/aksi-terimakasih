import HeroSection from '../components/layout/HeroSection';
import ActivityCard from '../components/cards/ActivityCard';
import VolunteerCard from '../components/cards/VolunteerCard';
import { motion } from 'framer-motion';

function HomePage() {
  const campaigns = [
    { title: 'Hentikan Pencemar Plastik', date: 'Sepanjang 2026', location: 'Asia Tenggara', volunteers: 2300, status: 'berlangsung' },
    { title: 'Lindungi Hutan Kalimantan', date: '15 Mei 2026', location: 'Kalimantan', volunteers: 150, status: 'aktif' },
    { title: 'Energi Bersih untuk Nelayan', date: '10 Juni 2026', location: 'Pulau Jawa', volunteers: 89, status: 'aktif' }
  ];

  const topVolunteers = [
    { name: 'Ahmad F.', role: 'Koordinator Hutan', location: 'Kalimantan', skills: ['Konservasi', 'Advokasi'], joinedDate: '2023' },
    { name: 'Siti R.', role: 'Aktivis Laut', location: 'Bali', skills: ['Pembersihan Laut', 'Edukasi'], joinedDate: '2022' },
    { name: 'Budi W.', role: 'Relawan Medis', location: 'Jawa Barat', skills: ['Kesehatan', 'Evakuasi'], joinedDate: '2024' }
  ];

  return (
    <div>
      <HeroSection />
      
      {/* Campaign Section dengan Scroll Reveal */}
      <section className="section">
        <div className="container">
          <motion.div
            className="reveal fade-up"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            <h2 className="section-title">Kampanye Kami</h2>
          </motion.div>
          <div className="cards-grid">
            {campaigns.map((campaign, index) => (
              <div key={index} className="reveal fade-up" style={{ transitionDelay: `${index * 0.1}s` }}>
                <ActivityCard {...campaign} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Impact Stats dengan Parallax */}
      <section className="section bg-light parallax" style={{ backgroundImage: 'linear-gradient(135deg, #0f3b2c20, #1a5c4a20)' }}>
        <div className="container">
          <motion.div
            className="reveal scale"
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="section-title">Dampak Aksi Relawan</h2>
          </motion.div>
          
          <div className="stats-section">
            {[
              { number: '5.000+', label: 'Relawan Aktif', delay: 0 },
              { number: '150+', label: 'Aksi & Investigasi', delay: 0.1 },
              { number: '50.000+', label: 'Pohon Terlindungi', delay: 0.2 },
              { number: '100.000+', label: 'Masyarakat Terbantu', delay: 0.3 }
            ].map((stat, index) => (
              <motion.div
                key={index}
                className="stat-card reveal fade-up"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: stat.delay, duration: 0.5 }}
                whileHover={{ scale: 1.05, transition: { duration: 0.2 } }}
              >
                <motion.h3
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  transition={{ delay: stat.delay + 0.2 }}
                >
                  {stat.number}
                </motion.h3>
                <p>{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Volunteers Section */}
      <section className="section">
        <div className="container">
          <motion.div
            className="reveal fade-right"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="section-title">Relawan Garda Terdepan</h2>
          </motion.div>
          <div className="cards-grid">
            {topVolunteers.map((volunteer, index) => (
              <div key={index} className="reveal fade-left" style={{ transitionDelay: `${index * 0.15}s` }}>
                <VolunteerCard {...volunteer} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section dengan animasi */}
      <motion.section 
        className="cta-section"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <div className="container text-center">
          <motion.h2
            animate={{ scale: [1, 1.05, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            Bergabung Menjadi Relawan Bumi
          </motion.h2>
          <p>Setiap aksi nyata membawa perubahan untuk generasi mendatang</p>
          <motion.button 
            className="btn-large"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Gabung Sekarang
          </motion.button>
        </div>
      </motion.section>
    </div>
  );
}

export default HomePage;