import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import AdminSidebar from '../components/auth/AdminSidebar';

const INIT = [
  { id:1, nama:'PT Pulau Sambu',    telp:'0812-1111-0001', email:'sambu@corp.com',      total:50000000, program:'Sembako',     tgl:'15 Mei 2026',   kali:12 },
  { id:2, nama:'Budi Santoso',      telp:'0813-2222-0002', email:'budi@gmail.com',       total:5000000,  program:'Donor Darah', tgl:'20 Mei 2026',   kali:4  },
  { id:3, nama:'Anonim',            telp:'-',               email:'-',                    total:1000000,  program:'Umum',        tgl:'28 Mei 2026',   kali:1  },
  { id:4, nama:'Yayasan Harapan',   telp:'0811-3333-0003', email:'hy@yayasan.org',       total:20000000, program:'Sembako',     tgl:'10 Mei 2026',   kali:6  },
  { id:5, nama:'Siti Rahmawati',    telp:'0819-4444-0004', email:'siti@mail.com',        total:500000,   program:'Umum',        tgl:'25 Mei 2026',   kali:2  },
  { id:6, nama:'Dewi Lestari',      telp:'0815-5555-0005', email:'dewi@corp.id',         total:2500000,  program:'Logistik',    tgl:'18 Mei 2026',   kali:3  },
];

const fmt = n => 'Rp ' + Number(n).toLocaleString('id-ID');

export default function DonaturPage() {
  const [data, setData]     = useState(INIT);
  const [showForm, setShowForm] = useState(false);
  const [search, setSearch] = useState('');
  const [selected, setSelected] = useState(null);
  const [form, setForm]     = useState({ nama:'', telp:'', email:'', nominal:'', program:'Sembako' });
  const [toast, setToast]   = useState('');

  const filtered = data.filter(d =>
    d.nama.toLowerCase().includes(search.toLowerCase()) ||
    d.program.toLowerCase().includes(search.toLowerCase())
  );

  const handleSave = (e) => {
    e.preventDefault();
    const baru = {
      id: Date.now(), ...form,
      total: parseInt(form.nominal), kali:1,
      tgl: new Date().toLocaleDateString('id-ID',{day:'numeric',month:'long',year:'numeric'}),
    };
    setData([baru, ...data]);
    setForm({ nama:'', telp:'', email:'', nominal:'', program:'Sembako' });
    setShowForm(false);
    setToast('Data donatur berhasil disimpan!');
    setTimeout(()=>setToast(''),3000);
  };

  const totalDonasi = data.reduce((a,d)=>a+d.total, 0);

  return (
    <div style={{ display:'flex', minHeight:'100vh', background:'#f5f5f5', fontFamily:'Poppins,sans-serif' }}>
      <AdminSidebar />
      <main style={{ flex:1, padding:'32px 28px', overflowY:'auto' }}>

        <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:24, flexWrap:'wrap', gap:12 }}>
          <div>
            <h1 style={{ fontSize:'1.4rem', fontWeight:900, color:'#1a1a1a', marginBottom:4 }}>👤 Data Donatur</h1>
            <p style={{ fontSize:12, color:'#aaa' }}>Kelola data donatur komunitas Aksi Terima Kasih</p>
          </div>
          <button onClick={()=>setShowForm(!showForm)} style={{
            padding:'11px 20px', background:'#C0392B', color:'#fff', border:'none',
            borderRadius:14, fontFamily:'Poppins,sans-serif', fontSize:13, fontWeight:700, cursor:'pointer',
          }}>➕ Tambah Donatur</button>
        </div>

        {/* Toast */}
        <AnimatePresence>
          {toast && (
            <motion.div initial={{opacity:0,y:-8}} animate={{opacity:1,y:0}} exit={{opacity:0}}
              style={{ background:'rgba(30,132,73,0.1)', border:'1px solid rgba(30,132,73,0.25)', borderRadius:12, padding:'12px 16px', marginBottom:16, fontSize:13, fontWeight:600, color:'#1E8449' }}>
              ✅ {toast}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Stats */}
        <div style={{ display:'grid', gridTemplateColumns:'repeat(3,1fr)', gap:14, marginBottom:24 }}>
          {[
            { label:'Total Donatur', value:data.length, icon:'👥', color:'#1A5276' },
            { label:'Total Donasi',  value:fmt(totalDonasi), icon:'💰', color:'#C0392B' },
            { label:'Rata-rata',     value:fmt(Math.round(totalDonasi/data.length)), icon:'📊', color:'#1E8449' },
          ].map((s,i)=>(
            <div key={i} style={{ background:'#fff', borderRadius:16, padding:'16px 18px', border:'1.5px solid #f0f0f0' }}>
              <div style={{ fontSize:24, marginBottom:8 }}>{s.icon}</div>
              <div style={{ fontSize:'1.1rem', fontWeight:900, color:s.color }}>{s.value}</div>
              <div style={{ fontSize:11, color:'#aaa', marginTop:3 }}>{s.label}</div>
            </div>
          ))}
        </div>

        {/* Form tambah */}
        <AnimatePresence>
          {showForm && (
            <motion.div initial={{opacity:0,height:0}} animate={{opacity:1,height:'auto'}} exit={{opacity:0,height:0}}
              style={{ overflow:'hidden', marginBottom:20 }}>
              <div style={{ background:'#fff', borderRadius:18, border:'1.5px solid rgba(192,57,43,0.2)', padding:'22px' }}>
                <h3 style={{ fontSize:14, fontWeight:800, color:'#1a1a1a', marginBottom:18 }}>➕ Tambah Donatur Baru</h3>
                <form onSubmit={handleSave}>
                  <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fit,minmax(180px,1fr))', gap:12, marginBottom:12 }}>
                    {[
                      { key:'nama',  label:'Nama Donatur', type:'text',   ph:'Nama lengkap / institusi', req:true },
                      { key:'telp',  label:'No. Telepon',  type:'tel',    ph:'08xx-xxxx-xxxx' },
                      { key:'email', label:'Email',        type:'email',  ph:'email@domain.com' },
                      { key:'nominal',label:'Nominal Donasi',type:'number',ph:'0', req:true },
                    ].map(f=>(
                      <div key={f.key}>
                        <label style={{ fontSize:11, fontWeight:600, color:'#555', display:'block', marginBottom:5 }}>{f.label}</label>
                        <input type={f.type} placeholder={f.ph} value={form[f.key]} onChange={e=>setForm({...form,[f.key]:e.target.value})} required={f.req}
                          style={{ width:'100%', padding:'10px 14px', border:'1.5px solid #f0f0f0', borderRadius:12, fontFamily:'Poppins,sans-serif', fontSize:13, background:'#fafafa', outline:'none', boxSizing:'border-box' }}/>
                      </div>
                    ))}
                    <div>
                      <label style={{ fontSize:11, fontWeight:600, color:'#555', display:'block', marginBottom:5 }}>Program</label>
                      <select value={form.program} onChange={e=>setForm({...form,program:e.target.value})}
                        style={{ width:'100%', padding:'10px 14px', border:'1.5px solid #f0f0f0', borderRadius:12, fontFamily:'Poppins,sans-serif', fontSize:13, background:'#fafafa', outline:'none' }}>
                        {['Sembako','Donor Darah','Logistik','Umum'].map(p=><option key={p}>{p}</option>)}
                      </select>
                    </div>
                  </div>
                  <div style={{ display:'flex', gap:10 }}>
                    <button type="submit" style={{ padding:'10px 22px', background:'#C0392B', color:'#fff', border:'none', borderRadius:12, fontFamily:'Poppins,sans-serif', fontSize:13, fontWeight:700, cursor:'pointer' }}>✅ Simpan</button>
                    <button type="button" onClick={()=>setShowForm(false)} style={{ padding:'10px 16px', background:'#f5f5f5', color:'#555', border:'none', borderRadius:12, fontFamily:'Poppins,sans-serif', fontSize:13, cursor:'pointer' }}>Batal</button>
                  </div>
                </form>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Search */}
        <div style={{ position:'relative', marginBottom:16 }}>
          <input type="text" placeholder="🔍 Cari nama atau program..." value={search} onChange={e=>setSearch(e.target.value)}
            style={{ width:'100%', padding:'12px 16px', border:'1.5px solid #f0f0f0', borderRadius:14, fontFamily:'Poppins,sans-serif', fontSize:13, outline:'none', boxSizing:'border-box', background:'#fff' }}/>
        </div>

        {/* Tabel */}
        <div style={{ background:'#fff', borderRadius:18, border:'1.5px solid #f0f0f0', overflow:'hidden' }}>
          <div style={{ padding:'14px 20px', borderBottom:'1px solid #f0f0f0', display:'flex', justifyContent:'space-between', alignItems:'center' }}>
            <span style={{ fontSize:14, fontWeight:800, color:'#1a1a1a' }}>Daftar Donatur</span>
            <span style={{ fontSize:11, color:'#aaa' }}>{filtered.length} donatur</span>
          </div>
          <div style={{ overflowX:'auto' }}>
            <table style={{ width:'100%', borderCollapse:'collapse', fontSize:13 }}>
              <thead>
                <tr style={{ background:'#fafafa' }}>
                  {['Nama','Telepon','Program','Total Donasi','Frekuensi','Terakhir','Aksi'].map(h=>(
                    <th key={h} style={{ padding:'12px 16px', textAlign:'left', fontSize:11, fontWeight:700, color:'#aaa', borderBottom:'1px solid #f0f0f0', whiteSpace:'nowrap' }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {filtered.map((d,i)=>(
                  <tr key={d.id} style={{ borderBottom:'1px solid #f8f8f8', cursor:'pointer' }}
                    onMouseEnter={e=>e.currentTarget.style.background='#fafafa'}
                    onMouseLeave={e=>e.currentTarget.style.background='#fff'}>
                    <td style={{ padding:'12px 16px', fontWeight:600, color:'#1a1a1a' }}>{d.nama}</td>
                    <td style={{ padding:'12px 16px', color:'#666', fontSize:12 }}>{d.telp}</td>
                    <td style={{ padding:'12px 16px' }}>
                      <span style={{ background:'rgba(26,82,118,0.1)', color:'#1A5276', padding:'2px 10px', borderRadius:10, fontSize:11, fontWeight:600 }}>{d.program}</span>
                    </td>
                    <td style={{ padding:'12px 16px', fontWeight:700, color:'#C0392B' }}>{fmt(d.total)}</td>
                    <td style={{ padding:'12px 16px', color:'#666' }}>{d.kali}x donasi</td>
                    <td style={{ padding:'12px 16px', color:'#888', fontSize:12 }}>{d.tgl}</td>
                    <td style={{ padding:'12px 16px' }}>
                      <button onClick={()=>setSelected(d)} style={{
                        background:'rgba(192,57,43,0.08)', color:'#C0392B', border:'none',
                        borderRadius:10, padding:'5px 12px', fontFamily:'Poppins,sans-serif',
                        fontSize:11, fontWeight:700, cursor:'pointer',
                      }}>Detail</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Modal detail */}
        <AnimatePresence>
          {selected && (
            <motion.div initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}}
              style={{ position:'fixed', inset:0, background:'rgba(0,0,0,0.5)', backdropFilter:'blur(6px)', zIndex:2000, display:'flex', alignItems:'center', justifyContent:'center', padding:20 }}
              onClick={()=>setSelected(null)}>
              <motion.div initial={{scale:0.85,y:30}} animate={{scale:1,y:0}} exit={{scale:0.85,y:30}}
                onClick={e=>e.stopPropagation()}
                style={{ background:'#fff', borderRadius:22, width:'100%', maxWidth:400, overflow:'hidden', boxShadow:'0 20px 50px rgba(0,0,0,0.2)' }}>
                <div style={{ background:'linear-gradient(135deg,#7B241C,#C0392B)', padding:'22px 22px', color:'#fff' }}>
                  <div style={{ fontSize:32, marginBottom:8 }}>👤</div>
                  <div style={{ fontSize:'1.2rem', fontWeight:800 }}>{selected.nama}</div>
                  <div style={{ fontSize:12, opacity:0.8, marginTop:3 }}>{selected.program}</div>
                </div>
                <div style={{ padding:'20px 22px', display:'flex', flexDirection:'column', gap:12 }}>
                  {[
                    ['📱 Telepon', selected.telp],
                    ['✉️ Email',   selected.email],
                    ['💰 Total',   fmt(selected.total)],
                    ['🔁 Frekuensi', `${selected.kali}x donasi`],
                    ['📅 Terakhir', selected.tgl],
                  ].map(([k,v])=>(
                    <div key={k} style={{ display:'flex', justifyContent:'space-between', fontSize:13, borderBottom:'1px solid #f5f5f5', paddingBottom:10 }}>
                      <span style={{ color:'#888' }}>{k}</span>
                      <span style={{ fontWeight:600, color:'#1a1a1a' }}>{v}</span>
                    </div>
                  ))}
                  <button onClick={()=>setSelected(null)} style={{ marginTop:8, padding:'11px', background:'#C0392B', color:'#fff', border:'none', borderRadius:12, fontFamily:'Poppins,sans-serif', fontSize:13, fontWeight:700, cursor:'pointer' }}>Tutup</button>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </main>
    </div>
  );
}
