import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import './HomePage.css';
import heroBg from '../assets/images/terimakasihbacgroun.jpg';
import sosialisasi from '../assets/images/sosialisasi.jpg';
import sosialisasi2 from '../assets/images/sosialisasi2.jpg';

function HomePage() {
  const [activeProduct, setActiveProduct] = useState(0);
  const [circleColor, setCircleColor] = useState('#E74C3C');

  const products = [
    {
      id: 0,
      title: 'Program Berbagi Makanan',
      subtitle: 'Buka Puasa & Makanan Bergizi',
      description: 'Berbagi makanan bergizi untuk anak-anak dan keluarga kurang mampu, terutama di bulan Ramadan dan hari-hari besar.',
      buttonText: 'Dukung Program',
      image: '/images/logoterbaru.jpg',
      thumb: '/images/logoterbaru.jpg',
      color: '#E74C3C',
      icon: '🍲'
    },
    {
      id: 2,
      title: 'Program Sembako',
      subtitle: 'Bahan Pokok & Sandang',
      description: 'Pembagian paket sembako dan pakaian layak pakai untuk keluarga kurang mampu di berbagai daerah.',
      buttonText: 'Dukung Program',
      image: sosialisasi,
      thumb: sosialisasi,
      color: '#3498DB',
      icon: '🛒'
    },
    {
      id: 3,
      title: 'Donor Darah',
      subtitle: 'Kerjasama dengan PT Pulau Sambu & Sambu Group',
      description: 'Program donor darah rutin yang bekerja sama dengan PT Pulau Sambu dan Sambu Group. Setiap tetes darah sangat berharga.',
      buttonText: 'Daftar Donor',
      image: sosialisasi,
      thumb: sosialisasi,
      color: '#27AE60',
      icon: '🩸'
    }
  ];

  const activities = [
    { title: 'Berbagi Takjil Ramadan', date: 'Maret 2026', location: 'Jakarta & Sekitarnya', beneficiaries: 5000, image: 'https://images.unsplash.com/photo-1582510003544-4d00b7f74220?w=400' },
    { title: 'Operasi Katarak Gratis', date: 'Februari 2026', location: 'Bandung, Jawa Barat', beneficiaries: 150, image: 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=400' },
    { title: 'Banjir Bandang Cianjur', date: 'Januari 2026', location: 'Cianjur, Jawa Barat', beneficiaries: 2500, image: 'https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=400' },
    { title: 'Penanaman 10.000 Pohon', date: 'Desember 2025', location: 'Bogor, Jawa Barat', beneficiaries: '10.000 pohon', image: 'https://images.unsplash.com/photo-1542273917363-3b1817f69a2d?w=400' }
  ];

  const testimonials = [
    { name: 'Siti Rahmawati', role: 'Penerima Beasiswa', text: 'Terima kasih Yayasan Peduli, saya bisa melanjutkan kuliah berkat beasiswa yang diberikan.', avatar: 'https://randomuser.me/api/portraits/women/1.jpg' },
    { name: 'Bambang Susilo', role: 'Relawan', text: 'Bergabung sebagai relawan adalah keputusan terbaik saya. Banyak pengalaman berharga.', avatar: 'https://randomuser.me/api/portraits/men/1.jpg' },
    { name: 'Nurul Hikmah', role: 'Penerima Bantuan', text: 'Bantuan yang diberikan sangat tepat sasaran dan membantu keluarga saya.', avatar: 'https://randomuser.me/api/portraits/women/2.jpg' }
  ];

  const imgSlider = (index, color) => {
    setActiveProduct(index);
    setCircleColor(color);
  };

  return (
    <div className="homepage">

      {/* =============================================
          HERO SECTION
          - Desktop: circle bg + image kanan (unchanged)
          - Mobile: full color top, wave, pill tabs, stats
         ============================================= */}
      <section className="hero-starbucks">

        {/* ---- DESKTOP: circle background ---- */}
        <div className="circle-bg" style={{ background: circleColor }} />

        {/* ---- HERO CONTAINER ----
            Mobile: background warna aktif via inline style,
            Desktop: transparent (circle-bg yang handle) */}
        <div
          className="hero-container"
          style={{ '--hero-color': circleColor }}
        >
          {/* Inject warna hero mobile via style tag inline */}
          <style>{`
            @media (max-width: 768px) {
              .hero-container { background: ${circleColor}; }
            }
          `}</style>

          {/* TEXT */}
          <div className="hero-text">
            {/* Badge — hanya terlihat di mobile via CSS */}
            <span className="hero-badge">✨ Aksi Terima Kasih</span>

            <motion.h2
              key={activeProduct}
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
            >
              Aksi Terima Kasih <br />
              <span>{products[activeProduct].title}</span>
            </motion.h2>

            <motion.p
              key={activeProduct + 'desc'}
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              {products[activeProduct].description}
            </motion.p>

            <motion.button
              className="btn-donate"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Donasi Sekarang
            </motion.button>
          </div>

          {/* IMAGE */}
          <div className="hero-image">
            <motion.img
              key={activeProduct}
              src={products[activeProduct].image}
              alt={products[activeProduct].title}
              initial={{ opacity: 0, scale: 0.8, rotate: -5 }}
              animate={{ opacity: 1, scale: 1, rotate: 0 }}
              transition={{ duration: 0.5, type: 'spring', stiffness: 100 }}
            />
          </div>
        </div>

        {/* ---- WAVE SEPARATOR (mobile only) ---- */}
        <div className="hero-wave">
          <svg
            viewBox="0 0 390 48"
            xmlns="http://www.w3.org/2000/svg"
            preserveAspectRatio="none"
            style={{ height: 48 }}
          >
            <path
              d={`M0,0 C80,48 160,0 260,32 C320,50 360,20 390,28 L390,48 L0,48 Z`}
              fill="#fff9f5"
            />
          </svg>
        </div>

        {/* ---- MOBILE BOTTOM: pill tabs + stats ---- */}
        <div className="hero-mobile-bottom">
          {/* Pill category tabs */}
          <div className="hero-pill-tags">
            {products.map((p, i) => (
              <button
                key={p.id}
                className={`hero-pill${activeProduct === i ? ' active' : ''}`}
                onClick={() => imgSlider(i, p.color)}
              >
                {p.icon} {p.title.split(' ').slice(1).join(' ')}
              </button>
            ))}
          </div>

          {/* Mini statistics bar */}
          <div className="hero-stats">
            <div className="hero-stat-item">
              <span className="hero-stat-num">500+</span>
              <span className="hero-stat-lbl">Donatur</span>
            </div>
            <div className="hero-stat-item">
              <span className="hero-stat-num">150jt</span>
              <span className="hero-stat-lbl">Terkumpul</span>
            </div>
            <div className="hero-stat-item">
              <span className="hero-stat-num">75%</span>
              <span className="hero-stat-lbl">Target</span>
            </div>
          </div>
        </div>

        {/* ---- DESKTOP: thumbs & social (unchanged) ---- */}
        <ul className="thumb-list">
          {products.map((product, index) => (
            <li key={product.id}>
              <img
                src={product.thumb}
                alt={product.title}
                onClick={() => imgSlider(index, product.color)}
              />
            </li>
          ))}
        </ul>

        <ul className="social-icons">
          <li><a href="#"><img src="https://raw.githubusercontent.com/farazc60/Project-Images/main/starbucks/facebook.png" alt="Facebook" /></a></li>
          <li><a href="#"><img src="https://raw.githubusercontent.com/farazc60/Project-Images/main/starbucks/instagram.png" alt="Instagram" /></a></li>
          <li><a href="#"><img src="https://raw.githubusercontent.com/farazc60/Project-Images/main/starbucks/twitter.png" alt="Twitter" /></a></li>
        </ul>
      </section>

      {/* =============================================
          PROGRAM SECTION
         ============================================= */}
      <section className="programs-section">
        <div className="container">
          <div className="section-header">
            <span className="section-tag">Program Kami</span>
            <h2>Program Unggulan</h2>
            <p>Berbagai program sosial yang kami jalankan untuk membantu masyarakat</p>
          </div>
          <div className="programs-grid">
            {products.map((program, index) => (
              <motion.div
                key={index}
                className="program-card"
                whileHover={{ y: -10, transition: { duration: 0.2 } }}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <div className="program-icon" style={{ background: `${program.color}15`, color: program.color }}>
                  {program.icon}
                </div>
                <h3>{program.title}</h3>
                <p>{program.description}</p>
                <a href="#" className="program-link">Selengkapnya →</a>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* =============================================
          KEGIATAN TERBARU
         ============================================= */}
      <section className="activities-section">
        <div className="container">
          <div className="section-header">
            <span className="section-tag">Aksi Nyata</span>
            <h2>Kegiatan Terbaru</h2>
            <p>Setiap langkah kecil membawa perubahan besar</p>
          </div>
          <div className="activities-grid">
            {activities.map((activity, index) => (
              <motion.div
                key={index}
                className="activity-card"
                whileHover={{ y: -5 }}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <img src={activity.image} alt={activity.title} />
                <div className="activity-content">
                  <h3>{activity.title}</h3>
                  <p className="activity-meta">📅 {activity.date} • 📍 {activity.location}</p>
                  <p className="activity-beneficiaries">❤️ {activity.beneficiaries} penerima manfaat</p>
                </div>
              </motion.div>
            ))}
          </div>
          <div className="text-center">
            <button className="btn-outline">Lihat Semua Kegiatan →</button>
          </div>
        </div>
      </section>

      {/* =============================================
          TESTIMONI
         ============================================= */}
      <section className="testimonials-section">
        <div className="container">
          <div className="section-header">
            <span className="section-tag">Testimoni</span>
            <h2>Kata Mereka Tentang Kami</h2>
            <p>Cerita nyata dari penerima manfaat dan relawan kami</p>
          </div>
          <div className="testimonials-grid">
            {testimonials.map((t, index) => (
              <motion.div
                key={index}
                className="testimonial-card"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <div className="testimonial-avatar">
                  <img src={t.avatar} alt={t.name} />
                </div>
                <div className="testimonial-content">
                  <p className="testimonial-text">"{t.text}"</p>
                  <h4>{t.name}</h4>
                  <span>{t.role}</span>
                  <div className="testimonial-stars">★★★★★</div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* =============================================
          CTA DONASI
         ============================================= */}
      <section className="cta-section">
        <div className="container">
          <div className="cta-icon">❤️</div>
          <h2>Bersama Kita Bisa Membantu Lebih Banyak</h2>
          <p>Setiap donasi Anda, sekecil apapun, akan memberikan dampak besar bagi mereka yang membutuhkan</p>
          <div className="cta-buttons">
            <button className="btn-primary">Donasi Sekarang</button>
            <button className="btn-secondary">Jadi Relawan</button>
          </div>
        </div>
      </section>
    </div>
  );
}

export default HomePage;
