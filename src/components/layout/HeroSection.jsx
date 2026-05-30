function HeroSection() {
  return (
    <div style={{
      position: 'relative',
      width: '100%',
      minHeight: '90vh',
      background: 'linear-gradient(135deg, #E74C3C 0%, #C0392B 100%)',
      display: 'flex',
      alignItems: 'center',
      padding: '120px 5% 80px'
    }}>
      <div style={{
        maxWidth: '1200px',
        margin: '0 auto',
        width: '100%'
      }}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: '4rem',
          alignItems: 'center'
        }}>
          {/* Left Content */}
          <div>
            <div style={{
              display: 'inline-block',
              background: 'rgba(255,255,255,0.15)',
              padding: '0.5rem 1rem',
              borderRadius: '50px',
              marginBottom: '1.5rem'
            }}>
              <span style={{ color: '#fff', fontSize: '0.85rem' }}>❤️ Berbagi Kebahagiaan</span>
            </div>
            <h1 style={{
              fontSize: '3.5rem',
              fontWeight: 700,
              color: '#ffffff',
              marginBottom: '1.5rem',
              lineHeight: 1.2
            }}>
              Wujudkan Senyuman
              <br />
              untuk
              <span style={{ color: '#FFEAA7' }}> Mereka</span>
              <br />
              yang Membutuhkan
            </h1>
            <p style={{
              fontSize: '1.1rem',
              color: 'rgba(255,255,255,0.9)',
              marginBottom: '2rem',
              lineHeight: 1.6
            }}>
              Yayasan Peduli hadir untuk membantu sesama melalui program-program 
              sosial yang berkelanjutan dan berdampak nyata.
            </p>
            <div style={{ display: 'flex', gap: '1rem' }}>
              <button style={{
                padding: '1rem 2rem',
                background: '#ffffff',
                border: 'none',
                borderRadius: '12px',
                fontSize: '0.9rem',
                fontWeight: 600,
                color: '#E74C3C',
                cursor: 'pointer'
              }}>
                Donasi Sekarang
              </button>
              <button style={{
                padding: '1rem 2rem',
                background: 'transparent',
                border: '2px solid rgba(255,255,255,0.3)',
                borderRadius: '12px',
                fontSize: '0.9rem',
                fontWeight: 500,
                color: '#ffffff',
                cursor: 'pointer'
              }}>
                Jadi Relawan
              </button>
            </div>
          </div>

          {/* Right Image/Stats */}
          <div style={{
            background: 'rgba(255,255,255,0.1)',
            backdropFilter: 'blur(10px)',
            borderRadius: '24px',
            padding: '2rem'
          }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
              {[
                { number: '5,000+', label: 'Anak Terbantu', icon: '👧' },
                { number: '500+', label: 'Relawan Aktif', icon: '🤝' },
                { number: '50+', label: 'Program Berjalan', icon: '📋' },
                { number: '10+', label: 'Kota Tersentuh', icon: '🏙️' }
              ].map((item, i) => (
                <div key={i} style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: '1rem',
                  borderBottom: i < 3 ? '1px solid rgba(255,255,255,0.1)' : 'none'
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                    <span style={{ fontSize: '2rem' }}>{item.icon}</span>
                    <span style={{ color: '#fff', fontWeight: 500 }}>{item.label}</span>
                  </div>
                  <span style={{ fontSize: '1.5rem', fontWeight: 700, color: '#FFEAA7' }}>
                    {item.number}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default HeroSection;