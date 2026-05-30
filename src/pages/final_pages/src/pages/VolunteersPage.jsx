import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import '../styles/pages.css';

import photoTeam    from '../assets/images/photo1.jpg';
import photoSembako from '../assets/images/photo2.jpg';
import photoMotor   from '../assets/images/photo4.jpg';

const WAVE = (
  <div className="page-hero-wave">
    <svg viewBox="0 0 390 40" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none" height="40">
      <path d="M0,10 C80,40 170,0 260,26 C310,44 355,10 390,20 L390,40 L0,40 Z" fill="#fafafa"/>
    </svg>
  </div>
);

function VolunteersPage() {
  const [selected, setSelected] = useState(null);

  const groups = [
    {
      label: '👑 Kepemimpinan', color: '#C0392B',
      members: [
        { id:1, name:'Dr. Ahmad Fauzan', position:'Ketua Umum', avatar:'https://randomuser.me/api/portraits/men/10.jpg', achievements:['Pendiri Yayasan','Dosen Tetap','Aktivis Sosial'], email:'ahmad@aksiterimakasih.org', phone:'+62 812 3456 7890', joinDate:'2018', bio:'Pendiri dan ketua umum Aksi Terima Kasih dengan pengalaman lebih dari 15 tahun di bidang kemanusiaan.', quote:'Setiap aksi kecil membawa perubahan besar untuk sesama.' },
        { id:2, name:'Siti Nurhaliza', position:'Wakil Ketua', avatar:'https://randomuser.me/api/portraits/women/10.jpg', achievements:['Kader Pemberdayaan','Tenaga Ahli Sosial','Penulis'], email:'siti@aksiterimakasih.org', phone:'+62 813 4567 8901', joinDate:'2019', bio:'Wakil ketua yang fokus pada program pemberdayaan masyarakat dan pendidikan anak.', quote:'Bersama kita wujudkan mimpi untuk sesama.' },
      ]
    },
    {
      label: '📋 Manajemen', color: '#1A5276',
      members: [
        { id:3, name:'Budi Santoso', position:'Bendahara', avatar:'https://randomuser.me/api/portraits/men/11.jpg', achievements:['Akuntan Publik','Manajer Keuangan'], email:'budi@aksiterimakasih.org', phone:'+62 814 5678 9012', joinDate:'2020', bio:'Bendahara yang mengelola keuangan organisasi dengan transparan dan akuntabel.', quote:'Transparansi adalah kunci kepercayaan donatur.' },
        { id:4, name:'Dewi Lestari', position:'Sekretaris', avatar:'https://randomuser.me/api/portraits/women/11.jpg', achievements:['Administrator Profesional','Dokumenter'], email:'dewi@aksiterimakasih.org', phone:'+62 815 6789 0123', joinDate:'2021', bio:'Sekretaris yang mengatur administrasi dan dokumentasi seluruh kegiatan organisasi.', quote:'Dokumentasi yang baik adalah sejarah yang berharga.' },
      ]
    },
    {
      label: '🎨 Tim Kreatif', color: '#7D3C98',
      members: [
        { id:5, name:'Rina Melati', position:'Koordinator Kreatif', avatar:'https://randomuser.me/api/portraits/women/12.jpg', achievements:['Desainer Grafis','Content Creator'], email:'rina@aksiterimakasih.org', phone:'+62 816 7890 1234', joinDate:'2021', bio:'Memimpin tim kreatif dalam mendesain konten dan kampanye visual yang berdampak.', quote:'Kreativitas adalah jembatan antara pesan dan hati.' },
        { id:6, name:'Andi Wijaya', position:'Fotografer', avatar:'https://randomuser.me/api/portraits/men/12.jpg', achievements:['Fotografer Profesional','Jurnalis Foto'], email:'andi@aksiterimakasih.org', phone:'+62 817 8901 2345', joinDate:'2022', bio:'Fotografer yang mendokumentasikan setiap aksi kemanusiaan di lapangan.', quote:'Setiap foto adalah cerita yang tak terucapkan.' },
        { id:7, name:'Maya Sari', position:'Desainer Grafis', avatar:'https://randomuser.me/api/portraits/women/13.jpg', achievements:['UI/UX Designer','Ilustrator'], email:'maya@aksiterimakasih.org', phone:'+62 818 9012 3456', joinDate:'2022', bio:'Desainer grafis yang membuat materi edukasi dan poster kampanye sosial.', quote:'Desain yang baik menginspirasi aksi nyata.' },
      ]
    },
    {
      label: '🤝 Relawan Lapangan', color: '#1E8449',
      members: [
        { id:8, name:'Rizki Ramadhan', position:'Relawan Aktif', avatar:'https://randomuser.me/api/portraits/men/13.jpg', achievements:['Relawan Terbaik 2024','Koordinator Lapangan'], email:'rizki@aksiterimakasih.org', phone:'+62 819 0123 4567', joinDate:'2023', bio:'Relawan garda terdepan dalam setiap aksi distribusi sembako dan bantuan bencana.', quote:'Setiap nyawa yang terselamatkan adalah kebahagiaan.' },
        { id:9, name:'Lina Susanti', position:'Relawan Medis', avatar:'https://randomuser.me/api/portraits/women/14.jpg', achievements:['Perawat Sukarela','Konselor Kesehatan'], email:'lina@aksiterimakasih.org', phone:'+62 820 1234 5678', joinDate:'2023', bio:'Tenaga medis yang membantu layanan kesehatan gratis di wilayah terpencil.', quote:'Kesehatan adalah hak setiap manusia.' },
        { id:10, name:'Dimas Prasetyo', position:'Relawan Logistik', avatar:'https://randomuser.me/api/portraits/men/14.jpg', achievements:['Koordinator Distribusi','Manajer Logistik'], email:'dimas@aksiterimakasih.org', phone:'+62 821 2345 6789', joinDate:'2023', bio:'Mengatur distribusi paket sembako dan logistik ke daerah-daerah yang sulit dijangkau.', quote:'Logistik yang baik menyelamatkan banyak nyawa.' },
      ]
    },
  ];

  return (
    <div style={{ background:'#fafafa', minHeight:'100vh', fontFamily:'Poppins,sans-serif' }}>

      {/* HERO */}
      <div className="page-hero">
        <div className="page-hero-bg" />
        <img src={photoTeam} alt="" className="page-hero-img" />
        <div className="page-hero-dots" />
        <div className="page-hero-orb" />
        <div className="page-hero-content">
          <div className="page-hero-tag">
            <span className="page-hero-tag-dot" />
            <span>Tim Gerakan Peduli</span>
          </div>
          <h1>Struktur Relawan</h1>
          <p>Para pahlawan di balik setiap aksi kemanusiaan Aksi Terima Kasih</p>
        </div>
        {WAVE}
      </div>

      {/* STATS */}
      <div className="pg-section pg-section--gray">
        <div className="pg-container">
          <div className="pg-stats">
            {[['120+','Relawan Aktif'],['4','Divisi'],['2018','Tahun Berdiri']].map(([n,l])=>(
              <div key={l} className="pg-stat">
                <span className="pg-stat-num">{n}</span>
                <span className="pg-stat-lbl">{l}</span>
              </div>
            ))}
          </div>

          {/* Groups */}
          {groups.map((g, gi) => (
            <motion.div key={gi} initial={{opacity:0,y:20}} whileInView={{opacity:1,y:0}} viewport={{once:true}} transition={{delay:gi*0.08}} style={{marginBottom:32}}>
              <div style={{display:'flex',alignItems:'center',gap:8,marginBottom:14}}>
                <span style={{fontSize:14,fontWeight:800,color:'#1a1a1a'}}>{g.label}</span>
                <span style={{fontSize:10,background:g.color+'18',color:g.color,padding:'2px 10px',borderRadius:20,fontWeight:700}}>{g.members.length} anggota</span>
              </div>
              <div className="pg-person-grid">
                {g.members.map((v,i)=>(
                  <motion.div key={v.id} className="pg-person-card"
                    initial={{opacity:0,y:14}} whileInView={{opacity:1,y:0}} viewport={{once:true}} transition={{delay:i*0.07}}
                    onClick={()=>setSelected(v)}>
                    <img src={v.avatar} alt={v.name} className="pg-person-avatar" style={{borderColor:g.color+'30'}}/>
                    <div className="pg-person-name">{v.name}</div>
                    <div className="pg-person-role" style={{color:g.color}}>{v.position}</div>
                    <div className="pg-person-ach">{v.achievements[0]}</div>
                    <button className="pg-person-btn" style={{color:g.color,background:g.color+'12'}}>Lihat Profil →</button>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* FOTO AKSI RELAWAN */}
      <div className="pg-section">
        <div className="pg-container">
          <div className="pg-section-label">Aksi Lapangan</div>
          <div className="pg-section-title">Relawan di Lapangan</div>
          <div className="pg-section-sub">Dokumentasi nyata aksi tim relawan</div>
          <div style={{display:'grid',gridTemplateColumns:'repeat(2,1fr)',gap:12}}>
            {[photoSembako, photoMotor, photoTeam, photoSembako].map((img,i)=>(
              <motion.div key={i} style={{borderRadius:16,overflow:'hidden',height:140}}
                initial={{opacity:0,scale:0.95}} whileInView={{opacity:1,scale:1}} viewport={{once:true}} transition={{delay:i*0.08}}
                whileHover={{scale:1.02}}>
                <img src={img} alt="" style={{width:'100%',height:'100%',objectFit:'cover',display:'block'}}/>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* MODAL */}
      <AnimatePresence>
        {selected && (
          <motion.div className="pg-modal-overlay" initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}}
            onClick={()=>setSelected(null)}>
            <motion.div className="pg-modal" initial={{scale:0.85,y:40,opacity:0}} animate={{scale:1,y:0,opacity:1}}
              exit={{scale:0.85,y:40,opacity:0}} transition={{type:'spring',stiffness:280,damping:22}}
              onClick={e=>e.stopPropagation()}>
              <div className="pg-modal-header">
                <img src={selected.avatar} alt={selected.name} className="pg-modal-avatar"/>
                <div className="pg-modal-name">{selected.name}</div>
                <div className="pg-modal-pos">{selected.position} · Bergabung {selected.joinDate}</div>
              </div>
              <div className="pg-modal-body">
                <div className="pg-modal-quote">"{selected.quote}"</div>
                <div className="pg-modal-section"><h4>📖 Tentang</h4><p>{selected.bio}</p></div>
                <div className="pg-modal-section"><h4>🏆 Keahlian</h4><ul>{selected.achievements.map((a,i)=><li key={i}>{a}</li>)}</ul></div>
                <div className="pg-modal-section"><h4>📞 Kontak</h4><p>✉️ {selected.email}</p><p>📱 {selected.phone}</p></div>
              </div>
              <div className="pg-modal-footer">
                <button className="pg-modal-close" onClick={()=>setSelected(null)}>Tutup</button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default VolunteersPage;
