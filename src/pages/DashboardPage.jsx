import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useAuth } from '../context/AuthContext';
import AdminSidebar from '../components/auth/AdminSidebar';
import { dashboardAPI, transaksiAPI } from '../utils/api';

const fmt = n => 'Rp ' + Number(n || 0).toLocaleString('id-ID');

export default function DashboardPage() {
  const { user, isAdmin } = useAuth();
  const [stats, setStats]     = useState(null);
  const [recentTx, setRecentTx] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError]     = useState('');

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    setLoading(true);
    try {
      const result = await dashboardAPI.stats();
      if (result.success) {
        setStats(result.data);
        setRecentTx(result.data.recent_transaksi || []);
      } else {
        setError(result.message || 'Gagal memuat data.');
      }
    } catch {
      setError('Tidak dapat terhubung ke server.');
    }
    setLoading(false);
  };

  if (loading) return (
    <div style={{ display:'flex', minHeight:'100vh', fontFamily:'Poppins,sans-serif' }}>
      <AdminSidebar />
      <main style={{ flex:1, display:'flex', alignItems:'center', justifyContent:'center' }}>
        <div style={{ textAlign:'center' }}>
          <div style={{ width:40, height:40, border:'3px solid #f0f0f0', borderTop:'3px solid #C0392B', borderRadius:'50%', animation:'spin .8s linear infinite', margin:'0 auto 12px' }}/>
          <p style={{ fontSize:13, color:'#aaa' }}>Memuat dashboard...</p>
          <style>{`@keyframes spin{to{transform:rotate(360deg)}}`}</style>
        </div>
      </main>
    </div>
  );

  if (error) return (
    <div style={{ display:'flex', minHeight:'100vh', fontFamily:'Poppins,sans-serif' }}>
      <AdminSidebar />
      <main style={{ flex:1, display:'flex', alignItems:'center', justifyContent:'center', padding:32 }}>
        <div style={{ textAlign:'center', maxWidth:400 }}>
          <div style={{ fontSize:48, marginBottom:16 }}>⚠️</div>
          <p style={{ fontSize:14, color:'#C0392B', marginBottom:16, fontWeight:600 }}>{error}</p>
          <button onClick={loadData} style={{ padding:'10px 24px', background:'#C0392B', color:'#fff', border:'none', borderRadius:12, fontFamily:'Poppins,sans-serif', fontSize:13, fontWeight:600, cursor:'pointer' }}>
            Coba Lagi
          </button>
        </div>
      </main>
    </div>
  );

  const statCards = [
    { label:'Total Donasi',      value: fmt(stats?.total_masuk),   sub:'+dari semua program', icon:'💰', color:'#C0392B' },
    { label:'Total Pengeluaran', value: fmt(stats?.total_keluar),  sub:'operasional',         icon:'📤', color:'#E67E22' },
    { label:'Saldo Bersih',      value: fmt(stats?.saldo),          sub:'terkini',             icon:'💳', color:'#1A5276' },
    { label:'Total Donatur',     value: stats?.total_donatur || 0,  sub:'donatur terdaftar',   icon:'👥', color:'#1E8449' },
  ];

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
            {isAdmin ? 'Dashboard Admin — akses penuh' : 'Dashboard Anggota'}
          </p>
        </motion.div>

        {/* Stat cards */}
        <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fit,minmax(200px,1fr))', gap:14, marginBottom:28 }}>
          {statCards.map((s,i) => (
            <motion.div key={i} initial={{opacity:0,y:20}} animate={{opacity:1,y:0}} transition={{delay:i*0.08}}
              style={{ background:'#fff', borderRadius:18, padding:'20px 18px', border:'1.5px solid #f0f0f0', boxShadow:'0 2px 12px rgba(0,0,0,0.04)' }}>
              <div style={{ fontSize:28, marginBottom:10 }}>{s.icon}</div>
              <div style={{ fontSize:'1.4rem', fontWeight:900, color:s.color }}>{s.value}</div>
              <div style={{ fontSize:12, fontWeight:600, color:'#1a1a1a', marginTop:6 }}>{s.label}</div>
              <div style={{ fontSize:11, color:'#aaa', marginTop:3 }}>{s.sub}</div>
            </motion.div>
          ))}
        </div>

        {/* Transaksi terbaru */}
        <motion.div initial={{opacity:0,y:20}} animate={{opacity:1,y:0}} transition={{delay:0.35}}
          style={{ background:'#fff', borderRadius:18, border:'1.5px solid #f0f0f0', overflow:'hidden' }}>
          <div style={{ padding:'18px 20px', borderBottom:'1px solid #f0f0f0', display:'flex', justifyContent:'space-between', alignItems:'center' }}>
            <div>
              <div style={{ fontWeight:800, fontSize:15, color:'#1a1a1a' }}>Transaksi Terbaru</div>
              <div style={{ fontSize:11, color:'#aaa', marginTop:2 }}>5 transaksi terakhir dari server</div>
            </div>
            <a href="/transaksi" style={{ fontSize:12, fontWeight:600, color:'#C0392B', textDecoration:'none', background:'rgba(192,57,43,0.08)', padding:'6px 14px', borderRadius:20 }}>
              Lihat Semua →
            </a>
          </div>

          {recentTx.length === 0 ? (
            <div style={{ padding:'32px', textAlign:'center', color:'#aaa', fontSize:13 }}>Belum ada transaksi</div>
          ) : recentTx.map((tx, i) => (
            <div key={tx.id} style={{ display:'flex', alignItems:'center', gap:14, padding:'14px 20px', borderBottom: i < recentTx.length-1 ? '1px solid #f8f8f8' : 'none' }}>
              <div style={{ width:38, height:38, borderRadius:12, flexShrink:0, background: tx.jenis==='masuk' ? 'rgba(30,132,73,0.12)' : 'rgba(192,57,43,0.1)', display:'flex', alignItems:'center', justifyContent:'center', fontSize:16 }}>
                {tx.jenis==='masuk' ? '⬇️' : '⬆️'}
              </div>
              <div style={{ flex:1 }}>
                <div style={{ fontSize:13, fontWeight:600, color:'#1a1a1a' }}>{tx.deskripsi}</div>
                <div style={{ fontSize:11, color:'#aaa' }}>{tx.tanggal} · {tx.user_name}</div>
              </div>
              <div style={{ fontSize:13, fontWeight:700, color: tx.jenis==='masuk' ? '#1E8449' : '#C0392B' }}>
                {tx.jenis==='masuk' ? '+' : '-'}{fmt(tx.nominal)}
              </div>
            </div>
          ))}
        </motion.div>

        {/* Quick actions */}
        <motion.div initial={{opacity:0,y:20}} animate={{opacity:1,y:0}} transition={{delay:0.45}}
          style={{ marginTop:20, display:'grid', gridTemplateColumns:'repeat(auto-fit,minmax(160px,1fr))', gap:12 }}>
          {[
            { label:'Input Transaksi', icon:'➕', href:'/transaksi', color:'#C0392B' },
            { label:'Lihat Laporan',   icon:'📊', href:'/laporan',   color:'#1A5276' },
            { label:'Data Donatur',    icon:'👤', href:'/donatur',   color:'#1E8449' },
            ...(isAdmin ? [{ label:'Kelola Anggota', icon:'⚙️', href:'/admin/anggota', color:'#7D3C98' }] : []),
          ].map((a,i) => (
            <a key={i} href={a.href} style={{ display:'flex', alignItems:'center', gap:10, textDecoration:'none', background:'#fff', border:'1.5px solid #f0f0f0', borderRadius:14, padding:'14px 16px', transition:'all .2s' }}
              onMouseEnter={e=>{ e.currentTarget.style.borderColor=a.color; e.currentTarget.style.background=a.color+'08'; }}
              onMouseLeave={e=>{ e.currentTarget.style.borderColor='#f0f0f0'; e.currentTarget.style.background='#fff'; }}>
              <span style={{ fontSize:22 }}>{a.icon}</span>
              <span style={{ fontSize:13, fontWeight:600, color:'#1a1a1a' }}>{a.label}</span>
            </a>
          ))}
        </motion.div>
      </main>
    </div>
  );
}
