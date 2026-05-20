import ActivityCard from '../components/cards/ActivityCard';

function ActivitiesPage() {
  const activities = [
    { title: 'Banjir Bandang Jakarta', date: '20 Mei 2026', location: 'Jakarta Timur', volunteers: 45, status: 'aktif' },
    { title: 'Gempa Cianjur', date: '15 Mei 2026', location: 'Cianjur', volunteers: 120, status: 'berlangsung' },
    { title: 'Penggalangan Dana', date: '10 Mei 2026', location: 'Online', volunteers: 89, status: 'selesai' },
    { title: 'Bantuan Pangan', date: '5 Mei 2026', location: 'Bogor', volunteers: 30, status: 'aktif' }
  ];

  return (
    <div className="activities-page">
      <div className="page-header">
        <h1>Kegiatan Aksi Kemanusiaan 🤝</h1>
        <p>Bergabunglah dalam kegiatan kemanusiaan terdekat</p>
      </div>
      <div className="container">
        <div className="cards-grid">
          {activities.map((activity, index) => (
            <ActivityCard key={index} {...activity} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default ActivitiesPage;