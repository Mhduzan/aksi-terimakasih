import { useState } from 'react';

function DonationPage() {
  const [amount, setAmount] = useState('');
  const [name, setName] = useState('');

  const handleDonation = (e) => {
    e.preventDefault();
    alert(`Terima kasih ${name || 'Anonim'} atas donasi Rp ${amount}! 🙏`);
    setAmount('');
    setName('');
  };

  return (
    <div className="donation-page">
      <div className="page-header">
        <h1>Donasi untuk Kemanusiaan 💝</h1>
        <p>Setiap donasi Anda sangat berarti bagi mereka yang membutuhkan</p>
      </div>

      <div className="container">
        <div className="donation-stats">
          <div className="stat-card">
            <h3>Rp 150.000.000</h3>
            <p>Terkumpul</p>
          </div>
          <div className="stat-card">
            <h3>75%</h3>
            <p>Target Tercapai</p>
          </div>
          <div className="stat-card">
            <h3>500+</h3>
            <p>Donatur</p>
          </div>
        </div>

        <div className="donation-form-container">
          <h2>Form Donasi</h2>
          <form onSubmit={handleDonation} className="donation-form">
            <input
              type="text"
              placeholder="Nama lengkap (opsional)"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <input
              type="number"
              placeholder="Nominal donasi (Rp)"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              required
            />
            <select>
              <option>Untuk program: Bencana Alam</option>
              <option>Untuk program: Pendidikan</option>
              <option>Untuk program: Kesehatan</option>
              <option>Untuk program: Bantuan Pangan</option>
            </select>
            <button type="submit" className="btn-donate">Donasi Sekarang</button>
          </form>
          <p className="secure-text">🔒 Transaksi aman dan terpercaya</p>
        </div>
      </div>
    </div>
  );
}

export default DonationPage;