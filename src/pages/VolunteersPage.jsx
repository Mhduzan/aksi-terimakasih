import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

function VolunteersPage() {
  const [selectedVolunteer, setSelectedVolunteer] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Data Relawan Lengkap
  const volunteers = {
    leaders: [
      {
        id: 1,
        name: 'Dr. Ahmad Fauzan',
        position: 'Ketua Umum',
        role: 'leader',
        avatar: '👨‍💼',
        bio: 'Dr. Ahmad Fauzan adalah pendiri dan ketua umum Aksi Terima Kasih. Beliau memiliki pengalaman lebih dari 15 tahun di bidang kemanusiaan dan lingkungan. Lulusan S3 Ilmu Lingkungan dari Universitas Indonesia.',
        achievements: ['Pendiri Yayasan', 'Dosen Tetap', 'Aktivis Lingkungan'],
        email: 'ahmad@aksiterimakasih.org',
        phone: '+62 812 3456 7890',
        joinDate: '2018',
        projects: ['Program Hutan Lestari', 'Bantuan Bencana Nasional', 'Edukasi Lingkungan'],
        quote: '"Setiap aksi kecil membawa perubahan besar untuk Bumi"'
      },
      {
        id: 2,
        name: 'Siti Nurhaliza',
        position: 'Wakil Ketua',
        role: 'leader',
        avatar: '👩‍💼',
        bio: 'Siti Nurhaliza adalah wakil ketua yang fokus pada program pemberdayaan masyarakat. Beliau telah membantu lebih dari 10.000 keluarga melalui berbagai program sosial.',
        achievements: ['Kader Pemberdayaan', 'Tenaga Ahli Sosial', 'Penulis Buku'],
        email: 'siti@aksiterimakasih.org',
        phone: '+62 813 4567 8901',
        joinDate: '2019',
        projects: ['Pemberdayaan Perempuan', 'Pendidikan Anak', 'Kampanye Kesehatan'],
        quote: '"Bersama kita wujudkan mimpi untuk sesama"'
      }
    ],
    treasurers: [
      {
        id: 3,
        name: 'Budi Santoso',
        position: 'Bendahara',
        role: 'treasurer',
        avatar: '💰',
        bio: 'Budi Santoso adalah bendahara yang mengelola keuangan organisasi dengan transparan dan profesional. Berpengalaman di bidang keuangan selama 10 tahun.',
        achievements: ['Akuntan Publik', 'Manajer Keuangan', 'Auditor'],
        email: 'budi@aksiterimakasih.org',
        phone: '+62 814 5678 9012',
        joinDate: '2020',
        projects: ['Manajemen Donasi', 'Laporan Keuangan', 'Audit Tahunan'],
        quote: '"Transparansi adalah kunci kepercayaan donatur"'
      },
      {
        id: 4,
        name: 'Dewi Lestari',
        position: 'Sekretaris',
        role: 'secretary',
        avatar: '📝',
        bio: 'Dewi Lestari adalah sekretaris yang mengatur administrasi dan dokumentasi organisasi. Sangat teliti dan terorganisir dalam setiap tugas.',
        achievements: ['Administrator Profesional', 'Dokumenter', 'Koordinator Acara'],
        email: 'dewi@aksiterimakasih.org',
        phone: '+62 815 6789 0123',
        joinDate: '2021',
        projects: ['Arsip Digital', 'Notulen Rapat', 'Dokumentasi Kegiatan'],
        quote: '"Dokumentasi yang baik adalah sejarah yang berharga"'
      }
    ],
    creative: [
      {
        id: 5,
        name: 'Rina Melati',
        position: 'Koordinator Kreatif',
        role: 'creative',
        avatar: '🎨',
        bio: 'Rina Melati memimpin tim kreatif dalam mendesain konten dan kampanye visual. Karyanya telah menjangkau jutaan orang di media sosial.',
        achievements: ['Desainer Grafis', 'Content Creator', 'Videografer'],
        email: 'rina@aksiterimakasih.org',
        phone: '+62 816 7890 1234',
        joinDate: '2021',
        projects: ['Kampanye Visual', 'Media Sosial', 'Branding Organisasi'],
        quote: '"Kreativitas adalah jembatan antara pesan dan hati"'
      },
      {
        id: 6,
        name: 'Andi Wijaya',
        position: 'Fotografer',
        role: 'creative',
        avatar: '📸',
        bio: 'Andi Wijaya adalah fotografer yang mendokumentasikan setiap aksi kemanusiaan. Hasil fotonya telah dipublikasikan di berbagai media nasional.',
        achievements: ['Fotografer Profesional', 'Jurnalis Foto', 'Editor'],
        email: 'andi@aksiterimakasih.org',
        phone: '+62 817 8901 2345',
        joinDate: '2022',
        projects: ['Dokumentasi Bencana', 'Galeri Aksi', 'Pameran Foto'],
        quote: '"Setiap foto adalah cerita yang tak terucapkan"'
      },
      {
        id: 7,
        name: 'Maya Sari',
        position: 'Desainer Grafis',
        role: 'creative',
        avatar: '✏️',
        bio: 'Maya Sari adalah desainer grafis yang membuat materi edukasi dan kampanye visual yang menarik dan mudah dipahami.',
        achievements: ['UI/UX Designer', 'Ilustrator', 'Animator'],
        email: 'maya@aksiterimakasih.org',
        phone: '+62 818 9012 3456',
        joinDate: '2022',
        projects: ['Poster Kampanye', 'Infografis', 'Materi Edukasi'],
        quote: '"Desain yang baik menginspirasi aksi nyata"'
      }
    ],
    members: [
      {
        id: 8,
        name: 'Rizki Ramadhan',
        position: 'Relawan Aktif',
        role: 'member',
        avatar: '👨‍🌾',
        bio: 'Rizki adalah relawan aktif yang selalu menjadi garda terdepan dalam setiap aksi. Telah mengikuti lebih dari 30 kegiatan kemanusiaan.',
        achievements: ['Relawan Terbaik 2024', 'Koordinator Lapangan', 'P3K Bersertifikat'],
        email: 'rizki@aksiterimakasih.org',
        phone: '+62 819 0123 4567',
        joinDate: '2023',
        projects: ['Evakuasi Banjir', 'Pembagian Sembako', 'Pengungsian'],
        quote: '"Setiap nyawa yang terselamatkan adalah kebahagiaan"'
      },
      {
        id: 9,
        name: 'Lina Susanti',
        position: 'Relawan Medis',
        role: 'member',
        avatar: '👩‍⚕️',
        bio: 'Lina adalah tenaga medis yang membantu layanan kesehatan gratis di daerah terdampak bencana.',
        achievements: ['Perawat Sukarela', 'Konselor Kesehatan', 'Pemberdayaan Masyarakat'],
        email: 'lina@aksiterimakasih.org',
        phone: '+62 820 1234 5678',
        joinDate: '2023',
        projects: ['Klinik Keliling', 'Cek Kesehatan Gratis', 'Edukasi Kesehatan'],
        quote: '"Kesehatan adalah hak setiap manusia"'
      },
      {
        id: 10,
        name: 'Dimas Prasetyo',
        position: 'Relawan Logistik',
        role: 'member',
        avatar: '📦',
        bio: 'Dimas mengatur distribusi bantuan logistik ke lokasi-lokasi yang membutuhkan dengan efisien dan tepat sasaran.',
        achievements: ['Manajer Logistik', 'Koordinator Distribusi', 'Pengelola Gudang'],
        email: 'dimas@aksiterimakasih.org',
        phone: '+62 821 2345 6789',
        joinDate: '2023',
        projects: ['Distribusi Bantuan', 'Manajemen Gudang', 'Koordinasi Relawan'],
        quote: '"Logistik yang baik menyelamatkan banyak nyawa"'
      },
      {
        id: 11,
        name: 'Nadia Putri',
        position: 'Relawan Pendidikan',
        role: 'member',
        avatar: '📚',
        bio: 'Nadia mengajar anak-anak di daerah pengungsian dan daerah terpencil agar tetap mendapatkan pendidikan.',
        achievements: ['Guru Sukarela', 'Pendamping Belajar', 'Pengajar TK'],
        email: 'nadia@aksiterimakasih.org',
        phone: '+62 822 3456 7890',
        joinDate: '2024',
        projects: ['Sekolah Darurat', 'Bimbingan Belajar', 'Donasi Buku'],
        quote: '"Pendidikan adalah harapan masa depan"'
      },
      {
        id: 12,
        name: 'Eko Prasetyo',
        position: 'Relawan Lingkungan',
        role: 'member',
        avatar: '🌱',
        bio: 'Eko fokus pada kegiatan penanaman pohon dan pembersihan lingkungan di area terdampak.',
        achievements: ['Aktivis Lingkungan', 'Penanam Pohon', 'Pengelola Sampah'],
        email: 'eko@aksiterimakasih.org',
        phone: '+62 823 4567 8901',
        joinDate: '2024',
        projects: ['Penanaman 1000 Pohon', 'Bank Sampah', 'Edukasi Lingkungan'],
        quote: '"Lingkungan bersih, hidup sehat"'
      }
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

  // Modal Component
  const VolunteerModal = () => {
    if (!selectedVolunteer) return null;

    return (
      <AnimatePresence>
        {isModalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="modal-overlay"
            onClick={closeModal}
            style={{
              position: 'fixed',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              background: 'rgba(0, 0, 0, 0.7)',
              backdropFilter: 'blur(8px)',
              zIndex: 2000,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer'
            }}
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0, y: 50 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.8, opacity: 0, y: 50 }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
              className="modal-content"
              onClick={(e) => e.stopPropagation()}
              style={{
                background: 'rgba(255, 255, 255, 0.95)',
                backdropFilter: 'blur(20px)',
                borderRadius: '32px',
                width: '90%',
                maxWidth: '500px',
                maxHeight: '80vh',
                overflow: 'hidden',
                boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
                cursor: 'default'
              }}
            >
              {/* Modal Header */}
              <div style={{
                background: 'linear-gradient(135deg, #0a4c5c, #1a6b7a)',
                padding: '2rem',
                textAlign: 'center',
                color: 'white'
              }}>
                <div style={{
                  fontSize: '4rem',
                  marginBottom: '0.5rem'
                }}>
                  {selectedVolunteer.avatar}
                </div>
                <h2 style={{
                  fontSize: '1.8rem',
                  marginBottom: '0.25rem',
                  fontWeight: 700
                }}>
                  {selectedVolunteer.name}
                </h2>
                <p style={{
                  fontSize: '1rem',
                  opacity: 0.9,
                  fontWeight: 500
                }}>
                  {selectedVolunteer.position}
                </p>
              </div>

              {/* Modal Body - Scrollable */}
              <div style={{
                padding: '1.5rem',
                maxHeight: 'calc(80vh - 180px)',
                overflowY: 'auto'
              }}>
                {/* Quote */}
                <div style={{
                  background: 'rgba(10, 76, 92, 0.1)',
                  padding: '1rem',
                  borderRadius: '16px',
                  marginBottom: '1.5rem',
                  fontStyle: 'italic',
                  color: '#0a4c5c',
                  textAlign: 'center'
                }}>
                  "{selectedVolunteer.quote}"
                </div>

                {/* Bio */}
                <div style={{ marginBottom: '1.5rem' }}>
                  <h3 style={{
                    fontSize: '1.1rem',
                    fontWeight: 700,
                    marginBottom: '0.75rem',
                    color: '#0a4c5c'
                  }}>
                    📖 Tentang Saya
                  </h3>
                  <p style={{
                    lineHeight: 1.6,
                    color: '#2d3748'
                  }}>
                    {selectedVolunteer.bio}
                  </p>
                </div>

                {/* Kontak */}
                <div style={{ marginBottom: '1.5rem' }}>
                  <h3 style={{
                    fontSize: '1.1rem',
                    fontWeight: 700,
                    marginBottom: '0.75rem',
                    color: '#0a4c5c'
                  }}>
                    📞 Kontak
                  </h3>
                  <p style={{ marginBottom: '0.25rem' }}>✉️ {selectedVolunteer.email}</p>
                  <p>📱 {selectedVolunteer.phone}</p>
                </div>

                {/* Prestasi */}
                <div style={{ marginBottom: '1.5rem' }}>
                  <h3 style={{
                    fontSize: '1.1rem',
                    fontWeight: 700,
                    marginBottom: '0.75rem',
                    color: '#0a4c5c'
                  }}>
                    🏆 Prestasi
                  </h3>
                  <ul style={{ paddingLeft: '1.5rem' }}>
                    {selectedVolunteer.achievements.map((achievement, idx) => (
                      <li key={idx} style={{ marginBottom: '0.25rem' }}>{achievement}</li>
                    ))}
                  </ul>
                </div>

                {/* Proyek yang Dikerjakan */}
                <div style={{ marginBottom: '1rem' }}>
                  <h3 style={{
                    fontSize: '1.1rem',
                    fontWeight: 700,
                    marginBottom: '0.75rem',
                    color: '#0a4c5c'
                  }}>
                    🌟 Proyek
                  </h3>
                  <ul style={{ paddingLeft: '1.5rem' }}>
                    {selectedVolunteer.projects.map((project, idx) => (
                      <li key={idx} style={{ marginBottom: '0.25rem' }}>{project}</li>
                    ))}
                  </ul>
                </div>

                {/* Join Date */}
                <div style={{
                  marginTop: '1rem',
                  paddingTop: '1rem',
                  borderTop: '1px solid #e2e8f0',
                  textAlign: 'center',
                  color: '#718096',
                  fontSize: '0.85rem'
                }}>
                  Bergabung sejak {selectedVolunteer.joinDate}
                </div>
              </div>

              {/* Modal Footer */}
              <div style={{
                padding: '1rem 1.5rem',
                borderTop: '1px solid #e2e8f0',
                display: 'flex',
                justifyContent: 'flex-end'
              }}>
                <button
                  onClick={closeModal}
                  style={{
                    background: 'linear-gradient(135deg, #0a4c5c, #1a6b7a)',
                    color: 'white',
                    border: 'none',
                    padding: '0.6rem 1.5rem',
                    borderRadius: '30px',
                    cursor: 'pointer',
                    fontWeight: 600,
                    transition: 'all 0.3s'
                  }}
                  onMouseEnter={(e) => e.target.style.transform = 'scale(1.02)'}
                  onMouseLeave={(e) => e.target.style.transform = 'scale(1)'}
                >
                  Tutup
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    );
  };

  return (
    <div className="volunteers-page">
      <div className="page-header">
        <h1>🌟 Struktur Relawan 🌟</h1>
        <p>Bertemu dengan para pahlawan di balik setiap aksi kemanusiaan</p>
      </div>

      <div className="container" style={{ padding: '2rem 4rem' }}>
        {/* Ketua & Wakil */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="section-title">👑 Kepemimpinan</h2>
          <div className="cards-grid">
            {volunteers.leaders.map((volunteer) => (
              <motion.div
                key={volunteer.id}
                className="volunteer-card"
                whileHover={{ y: -8 }}
                onClick={() => openModal(volunteer)}
              >
                <div className="volunteer-avatar">
                  <div className="avatar-placeholder">{volunteer.avatar}</div>
                </div>
                <h3>{volunteer.name}</h3>
                <p className="volunteer-role">{volunteer.position}</p>
                <p className="volunteer-location">⭐ {volunteer.achievements[0]}</p>
                <button className="btn-view">Klik untuk Detail Bio ➜</button>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Bendahara & Sekretaris */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          style={{ marginTop: '3rem' }}
        >
          <h2 className="section-title">📋 Manajemen</h2>
          <div className="cards-grid">
            {volunteers.treasurers.map((volunteer) => (
              <motion.div
                key={volunteer.id}
                className="volunteer-card"
                whileHover={{ y: -8 }}
                onClick={() => openModal(volunteer)}
              >
                <div className="volunteer-avatar">
                  <div className="avatar-placeholder">{volunteer.avatar}</div>
                </div>
                <h3>{volunteer.name}</h3>
                <p className="volunteer-role">{volunteer.position}</p>
                <p className="volunteer-location">📊 {volunteer.achievements[0]}</p>
                <button className="btn-view">Klik untuk Detail Bio ➜</button>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Tim Kreatif */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          style={{ marginTop: '3rem' }}
        >
          <h2 className="section-title">🎨 Tim Kreatif</h2>
          <div className="cards-grid">
            {volunteers.creative.map((volunteer) => (
              <motion.div
                key={volunteer.id}
                className="volunteer-card"
                whileHover={{ y: -8 }}
                onClick={() => openModal(volunteer)}
              >
                <div className="volunteer-avatar">
                  <div className="avatar-placeholder">{volunteer.avatar}</div>
                </div>
                <h3>{volunteer.name}</h3>
                <p className="volunteer-role">{volunteer.position}</p>
                <p className="volunteer-location">🎯 {volunteer.achievements[0]}</p>
                <button className="btn-view">Klik untuk Detail Bio ➜</button>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Anggota Aktif */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          style={{ marginTop: '3rem' }}
        >
          <h2 className="section-title">🤝 Anggota Aktif</h2>
          <div className="cards-grid">
            {volunteers.members.map((volunteer) => (
              <motion.div
                key={volunteer.id}
                className="volunteer-card"
                whileHover={{ y: -8 }}
                onClick={() => openModal(volunteer)}
              >
                <div className="volunteer-avatar">
                  <div className="avatar-placeholder">{volunteer.avatar}</div>
                </div>
                <h3>{volunteer.name}</h3>
                <p className="volunteer-role">{volunteer.position}</p>
                <p className="volunteer-location">💚 {volunteer.achievements[0]}</p>
                <button className="btn-view">Klik untuk Detail Bio ➜</button>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Modal Popup */}
      <VolunteerModal />
    </div>
  );
}

export default VolunteersPage;