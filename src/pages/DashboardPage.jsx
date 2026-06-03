import { useState } from 'react';
import { motion } from 'framer-motion';
import { useAuth } from '../context/AuthContext';
import AdminSidebar from '../components/auth/AdminSidebar';

export default function DashboardPage() {
  const { user, isAdmin } = useAuth();

  const stats = [
    { label:'Total Donasi',     value:'Rp 150jt', sub:'+12% bulan ini',  icon:'💰', color:'#C0392B' },
    { label:'Paket Sembako',    value:'3.200',    sub:'paket dibagikan',  icon:'🛒', color:'#1A5276' },
    { label:'Relawan Aktif',    value:'120',      sub:'orang terdaftar',  icon:'👥', color:'#1E8449' },
    { label:'Penerima Manfaat', value:'8.500',    sub:'jiwa terbantu',    icon:'❤️', color:'#7D3C98' },
  ];

  const recentTx = [
    { date:'30 Mei 2026', desc:'Donasi Sembako Kateman',    jenis:'masuk',  nominal:2500000  },
    { date:'29 Mei 2026', desc:'Pembelian Beras 50kg',      jenis:'keluar', nominal:650000   },
    { date:'28 Mei 2026', desc:'Donasi Rutin Anggota',      jenis:'masuk',  nominal:1000000  },
    { date:'27 Mei 2026', desc:'Ongkos Kirim Logistik',     jenis:'keluar', nominal:350000   },
    { date:'26 Mei 2026', desc:'Donasi Online Platform',    jenis:'masuk',  nominal:5000000  },
  ];

  const fmt = n => 'Rp ' + Number(n).toLocaleString('id-ID');

  return (
    <div style={{ display:'flex', minHeight:'100vh', background:'#f5f5f5', fontFamily:'Poppins,sans-serif' }}>
      <AdminSidebar />

      <main style={{ flex:1, padding:'32px 28px', overflowY:'auto' }}>
        {/* Header */}
        <motion.div initial={{opacity:0,y:-16}} animate={{opacity:1,y:0}} style={{ marginBottom:28 }}>
          <h1 style={{ fontSize:'1.5rem', fontWeight:900, color:'#1a1a1a', marginBottom:4 }}>
            Selamat datang, {user?.name?.split(' ')[0]} 👋
          </h1>
          <p style={{ fontSize:13, color:'#aaa' }}>
            {isAdmin ? 'Dashboard Admin — akses penuh semua fitur' : 'Dashboard Anggota — kelola data komunitas'}
          </p>
        </motion.div>

        {/* Stats cards */}
        <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fit,minmax(200px,1fr))', gap:14, marginBottom:28 }}>
          {stats.map((s,i)=>(
            <motion.div key={i} initial={{opacity:0,y:20}} animate={{opacity:1,y:0}} transition={{delay:i*0.08}}
              style={{
                background:'#fff', borderRadius:18, padding:'20px 18px',
                border:'1.5px solid #f0f0f0', cursor:'default',
                boxShadow:'0 2px 12px rgba(0,0,0,0.04)',
              }}>
              <div style={{ fontSize:28, marginBottom:10 }}>{s.icon}</div>
              <div style={{ fontSize:'1.4rem', fontWeight:900, color:s.color, lineHeight:1 }}>{s.value}</div>
              <div style={{ fontSize:12, fontWeight:600, color:'#1a1a1a', marginTop:6 }}>{s.label}</div>
              <div style={{ fontSize:11, color:'#aaa', marginTop:3 }}>{s.sub}</div>
            </motion.div>
          ))}
        </div>

        {/* Recent Transactions */}
        <motion.div initial={{opacity:0,y:20}} animate={{opacity:1,y:0}} transition={{delay:0.35}}
          style={{ background:'#fff', borderRadius:18, border:'1.5px solid #f0f0f0', overflow:'hidden' }}>
          <div style={{
            padding:'18px 20px', borderBottom:'1px solid #f0f0f0',
            display:'flex', justifyContent:'space-between', alignItems:'center',
          }}>
            <div>
              <div style={{ fontWeight:800, fontSize:15, color:'#1a1a1a' }}>Transaksi Terbaru</div>
              <div style={{ fontSize:11, color:'#aaa', marginTop:2 }}>5 transaksi terakhir</div>
            </div>
            <a href="/transaksi" style={{
              fontSize:12, fontWeight:600, color:'#C0392B', textDecoration:'none',
              background:'rgba(192,57,43,0.08)', padding:'6px 14px', borderRadius:20,
            }}>Lihat Semua →</a>
          </div>

          {recentTx.map((tx,i)=>(
            <div key={i} style={{
              display:'flex', alignItems:'center', gap:14, padding:'14px 20px',
              borderBottom: i < recentTx.length-1 ? '1px solid #f8f8f8' : 'none',
            }}>
              <div style={{
                width:38, height:38, borderRadius:12, flexShrink:0,
                background: tx.jenis==='masuk' ? 'rgba(30,132,73,0.12)' : 'rgba(192,57,43,0.1)',
                display:'flex', alignItems:'center', justifyContent:'center', fontSize:16,
              }}>
                {tx.jenis==='masuk' ? '⬇️' : '⬆️'}
              </div>
              <div style={{ flex:1 }}>
                <div style={{ fontSize:13, fontWeight:600, color:'#1a1a1a' }}>{tx.desc}</div>
                <div style={{ fontSize:11, color:'#aaa' }}>{tx.date}</div>
              </div>
              <div style={{
                fontSize:13, fontWeight:700,
                color: tx.jenis==='masuk' ? '#1E8449' : '#C0392B',
              }}>
                {tx.jenis==='masuk' ? '+' : '-'}{fmt(tx.nominal)}
              </div>
            </div>
          ))}
        </motion.div>

        {/* Quick actions */}
        <motion.div initial={{opacity:0,y:20}} animate={{opacity:1,y:0}} transition={{delay:0.45}}
          style={{ marginTop:20, display:'grid', gridTemplateColumns:'repeat(auto-fit,minmax(160px,1fr))', gap:12 }}>
          {[
            { label:'Input Transaksi', icon:'➕', href:'/transaksi/input', color:'#C0392B' },
            { label:'Lihat Laporan',   icon:'📊', href:'/laporan',         color:'#1A5276' },
            { label:'Data Donatur',    icon:'👤', href:'/donatur',         color:'#1E8449' },
            ...(isAdmin ? [{ label:'Kelola Anggota', icon:'⚙️', href:'/admin/anggota', color:'#7D3C98' }] : []),
          ].map((a,i)=>(
            <a key={i} href={a.href} style={{
              display:'flex', alignItems:'center', gap:10, textDecoration:'none',
              background:'#fff', border:'1.5px solid #f0f0f0', borderRadius:14,
              padding:'14px 16px', transition:'all .2s', cursor:'pointer',
            }}
              onMouseEnter={e=>{e.currentTarget.style.borderColor=a.color; e.currentTarget.style.background=a.color+'08';}}
              onMouseLeave={e=>{e.currentTarget.style.borderColor='#f0f0f0'; e.currentTarget.style.background='#fff';}}>
              <span style={{ fontSize:22 }}>{a.icon}</span>
              <span style={{ fontSize:13, fontWeight:600, color:'#1a1a1a' }}>{a.label}</span>
            </a>
          ))}
        </motion.div>
      </main>
    </div>
  );
}
