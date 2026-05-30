import { useState } from 'react';
import { motion } from 'framer-motion';
import '../styles/pages.css';

import photoSembako from '../assets/images/photo2.jpg';
import photoFamily  from '../assets/images/photo5.jpg';
import photoKunjung from '../assets/images/photo6.jpg';

const WAVE = (
  <div className="page-hero-wave">
    <svg viewBox="0 0 390 40" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none" height="40">
      <path d="M0,10 C80,40 170,0 260,26 C310,44 355,10 390,20 L390,40 L0,40 Z" fill="#fff"/>
    </svg>
  </div>
);

function DonationPage() {
  const [name, setName]       = useState('');
  const [amount, setAmount]   = useState('');
  const [program, setProgram] = useState('Paket Sembako');
  const [quickAmt, setQuickAmt] = useState('');

  const quickAmounts = ['25.000','50.000','100.000','200.000','500.000','1.000.000'];

  const handleQuick = (v) => {
    setQuickAmt(v);
    setAmount(v.replace('.','').replace('.',''));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(`🙏 Terima kasih ${name||'Anonim'} atas donasi Rp ${amount} untuk ${program}!\n\nSemoga menjadi amal yang berkah.`);
    setName(''); setAmount(''); setQuickAmt('');
  };

  const programs = [
    { name:'Paket Sembako',    icon:'🛒', target:50000000,  collected:38000000 },
    { name:'Donor Darah',      icon:'🩸', target:20000000,  collected:18500000 },
    { name:'Kunjungan Rumah',  icon:'🏠', target:30000000,  collected:14000000 },
  ];

  const fmt = (n) => 'Rp '+ Number(n).toLocaleString('id-ID');

  return (
    <div style={{background:'#fff',minHeight:'100vh',fontFamily:'Poppins,sans-serif'}}>

      {/* HERO */}
      <div className="page-hero">
        <div className="page-hero-bg" />
        <img src={photoSembako} alt="" className="page-hero-img"/>
        <div className="page-hero-dots"/><div className="page-hero-orb"/>
        <div className="page-hero-content">
          <div className="page-hero-tag"><span className="page-hero-tag-dot"/><span>Bantu Sesama</span></div>
          <h1>Donasi Sekarang</h1>
          <p>Setiap rupiah yang Anda berikan sampai langsung ke tangan yang membutuhkan</p>
        </div>
        {WAVE}
      </div>

      <div className="pg-section">
        <div className="pg-container">

          {/* Stats */}
          <div className="pg-stats">
            {[['Rp 150jt','Terkumpul'],['500+','Donatur'],['75%','Target']].map(([n,l])=>(
              <div key={l} className="pg-stat">
                <span className="pg-stat-num">{n}</span>
                <span className="pg-stat-lbl">{l}</span>
              </div>
            ))}
          </div>

          {/* Program progress */}
          <div className="pg-section-label">Program Berjalan</div>
          <div className="pg-section-title" style={{marginBottom:16}}>Pilih Program Donasi</div>

          {programs.map((p,i)=>{
            const pct = Math.round((p.collected/p.target)*100);
            return (
              <motion.div key={i} className="pg-card" style={{padding:0,marginBottom:12,cursor:'pointer'}}
                initial={{opacity:0,y:14}} whileInView={{opacity:1,y:0}} viewport={{once:true}} transition={{delay:i*0.08}}
                onClick={()=>setProgram(p.name)}>
                <div style={{padding:'14px 16px'}}>
                  <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:10}}>
                    <div style={{display:'flex',alignItems:'center',gap:10}}>
                      <span style={{fontSize:22}}>{p.icon}</span>
                      <div>
                        <div style={{fontWeight:700,fontSize:13,color:'#1a1a1a'}}>{p.name}</div>
                        <div style={{fontSize:10,color:'#aaa'}}>Target: {fmt(p.target)}</div>
                      </div>
                    </div>
                    <div style={{
                      background: program===p.name ? '#C0392B' : '#f5f5f5',
                      color: program===p.name ? '#fff' : '#aaa',
                      borderRadius:20, padding:'4px 12px', fontSize:10, fontWeight:700
                    }}>
                      {program===p.name ? '✓ Dipilih' : 'Pilih'}
                    </div>
                  </div>
                  <div className="pg-progress-wrap" style={{marginBottom:0}}>
                    <div className="pg-progress-info">
                      <span className="pg-progress-label">{fmt(p.collected)} terkumpul</span>
                      <span className="pg-progress-pct">{pct}%</span>
                    </div>
                    <div className="pg-progress-bar">
                      <motion.div className="pg-progress-fill"
                        initial={{width:0}} whileInView={{width:`${pct}%`}} viewport={{once:true}}
                        transition={{duration:1,delay:0.3}}/>
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}

          {/* Form donasi */}
          <div style={{marginTop:28}}>
            <div className="pg-section-label">Form Donasi</div>
            <div className="pg-section-title" style={{marginBottom:4}}>Isi Data Donasi</div>
            <div className="pg-section-sub">Program: <strong>{program}</strong></div>

            {/* Quick amounts */}
            <div style={{marginBottom:14}}>
              <div style={{fontSize:12,fontWeight:600,color:'#555',marginBottom:8}}>Pilih nominal:</div>
              <div className="pg-amounts">
                {quickAmounts.map(v=>(
                  <button key={v} className={`pg-amount-btn${quickAmt===v?' active':''}`}
                    onClick={()=>handleQuick(v)}>
                    Rp {v}
                  </button>
                ))}
              </div>
            </div>

            <form onSubmit={handleSubmit} className="pg-form">
              <input className="pg-input" type="text" placeholder="Nama Anda (opsional)"
                value={name} onChange={e=>setName(e.target.value)}/>
              <input className="pg-input" type="number" placeholder="Atau masukkan nominal lain (Rp)"
                value={amount} onChange={e=>setAmount(e.target.value)} required/>
              <select className="pg-select" value={program} onChange={e=>setProgram(e.target.value)}>
                {programs.map(p=><option key={p.name}>{p.name}</option>)}
              </select>
              <button type="submit" className="pg-btn-submit">❤️ Donasi Sekarang</button>
            </form>
            <p style={{textAlign:'center',fontSize:11,color:'#aaa',marginTop:10}}>
              🔒 Transaksi aman & amanah · Dana langsung ke penerima
            </p>
          </div>

          {/* Foto penerima */}
          <div style={{marginTop:32}}>
            <div className="pg-section-label">Dampak Nyata</div>
            <div className="pg-section-title" style={{marginBottom:12}}>Mereka yang Merasakan</div>
            <div style={{display:'grid',gridTemplateColumns:'repeat(2,1fr)',gap:10}}>
              {[photoFamily,photoKunjung].map((img,i)=>(
                <motion.div key={i} style={{borderRadius:16,overflow:'hidden',height:160}}
                  initial={{opacity:0,scale:0.94}} whileInView={{opacity:1,scale:1}} viewport={{once:true}} transition={{delay:i*0.1}}>
                  <img src={img} alt="" style={{width:'100%',height:'100%',objectFit:'cover'}}/>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DonationPage;
