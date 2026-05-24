import ActivityCard from '../components/cards/ActivityCard';
import { motion } from 'framer-motion';

function ActivitiesPage() {
  const activities = [
    { title: 'Banjir Bandang Jakarta', date: '20 Mei 2026', location: 'Jakarta Timur', volunteers: 45, status: 'aktif', image: 'https://images.unsplash.com/photo-1582139329536-e7284fece509?w=400' },
    { title: 'Gempa Cianjur', date: '15 Mei 2026', location: 'Cianjur', volunteers: 120, status: 'berlangsung', image: 'https://images.unsplash.com/photo-1591109917562-f9b5c300f484?w=400' },
    { title: 'Penggalangan Dana', date: '10 Mei 2026', location: 'Online', volunteers: 89, status: 'selesai', image: 'https://images.unsplash.com/photo-1532629345422-7515f3d16bb6?w=400' },
    { title: 'Bantuan Pangan', date: '5 Mei 2026', location: 'Bogor', volunteers: 30, status: 'aktif', image: 'https://images.unsplash.com/photo-1593113598332-cd288d649433?w=400' }
  ];

  const galleryImages = [
    'https://images.unsplash.com/photo-1544735716-392fe2489ffa?w=400',
    'https://images.unsplash.com/photo-1593113598332-cd288d649433?w=400',
    'https://images.unsplash.com/photo-1582139329536-e7284fece509?w=400',
    'https://images.unsplash.com/photo-1591109917562-f9b5c300f484?w=400'
  ];

  return (
    <div className="activities-page">
      <div className="page-header" style={{ position: 'relative', overflow: 'hidden' }}>
        <img src="https://images.unsplash.com/photo-1532629345422-7515f3d16bb6?w=1200" alt="Background" style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', objectFit: 'cover', opacity: 0.2, zIndex: 0 }} />
        <div style={{ position: 'relative', zIndex: 1 }}><h1>Kegiatan Aksi Kemanusiaan 🤝</h1><p>Bergabunglah dalam kegiatan kemanusiaan terdekat</p></div>
      </div>
      <div className="cards-grid" style={{ maxWidth: '1400px', margin: '0 auto', padding: '2rem 1.5rem' }}>
        {activities.map((activity, index) => (
          <motion.div key={index} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: index * 0.1 }}>
            <ActivityCard {...activity} />
          </motion.div>
        ))}
      </div>
      <section className="section"><h2 className="section-title">📸 Galeri Kegiatan</h2>
        <div className="gallery-grid">
          {galleryImages.map((img, index) => (
            <motion.div key={index} className="gallery-item" initial={{ opacity: 0, scale: 0.9 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ delay: index * 0.1 }} onClick={() => window.open(img, '_blank')}>
              <img src={img} alt={`Kegiatan ${index + 1}`} /><div className="gallery-overlay"><span>📸 Dokumentasi</span></div>
            </motion.div>
          ))}
        </div>
      </section>
    </div>
  );
}

export default ActivitiesPage;