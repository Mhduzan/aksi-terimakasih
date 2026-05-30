import { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import './HomePage.css';
import sosialisasi from '../assets/images/sosialisasi.jpg';
import sosialisasi2 from '../assets/images/sosialisasi2.jpg';
import heroBg from '../assets/images/terimakasihbacgroun.jpg';

function HomePage() {
  const [active, setActive] = useState(0);
  const sliderRef = useRef(null);
  const isDragging = useRef(false);
  const startX = useRef(0);
  const scrollLeft = useRef(0);

  const programs = [
    {
      id: 0,
      title: 'Berbagi Makanan',
      subtitle: 'Buka Puasa & Makanan Bergizi',
      description: 'Berbagi makanan bergizi untuk anak-anak dan keluarga kurang mampu, terutama di bulan Ramadan dan hari-hari besar.',
      image: '/images/logoterbaru.jpg',
      color: '#C0392B',
      gradient: 'linear-gradient(145deg, #922B21 0%, #C0392B 50%, #E74C3C 100%)',
      icon: '🍲',
      tag: 'Berbagi Makanan',
      stat: '5.000+ penerima',
    },
    {
      id: 1,
      title: 'Program Sembako',
      subtitle: 'Bahan Pokok & Sandang',
      description: 'Pembagian paket sembako dan pakaian layak pakai untuk keluarga kurang mampu di berbagai daerah.',
      image: sosialisasi,
      color: '#1A5276',
      gradient: 'linear-gradient(145deg, #0E3460 0%, #1A5276 50%, #2980B9 100%)',
      icon: '🛒',
      tag: 'Program Sembako',
      stat: '3.000+ paket',
    },
    {
      id: 2,
      title: 'Donor Darah',
      subtitle: 'Bersama PT Pulau Sambu',
      description: 'Program donor darah rutin bersama PT Pulau Sambu dan Sambu Group. Setiap tetes darah sangat berharga untuk sesama.',
      image: sosialisasi2,
      color: '#1E8449',
      gradient: 'linear-gradient(145deg, #145A32 0%, #1E8449 50%, #27AE60 100%)',
      icon: '🩸',
      tag: 'Donor Darah',
      stat: '1.200+ kantong',
    },
  ];

  const activities = [
    { title: 'Berbagi Takjil Ramadan', date: 'Maret 2026', location: 'Jakarta', beneficiaries: 5000, image: 'https://images.unsplash.com/photo-1582510003544-4d00b7f74220?w=400' },
    { title: 'Operasi Katarak Gratis', date: 'Februari 2026', location: 'Bandung', beneficiaries: 150, image: 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=400' },
    { title: 'Banjir Bandang Cianjur', date: 'Januari 2026', location: 'Cianjur', beneficiaries: 2500, image: 'https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=400' },
    { title: 'Penanaman 10.000 Pohon', date: 'Des 2025', location: 'Bogor', beneficiaries: '10rb pohon', image: 'https://images.unsplash.com/photo-1542273917363-3b1817f69a2d?w=400' },
  ];

  const testimonials = [
    { name: 'Siti Rahmawati', role: 'Penerima Beasiswa', text: 'Terima kasih Yayasan Peduli, saya bisa melanjutkan kuliah berkat beasiswa yang diberikan.', avatar: 'https://randomuser.me/api/portraits/women/1.jpg' },
    { name: 'Bambang Susilo', role: 'Relawan', text: 'Bergabung sebagai relawan adalah keputusan terbaik saya. Banyak pengalaman berharga.', avatar: 'https://randomuser.me/api/portraits/men/1.jpg' },
    { name: 'Nurul Hikmah', role: 'Penerima Bantuan', text: 'Bantuan yang diberikan sangat tepat sasaran dan membantu keluarga saya.', avatar: 'https://randomuser.me/api/portraits/women/2.jpg' },
  ];

  /* ---- drag-to-scroll ---- */
  const onMouseDown = (e) => {
    isDragging.current = true;
    startX.current = e.pageX - sliderRef.current.offsetLeft;
    scrollLeft.current = sliderRef.current.scrollLeft;
  };
  const onMouseMove = (e) => {
    if (!isDragging.current) return;
    e.preventDefault();
    const x = e.pageX - sliderRef.current.offsetLeft;
    sliderRef.current.scrollLeft = scrollLeft.current - (x - startX.current);
  };
  const onMouseUp = () => { isDragging.current = false; };

  const cur = programs[active];

  return (
    <div className="homepage">

      {/* =============================================
          HERO
         ============================================= */}
      <section className="hp-hero">

        {/* Background gradient */}
        <AnimatePresence mode="wait">
          <motion.div
            key={active}
            className="hp-hero-bg"
            style={{ background: cur.gradient }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
          />
        </AnimatePresence>

        {/* Dekorasi orb */}
        <div className="hp-orb hp-orb1" />
        <div className="hp-orb hp-orb2" />
        <div className="hp-dots" />

        {/* Navbar mini */}
        <div className="hp-nav">
          <div className="hp-nav-logo">
            <div className="hp-logo-circle">❤️</div>
            <span className="hp-logo-text">Aksi Terima Kasih</span>
          </div>
          <div className="hp-nav-menu">
            <span /><span /><span />
          </div>
        </div>

        {/* Tag */}
        <motion.div
          key={active + 'tag'}
          className="hp-tag"
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35 }}
        >
          <span className="hp-tag-dot" />
          <span>Program Aktif 2026</span>
        </motion.div>

        {/* Text */}
        <div className="hp-hero-text">
          <p className="hp-eyebrow">Yayasan Peduli</p>
          <motion.h1
            key={active + 'h1'}
            className="hp-title"
            initial={{ opacity: 0, x: -24 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4 }}
          >
            {cur.icon} <em>{cur.title}</em>
          </motion.h1>
          <motion.p
            key={active + 'desc'}
            className="hp-desc"
            initial={{ opacity: 0, x: -16 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4, delay: 0.08 }}
          >
            {cur.description}
          </motion.p>
          <div className="hp-btns">
            <button className="hp-btn-main">❤️ Donasi Sekarang</button>
            <button className="hp-btn-ghost">Info →</button>
          </div>
        </div>

        {/* ---- FOTO SLIDER (swipeable) ---- */}
        <div className="hp-slider-wrap">

          {/* Slider track */}
          <div
            className="hp-slider"
            ref={sliderRef}
            onMouseDown={onMouseDown}
            onMouseMove={onMouseMove}
            onMouseLeave={onMouseUp}
            onMouseUp={onMouseUp}
          >
            {programs.map((p, i) => (
              <div
                key={p.id}
                className={`hp-slide${active === i ? ' hp-slide--active' : ''}`}
                onClick={() => setActive(i)}
              >
                {/* Shadow bawah gambar */}
                <div className="hp-slide-shadow" />

                {/* Foto */}
                <div className="hp-slide-img-wrap">
                  <img src={p.image} alt={p.title} className="hp-slide-img" />
                </div>

                {/* Badge aktif */}
                {active === i && (
                  <motion.div
                    className="hp-slide-badge"
                    initial={{ opacity: 0, scale: 0.7 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ type: 'spring', stiffness: 260, damping: 20 }}
                  >
                    ⭐ Unggulan
                  </motion.div>
                )}

                {/* Label di bawah */}
                <div className="hp-slide-label">
                  <span className="hp-slide-icon">{p.icon}</span>
                  <span className="hp-slide-name">{p.tag}</span>
                </div>
              </div>
            ))}
          </div>

          {/* Floating stat card kiri */}
          <AnimatePresence mode="wait">
            <motion.div
              key={active + 'fcard'}
              className="hp-float-card"
              initial={{ opacity: 0, x: -12 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.35 }}
            >
              <span className="hp-fc-label">Penerima</span>
              <span className="hp-fc-val">{cur.stat}</span>
            </motion.div>
          </AnimatePresence>

          {/* Dot indicators */}
          <div className="hp-dots-nav">
            {programs.map((_, i) => (
              <button
                key={i}
                className={`hp-dot-btn${active === i ? ' hp-dot-btn--on' : ''}`}
                onClick={() => setActive(i)}
              />
            ))}
          </div>
        </div>

        {/* Wave */}
        <div className="hp-wave">
          <svg viewBox="0 0 390 44" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none" height="44">
            <path d="M0,10 C80,44 160,0 240,28 C300,48 350,12 390,22 L390,44 L0,44 Z" fill="#ffffff" />
          </svg>
        </div>
      </section>

      {/* =============================================
          STATS + PROGRAM LIST
         ============================================= */}
      <section className="hp-bottom">

        {/* Stats */}
        <div className="hp-stats">
          <div className="hp-stat">
            <span className="hp-stat-num">500+</span>
            <span className="hp-stat-lbl">Donatur</span>
          </div>
          <div className="hp-stat">
            <span className="hp-stat-num">150jt</span>
            <span className="hp-stat-lbl">Terkumpul</span>
          </div>
          <div className="hp-stat">
            <span className="hp-stat-num">75%</span>
            <span className="hp-stat-lbl">Target</span>
          </div>
        </div>

        {/* Program list — food card style */}
        <p className="hp-sec-title">Program Kami</p>
        <div className="hp-prog-list">
          {programs.map((p, i) => (
            <motion.div
              key={p.id}
              className={`hp-prog-card${active === i ? ' hp-prog-card--active' : ''}`}
              onClick={() => setActive(i)}
              whileHover={{ scale: 1.01 }}
              whileTap={{ scale: 0.98 }}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
              style={active === i ? { borderColor: p.color } : {}}
            >
              <div className="hp-prog-img" style={{ background: p.color + '18' }}>
                <img src={p.image} alt={p.title} />
                <span className="hp-prog-icon">{p.icon}</span>
              </div>
              <div className="hp-prog-info">
                <div className="hp-prog-name">{p.title}</div>
                <div className="hp-prog-sub">{p.subtitle}</div>
                <div className="hp-prog-stat" style={{ color: p.color }}>{p.stat}</div>
              </div>
              <div className="hp-prog-right">
                <div className="hp-prog-badge" style={{ background: p.color + '18', color: p.color }}>Aktif</div>
                <div className="hp-prog-arrow" style={{ background: p.color }}>→</div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* =============================================
          KEGIATAN TERBARU
         ============================================= */}
      <section className="programs-section">
        <div className="container">
          <div className="section-header">
            <span className="section-tag">Aksi Nyata</span>
            <h2>Kegiatan Terbaru</h2>
            <p>Setiap langkah kecil membawa perubahan besar</p>
          </div>
          <div className="activities-grid">
            {activities.map((a, i) => (
              <motion.div key={i} className="activity-card" whileHover={{ y: -5 }} initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ delay: i * 0.08 }}>
                <img src={a.image} alt={a.title} />
                <div className="activity-content">
                  <h3>{a.title}</h3>
                  <p className="activity-meta">📅 {a.date} • 📍 {a.location}</p>
                  <p className="activity-beneficiaries">❤️ {a.beneficiaries} penerima manfaat</p>
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
            {testimonials.map((t, i) => (
              <motion.div key={i} className="testimonial-card" initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}>
                <div className="testimonial-avatar"><img src={t.avatar} alt={t.name} /></div>
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
          CTA
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
