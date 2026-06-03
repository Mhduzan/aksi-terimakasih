import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '../context/AuthContext';

export default function LoginPage() {
  const { login } = useAuth();
  const navigate  = useNavigate();
  const [form, setForm]     = useState({ username:'', password:'' });
  const [error, setError]   = useState('');
  const [loading, setLoading] = useState(false);
  const [showPass, setShowPass] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(''); setLoading(true);
    const result = await login(form.username, form.password);
    setLoading(false);
    if (result.ok) navigate('/dashboard');
    else setError(result.msg || 'Login gagal.');
  };

  const demoAccounts = [
    { label:'Admin', u:'admin', p:'admin123', color:'#C0392B' },
    { label:'Anggota', u:'sapri', p:'sapri123', color:'#1A5276' },
  ];

  return (
    <div style={{
      minHeight:'100vh', display:'flex', fontFamily:'Poppins,sans-serif',
      background:'#fafafa', overflow:'hidden',
    }}>
      {/* Panel kiri — dekorasi */}
      <div style={{
        flex:1, background:'linear-gradient(145deg,#7B241C 0%,#C0392B 55%,#E74C3C 100%)',
        position:'relative', display:'flex', flexDirection:'column',
        justifyContent:'center', alignItems:'center', padding:'60px 40px',
        overflow:'hidden',
      }} className="login-left-panel">
        {/* Orbs */}
        {[[250,250,0.08,'top:-60px;right:-60px'],[150,150,0.05,'bottom:80px;left:-40px'],[100,100,0.06,'top:40%;left:60%']].map(([w,h,o,pos],i)=>(
          <div key={i} style={{
            position:'absolute', width:w, height:h, borderRadius:'50%',
            background:`rgba(255,255,255,${o})`, ...Object.fromEntries(pos.split(';').map(s=>{const[k,v]=s.split(':');return[k,v]})),
            pointerEvents:'none',
          }}/>
        ))}
        <div style={{
          position:'absolute', inset:0,
          backgroundImage:'radial-gradient(circle,rgba(255,255,255,0.08) 1px,transparent 1px)',
          backgroundSize:'24px 24px', pointerEvents:'none',
        }}/>

        <motion.div style={{ position:'relative', zIndex:2, textAlign:'center', color:'#fff' }}
          initial={{opacity:0,y:30}} animate={{opacity:1,y:0}} transition={{duration:0.6}}>
          <div style={{
            width:80, height:80, borderRadius:'50%', margin:'0 auto 24px',
            background:'rgba(255,255,255,0.18)', border:'2px solid rgba(255,255,255,0.35)',
            display:'flex', alignItems:'center', justifyContent:'center', fontSize:36,
          }}>❤️</div>
          <h1 style={{ fontSize:'1.8rem', fontWeight:900, marginBottom:8, lineHeight:1.2 }}>
            Aksi Terima Kasih
          </h1>
          <p style={{ fontSize:'0.9rem', opacity:0.8, fontWeight:300, lineHeight:1.6, maxWidth:260 }}>
            Portal Pengurus Komunitas Gerakan Peduli Sesama
          </p>

          <div style={{ marginTop:40, display:'flex', flexDirection:'column', gap:12 }}>
            {[['🛒','Kelola Program Sembako'],['📊','Laporan Transaksi'],['👥','Data Relawan'],['📸','Upload Dokumentasi']].map(([ic,txt])=>(
              <div key={txt} style={{
                display:'flex', alignItems:'center', gap:12,
                background:'rgba(255,255,255,0.12)', borderRadius:12,
                padding:'10px 16px', border:'1px solid rgba(255,255,255,0.2)',
              }}>
                <span style={{fontSize:18}}>{ic}</span>
                <span style={{fontSize:13, fontWeight:500}}>{txt}</span>
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Panel kanan — form login */}
      <div style={{
        width:'100%', maxWidth:460, display:'flex', flexDirection:'column',
        justifyContent:'center', padding:'60px 48px', background:'#fff',
      }}>
        <motion.div initial={{opacity:0,x:30}} animate={{opacity:1,x:0}} transition={{duration:0.5}}>

          <div style={{ marginBottom:36 }}>
            <h2 style={{ fontSize:'1.7rem', fontWeight:900, color:'#1a1a1a', marginBottom:6 }}>
              Selamat Datang 👋
            </h2>
            <p style={{ fontSize:'0.88rem', color:'#aaa', fontWeight:400 }}>
              Masuk ke portal pengurus Aksi Terima Kasih
            </p>
          </div>

          <form onSubmit={handleSubmit} style={{ display:'flex', flexDirection:'column', gap:16 }}>
            {/* Username */}
            <div>
              <label style={{ fontSize:12, fontWeight:600, color:'#555', display:'block', marginBottom:6 }}>
                Username
              </label>
              <input
                type="text"
                placeholder="Masukkan username..."
                value={form.username}
                onChange={e=>setForm({...form, username:e.target.value})}
                required
                style={{
                  width:'100%', padding:'12px 16px', border:'1.5px solid #f0f0f0',
                  borderRadius:14, fontFamily:'Poppins,sans-serif', fontSize:14,
                  outline:'none', transition:'border-color .2s', background:'#fafafa',
                  boxSizing:'border-box',
                }}
                onFocus={e=>e.target.style.borderColor='#C0392B'}
                onBlur={e=>e.target.style.borderColor='#f0f0f0'}
              />
            </div>

            {/* Password */}
            <div>
              <label style={{ fontSize:12, fontWeight:600, color:'#555', display:'block', marginBottom:6 }}>
                Password
              </label>
              <div style={{ position:'relative' }}>
                <input
                  type={showPass ? 'text' : 'password'}
                  placeholder="Masukkan password..."
                  value={form.password}
                  onChange={e=>setForm({...form, password:e.target.value})}
                  required
                  style={{
                    width:'100%', padding:'12px 48px 12px 16px', border:'1.5px solid #f0f0f0',
                    borderRadius:14, fontFamily:'Poppins,sans-serif', fontSize:14,
                    outline:'none', transition:'border-color .2s', background:'#fafafa',
                    boxSizing:'border-box',
                  }}
                  onFocus={e=>e.target.style.borderColor='#C0392B'}
                  onBlur={e=>e.target.style.borderColor='#f0f0f0'}
                />
                <button type="button" onClick={()=>setShowPass(!showPass)} style={{
                  position:'absolute', right:14, top:'50%', transform:'translateY(-50%)',
                  background:'none', border:'none', cursor:'pointer', fontSize:18, color:'#aaa', padding:0,
                }}>
                  {showPass ? '🙈' : '👁️'}
                </button>
              </div>
            </div>

            {/* Error */}
            <AnimatePresence>
              {error && (
                <motion.div initial={{opacity:0,y:-8}} animate={{opacity:1,y:0}} exit={{opacity:0}}
                  style={{
                    background:'rgba(192,57,43,0.08)', border:'1px solid rgba(192,57,43,0.2)',
                    borderRadius:12, padding:'10px 14px', fontSize:13, color:'#C0392B', fontWeight:500,
                  }}>
                  ⚠️ {error}
                </motion.div>
              )}
            </AnimatePresence>

            {/* Submit */}
            <button type="submit" disabled={loading} style={{
              width:'100%', padding:14,
              background: loading ? '#ddd' : 'linear-gradient(135deg,#C0392B,#E74C3C)',
              color:'#fff', border:'none', borderRadius:14,
              fontFamily:'Poppins,sans-serif', fontSize:14, fontWeight:700,
              cursor: loading ? 'not-allowed' : 'pointer',
              transition:'all .25s', display:'flex', alignItems:'center', justifyContent:'center', gap:8,
            }}>
              {loading ? (
                <>
                  <div style={{
                    width:18, height:18, border:'2px solid rgba(255,255,255,0.3)',
                    borderTop:'2px solid #fff', borderRadius:'50%',
                    animation:'spin 0.8s linear infinite',
                  }}/>
                  Memverifikasi...
                </>
              ) : '❤️ Masuk Sekarang'}
            </button>
          </form>

          {/* Demo accounts */}
          <div style={{ marginTop:28, paddingTop:24, borderTop:'1px solid #f0f0f0' }}>
            <p style={{ fontSize:11, color:'#aaa', fontWeight:600, letterSpacing:'0.5px', textTransform:'uppercase', marginBottom:12 }}>
              Akun Demo
            </p>
            <div style={{ display:'flex', gap:8 }}>
              {demoAccounts.map(a=>(
                <button key={a.u} onClick={()=>setForm({username:a.u, password:a.p})}
                  style={{
                    flex:1, padding:'8px 12px', background:a.color+'12',
                    border:`1.5px solid ${a.color}30`, borderRadius:12,
                    fontFamily:'Poppins,sans-serif', fontSize:11, fontWeight:700,
                    color:a.color, cursor:'pointer', transition:'all .2s',
                  }}
                  onMouseEnter={e=>{e.target.style.background=a.color; e.target.style.color='#fff';}}
                  onMouseLeave={e=>{e.target.style.background=a.color+'12'; e.target.style.color=a.color;}}>
                  {a.label}: {a.u}
                </button>
              ))}
            </div>
          </div>

          <p style={{ marginTop:20, fontSize:11, color:'#ccc', textAlign:'center' }}>
            Hanya untuk pengurus komunitas Aksi Terima Kasih
          </p>
        </motion.div>
      </div>

      <style>{`
        @keyframes spin { to { transform: rotate(360deg); } }
        @media (max-width: 640px) {
          .login-left-panel { display: none !important; }
        }
      `}</style>
    </div>
  );
}
