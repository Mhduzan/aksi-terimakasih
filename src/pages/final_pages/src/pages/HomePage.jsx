import { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import './HomePage.css';

// ── Foto-foto asli dari assets ──────────────────────────
import photoRelawan  from '../assets/images/photo1.jpg';   // sunset relawan
import photoSembako1 from '../assets/images/photo2.jpg';   // serah terima sembako
import photoDonor    from '../assets/images/photo3.jpg';   // donor darah
import photoMotor    from '../assets/images/photo4.jpg';   // pengiriman logistik
import photoSembako2 from '../assets/images/photo5.jpg';   // pembagian sembako
import photoKunjung  from '../assets/images/photo6.jpg';   // kunjungan rumah
import photoTim      from '../assets/images/photo7.jpg';   // tim gerakan peduli

/*
  CATATAN UNTUK DEVELOPER:
  Salin foto dari WhatsApp ke src/assets/images/ dengan nama:
    photo1.jpg  → foto sunset relawan (membelakangi)
    photo2.jpg  → foto serah terima sembako (2 relawan + ibu)
    photo3.jpg  → foto donor darah (tersenyum)
    photo4.jpg  → foto pengiriman motor
    photo5.jpg  → foto pembagian sembako keluarga
    photo6.jpg  → foto kunjungan rumah (4 orang)
    photo7.jpg  → foto tim GPS Kateman
*/

function HomePage() {
  const [activeSlide, setActiveSlide] = useState(0);
  const sliderRef   = useRef(null);
  const isDragging  = useRef(false);
  const startX      = useRef(0);
  const scrollLeft  = useRef(0);

  /* ── Data program ─────────────────────────────────── */
  const programs = [
    {
      id: 0,
      label: 'Program Utama',
      title: 'Paket Sembako',
      subtitle: 'Bahan Pokok untuk Sesama',
      desc: 'Pembagian paket sembako berupa beras, minyak, dan bahan pokok lainnya untuk keluarga kurang mampu di wilayah terpencil.',
      image: photoSembako1,
      color: '#C0392B',
      gradient: 'linear-gradient(145deg, #7B241C 0%, #C0392B 55%, #E74C3C 100%)',
      icon: '🛒',
      stat: '3.200+ paket dibagikan',
      tag: 'Sembako',
    },
    {
      id: 1,
      label: 'Program Relawan',
      title: 'Gerakan Peduli',
      subtitle: 'Bersama Membangun Sesama',
      desc: 'Tim relawan berseragam merah turun langsung ke lapangan — kunjungan rumah, pengiriman bantuan, dan aksi sosial nyata.',
      image: photoRelawan,
      color: '#1A3A6B',
      gradient: 'linear-gradient(145deg, #0D1F3C 0%, #1A3A6B 55%, #2E6DA4 100%)',
      icon: '❤️',
      stat: '120+ relawan aktif',
      tag: 'Relawan',
    },
    {
      id: 2,
      label: 'Program Kesehatan',
      title: 'Donor Darah',
      subtitle: 'Bersama PT Pulau Sambu',
      desc: 'Program donor darah rutin bersama PT Pulau Sambu dan Sambu Group. Setiap tetes darah Anda sangat berarti bagi sesama.',
      image: photoDonor,
      color: '#1E6B3A',
      gradient: 'linear-gradient(145deg, #0F3D20 0%, #1E6B3A 55%, #27AE60 100%)',
      icon: '🩸',
      stat: '1.200+ kantong darah',
      tag: 'Donor Darah',
    },
  ];

  /* ── Galeri kegiatan (pakai foto asli) ────────────── */
  const gallery = [
    { img: photoSembako2, title: 'Kunjungan Rumah',      date: 'Mei 2026',      loc: 'Kateman, Riau' },
    { img: photoMotor,    title: 'Pengiriman Logistik',  date: 'April 2026',    loc: 'Wilayah Terpencil' },
    { img: photoKunjung,  title: 'Serah Terima Bantuan', date: 'Maret 2026',    loc: 'Sei Guntung' },
    { img: photoTim,      title: 'Tim GPS Kateman',       date: 'Februari 2026', loc: 'Kateman' },
  ];

  /* ── Testimonial ──────────────────────────────────── */
  const testimonials = [
    { name: 'Ibu Sari',     role: 'Penerima Bantuan',  text: 'Terima kasih banyak, bantuan sembako ini sangat berarti untuk keluarga kami.', avatar: 'https://randomuser.me/api/portraits/women/45.jpg' },
    { name: 'Pak Rahmat',   role: 'Relawan Aktif',     text: 'Ikut bergerak bersama tim merah ini sungguh pengalaman yang mengubah hidup saya.', avatar: 'https://randomuser.me/api/portraits/men/32.jpg' },
    { name: 'Nenek Jumilah',role: 'Penerima Bantuan',  text: 'Mereka datang jauh-jauh ke rumah kami membawa beras dan minyak. Terharu sekali.', avatar: 'https://randomuser.me/api/portraits/women/68.jpg' },
  ];

  /* ── Drag scroll ──────────────────────────────────── */
  const onMouseDown = (e) => {
    isDragging.current  = true;
    startX.current      = e.pageX - sliderRef.current.offsetLeft;
    scrollLeft.current  = sliderRef.current.scrollLeft;
  };
  const onMouseMove = (e) => {
    if (!isDragging.current) return;
    e.preventDefault();
    const x = e.pageX - sliderRef.current.offsetLeft;
    sliderRef.current.scrollLeft = scrollLeft.current - (x - startX.current);
  };
  const onMouseUp = () => { isDragging.current = false; };

  const cur = programs[activeSlide];

  return (
    <div className="homepage">

      {/* ══════════════════════════════════════════════
          HERO
         ══════════════════════════════════════════════ */}
      <section className="hp-hero">

        {/* Background animasi */}
        <AnimatePresence mode="wait">
          <motion.div key={activeSlide} className="hp-hero-bg"
            style={{ background: cur.gradient }}
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            transition={{ duration: 0.55 }} />
        </AnimatePresence>

        <div className="hp-orb hp-orb1" />
        <div className="hp-orb hp-orb2" />
        <div className="hp-dots" />

        {/* Navbar */}
        <div className="hp-nav">
          <div className="hp-nav-logo">
            <div className="hp-logo-circle">❤️</div>
            <div>
              <span className="hp-logo-name">Aksi Terima Kasih</span>
              <span className="hp-logo-sub">Gerakan Peduli Sesama</span>
            </div>
          </div>
          <div className="hp-nav-ham"><span/><span/><span/></div>
        </div>

        {/* Tag */}
        <motion.div key={activeSlide+'tag'} className="hp-tag"
          initial={{ opacity:0, y:-8 }} animate={{ opacity:1, y:0 }} transition={{ duration:0.3 }}>
          <span className="hp-tag-dot" />
          <span>{cur.label} • 2026</span>
        </motion.div>

        {/* Teks hero */}
        <div className="hp-hero-text">
          <motion.p key={activeSlide+'ey'} className="hp-eyebrow"
            initial={{ opacity:0 }} animate={{ opacity:1 }} transition={{ duration:0.3 }}>
            {cur.icon} &nbsp;{cur.subtitle}
          </motion.p>
          <motion.h1 key={activeSlide+'h1'} className="hp-title"
            initial={{ opacity:0, x:-20 }} animate={{ opacity:1, x:0 }} transition={{ duration:0.4 }}>
            {cur.title}
          </motion.h1>
          <motion.p key={activeSlide+'dp'} className="hp-desc"
            initial={{ opacity:0, x:-12 }} animate={{ opacity:1, x:0 }} transition={{ duration:0.4, delay:0.08 }}>
            {cur.desc}
          </motion.p>
          <div className="hp-btns">
            <button className="hp-btn-main">❤️ Donasi Sekarang</button>
            <button className="hp-btn-ghost">Selengkapnya →</button>
          </div>
        </div>

        {/* ── FOTO SLIDER ── */}
        <div className="hp-slider-wrap">

          {/* Floating stat */}
          <AnimatePresence mode="wait">
            <motion.div key={activeSlide+'fc'} className="hp-float-card"
              initial={{ opacity:0, x:-12 }} animate={{ opacity:1, x:0 }} exit={{ opacity:0 }}
              transition={{ duration:0.3 }}>
              <span className="hp-fc-lbl">Pencapaian</span>
              <span className="hp-fc-val">{cur.stat}</span>
            </motion.div>
          </AnimatePresence>

          {/* Slider track */}
          <div className="hp-slider" ref={sliderRef}
            onMouseDown={onMouseDown} onMouseMove={onMouseMove}
            onMouseLeave={onMouseUp} onMouseUp={onMouseUp}>

            {programs.map((p, i) => (
              <div key={p.id}
                className={`hp-slide${activeSlide === i ? ' hp-slide--active' : ''}`}
                onClick={() => setActiveSlide(i)}>

                <div className="hp-slide-shadow" />

                {/* Foto asli sebagai objek UI */}
                <div className="hp-slide-img-wrap">
                  <img src={p.image} alt={p.title} className="hp-slide-img" draggable="false" />
                  {/* Overlay gradient bawah supaya teks terbaca */}
                  <div className="hp-slide-overlay" />
                </div>

                {activeSlide === i && (
                  <motion.div className="hp-slide-badge"
                    initial={{ opacity:0, scale:0.6 }} animate={{ opacity:1, scale:1 }}
                    transition={{ type:'spring', stiffness:280, damping:18 }}>
                    ⭐ Aktif
                  </motion.div>
                )}

                <div className="hp-slide-label">
                  <span className="hp-slide-icon">{p.icon}</span>
                  <span className="hp-slide-name">{p.tag}</span>
                </div>
              </div>
            ))}
          </div>

          {/* Dot nav */}
          <div className="hp-dots-nav">
            {programs.map((_, i) => (
              <button key={i}
                className={`hp-dot-btn${activeSlide === i ? ' hp-dot-btn--on' : ''}`}
                onClick={() => setActiveSlide(i)} />
            ))}
          </div>
        </div>

        {/* Wave */}
        <div className="hp-wave">
          <svg viewBox="0 0 390 48" xmlns="http://www.w3.org/2000/svg"
            preserveAspectRatio="none" height="48">
            <path d="M0,12 C80,48 170,0 260,30 C310,50 355,14 390,24 L390,48 L0,48 Z" fill="#fff" />
          </svg>
        </div>
      </section>

      {/* ══════════════════════════════════════════════
          STATS + PROGRAM CARDS
         ══════════════════════════════════════════════ */}
      <section className="hp-bottom">

        {/* Stats bar */}
        <div className="hp-stats">
          {[['500+','Donatur'],['3.200+','Paket Sembako'],['120+','Relawan']].map(([n,l])=>(
            <div key={l} className="hp-stat">
              <span className="hp-stat-num">{n}</span>
              <span className="hp-stat-lbl">{l}</span>
            </div>
          ))}
        </div>

        {/* Program cards — food menu style */}
        <p className="hp-sec-title">Program Kami</p>
        <div className="hp-prog-list">
          {programs.map((p, i) => (
            <motion.div key={p.id}
              className={`hp-prog-card${activeSlide===i?' hp-prog-card--active':''}`}
              style={activeSlide===i ? { borderColor: p.color } : {}}
              onClick={() => setActiveSlide(i)}
              whileHover={{ scale: 1.01 }} whileTap={{ scale: 0.98 }}
              initial={{ opacity:0, y:14 }} whileInView={{ opacity:1, y:0 }}
              viewport={{ once:true }} transition={{ delay: i*0.08 }}>

              {/* Foto nyata sebagai thumbnail card */}
              <div className="hp-prog-thumb">
                <img src={p.image} alt={p.title} />
                <div className="hp-prog-thumb-overlay" />
                <span className="hp-prog-thumb-icon">{p.icon}</span>
              </div>

              <div className="hp-prog-info">
                <div className="hp-prog-name">{p.title}</div>
                <div className="hp-prog-sub">{p.subtitle}</div>
                <div className="hp-prog-stat" style={{ color: p.color }}>{p.stat}</div>
              </div>

              <div className="hp-prog-right">
                <span className="hp-prog-badge"
                  style={{ background: p.color+'18', color: p.color }}>Aktif</span>
                <span className="hp-prog-arrow" style={{ background: p.color }}>→</span>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ══════════════════════════════════════════════
          GALERI KEGIATAN (foto asli)
         ══════════════════════════════════════════════ */}
      <section className="hp-gallery-section">
        <div className="container">
          <div className="section-header">
            <span className="section-tag">Aksi Nyata</span>
            <h2>Kegiatan di Lapangan</h2>
            <p>Dokumentasi langsung dari setiap aksi kemanusiaan kami</p>
          </div>

          <div className="hp-gallery-grid">
            {gallery.map((g, i) => (
              <motion.div key={i} className="hp-gallery-card"
                initial={{ opacity:0, y:16 }} whileInView={{ opacity:1, y:0 }}
                viewport={{ once:true }} transition={{ delay: i*0.09 }}
                whileHover={{ y:-4 }}>
                <div className="hp-gallery-img-wrap">
                  <img src={g.img} alt={g.title} />
                  <div className="hp-gallery-overlay">
                    <span className="hp-gallery-loc">📍 {g.loc}</span>
                  </div>
                </div>
                <div className="hp-gallery-info">
                  <span className="hp-gallery-date">📅 {g.date}</span>
                  <h3 className="hp-gallery-title">{g.title}</h3>
                </div>
              </motion.div>
            ))}
          </div>

          <div className="text-center" style={{ marginTop: '2rem' }}>
            <button className="btn-outline">Lihat Semua Kegiatan →</button>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════
          TESTIMONI
         ══════════════════════════════════════════════ */}
      <section className="testimonials-section">
        <div className="container">
          <div className="section-header">
            <span className="section-tag">Testimoni</span>
            <h2>Kata Mereka</h2>
            <p>Cerita nyata dari penerima manfaat dan relawan kami</p>
          </div>
          <div className="testimonials-grid">
            {testimonials.map((t, i) => (
              <motion.div key={i} className="testimonial-card"
                initial={{ opacity:0, y:20 }} whileInView={{ opacity:1, y:0 }}
                viewport={{ once:true }} transition={{ delay: i*0.1 }}>
                <div className="testimonial-avatar"><img src={t.avatar} alt={t.name}/></div>
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

      {/* ══════════════════════════════════════════════
          CTA
         ══════════════════════════════════════════════ */}
      <section className="cta-section">
        <div className="container">
          <div className="cta-icon">❤️</div>
          <h2>Bersama Kita Bisa Membantu Lebih Banyak</h2>
          <p>Setiap donasi Anda, sekecil apapun, memberikan dampak besar bagi mereka yang membutuhkan</p>
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
