function Footer() {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-section">
          <h3>Tentang Kami</h3>
          <p>Platform penghubung relawan aksi kemanusiaan di seluruh Indonesia.</p>
        </div>
        
        <div className="footer-section">
          <h3>Link Cepat</h3>
          <a href="/about">Tentang</a>
          <a href="/volunteers">Relawan</a>
          <a href="/activities">Kegiatan</a>
          <a href="/contact">Kontak</a>
        </div>
        
        <div className="footer-section">
          <h3>Kontak</h3>
          <p>📞 +62 812 3456 7890</p>
          <p>✉️ info@relawanaksi.com</p>
          <p>📍 Jakarta, Indonesia</p>
        </div>
        
        <div className="footer-section">
          <h3>Ikuti Kami</h3>
          <div className="social-icons">
            <a href="#">📘</a>
            <a href="#">📷</a>
            <a href="#">🐦</a>
            <a href="#">▶️</a>
          </div>
        </div>
      </div>
      <div className="footer-bottom">
        <p>&copy; 2026 RelawanAksi. All rights reserved.</p>
      </div>
    </footer>
  );
}

export default Footer;