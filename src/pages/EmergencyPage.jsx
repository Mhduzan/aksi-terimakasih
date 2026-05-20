function EmergencyPage() {
  return (
    <div className="emergency-page">
      <div className="emergency-header">
        <h1>🚨 BANTUAN DARURAT 🚨</h1>
        <p>Hubungi nomor berikut untuk bantuan segera</p>
      </div>

      <div className="emergency-numbers">
        <div className="emergency-card">
          <div className="emergency-icon">📞</div>
          <h3>Call Center</h3>
          <p className="emergency-phone">119</p>
          <p>24 Jam Siaga</p>
        </div>

        <div className="emergency-card">
          <div className="emergency-icon">🚑</div>
          <h3>Ambulans</h3>
          <p className="emergency-phone">118</p>
          <p>Gawat Darurat Medis</p>
        </div>

        <div className="emergency-card">
          <div className="emergency-icon">🔥</div>
          <h3>Pemadam Kebakaran</h3>
          <p className="emergency-phone">113</p>
          <p>Kebakaran & Bencana</p>
        </div>

        <div className="emergency-card">
          <div className="emergency-icon">👮</div>
          <h3>Polisi</h3>
          <p className="emergency-phone">110</p>
          <p>Keamanan & Ketertiban</p>
        </div>
      </div>

      <div className="emergency-tips">
        <h2>Tips Saat Darurat</h2>
        <ul>
          <li>✓ Tetap tenang dan jangan panik</li>
          <li>✓ Hubungi nomor darurat terdekat</li>
          <li>✓ Ikuti instruksi dari petugas</li>
          <li>✓ Evakuasi ke tempat yang aman</li>
          <li>✓ Bantu orang lain jika memungkinkan</li>
        </ul>
      </div>

      <div className="emergency-contact">
        <h3>Butuh bantuan relawan?</h3>
        <button className="btn-emergency">Hubungi Koordinator Relawan</button>
      </div>
    </div>
  );
}

export default EmergencyPage;