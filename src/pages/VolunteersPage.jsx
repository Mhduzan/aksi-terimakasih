import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

function VolunteersPage() {
  const [selectedVolunteer, setSelectedVolunteer] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const volunteers = {
    leaders: [
      { id: 1, name: 'Dr. Ahmad Fauzan', position: 'Ketua Umum', role: 'leader', avatar: 'https://randomuser.me/api/portraits/men/10.jpg', bio: 'Dr. Ahmad Fauzan adalah pendiri dan ketua umum Aksi Terima Kasih. Beliau memiliki pengalaman lebih dari 15 tahun di bidang kemanusiaan dan lingkungan.', achievements: ['Pendiri Yayasan', 'Dosen Tetap', 'Aktivis Lingkungan'], email: 'ahmad@aksiterimakasih.org', phone: '+62 812 3456 7890', joinDate: '2018', projects: ['Program Hutan Lestari', 'Bantuan Bencana Nasional'], quote: '"Setiap aksi kecil membawa perubahan besar untuk Bumi"' },
      { id: 2, name: 'Siti Nurhaliza', position: 'Wakil Ketua', role: 'leader', avatar: 'https://randomuser.me/api/portraits/women/10.jpg', bio: 'Siti Nurhaliza adalah wakil ketua yang fokus pada program pemberdayaan masyarakat.', achievements: ['Kader Pemberdayaan', 'Tenaga Ahli Sosial', 'Penulis Buku'], email: 'siti@aksiterimakasih.org', phone: '+62 813 4567 8901', joinDate: '2019', projects: ['Pemberdayaan Perempuan', 'Pendidikan Anak'], quote: '"Bersama kita wujudkan mimpi untuk sesama"' }
    ],
    treasurers: [
      { id: 3, name: 'Budi Santoso', position: 'Bendahara', role: 'treasurer', avatar: 'https://randomuser.me/api/portraits/men/11.jpg', bio: 'Budi Santoso adalah bendahara yang mengelola keuangan organisasi dengan transparan.', achievements: ['Akuntan Publik', 'Manajer Keuangan'], email: 'budi@aksiterimakasih.org', phone: '+62 814 5678 9012', joinDate: '2020', projects: ['Manajemen Donasi', 'Laporan Keuangan'], quote: '"Transparansi adalah kunci kepercayaan donatur"' },
      { id: 4, name: 'Dewi Lestari', position: 'Sekretaris', role: 'secretary', avatar: 'https://randomuser.me/api/portraits/women/11.jpg', bio: 'Dewi Lestari adalah sekretaris yang mengatur administrasi dan dokumentasi organisasi.', achievements: ['Administrator Profesional', 'Dokumenter'], email: 'dewi@aksiterimakasih.org', phone: '+62 815 6789 0123', joinDate: '2021', projects: ['Arsip Digital', 'Notulen Rapat'], quote: '"Dokumentasi yang baik adalah sejarah yang berharga"' }
    ],
    creative: [
      { id: 5, name: 'Rina Melati', position: 'Koordinator Kreatif', role: 'creative', avatar: 'https://randomuser.me/api/portraits/women/12.jpg', bio: 'Rina Melati memimpin tim kreatif dalam mendesain konten dan kampanye visual.', achievements: ['Desainer Grafis', 'Content Creator'], email: 'rina@aksiterimakasih.org', phone: '+62 816 7890 1234', joinDate: '2021', projects: ['Kampanye Visual', 'Media Sosial'], quote: '"Kreativitas adalah jembatan antara pesan dan hati"' },
      { id: 6, name: 'Andi Wijaya', position: 'Fotografer', role: 'creative', avatar: 'https://randomuser.me/api/portraits/men/12.jpg', bio: 'Andi Wijaya adalah fotografer yang mendokumentasikan setiap aksi kemanusiaan.', achievements: ['Fotografer Profesional', 'Jurnalis Foto'], email: 'andi@aksiterimakasih.org', phone: '+62 817 8901 2345', joinDate: '2022', projects: ['Dokumentasi Bencana', 'Galeri Aksi'], quote: '"Setiap foto adalah cerita yang tak terucapkan"' },
      { id: 7, name: 'Maya Sari', position: 'Desainer Grafis', role: 'creative', avatar: 'https://randomuser.me/api/portraits/women/13.jpg', bio: 'Maya Sari adalah desainer grafis yang membuat materi edukasi dan kampanye visual.', achievements: ['UI/UX Designer', 'Ilustrator'], email: 'maya@aksiterimakasih.org', phone: '+62 818 9012 3456', joinDate: '2022', projects: ['Poster Kampanye', 'Infografis'], quote: '"Desain yang baik menginspirasi aksi nyata"' }
    ],
    members: [
      { id: 8, name: 'Rizki Ramadhan', position: 'Relawan Aktif', role: 'member', avatar: 'https://randomuser.me/api/portraits/men/13.jpg', bio: 'Rizki adalah relawan aktif yang selalu menjadi garda terdepan dalam setiap aksi.', achievements: ['Relawan Terbaik 2024', 'Koordinator Lapangan'], email: 'rizki@aksiterimakasih.org', phone: '+62 819 0123 4567', joinDate: '2023', projects: ['Evakuasi Banjir', 'Pembagian Sembako'], quote: '"Setiap nyawa yang terselamatkan adalah kebahagiaan"' },
      { id: 9, name: 'Lina Susanti', position: 'Relawan Medis', role: 'member', avatar: 'https://randomuser.me/api/portraits/women/14.jpg', bio: 'Lina adalah tenaga medis yang membantu layanan kesehatan gratis.', achievements: ['Perawat Sukarela', 'Konselor Kesehatan'], email: 'lina@aksiterimakasih.org', phone: '+62 820 1234 5678', joinDate: '2023', projects: ['Klinik Keliling', 'Cek Kesehatan Gratis'], quote: '"Kesehatan adalah hak setiap manusia"' },
      { id: 10, name: 'Dimas Prasetyo', position: 'Relawan Logistik', role: 'member', avatar: 'https://randomuser.me/api/portraits/men/14.jpg', bio: 'Dimas mengatur distribusi bantuan logistik ke lokasi-lokasi yang membutuhkan.', achievements: ['Manajer Logistik', 'Koordinator Distribusi'], email: 'dimas@aksiterimakasih.org', phone: '+62 821 2345 6789', joinDate: '2023', projects: ['Distribusi Bantuan', 'Manajemen Gudang'], quote: '"Logistik yang baik menyelamatkan banyak nyawa"' }
    ]
  };

  const openModal = (volunteer) => {
    setSelectedVolunteer(volunteer);
    setIsModalOpen(true);
    document.body.style.overflow = 'hidden';
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedVolunteer(null);
    document.body.style.overflow = 'auto';
  };

  const VolunteerModal = () => {
    if (!selectedVolunteer) return null;
    return (
      <AnimatePresence>
        {isModalOpen && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="modal-overlay" onClick={closeModal} style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(0,0,0,0.7)', backdropFilter: 'blur(8px)', zIndex: 2000, display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}>
            <motion.div initial={{ scale: 0.8, opacity: 0, y: 50 }} animate={{ scale: 1, opacity: 1, y: 0 }} exit={{ scale: 0.8, opacity: 0, y: 50 }} transition={{ type: 'spring', damping: 25, stiffness: 300 }} className="modal-content" onClick={(e) => e.stopPropagation()} style={{ background: 'rgba(255,255,255,0.95)', backdropFilter: 'blur(20px)', borderRadius: '32px', width: '90%', maxWidth: '500px', maxHeight: '80vh', overflow: 'hidden', boxShadow: '0 25px 50px -12px rgba(0,0,0,0.25)', cursor: 'default' }}>
              <div style={{ background: 'linear-gradient(135deg, #0a4c5c, #1a6b7a)', padding: '2rem', textAlign: 'center', color: 'white' }}>
                <img src={selectedVolunteer.avatar} alt={selectedVolunteer.name} style={{ width: '80px', height: '80px', borderRadius: '50%', margin: '0 auto', display: 'block', border: '3px solid white' }} />
                <h2 style={{ fontSize: '1.8rem', marginBottom: '0.25rem', fontWeight: 700 }}>{selectedVolunteer.name}</h2>
                <p style={{ fontSize: '1rem', opacity: 0.9, fontWeight: 500 }}>{selectedVolunteer.position}</p>
              </div>
              <div style={{ padding: '1.5rem', maxHeight: 'calc(80vh - 180px)', overflowY: 'auto' }}>
                <div style={{ background: 'rgba(10,76,92,0.1)', padding: '1rem', borderRadius: '16px', marginBottom: '1.5rem', fontStyle: 'italic', color: '#0a4c5c', textAlign: 'center' }}>"{selectedVolunteer.quote}"</div>
                <div style={{ marginBottom: '1.5rem' }}><h3 style={{ fontSize: '1.1rem', fontWeight: 700, marginBottom: '0.75rem', color: '#0a4c5c' }}>📖 Tentang Saya</h3><p>{selectedVolunteer.bio}</p></div>
                <div style={{ marginBottom: '1.5rem' }}><h3 style={{ fontSize: '1.1rem', fontWeight: 700, marginBottom: '0.75rem', color: '#0a4c5c' }}>📞 Kontak</h3><p>✉️ {selectedVolunteer.email}</p><p>📱 {selectedVolunteer.phone}</p></div>
                <div style={{ marginBottom: '1.5rem' }}><h3 style={{ fontSize: '1.1rem', fontWeight: 700, marginBottom: '0.75rem', color: '#0a4c5c' }}>🏆 Prestasi</h3><ul>{selectedVolunteer.achievements.map((a, idx) => (<li key={idx}>{a}</li>))}</ul></div>
                <div style={{ marginTop: '1rem', paddingTop: '1rem', borderTop: '1px solid #e2e8f0', textAlign: 'center', color: '#718096', fontSize: '0.85rem' }}>Bergabung sejak {selectedVolunteer.joinDate}</div>
              </div>
              <div style={{ padding: '1rem 1.5rem', borderTop: '1px solid #e2e8f0', display: 'flex', justifyContent: 'flex-end' }}>
                <button onClick={closeModal} style={{ background: 'linear-gradient(135deg, #0a4c5c, #1a6b7a)', color: 'white', border: 'none', padding: '0.6rem 1.5rem', borderRadius: '30px', cursor: 'pointer', fontWeight: 600 }}>Tutup</button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    );
  };

  return (
    <div className="volunteers-page">
      {/* PAGE HEADER - TAMBAH LOGO */}
  <div className="page-header">
  <img 
    src="/images/logobulat.jpg" 
    alt="Logo Aksi Terima Kasih" 
    style={{ 
      width: '80px', 
      height: '80px',
      borderRadius: '50%',
      objectFit: 'cover',
      marginBottom: '1rem',
      display: 'inline-block',
      boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
      border: '2px solid rgba(255,255,255,0.3)'
    }} 
  />
  <h1>🌟 Struktur Relawan 🌟</h1>
  <p>Bertemu dengan para pahlawan di balik setiap aksi kemanusiaan</p>
</div>
      <div className="cards-grid" style={{ maxWidth: '1400px', margin: '0 auto', padding: '2rem 1rem' }}>
        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
          <h2 className="section-title">👑 Kepemimpinan</h2>
          <div className="cards-grid">
            {volunteers.leaders.map((volunteer) => (
              <motion.div key={volunteer.id} className="volunteer-card" whileHover={{ y: -8 }} onClick={() => openModal(volunteer)}>
                <div className="volunteer-avatar"><img src={volunteer.avatar} alt={volunteer.name} style={{ width: '80px', height: '80px', borderRadius: '50%', objectFit: 'cover', margin: '0 auto', display: 'block' }} /></div>
                <h3>{volunteer.name}</h3><p className="volunteer-role">{volunteer.position}</p><p className="volunteer-location">⭐ {volunteer.achievements[0]}</p>
                <button className="btn-view">Klik untuk Detail Bio ➜</button>
              </motion.div>
            ))}
          </div>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }} style={{ marginTop: '3rem' }}>
          <h2 className="section-title">📋 Manajemen</h2>
          <div className="cards-grid">
            {volunteers.treasurers.map((volunteer) => (
              <motion.div key={volunteer.id} className="volunteer-card" whileHover={{ y: -8 }} onClick={() => openModal(volunteer)}>
                <div className="volunteer-avatar"><img src={volunteer.avatar} alt={volunteer.name} style={{ width: '80px', height: '80px', borderRadius: '50%', objectFit: 'cover', margin: '0 auto', display: 'block' }} /></div>
                <h3>{volunteer.name}</h3><p className="volunteer-role">{volunteer.position}</p><p className="volunteer-location">📊 {volunteer.achievements[0]}</p>
                <button className="btn-view">Klik untuk Detail Bio ➜</button>
              </motion.div>
            ))}
          </div>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.2 }} style={{ marginTop: '3rem' }}>
          <h2 className="section-title">🎨 Tim Kreatif</h2>
          <div className="cards-grid">
            {volunteers.creative.map((volunteer) => (
              <motion.div key={volunteer.id} className="volunteer-card" whileHover={{ y: -8 }} onClick={() => openModal(volunteer)}>
                <div className="volunteer-avatar"><img src={volunteer.avatar} alt={volunteer.name} style={{ width: '80px', height: '80px', borderRadius: '50%', objectFit: 'cover', margin: '0 auto', display: 'block' }} /></div>
                <h3>{volunteer.name}</h3><p className="volunteer-role">{volunteer.position}</p><p className="volunteer-location">🎯 {volunteer.achievements[0]}</p>
                <button className="btn-view">Klik untuk Detail Bio ➜</button>
              </motion.div>
            ))}
          </div>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.3 }} style={{ marginTop: '3rem' }}>
          <h2 className="section-title">🤝 Anggota Aktif</h2>
          <div className="cards-grid">
            {volunteers.members.map((volunteer) => (
              <motion.div key={volunteer.id} className="volunteer-card" whileHover={{ y: -8 }} onClick={() => openModal(volunteer)}>
                <div className="volunteer-avatar"><img src={volunteer.avatar} alt={volunteer.name} style={{ width: '80px', height: '80px', borderRadius: '50%', objectFit: 'cover', margin: '0 auto', display: 'block' }} /></div>
                <h3>{volunteer.name}</h3><p className="volunteer-role">{volunteer.position}</p><p className="volunteer-location">💚 {volunteer.achievements[0]}</p>
                <button className="btn-view">Klik untuk Detail Bio ➜</button>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
      <VolunteerModal />
    </div>
  );
}

export default VolunteersPage;