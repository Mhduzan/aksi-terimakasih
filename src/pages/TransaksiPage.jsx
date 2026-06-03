import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import AdminSidebar from '../components/auth/AdminSidebar';
import { transaksiAPI } from '../utils/api';

const fmt = n => 'Rp ' + Number(n || 0).toLocaleString('id-ID');

export default function TransaksiPage() {
  const [data, setData]         = useState([]);
  const [summary, setSummary]   = useState({ total_masuk:0, total_keluar:0, saldo:0 });
  const [loading, setLoading]   = useState(true);
  const [saving, setSaving]     = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [filter, setFilter]     = useState('semua');
  const [toast, setToast]       = useState({ msg:'', type:'ok' });
  const [form, setForm]         = useState({ deskripsi:'', jenis:'masuk', nominal:'', program:'Sembako', donatur_nama:'', tanggal: new Date().toISOString().slice(0,10) });

  useEffect(() => { loadData(); }, [filter]);

  const loadData = async () => {
    setLoading(true);
    try {
      const params = filter !== 'semua' ? { jenis: filter } : {};
      const result = await transaksiAPI.getAll(params);
      if (result.success) {
        setData(result.data || []);
        setSummary(result.summary || { total_masuk:0, total_keluar:0, saldo:0 });
      }
    } catch { showToast('Gagal memuat data', 'err'); }
    setLoading(false);
  };

  const showToast = (msg, type='ok') => {
    setToast({ msg, type });
    setTimeout(() => setToast({ msg:'', type:'ok' }), 3000);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      const result = await transaksiAPI.create(form);
      if (result.success) {
        showToast('Transaksi berhasil disimpan!');
        setShowForm(false);
        setForm({ deskripsi:'', jenis:'masuk', nominal:'', program:'Sembako', donatur_nama:'', tanggal: new Date().toISOString().slice(0,10) });
        loadData();
      } else {
        showToast(result.message || 'Gagal menyimpan', 'err');
      }
    } catch { showToast('Tidak dapat terhubung ke server', 'err'); }
    setSaving(false);
  };

  const handleDelete = async (id) => {
    if (!confirm('Hapus transaksi ini?')) return;
    try {
      const result = await transaksiAPI.remove(id);
      if (result.success) { showToast('Transaksi dihapus.'); loadData(); }
      else showToast(result.message || 'Gagal menghapus', 'err');
    } catch { showToast('Gagal menghapus', 'err'); }
  };

  return (
    <div style={{ display:'flex', minHeight:'100vh', background:'#f5f5f5', fontFamily:'Poppins,sans-serif' }}>
      <AdminSidebar />
      <main style={{ flex:1, padding:'32px 28px', overflowY:'auto' }}>

        {/* Header */}
        <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:24, flexWrap:'wrap', gap:12 }}>
          <div>
            <h1 style={{ fontSize:'1.4rem', fontWeight:900, color:'#1a1a1a', marginBottom:4 }}>💳 Transaksi</h1>
            <p style={{ fontSize:12, color:'#aaa' }}>Data dari server · MySQL</p>
          </div>
          <button onClick={()=>setShowForm(!showForm)} style={{ padding:'11px 20px', background:'#C0392B', color:'#fff', border:'none', borderRadius:14, fontFamily:'Poppins,sans-serif', fontSize:13, fontWeight:700, cursor:'pointer' }}>
            ➕ Input Transaksi
          </button>
        </div>

        {/* Toast */}
        <AnimatePresence>
          {toast.msg && (
            <motion.div initial={{opacity:0,y:-8}} animate={{opacity:1,y:0}} exit={{opacity:0}}
              style={{ background: toast.type==='err'?'rgba(192,57,43,0.1)':'rgba(30,132,73,0.1)', border:`1px solid ${toast.type==='err'?'rgba(192,57,43,0.25)':'rgba(30,132,73,0.25)'}`, borderRadius:12, padding:'12px 16px', marginBottom:16, fontSize:13, fontWeight:600, color: toast.type==='err'?'#C0392B':'#1E8449' }}>
              {toast.type==='err'?'⚠️':'✅'} {toast.msg}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Saldo cards */}
        <div style={{ display:'grid', gridTemplateColumns:'repeat(3,1fr)', gap:12, marginBottom:24 }}>
          {[
            { label:'Pemasukan', value:fmt(summary.total_masuk),  color:'#1E8449', icon:'⬇️' },
            { label:'Pengeluaran',value:fmt(summary.total_keluar), color:'#C0392B', icon:'⬆️' },
            { label:'Saldo',     value:fmt(summary.saldo),         color:'#1A5276', icon:'💰' },
          ].map((s,i) => (
            <div key={i} style={{ background:'#fff', borderRadius:16, padding:'16px 18px', border:'1.5px solid #f0f0f0' }}>
              <div style={{ fontSize:20, marginBottom:8 }}>{s.icon}</div>
              <div style={{ fontSize:'1.1rem', fontWeight:900, color:s.color }}>{s.value}</div>
              <div style={{ fontSize:11, color:'#aaa', marginTop:4 }}>{s.label}</div>
            </div>
          ))}
        </div>

        {/* Form */}
        <AnimatePresence>
          {showForm && (
            <motion.div initial={{opacity:0,height:0}} animate={{opacity:1,height:'auto'}} exit={{opacity:0,height:0}} style={{ overflow:'hidden', marginBottom:20 }}>
              <div style={{ background:'#fff', borderRadius:18, border:'1.5px solid rgba(192,57,43,0.2)', padding:'22px' }}>
                <h3 style={{ fontSize:14, fontWeight:800, color:'#1a1a1a', marginBottom:18 }}>➕ Tambah Transaksi</h3>
                <form onSubmit={handleSubmit}>
                  <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fit,minmax(200px,1fr))', gap:12, marginBottom:14 }}>

                    {/* Jenis */}
                    <div>
                      <label style={{ fontSize:11, fontWeight:600, color:'#555', display:'block', marginBottom:5 }}>Jenis</label>
                      <div style={{ display:'flex', gap:8 }}>
                        {['masuk','keluar'].map(j => (
                          <button key={j} type="button" onClick={()=>setForm({...form,jenis:j})} style={{ flex:1, padding:'10px', borderRadius:12, border:'none', cursor:'pointer', fontFamily:'Poppins,sans-serif', fontSize:12, fontWeight:600, background: form.jenis===j ? (j==='masuk'?'#1E8449':'#C0392B') : '#f5f5f5', color: form.jenis===j ? '#fff':'#555' }}>
                            {j==='masuk'?'⬇️ Masuk':'⬆️ Keluar'}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Program */}
                    <div>
                      <label style={{ fontSize:11, fontWeight:600, color:'#555', display:'block', marginBottom:5 }}>Program</label>
                      <select value={form.program} onChange={e=>setForm({...form,program:e.target.value})} style={{ width:'100%', padding:'10px 14px', border:'1.5px solid #f0f0f0', borderRadius:12, fontFamily:'Poppins,sans-serif', fontSize:13, background:'#fafafa', outline:'none' }}>
                        {['Sembako','Donor Darah','Logistik','Umum','Darurat'].map(p=><option key={p}>{p}</option>)}
                      </select>
                    </div>

                    {/* Deskripsi */}
                    <div>
                      <label style={{ fontSize:11, fontWeight:600, color:'#555', display:'block', marginBottom:5 }}>Deskripsi</label>
                      <input type="text" placeholder="Keterangan transaksi..." value={form.deskripsi} onChange={e=>setForm({...form,deskripsi:e.target.value})} required
                        style={{ width:'100%', padding:'10px 14px', border:'1.5px solid #f0f0f0', borderRadius:12, fontFamily:'Poppins,sans-serif', fontSize:13, background:'#fafafa', outline:'none', boxSizing:'border-box' }}/>
                    </div>

                    {/* Nominal */}
                    <div>
                      <label style={{ fontSize:11, fontWeight:600, color:'#555', display:'block', marginBottom:5 }}>Nominal (Rp)</label>
                      <input type="number" placeholder="0" value={form.nominal} onChange={e=>setForm({...form,nominal:e.target.value})} required min="1"
                        style={{ width:'100%', padding:'10px 14px', border:'1.5px solid #f0f0f0', borderRadius:12, fontFamily:'Poppins,sans-serif', fontSize:13, background:'#fafafa', outline:'none', boxSizing:'border-box' }}/>
                    </div>

                    {/* Donatur */}
                    {form.jenis === 'masuk' && (
                      <div>
                        <label style={{ fontSize:11, fontWeight:600, color:'#555', display:'block', marginBottom:5 }}>Nama Donatur</label>
                        <input type="text" placeholder="Anonim jika tidak ada" value={form.donatur_nama} onChange={e=>setForm({...form,donatur_nama:e.target.value})}
                          style={{ width:'100%', padding:'10px 14px', border:'1.5px solid #f0f0f0', borderRadius:12, fontFamily:'Poppins,sans-serif', fontSize:13, background:'#fafafa', outline:'none', boxSizing:'border-box' }}/>
                      </div>
                    )}

                    {/* Tanggal */}
                    <div>
                      <label style={{ fontSize:11, fontWeight:600, color:'#555', display:'block', marginBottom:5 }}>Tanggal</label>
                      <input type="date" value={form.tanggal} onChange={e=>setForm({...form,tanggal:e.target.value})} required
                        style={{ width:'100%', padding:'10px 14px', border:'1.5px solid #f0f0f0', borderRadius:12, fontFamily:'Poppins,sans-serif', fontSize:13, background:'#fafafa', outline:'none', boxSizing:'border-box' }}/>
                    </div>
                  </div>

                  <div style={{ display:'flex', gap:10 }}>
                    <button type="submit" disabled={saving} style={{ padding:'11px 24px', background: saving ? '#ccc':'#C0392B', color:'#fff', border:'none', borderRadius:12, fontFamily:'Poppins,sans-serif', fontSize:13, fontWeight:700, cursor: saving?'not-allowed':'pointer' }}>
                      {saving ? '⏳ Menyimpan...' : '✅ Simpan Transaksi'}
                    </button>
                    <button type="button" onClick={()=>setShowForm(false)} style={{ padding:'11px 18px', background:'#f5f5f5', color:'#555', border:'none', borderRadius:12, fontFamily:'Poppins,sans-serif', fontSize:13, cursor:'pointer' }}>Batal</button>
                  </div>
                </form>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Tabel */}
        <div style={{ background:'#fff', borderRadius:18, border:'1.5px solid #f0f0f0', overflow:'hidden' }}>
          <div style={{ padding:'16px 20px', borderBottom:'1px solid #f0f0f0', display:'flex', gap:8, alignItems:'center', justifyContent:'space-between', flexWrap:'wrap' }}>
            <div style={{ display:'flex', gap:8 }}>
              {['semua','masuk','keluar'].map(f => (
                <button key={f} onClick={()=>setFilter(f)} style={{ padding:'6px 16px', borderRadius:20, border:'none', cursor:'pointer', fontFamily:'Poppins,sans-serif', fontSize:11, fontWeight:600, background: filter===f?'#C0392B':'#f5f5f5', color: filter===f?'#fff':'#666' }}>
                  {f==='semua'?'Semua':f==='masuk'?'⬇️ Masuk':'⬆️ Keluar'}
                </button>
              ))}
            </div>
            <span style={{ fontSize:11, color:'#aaa' }}>{loading ? 'Memuat...' : `${data.length} transaksi`}</span>
          </div>

          {loading ? (
            <div style={{ padding:'40px', textAlign:'center', color:'#aaa', fontSize:13 }}>⏳ Memuat data dari server...</div>
          ) : data.length === 0 ? (
            <div style={{ padding:'40px', textAlign:'center', color:'#aaa', fontSize:13 }}>Belum ada transaksi</div>
          ) : (
            <div style={{ overflowX:'auto' }}>
              <table style={{ width:'100%', borderCollapse:'collapse', fontSize:13 }}>
                <thead>
                  <tr style={{ background:'#fafafa' }}>
                    {['Tanggal','Keterangan','Program','Donatur','Nominal','Aksi'].map(h => (
                      <th key={h} style={{ padding:'12px 16px', textAlign:'left', fontSize:11, fontWeight:700, color:'#aaa', borderBottom:'1px solid #f0f0f0', whiteSpace:'nowrap' }}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {data.map((tx, i) => (
                    <tr key={tx.id} style={{ borderBottom:'1px solid #f8f8f8' }}>
                      <td style={{ padding:'12px 16px', color:'#888', fontSize:12, whiteSpace:'nowrap' }}>{tx.tanggal}</td>
                      <td style={{ padding:'12px 16px', color:'#1a1a1a', fontWeight:500 }}>{tx.deskripsi}</td>
                      <td style={{ padding:'12px 16px' }}>
                        <span style={{ background:'rgba(26,82,118,0.1)', color:'#1A5276', padding:'2px 10px', borderRadius:10, fontSize:11, fontWeight:600 }}>{tx.program}</span>
                      </td>
                      <td style={{ padding:'12px 16px', color:'#666', fontSize:12 }}>{tx.donatur_nama || '-'}</td>
                      <td style={{ padding:'12px 16px', fontWeight:700, color: tx.jenis==='masuk'?'#1E8449':'#C0392B', whiteSpace:'nowrap' }}>
                        {tx.jenis==='masuk'?'+':'-'}{fmt(tx.nominal)}
                      </td>
                      <td style={{ padding:'12px 16px' }}>
                        <button onClick={()=>handleDelete(tx.id)} style={{ background:'rgba(192,57,43,0.1)', color:'#C0392B', border:'none', borderRadius:8, padding:'5px 10px', fontFamily:'Poppins,sans-serif', fontSize:11, fontWeight:700, cursor:'pointer' }}>
                          Hapus
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
