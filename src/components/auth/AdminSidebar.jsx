import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const navItems = [
  { href:'/dashboard',       icon:'🏠', label:'Dashboard',       role:'anggota' },
  { href:'/transaksi',       icon:'💳', label:'Transaksi',       role:'anggota' },
  { href:'/laporan',         icon:'📊', label:'Laporan',         role:'anggota' },
  { href:'/donatur',         icon:'👤', label:'Data Donatur',    role:'anggota' },
  { href:'/galeri-upload',   icon:'📸', label:'Upload Galeri',   role:'anggota' },
  { href:'/admin/anggota',   icon:'⚙️', label:'Kelola Anggota',  role:'admin'   },
  { href:'/admin/pengaturan',icon:'🔧', label:'Pengaturan',      role:'admin'   },
];

export default function AdminSidebar() {
  const { user, logout, isAdmin } = useAuth();
  const navigate  = useNavigate();
  const location  = useLocation();
  const [collapsed, setCollapsed] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const visible = navItems.filter(n => n.role === 'anggota' || (n.role === 'admin' && isAdmin));

  return (
    <aside style={{
      width: collapsed ? 72 : 240,
      minHeight:'100vh',
      background:'#fff',
      borderRight:'1.5px solid #f0f0f0',
      display:'flex',
      flexDirection:'column',
      transition:'width .3s cubic-bezier(.4,0,.2,1)',
      flexShrink:0,
      position:'sticky',
      top:0,
      height:'100vh',
      overflowY:'auto',
    }}>

      {/* Logo */}
      <div style={{
        padding: collapsed ? '20px 0' : '20px 20px',
        borderBottom:'1px solid #f0f0f0',
        display:'flex', alignItems:'center', gap:10,
        justifyContent: collapsed ? 'center' : 'space-between',
      }}>
        {!collapsed && (
          <div style={{ display:'flex', alignItems:'center', gap:8 }}>
            <div style={{
              width:32, height:32, borderRadius:'50%', background:'#C0392B',
              display:'flex', alignItems:'center', justifyContent:'center', fontSize:16, flexShrink:0,
            }}>❤️</div>
            <div>
              <div style={{ fontSize:11, fontWeight:800, color:'#C0392B', lineHeight:1.2 }}>Aksi Terima</div>
              <div style={{ fontSize:11, fontWeight:800, color:'#1a1a1a', lineHeight:1.2 }}>Kasih</div>
            </div>
          </div>
        )}
        <button onClick={()=>setCollapsed(!collapsed)} style={{
          background:'#f5f5f5', border:'none', borderRadius:8, padding:'6px 8px',
          cursor:'pointer', fontSize:14, flexShrink:0,
        }}>
          {collapsed ? '→' : '←'}
        </button>
      </div>

      {/* User info */}
      {!collapsed && (
        <div style={{
          padding:'14px 16px', margin:'12px', borderRadius:14,
          background:'rgba(192,57,43,0.06)', border:'1px solid rgba(192,57,43,0.12)',
        }}>
          <div style={{ display:'flex', alignItems:'center', gap:10 }}>
            <img src={user?.avatar} alt="" style={{ width:36, height:36, borderRadius:'50%', objectFit:'cover' }}/>
            <div style={{ overflow:'hidden' }}>
              <div style={{ fontSize:12, fontWeight:700, color:'#1a1a1a', whiteSpace:'nowrap', overflow:'hidden', textOverflow:'ellipsis' }}>
                {user?.name}
              </div>
              <div style={{
                fontSize:10, fontWeight:600, color:'#C0392B',
                background:'rgba(192,57,43,0.1)', padding:'1px 8px', borderRadius:10, display:'inline-block', marginTop:2,
              }}>
                {user?.role === 'admin' ? '👑 Admin' : '🤝 Anggota'}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Nav */}
      <nav style={{ flex:1, padding:'8px 10px' }}>
        {visible.map(item => {
          const active = location.pathname === item.href;
          return (
            <a key={item.href} href={item.href} style={{
              display:'flex', alignItems:'center',
              gap: collapsed ? 0 : 10,
              justifyContent: collapsed ? 'center' : 'flex-start',
              padding: collapsed ? '12px 0' : '11px 14px',
              borderRadius:12, marginBottom:4, textDecoration:'none',
              background: active ? '#C0392B' : 'transparent',
              color: active ? '#fff' : '#555',
              fontWeight: active ? 600 : 400,
              fontSize:13,
              transition:'all .2s',
            }}
              onMouseEnter={e=>{ if(!active) { e.currentTarget.style.background='rgba(192,57,43,0.08)'; e.currentTarget.style.color='#C0392B'; }}}
              onMouseLeave={e=>{ if(!active) { e.currentTarget.style.background='transparent'; e.currentTarget.style.color='#555'; }}}>
              <span style={{ fontSize:18, flexShrink:0 }}>{item.icon}</span>
              {!collapsed && <span>{item.label}</span>}
            </a>
          );
        })}
      </nav>

      {/* Logout */}
      <div style={{ padding:'10px 10px 20px' }}>
        <button onClick={handleLogout} style={{
          width:'100%', padding: collapsed ? '12px 0' : '11px 14px',
          background:'rgba(192,57,43,0.08)', border:'1px solid rgba(192,57,43,0.15)',
          borderRadius:12, cursor:'pointer', fontFamily:'Poppins,sans-serif',
          fontSize:13, fontWeight:600, color:'#C0392B',
          display:'flex', alignItems:'center', gap:collapsed?0:10, justifyContent:'center',
          transition:'all .2s',
        }}
          onMouseEnter={e=>{ e.currentTarget.style.background='#C0392B'; e.currentTarget.style.color='#fff'; }}
          onMouseLeave={e=>{ e.currentTarget.style.background='rgba(192,57,43,0.08)'; e.currentTarget.style.color='#C0392B'; }}>
          <span style={{ fontSize:18 }}>🚪</span>
          {!collapsed && 'Keluar'}
        </button>
      </div>
    </aside>
  );
}
