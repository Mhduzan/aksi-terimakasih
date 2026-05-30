import { motion } from 'framer-motion';
import '../styles/pages.css';
import photoTeam from '../assets/images/photo1.jpg';

const WAVE = (
  <div className="page-hero-wave">
    <svg viewBox="0 0 390 40" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none" height="40">
      <path d="M0,10 C80,40 170,0 260,26 C310,44 355,10 390,20 L390,40 L0,40 Z" fill="#fff"/>
    </svg>
  </div>
);

function EmergencyPage() {
  const numbers = [
    { icon:'📞', label:'Call Center ATK',  number:'0812-3456-7890', sub:'24 Jam Siaga',       color:'#C0392B' },
    { icon:'🚑', label:'Ambulans',          number:'118',            sub:'Gawat Darurat Medis', color:'#E74C3C' },
    { icon:'🔥', label:'Pemadam Kebakaran', number:'113',            sub:'Kebakaran & Bencana', color:'#E67E22' },
    { icon:'👮', label:'Polisi',            number:'110',            sub:'Keamanan & Ketertiban',color:'#2980B9' },
  ];

  const tips = [
    { icon:'😌', text:'Tetap tenang dan jangan panik agar bisa berpikir jernih.' },
    { icon:'📱', text:'Hubungi nomor darurat terdekat dan sampaikan lokasi dengan jelas.' },
    { icon:'👂', text:'Ikuti instruksi dari petugas dan jangan bertindak sendiri.' },
    { icon:'🏃', text:'Evakuasi ke titik aman yang sudah ditentukan.' },
    { icon:'🤝', text:'Bantu orang lain di sekitar Anda jika kondisi memungkinkan.' },
  ];

  const contacts = [
    { name:'Koordinator Wilayah Kateman', phone:'0812-1111-2222', area:'Kateman, Riau' },
    { name:'Koordinator Sei Guntung',     phone:'0813-3333-4444', area:'Sei Guntung' },
    { name:'Posko Pusat ATK',             phone:'0811-5555-6666', area:'Batam' },
  ];

  return (
    <div style={{background:'#fff',minHeight:'100vh',fontFamily:'Poppins,sans-serif'}}>

      {/* HERO merah lebih gelap untuk emergency */}
      <div className="page-hero" style={{minHeight:220}}>
        <div className="page-hero-bg" style={{background:'linear-gradient(145deg,#641208 0%,#922B21 55%,#C0392B 100%)'}}/>
        <img src={photoTeam} alt="" className="page-hero-img"/>
        <div className="page-hero-dots"/><div className="page-hero-orb"/>
        <div className="page-hero-content">
          <div className="page-hero-tag" style={{background:'rgba(255,255,255,0.18)'}}>
            <span className="page-hero-tag-dot" style={{background:'#ff4444'}}/>
            <span>Bantuan Darurat</span>
          </div>
          <h1>🚨 Hubungi Kami</h1>
          <p>Tim relawan siap bergerak 24 jam untuk membantu Anda</p>
        </div>
        {WAVE}
      </div>

      {/* NOMOR DARURAT */}
      <div className="pg-section">
        <div className="pg-container">
          <div className="pg-section-label">Nomor Penting</div>
          <div className="pg-section-title" style={{marginBottom:16}}>Hubungi Segera</div>

          <div className="pg-emg-grid">
            {numbers.map((n,i)=>(
              <motion.div key={i} className="pg-emg-card"
                initial={{opacity:0,y:14}} whileInView={{opacity:1,y:0}} viewport={{once:true}} transition={{delay:i*0.07}}
                onClick={()=>window.location.href=`tel:${n.number.replace(/\D/g,'')}`}>
                <div className="pg-emg-icon">{n.icon}</div>
                <div className="pg-emg-label">{n.label}</div>
                <div className="pg-emg-number" style={{color:n.color}}>{n.number}</div>
                <div className="pg-emg-sub">{n.sub}</div>
              </motion.div>
            ))}
          </div>

          {/* Kontak relawan ATK */}
          <div style={{marginTop:28}}>
            <div className="pg-section-label">Tim Relawan ATK</div>
            <div className="pg-section-title" style={{marginBottom:14}}>Koordinator Wilayah</div>
            {contacts.map((c,i)=>(
              <motion.div key={i} className="pg-row-card"
                initial={{opacity:0,x:-14}} whileInView={{opacity:1,x:0}} viewport={{once:true}} transition={{delay:i*0.08}}
                onClick={()=>window.location.href=`tel:${c.phone.replace(/\D/g,'')}`}>
                <div style={{width:44,height:44,borderRadius:14,background:'rgba(192,57,43,0.1)',display:'flex',alignItems:'center',justifyContent:'center',fontSize:20,flexShrink:0}}>📍</div>
                <div className="pg-row-info">
                  <div className="pg-row-title">{c.name}</div>
                  <div className="pg-row-sub">{c.area}</div>
                  <span className="pg-row-tag" style={{background:'rgba(192,57,43,0.1)',color:'#C0392B'}}>📞 {c.phone}</span>
                </div>
                <div className="pg-row-right">
                  <div className="pg-row-arrow">→</div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* TIPS DARURAT */}
      <div className="pg-section pg-section--gray">
        <div className="pg-container">
          <div className="pg-section-label">Panduan</div>
          <div className="pg-section-title" style={{marginBottom:14}}>Tips Saat Darurat</div>
          <div className="pg-tips-list">
            {tips.map((t,i)=>(
              <motion.div key={i} className="pg-tip"
                initial={{opacity:0,x:-14}} whileInView={{opacity:1,x:0}} viewport={{once:true}} transition={{delay:i*0.07}}>
                <div className="pg-tip-icon">{t.icon}</div>
                <div className="pg-tip-text">{t.text}</div>
              </motion.div>
            ))}
          </div>

          {/* CTA */}
          <motion.div style={{
            marginTop:28, background:'linear-gradient(135deg,#C0392B,#922B21)',
            borderRadius:20, padding:'24px 20px', textAlign:'center'
          }} initial={{opacity:0,y:16}} whileInView={{opacity:1,y:0}} viewport={{once:true}}>
            <div style={{fontSize:28,marginBottom:8}}>🆘</div>
            <div style={{fontWeight:800,fontSize:16,color:'#fff',marginBottom:6}}>Butuh Bantuan Relawan?</div>
            <div style={{fontSize:12,color:'rgba(255,255,255,0.8)',marginBottom:16}}>Tim kami siap bergerak ke lokasi Anda</div>
            <button style={{
              background:'#fff', color:'#C0392B', border:'none', borderRadius:30,
              padding:'11px 28px', fontFamily:'Poppins,sans-serif', fontSize:13,
              fontWeight:700, cursor:'pointer'
            }}
              onClick={()=>window.location.href='tel:081234567890'}>
              📞 Hubungi Sekarang
            </button>
          </motion.div>
        </div>
      </div>
    </div>
  );
}

export default EmergencyPage;
