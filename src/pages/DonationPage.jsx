import { useState } from 'react';
import { motion } from 'framer-motion';

function DonationPage() {
  const [amount, setAmount] = useState('');
  const [name, setName] = useState('');

  const handleDonation = (e) => {
    e.preventDefault();
    alert(`Terima kasih ${name || 'Anonim'} atas donasi Rp ${amount}! 🙏`);
    setAmount('');
    setName('');
  };

  const donationImages = [
    'https://images.unsplash.com/photo-1532629345422-7515f3d16bb6?w=300',
    'https://images.unsplash.com/photo-1593113598332-cd288d649433?w=300',
    'https://images.unsplash.com/photo-1544735716-392fe2489ffa?w=300'
  ];

  return (
    <div className="donation-page">
      <div className="page-header" style={{ position: 'relative', overflow: 'hidden' }}>
        <img src="https://images.unsplash.com/photo-1532629345422-7515f3d16bb6?w=1200" alt="Donation background" style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', objectFit: 'cover', opacity: 0.2, zIndex: 0 }} />
        <div style={{ position: 'relative', zIndex: 1 }}><h1>Donasi untuk Kemanusiaan 💝</h1><p>Setiap donasi Anda sangat berarti bagi mereka yang membutuhkan</p></div>
      </div>
      <div className="donation-stats">
        <motion.div className="stat-card" initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}><h3>Rp 150.000.000</h3><p>Terkumpul</p></motion.div>
        <motion.div className="stat-card" initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }}><h3>75%</h3><p>Target Tercapai</p></motion.div>
        <motion.div className="stat-card" initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.2 }}><h3>500+</h3><p>Donatur</p></motion.div>
      </div>
      <div className="donation-form-container">
        <h2>Form Donasi</h2>
        <form onSubmit={handleDonation} className="donation-form">
          <input type="text" placeholder="Nama lengkap (opsional)" value={name} onChange={(e) => setName(e.target.value)} />
          <input type="number" placeholder="Nominal donasi (Rp)" value={amount} onChange={(e) => setAmount(e.target.value)} required />
          <select><option>Untuk program: Bencana Alam</option><option>Untuk program: Pendidikan</option><option>Untuk program: Kesehatan</option><option>Untuk program: Bantuan Pangan</option></select>
          <button type="submit" className="btn-donate">Donasi Sekarang</button>
        </form>
        <p className="secure-text">🔒 Transaksi aman dan terpercaya</p>
      </div>
      <div className="gallery-grid" style={{ maxWidth: '800px', margin: '2rem auto', padding: '0 1rem' }}>
        {donationImages.map((img, index) => (
          <motion.div key={index} className="gallery-item" initial={{ opacity: 0, scale: 0.9 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ delay: index * 0.1 }} onClick={() => window.open(img, '_blank')}>
            <img src={img} alt={`Donasi ${index + 1}`} /><div className="gallery-overlay"><span>📸 Aksi Donasi</span></div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

export default DonationPage;