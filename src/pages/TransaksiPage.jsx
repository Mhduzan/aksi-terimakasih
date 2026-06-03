import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import AdminSidebar from '../components/auth/AdminSidebar';
import { useAuth } from '../context/AuthContext';

const INIT_DATA = [
  { id:1, date:'30 Mei 2026', desc:'Donasi Sembako Kateman',   jenis:'masuk',  nominal:2500000,  program:'Sembako',    donatur:'Budi S.' },
  { id:2, date:'29 Mei 2026', desc:'Pembelian Beras 50kg',     jenis:'keluar', nominal:650000,   program:'Sembako',    donatur:'-'       },
  { id:3, date:'28 Mei 2026', desc:'Donasi Rutin Anggota',     jenis:'masuk',  nominal:1000000,  program:'Umum',       donatur:'Anonim'  },
  { id:4, date:'27 Mei 2026', desc:'Ongkos Kirim Logistik',    jenis:'keluar', nominal:350000,   program:'Logistik',   donatur:'-'       },
  { id:5, date:'26 Mei 2026', desc:'Donasi Online',            jenis:'masuk',  nominal:5000000,  program:'Donor Darah',donatur:'Pt. ABC' },
  { id:6, date:'25 Mei 2026', desc:'Biaya Operasional',        jenis:'keluar', nominal:200000,   program:'Umum',       donatur:'-'       },
];

const fmt = n => 'Rp ' + Number(n).toLocaleString('id-ID');

export default function TransaksiPage() {
  const { user } = useAuth();
  const [data, setData]       = useState(INIT_DATA);
  const [showForm, setShowForm] = useState(false);
  const [filter, setFilter]   = useState('semua');
  const [form, setForm]       = useState({ desc:'', jenis:'masuk', nominal:'', program:'Sembako', donatur:'' });
  const [success, setSuccess] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    const tx = {
      id: Date.now(),
      date: new Date().toLocaleDateString('id-ID',{day:'numeric',month:'long',year:'numeric'}),
      desc: form.desc,
      jenis: form.jenis,
      nominal: parseInt(form.nominal),
      program: form.program,
      donatur: form.donatur || '-',
    };
    setData([tx, ...data]);
    setForm({ desc:'', jenis:'masuk', nominal:'', program:'Sembako', donatur:'' });
    setShowForm(false);
    setSuccess('Transaksi berhasil disimpan!');
    setTimeout(()=>setSuccess(''), 3000);
  };

  const filtered = filter === 'semua' ? data : data.filter(d => d.jenis === filter);
  const totalMasuk  = data.filter(d=>d.jenis==='masuk').reduce((a,d)=>a+d.nominal,0);
  const totalKeluar = data.filter(d=>d.jenis==='keluar').reduce((a,d)=>a+d.nominal,0);
  const saldo = totalMasuk - totalKeluar;

  return (
    <div style={{ display:'flex', minHeight:'100vh', background:'#f5f5f5', fontFamily:'Poppins,sans-serif' }}>
      <AdminSidebar />
      <main style={{ flex:1, padding:'32px 28px', overflowY:'auto' }}>

        {/* Header */}
        <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:24 }}>
          <div>
            <h1 style={{ fontSize:'1.4rem', fontWeight:900, color:'#1a1a1a', marginBottom:4 }}>💳 Transaksi</h1>
            <p style={{ fontSize:12, color:'#aaa' }}>Kelola pemasukan dan pengeluaran komunitas</p>
          </div>
          <button onClick={()=>setShowForm(!showForm)} style={{
            display:'flex', alignItems:'center', gap:8,
            background:'#C0392B', color:'#fff', border:'none', borderRadius:14,
            padding:'11px 20px', fontFamily:'Poppins,sans-serif', fontSize:13, fontWeight:700, cursor:'pointer',
          }}>
            ➕ Input Transaksi
          </button>
        </div>

        {/* Success toast */}
        <AnimatePresence>
          {success && (
            <motion.div initial={{opacity:0,y:-10}} animate={{opacity:1,y:0}} exit={{opacity:0}}
              style={{
                background:'rgba(30,132,73,0.1)', border:'1px solid rgba(30,132,73,0.25)',
                borderRadius:12, padding:'12px 16px', marginBottom:16,
                fontSize:13, fontWeight:600, color:'#1E8449',
              }}>
              ✅ {success}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Saldo cards */}
        <div style={{ display:'grid', gridTemplateColumns:'repeat(3,1fr)', gap:12, marginBottom:24 }}>
          {[
            { label:'Total Pemasukan', value:fmt(totalMasuk),  color:'#1E8449', bg:'rgba(30,132,73,0.08)', icon:'⬇️' },
            { label:'Total Pengeluaran',value:fmt(totalKeluar), color:'#C0392B', bg:'rgba(192,57,43,0.08)', icon:'⬆️' },
            { label:'Saldo Bersih',    value:fmt(saldo),        color: saldo>=0?'#1A5276':'#C0392B', bg:'rgba(26,82,118,0.08)', icon:'💰' },
          ].map((s,i)=>(
            <div key={i} style={{ background:'#fff', borderRadius:16, padding:'16px 18px', border:'1.5px solid #f0f0f0' }}>
              <div style={{ fontSize:20, marginBottom:8 }}>{s.icon}</div>
              <div style={{ fontSize:'1.1rem', fontWeight:900, color:s.color }}>{s.value}</div>
              <div style={{ fontSize:11, color:'#aaa', marginTop:4 }}>{s.label}</div>
            </div>
          ))}
        </div>

        {/* Form Input */}
        <AnimatePresence>
          {showForm && (
            <motion.div initial={{opacity:0,height:0}} animate={{opacity:1,height:'auto'}} exit={{opacity:0,height:0}}
              style={{ overflow:'hidden', marginBottom:20 }}>
              <div style={{ background:'#fff', borderRadius:18, border:'1.5px solid rgba(192,57,43,0.2)', padding:'22px 22px' }}>
                <h3 style={{ fontSize:14, fontWeight:800, color:'#1a1a1a', marginBottom:18 }}>➕ Tambah Transaksi Baru</h3>
                <form onSubmit={handleSubmit}>
                  <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fit,minmax(200px,1fr))', gap:12, marginBottom:12 }}>
                    {/* Jenis */}
                    <div>
                      <label style={{ fontSize:11,fontWeight:600,color:'#555',display:'block',marginBottom:5 }}>Jenis Transaksi</label>
                      <div style={{ display:'flex', gap:8 }}>
                        {['masuk','keluar'].map(j=>(
                          <button key={j} type="button" onClick={()=>setForm({...form,jenis:j})} style={{
                            flex:1, padding:'10px', borderRadius:12, border:'none', cursor:'pointer',
                            fontFamily:'Poppins,sans-serif', fontSize:12, fontWeight:600,
                            background: form.jenis===j ? (j==='masuk'?'#1E8449':'#C0392B') : '#f5f5f5',
                            color: form.jenis===j ? '#fff' : '#555',
                            transition:'all .2s',
                          }}>
                            {j==='masuk'?'⬇️ Pemasukan':'⬆️ Pengeluaran'}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Program */}
                    <div>
                      <label style={{ fontSize:11,fontWeight:600,color:'#555',display:'block',marginBottom:5 }}>Program</label>
                      <select value={form.program} onChange={e=>setForm({...form,program:e.target.value})} style={{
                        width:'100%', padding:'10px 14px', border:'1.5px solid #f0f0f0', borderRadius:12,
                        fontFamily:'Poppins,sans-serif', fontSize:13, background:'#fafafa', outline:'none',
                      }}>
                        {['Sembako','Donor Darah','Logistik','Umum','Darurat'].map(p=><option key={p}>{p}</option>)}
                      </select>
                    </div>
                  </div>

                  <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fit,minmax(200px,1fr))', gap:12, marginBottom:16 }}>
                    {/* Deskripsi */}
                    <div>
                      <label style={{ fontSize:11,fontWeight:600,color:'#555',display:'block',marginBottom:5 }}>Deskripsi</label>
                      <input type="text" placeholder="Keterangan transaksi..." value={form.desc} onChange={e=>setForm({...form,desc:e.target.value})} required
                        style={{ width:'100%', padding:'10px 14px', border:'1.5px solid #f0f0f0', borderRadius:12, fontFamily:'Poppins,sans-serif', fontSize:13, background:'#fafafa', outline:'none', boxSizing:'border-box' }}/>
                    </div>

                    {/* Nominal */}
                    <div>
                      <label style={{ fontSize:11,fontWeight:600,color:'#555',display:'block',marginBottom:5 }}>Nominal (Rp)</label>
                      <input type="number" placeholder="0" value={form.nominal} onChange={e=>setForm({...form,nominal:e.target.value})} required min="1"
                        style={{ width:'100%', padding:'10px 14px', border:'1.5px solid #f0f0f0', borderRadius:12, fontFamily:'Poppins,sans-serif', fontSize:13, background:'#fafafa', outline:'none', boxSizing:'border-box' }}/>
                    </div>

                    {/* Donatur */}
                    {form.jenis==='masuk' && (
                      <div>
                        <label style={{ fontSize:11,fontWeight:600,color:'#555',display:'block',marginBottom:5 }}>Nama Donatur</label>
                        <input type="text" placeholder="Anonim jika tidak ada" value={form.donatur} onChange={e=>setForm({...form,donatur:e.target.value})}
                          style={{ width:'100%', padding:'10px 14px', border:'1.5px solid #f0f0f0', borderRadius:12, fontFamily:'Poppins,sans-serif', fontSize:13, background:'#fafafa', outline:'none', boxSizing:'border-box' }}/>
                      </div>
                    )}
                  </div>

                  <div style={{ display:'flex', gap:10 }}>
                    <button type="submit" style={{
                      padding:'11px 24px', background:'#C0392B', color:'#fff', border:'none',
                      borderRadius:12, fontFamily:'Poppins,sans-serif', fontSize:13, fontWeight:700, cursor:'pointer',
                    }}>✅ Simpan Transaksi</button>
                    <button type="button" onClick={()=>setShowForm(false)} style={{
                      padding:'11px 18px', background:'#f5f5f5', color:'#555', border:'none',
                      borderRadius:12, fontFamily:'Poppins,sans-serif', fontSize:13, cursor:'pointer',
                    }}>Batal</button>
                  </div>
                </form>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Tabel */}
        <div style={{ background:'#fff', borderRadius:18, border:'1.5px solid #f0f0f0', overflow:'hidden' }}>
          <div style={{ padding:'16px 20px', borderBottom:'1px solid #f0f0f0', display:'flex', gap:8, alignItems:'center', justifyContent:'space-between' }}>
            <div style={{ display:'flex', gap:8 }}>
              {['semua','masuk','keluar'].map(f=>(
                <button key={f} onClick={()=>setFilter(f)} style={{
                  padding:'6px 16px', borderRadius:20, border:'none', cursor:'pointer',
                  fontFamily:'Poppins,sans-serif', fontSize:11, fontWeight:600,
                  background: filter===f ? '#C0392B' : '#f5f5f5',
                  color: filter===f ? '#fff' : '#666',
                  textTransform:'capitalize',
                }}>
                  {f === 'semua' ? 'Semua' : f === 'masuk' ? '⬇️ Masuk' : '⬆️ Keluar'}
                </button>
              ))}
            </div>
            <span style={{ fontSize:11, color:'#aaa' }}>{filtered.length} transaksi</span>
          </div>

          <div style={{ overflowX:'auto' }}>
            <table style={{ width:'100%', borderCollapse:'collapse', fontSize:13 }}>
              <thead>
                <tr style={{ background:'#fafafa' }}>
                  {['Tanggal','Keterangan','Program','Donatur','Nominal'].map(h=>(
                    <th key={h} style={{ padding:'12px 16px', textAlign:'left', fontSize:11, fontWeight:700, color:'#aaa', borderBottom:'1px solid #f0f0f0', whiteSpace:'nowrap' }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {filtered.map((tx,i)=>(
                  <tr key={tx.id} style={{ borderBottom:'1px solid #f8f8f8' }}>
                    <td style={{ padding:'12px 16px', color:'#888', fontSize:12, whiteSpace:'nowrap' }}>{tx.date}</td>
                    <td style={{ padding:'12px 16px', color:'#1a1a1a', fontWeight:500 }}>{tx.desc}</td>
                    <td style={{ padding:'12px 16px' }}>
                      <span style={{ background:'rgba(26,82,118,0.1)', color:'#1A5276', padding:'2px 10px', borderRadius:10, fontSize:11, fontWeight:600 }}>{tx.program}</span>
                    </td>
                    <td style={{ padding:'12px 16px', color:'#666', fontSize:12 }}>{tx.donatur}</td>
                    <td style={{ padding:'12px 16px', fontWeight:700, color: tx.jenis==='masuk'?'#1E8449':'#C0392B', whiteSpace:'nowrap' }}>
                      {tx.jenis==='masuk'?'+':'-'}{fmt(tx.nominal)}
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
