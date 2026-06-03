import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import AdminSidebar from '../../components/auth/AdminSidebar';

const INIT = [
  { id:1, username:'admin',  name:'Administrator',     role:'admin',   email:'admin@atk.org',   telp:'0811-000-0001', status:'aktif', joinDate:'Jan 2024' },
  { id:2, username:'sapri',  name:'Sapri Koordinator', role:'anggota', email:'sapri@atk.org',   telp:'0812-000-0002', status:'aktif', joinDate:'Mar 2024' },
  { id:3, username:'dewi',   name:'Dewi Sekretaris',   role:'anggota', email:'dewi@atk.org',    telp:'0813-000-0003', status:'aktif', joinDate:'Apr 2024' },
  { id:4, username:'budi',   name:'Budi Bendahara',    role:'anggota', email:'budi@atk.org',    telp:'0814-000-0004', status:'aktif', joinDate:'Jun 2024' },
];

export default function AnggotaPage() {
  const [data, setData]     = useState(INIT);
  const [showForm, setShowForm] = useState(false);
  const [toast, setToast]   = useState('');
  const [form, setForm]     = useState({ username:'', name:'', email:'', telp:'', role:'anggota', password:'' });

  const showToast = (msg) => { setToast(msg); setTimeout(()=>setToast(''), 3000); };

  const handleSave = (e) => {
    e.preventDefault();
    if (data.find(d => d.username === form.username)) {
      showToast('⚠️ Username sudah digunakan!'); return;
    }
    setData([...data, { id:Date.now(), ...form, status:'aktif', joinDate:new Date().toLocaleDateString('id-ID',{month:'short',year:'numeric'}) }]);
    setForm({ username:'', name:'', email:'', telp:'', role:'anggota', password:'' });
    setShowForm(false);
    showToast('Anggota baru berhasil ditambahkan!');
  };

  const toggleStatus = (id) => {
    setData(data.map(d => d.id===id ? {...d, status: d.status==='aktif'?'nonaktif':'aktif'} : d));
    showToast('Status anggota diperbarui.');
  };

  const handleDelete = (id) => {
    if (id === 1) { showToast('⚠️ Akun Admin utama tidak bisa dihapus!'); return; }
    setData(data.filter(d => d.id !== id));
    showToast('Anggota berhasil dihapus.');
  };

  return (
    <div style={{ display:'flex', minHeight:'100vh', background:'#f5f5f5', fontFamily:'Poppins,sans-serif' }}>
      <AdminSidebar />
      <main style={{ flex:1, padding:'32px 28px', overflowY:'auto' }}>

        <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:24, flexWrap:'wrap', gap:12 }}>
          <div>
            <h1 style={{ fontSize:'1.4rem', fontWeight:900, color:'#1a1a1a', marginBottom:4 }}>⚙️ Kelola Anggota</h1>
            <p style={{ fontSize:12, color:'#aaa' }}>Manajemen akun pengurus komunitas · Hanya Admin</p>
          </div>
          <button onClick={()=>setShowForm(!showForm)} style={{
            padding:'11px 20px', background:'#7D3C98', color:'#fff', border:'none',
            borderRadius:14, fontFamily:'Poppins,sans-serif', fontSize:13, fontWeight:700, cursor:'pointer',
          }}>➕ Tambah Anggota</button>
        </div>

        {/* Toast */}
        <AnimatePresence>
          {toast && (
            <motion.div initial={{opacity:0,y:-8}} animate={{opacity:1,y:0}} exit={{opacity:0}}
              style={{
                background: toast.includes('⚠️') ? 'rgba(192,57,43,0.1)' : 'rgba(30,132,73,0.1)',
                border: `1px solid ${toast.includes('⚠️') ? 'rgba(192,57,43,0.25)' : 'rgba(30,132,73,0.25)'}`,
                borderRadius:12, padding:'12px 16px', marginBottom:16,
                fontSize:13, fontWeight:600,
                color: toast.includes('⚠️') ? '#C0392B' : '#1E8449',
              }}>
              {toast}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Stats */}
        <div style={{ display:'grid', gridTemplateColumns:'repeat(3,1fr)', gap:12, marginBottom:22 }}>
          {[
            { label:'Total Anggota', value:data.length, icon:'👥', color:'#7D3C98' },
            { label:'Aktif',         value:data.filter(d=>d.status==='aktif').length, icon:'✅', color:'#1E8449' },
            { label:'Nonaktif',      value:data.filter(d=>d.status==='nonaktif').length, icon:'⏸️', color:'#888' },
          ].map((s,i)=>(
            <div key={i} style={{ background:'#fff', borderRadius:16, padding:'14px 16px', border:'1.5px solid #f0f0f0' }}>
              <div style={{ fontSize:22, marginBottom:6 }}>{s.icon}</div>
              <div style={{ fontSize:'1.3rem', fontWeight:900, color:s.color }}>{s.value}</div>
              <div style={{ fontSize:11, color:'#aaa', marginTop:3 }}>{s.label}</div>
            </div>
          ))}
        </div>

        {/* Form tambah */}
        <AnimatePresence>
          {showForm && (
            <motion.div initial={{opacity:0,height:0}} animate={{opacity:1,height:'auto'}} exit={{opacity:0,height:0}}
              style={{ overflow:'hidden', marginBottom:20 }}>
              <div style={{ background:'#fff', borderRadius:18, border:'1.5px solid rgba(125,60,152,0.2)', padding:'22px' }}>
                <h3 style={{ fontSize:14, fontWeight:800, color:'#1a1a1a', marginBottom:18 }}>➕ Tambah Anggota Baru</h3>
                <form onSubmit={handleSave}>
                  <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fit,minmax(180px,1fr))', gap:12, marginBottom:14 }}>
                    {[
                      { key:'name',     label:'Nama Lengkap',  type:'text',     ph:'Nama lengkap',   req:true },
                      { key:'username', label:'Username Login', type:'text',     ph:'username',       req:true },
                      { key:'password', label:'Password',       type:'password', ph:'password awal',  req:true },
                      { key:'email',    label:'Email',          type:'email',    ph:'email@atk.org'   },
                      { key:'telp',     label:'Telepon',        type:'tel',      ph:'08xx-xxxx-xxxx'  },
                    ].map(f=>(
                      <div key={f.key}>
                        <label style={{ fontSize:11, fontWeight:600, color:'#555', display:'block', marginBottom:5 }}>{f.label}</label>
                        <input type={f.type} placeholder={f.ph} value={form[f.key]} onChange={e=>setForm({...form,[f.key]:e.target.value})} required={f.req}
                          style={{ width:'100%', padding:'10px 14px', border:'1.5px solid #f0f0f0', borderRadius:12, fontFamily:'Poppins,sans-serif', fontSize:13, background:'#fafafa', outline:'none', boxSizing:'border-box' }}/>
                      </div>
                    ))}
                    <div>
                      <label style={{ fontSize:11, fontWeight:600, color:'#555', display:'block', marginBottom:5 }}>Role</label>
                      <select value={form.role} onChange={e=>setForm({...form,role:e.target.value})}
                        style={{ width:'100%', padding:'10px 14px', border:'1.5px solid #f0f0f0', borderRadius:12, fontFamily:'Poppins,sans-serif', fontSize:13, background:'#fafafa', outline:'none' }}>
                        <option value="anggota">Anggota</option>
                        <option value="admin">Admin</option>
                      </select>
                    </div>
                  </div>
                  <div style={{ background:'rgba(255,193,7,0.1)', border:'1px solid rgba(255,193,7,0.3)', borderRadius:10, padding:'10px 14px', marginBottom:14, fontSize:12, color:'#856404' }}>
                    ⚠️ Password akan langsung aktif — sampaikan ke anggota dan minta segera diganti
                  </div>
                  <div style={{ display:'flex', gap:10 }}>
                    <button type="submit" style={{ padding:'10px 22px', background:'#7D3C98', color:'#fff', border:'none', borderRadius:12, fontFamily:'Poppins,sans-serif', fontSize:13, fontWeight:700, cursor:'pointer' }}>✅ Simpan Anggota</button>
                    <button type="button" onClick={()=>setShowForm(false)} style={{ padding:'10px 16px', background:'#f5f5f5', color:'#555', border:'none', borderRadius:12, fontFamily:'Poppins,sans-serif', fontSize:13, cursor:'pointer' }}>Batal</button>
                  </div>
                </form>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Tabel anggota */}
        <div style={{ background:'#fff', borderRadius:18, border:'1.5px solid #f0f0f0', overflow:'hidden' }}>
          <div style={{ padding:'14px 20px', borderBottom:'1px solid #f0f0f0' }}>
            <span style={{ fontSize:14, fontWeight:800, color:'#1a1a1a' }}>Daftar Pengurus</span>
          </div>
          <div style={{ overflowX:'auto' }}>
            <table style={{ width:'100%', borderCollapse:'collapse', fontSize:13 }}>
              <thead>
                <tr style={{ background:'#fafafa' }}>
                  {['Nama','Username','Role','Email','Telepon','Bergabung','Status','Aksi'].map(h=>(
                    <th key={h} style={{ padding:'12px 16px', textAlign:'left', fontSize:11, fontWeight:700, color:'#aaa', borderBottom:'1px solid #f0f0f0', whiteSpace:'nowrap' }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {data.map((d,i)=>(
                  <tr key={d.id} style={{ borderBottom:'1px solid #f8f8f8' }}>
                    <td style={{ padding:'12px 16px', fontWeight:600, color:'#1a1a1a' }}>
                      <div style={{ display:'flex', alignItems:'center', gap:8 }}>
                        <div style={{
                          width:30, height:30, borderRadius:'50%',
                          background: d.role==='admin' ? '#C0392B' : '#7D3C98',
                          display:'flex', alignItems:'center', justifyContent:'center',
                          fontSize:13, color:'#fff', fontWeight:700, flexShrink:0,
                        }}>
                          {d.name[0]}
                        </div>
                        {d.name}
                      </div>
                    </td>
                    <td style={{ padding:'12px 16px', color:'#666', fontFamily:'monospace', fontSize:12 }}>{d.username}</td>
                    <td style={{ padding:'12px 16px' }}>
                      <span style={{
                        background: d.role==='admin' ? 'rgba(192,57,43,0.1)' : 'rgba(125,60,152,0.1)',
                        color: d.role==='admin' ? '#C0392B' : '#7D3C98',
                        padding:'2px 10px', borderRadius:10, fontSize:11, fontWeight:700,
                      }}>
                        {d.role==='admin' ? '👑 Admin' : '🤝 Anggota'}
                      </span>
                    </td>
                    <td style={{ padding:'12px 16px', color:'#666', fontSize:12 }}>{d.email}</td>
                    <td style={{ padding:'12px 16px', color:'#666', fontSize:12 }}>{d.telp}</td>
                    <td style={{ padding:'12px 16px', color:'#888', fontSize:12 }}>{d.joinDate}</td>
                    <td style={{ padding:'12px 16px' }}>
                      <span style={{
                        background: d.status==='aktif' ? 'rgba(30,132,73,0.1)' : 'rgba(136,136,136,0.1)',
                        color: d.status==='aktif' ? '#1E8449' : '#888',
                        padding:'2px 10px', borderRadius:10, fontSize:11, fontWeight:700,
                      }}>
                        {d.status==='aktif' ? '✅ Aktif' : '⏸️ Nonaktif'}
                      </span>
                    </td>
                    <td style={{ padding:'12px 16px' }}>
                      <div style={{ display:'flex', gap:6 }}>
                        <button onClick={()=>toggleStatus(d.id)} style={{
                          padding:'5px 10px', background:'rgba(26,82,118,0.1)', color:'#1A5276',
                          border:'none', borderRadius:8, fontFamily:'Poppins,sans-serif', fontSize:10, fontWeight:700, cursor:'pointer',
                        }}>
                          {d.status==='aktif' ? 'Nonaktifkan' : 'Aktifkan'}
                        </button>
                        {d.id !== 1 && (
                          <button onClick={()=>handleDelete(d.id)} style={{
                            padding:'5px 10px', background:'rgba(192,57,43,0.1)', color:'#C0392B',
                            border:'none', borderRadius:8, fontFamily:'Poppins,sans-serif', fontSize:10, fontWeight:700, cursor:'pointer',
                          }}>Hapus</button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </div>
  );
}
