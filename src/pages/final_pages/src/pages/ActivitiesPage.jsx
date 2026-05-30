import { useState } from 'react';
import { motion } from 'framer-motion';
import '../styles/pages.css';

import photoTeam    from '../assets/images/photo1.jpg';
import photoSembako from '../assets/images/photo2.jpg';
import photoDonor   from '../assets/images/photo3.jpg';
import photoMotor   from '../assets/images/photo4.jpg';
import photoFamily  from '../assets/images/photo5.jpg';
import photoKunjung from '../assets/images/photo6.jpg';
import photoGPS     from '../assets/images/photo7.jpg';

const WAVE = (
  <div className="page-hero-wave">
    <svg viewBox="0 0 390 40" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none" height="40">
      <path d="M0,10 C80,40 170,0 260,26 C310,44 355,10 390,20 L390,40 L0,40 Z" fill="#fff"/>
    </svg>
  </div>
);

function ActivitiesPage() {
  const [filter, setFilter] = useState('semua');

  const activities = [
    { title:'Pembagian Sembako Kateman', date:'20 Mei 2026', loc:'Kateman, Riau', volunteers:45, status:'aktif', img:photoSembako, desc:'Distribusi 200 paket sembako untuk keluarga kurang mampu di wilayah Kateman.' },
    { title:'Tim Relawan Turun Lapangan', date:'15 Mei 2026', loc:'Sei Guntung', volunteers:120, status:'selesai', img:photoTeam, desc:'Aksi kolektif tim berseragam merah dalam kunjungan dan distribusi bantuan.' },
    { title:'Program Donor Darah', date:'10 Mei 2026', loc:'Batam Center', volunteers:89, status:'selesai', img:photoDonor, desc:'Kegiatan donor darah rutin bersama PT Pulau Sambu, terkumpul 120+ kantong darah.' },
    { title:'Pengiriman Logistik Terpencil', date:'5 Mei 2026', loc:'Wilayah Terpencil', volunteers:30, status:'aktif', img:photoMotor, desc:'Tim relawan mengantarkan bantuan ke daerah yang tidak bisa dijangkau kendaraan roda 4.' },
    { title:'Kunjungan Keluarga Kurang Mampu', date:'28 April 2026', loc:'Kateman, Riau', volunteers:18, status:'selesai', img:photoFamily, desc:'Kunjungan langsung ke rumah-rumah keluarga yang membutuhkan bantuan sembako.' },
    { title:'Serah Terima Bantuan ATK', date:'20 April 2026', loc:'Sei Guntung', volunteers:12, status:'selesai', img:photoKunjung, desc:'Penyerahan paket bantuan bersama logo resmi Aksi Terima Kasih.' },
    { title:'GPS Kateman Bergerak', date:'10 April 2026', loc:'Kateman', volunteers:35, status:'aktif', img:photoGPS, desc:'Tim Gerakan Peduli Sesama Kateman melakukan aksi rutin pembagian sembako.' },
  ];

  const filters = [
    { id:'semua', label:'Semua' },
    { id:'aktif', label:'Aktif' },
    { id:'selesai', label:'Selesai' },
  ];

  const filtered = filter === 'semua' ? activities : activities.filter(a => a.status === filter);
  const statusColor = { aktif:'#1E8449', selesai:'#555', berlangsung:'#1A5276' };
  const statusLabel = { aktif:'Aktif', selesai:'Selesai', berlangsung:'Berlangsung' };

  return (
    <div style={{ background:'#fff', minHeight:'100vh', fontFamily:'Poppins,sans-serif' }}>

      {/* HERO */}
      <div className="page-hero">
        <div className="page-hero-bg" />
        <img src={photoTeam} alt="" className="page-hero-img" />
        <div className="page-hero-dots" />
        <div className="page-hero-orb" />
        <div className="page-hero-content">
          <div className="page-hero-tag">
            <span className="page-hero-tag-dot" />
            <span>Aksi Nyata di Lapangan</span>
          </div>
          <h1>Kegiatan Kami</h1>
          <p>Dokumentasi setiap langkah aksi sosial Gerakan Peduli Sesama</p>
        </div>
        {WAVE}
      </div>

      {/* STATS */}
      <div className="pg-section">
        <div className="pg-container">
          <div className="pg-stats">
            {[['7+','Kegiatan'],['450+','Relawan Terlibat'],['3.200+','Penerima Manfaat']].map(([n,l])=>(
              <div key={l} className="pg-stat">
                <span className="pg-stat-num">{n}</span>
                <span className="pg-stat-lbl">{l}</span>
              </div>
            ))}
          </div>

          {/* Filter pills */}
          <div style={{display:'flex',gap:8,marginBottom:20,flexWrap:'wrap'}}>
            {filters.map(f=>(
              <button key={f.id} onClick={()=>setFilter(f.id)}
                style={{
                  padding:'7px 18px', borderRadius:30, border:'none', cursor:'pointer',
                  fontFamily:'Poppins,sans-serif', fontSize:12, fontWeight:600,
                  background: filter===f.id ? '#C0392B' : '#f5f5f5',
                  color: filter===f.id ? '#fff' : '#555',
                  transition:'all .2s'
                }}>
                {f.label}
              </button>
            ))}
          </div>

          {/* Cards grid */}
          <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fill,minmax(280px,1fr))',gap:14}}>
            {filtered.map((a,i)=>(
              <motion.div key={i} className="pg-card"
                initial={{opacity:0,y:16}} animate={{opacity:1,y:0}} transition={{delay:i*0.07}}>
                <div className="pg-card-img-wrap">
                  <img src={a.img} alt={a.title} className="pg-card-img" style={{height:190}}/>
                  <span className="pg-card-img-badge" style={{background: statusColor[a.status]||'#555'}}>
                    {statusLabel[a.status]||a.status}
                  </span>
                </div>
                <div className="pg-card-body">
                  <div className="pg-card-meta">📅 {a.date} &nbsp;•&nbsp; 📍 {a.loc}</div>
                  <div className="pg-card-title">{a.title}</div>
                  <div className="pg-card-desc">{a.desc}</div>
                  <div className="pg-card-footer">
                    <span className="pg-card-stat">👥 {a.volunteers} relawan</span>
                    <button className="pg-card-btn">Detail →</button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* GALERI FOTO */}
      <div className="pg-section pg-section--gray">
        <div className="pg-container">
          <div className="pg-section-label">Galeri</div>
          <div className="pg-section-title">Foto Kegiatan</div>
          <div className="pg-section-sub">Momen-momen berharga dari setiap aksi</div>
          <div style={{display:'grid',gridTemplateColumns:'repeat(2,1fr)',gap:10}}>
            {[photoGPS,photoFamily,photoKunjung,photoMotor,photoSembako,photoDonor].map((img,i)=>(
              <motion.div key={i} style={{borderRadius:14,overflow:'hidden',
                height: i<2 ? 180 : 130,
                gridColumn: i<2 ? 'span 1' : 'span 1'
              }}
                initial={{opacity:0,scale:0.94}} whileInView={{opacity:1,scale:1}} viewport={{once:true}} transition={{delay:i*0.06}}
                whileHover={{scale:1.02}}>
                <img src={img} alt="" style={{width:'100%',height:'100%',objectFit:'cover',display:'block'}}/>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ActivitiesPage;
