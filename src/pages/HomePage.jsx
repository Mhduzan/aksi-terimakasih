import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import './HomePage.css';
import heroBg from '../assets/images/terimakasihbacgroun.jpg';
import sosialisasi from '../assets/images/sosialisasi.jpg';
import sosialisasi2 from '../assets/images/sosialisasi2.jpg';
// import donorDarahImage from '../assets/images/donor-darah.jpg'; // ← TAMBAHKAN INI

function HomePage() {
  const [activeProduct, setActiveProduct] = useState(0);
  const [circleColor, setCircleColor] = useState('#E74C3C');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // Handle scroll effect
  useState(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

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
    // Program Pendidikan (opsional, bisa di-uncomment jika ingin ditampilkan)
    // {
    //   id: 1,
    //   title: 'Program Pendidikan',
    //   subtitle: 'Beasiswa & Bimbingan Belajar',
    //   description: 'Memberikan beasiswa pendidikan dan bimbingan belajar gratis untuk anak-anak pra-sejahtera agar mereka bisa meraih cita-cita.',
    //   buttonText: 'Dukung Program',
    //   image: heroBg,
    //   thumb: heroBg,
    //   color: '#27AE60',
    //   icon: '📚'
    // },
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
      description: 'Program donor darah rutin yang bekerja sama dengan PT Pulau Sambu dan Sambu Group. Setiap tetes darah sangat berharga untuk menyelamatkan nyawa sesama. Ayo donor darah!',
      buttonText: 'Daftar Donor',
      image: sosialisasi,
      thumb: sosialisasi,
       color: '#27AE60',
      icon: '🩸'
    }
  ];

  const activities = [
    {
      title: 'Berbagi Takjil Ramadan',
      date: 'Maret 2026',
      location: 'Jakarta & Sekitarnya',
      beneficiaries: 5000,
      image: 'https://images.unsplash.com/photo-1582510003544-4d00b7f74220?w=400'
    },
    {
      title: 'Operasi Katarak Gratis',
      date: 'Februari 2026',
      location: 'Bandung, Jawa Barat',
      beneficiaries: 150,
      image: 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=400'
    },
    {
      title: 'Banjir Bandang Cianjur',
      date: 'Januari 2026',
      location: 'Cianjur, Jawa Barat',
      beneficiaries: 2500,
      image: 'https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=400'
    },
    {
      title: 'Penanaman 10.000 Pohon',
      date: 'Desember 2025',
      location: 'Bogor, Jawa Barat',
      beneficiaries: '10.000 pohon',
      image: 'https://images.unsplash.com/photo-1542273917363-3b1817f69a2d?w=400'
    }
  ];

  const testimonials = [
    {
      name: 'Siti Rahmawati',
      role: 'Penerima Beasiswa',
      text: 'Terima kasih Yayasan Peduli, saya bisa melanjutkan kuliah berkat beasiswa yang diberikan.',
      avatar: 'https://randomuser.me/api/portraits/women/1.jpg'
    },
    {
      name: 'Bambang Susilo',
      role: 'Relawan',
      text: 'Bergabung sebagai relawan adalah keputusan terbaik saya. Banyak pengalaman berharga.',
      avatar: 'https://randomuser.me/api/portraits/men/1.jpg'
    },
    {
      name: 'Nurul Hikmah',
      role: 'Penerima Bantuan',
      text: 'Bantuan yang diberikan sangat tepat sasaran dan membantu keluarga saya.',
      avatar: 'https://randomuser.me/api/portraits/women/2.jpg'
    }
  ];

  const imgSlider = (index, color) => {
    setActiveProduct(index);
    setCircleColor(color);
  };

  return (
    <div className="homepage">
      {/* NAVBAR - STARBUCKS STYLE */}
      <header className={`starbucks-header ${scrolled ? 'scrolled' : ''}`}>
        <div className="header-container">
          <a href="/" className="header-logo">
            <img src="/images/logoterbaru.jpg" alt="Logo Aksi Terima Kasih" />
            <span className="logo-text">Aksi<span>Terima Kasih</span></span>
          </a>
          
          <ul className={`header-nav ${isMenuOpen ? 'active' : ''}`}>
            <li><a href="/">Home</a></li>
            <li><a href="/volunteers">Relawan</a></li>
            <li><a href="/activities">Kampanye</a></li>
            <li><a href="/donation">Donasi</a></li>
            <li><a href="/emergency">Bantuan</a></li>
            <li><a href="/login" className="nav-login">Masuk</a></li>
            <li><a href="/register" className="nav-register">Daftar</a></li>
          </ul>
          
          <button 
            className={`menu-toggle-btn ${isMenuOpen ? 'active' : ''}`}
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <span></span>
            <span></span>
            <span></span>
          </button>
        </div>
      </header>

      {/* HERO SECTION - STARBUCKS STYLE */}
      <section className="hero-starbucks">
        <div className="circle-bg" style={{ background: circleColor }}></div>
        
        <div className="hero-container">
          <div className="hero-text">
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

        {/* Thumbnails */}
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

        {/* Social Media Icons */}
        <ul className="social-icons">
          <li><a href="#"><img src="https://raw.githubusercontent.com/farazc60/Project-Images/main/starbucks/facebook.png" alt="Facebook" /></a></li>
          <li><a href="#"><img src="https://raw.githubusercontent.com/farazc60/Project-Images/main/starbucks/instagram.png" alt="Instagram" /></a></li>
          <li><a href="#"><img src="https://raw.githubusercontent.com/farazc60/Project-Images/main/starbucks/twitter.png" alt="Twitter" /></a></li>
        </ul>
      </section>

      {/* Program Unggulan Section */}
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

      {/* Kegiatan Terbaru Section */}
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

      {/* Testimoni Section */}
      <section className="testimonials-section">
        <div className="container">
          <div className="section-header">
            <span className="section-tag">Testimoni</span>
            <h2>Kata Mereka Tentang Kami</h2>
            <p>Cerita nyata dari penerima manfaat dan relawan kami</p>
          </div>

          <div className="testimonials-grid">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={index}
                className="testimonial-card"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <div className="testimonial-avatar">
                  <img src={testimonial.avatar} alt={testimonial.name} />
                </div>
                <div className="testimonial-content">
                  <p className="testimonial-text">"{testimonial.text}"</p>
                  <h4>{testimonial.name}</h4>
                  <span>{testimonial.role}</span>
                  <div className="testimonial-stars">★★★★★</div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Donasi Section */}
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