import { useState, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import AdminSidebar from '../components/auth/AdminSidebar';
import { useAuth } from '../context/AuthContext';
import { useGallery, LOKASI_OPTIONS } from '../context/GalleryContext';

export default function GaleriUploadPage() {
  const { user } = useAuth();
  const { fotos, addFoto, deleteFoto, toggleAktif, updateLokasi } = useGallery();

  const [showForm, setShowForm]   = useState(false);
  const [preview, setPreview]     = useState(null);
  const [toast, setToast]         = useState({ msg:'', type:'ok' });
  const [filter, setFilter]       = useState('Semua');
  const [isDragging, setIsDragging] = useState(false);
  const [editLokasi, setEditLokasi] = useState(null);

  const [form, setForm] = useState({ nama:'', program:'Sembako', lokasi:[] });
  const [imgData, setImgData] = useState(null);
  const [imgFile, setImgFile] = useState(null);
  const fileInputRef = useRef(null);

  const showToast = (msg, type='ok') => {
    setToast({ msg, type });
    setTimeout(() => setToast({ msg:'', type:'ok' }), 3000);
  };

  const readFile = (file) => {
    if (!file || !file.type.startsWith('image/')) {
      showToast('File harus berupa gambar (JPG, PNG, WebP)', 'err'); return;
    }
    if (file.size > 5 * 1024 * 1024) {
      showToast('Ukuran gambar maksimal 5MB', 'err'); return;
    }
    const reader = new FileReader();
    reader.onload = (e) => {
      setImgData(e.target.result);
      setImgFile(file);
      if (!form.nama) setForm(f => ({ ...f, nama: file.name.replace(/\.[^.]+$/, '').replace(/[-_]/g,' ') }));
    };
    reader.readAsDataURL(file);
  };

  const handleFileChange = (e) => { const f = e.target.files?.[0]; if(f) readFile(f); };

  const handleDrop = useCallback((e) => {
    e.preventDefault(); setIsDragging(false);
    const f = e.dataTransfer.files?.[0]; if(f) readFile(f);
  }, []);

  const toggleLokasi = (id) => setForm(f => ({
    ...f,
    lokasi: f.lokasi.includes(id) ? f.lokasi.filter(l=>l!==id) : [...f.lokasi, id],
  }));

  const handleSave = (e) => {
    e.preventDefault();
    if (!imgData) { showToast('Pilih gambar terlebih dahulu', 'err'); return; }
    if (form.lokasi.length === 0) { showToast('Pilih minimal 1 lokasi tampil', 'err'); return; }
    addFoto({ nama: form.nama || 'Foto Kegiatan', program: form.program, lokasi: form.lokasi, uploader: user?.name || 'Admin', url: imgData });
    setForm({ nama:'', program:'Sembako', lokasi:[] });
    setImgData(null); setImgFile(null); setShowForm(false);
    showToast('Foto berhasil diupload dan dipasang!');
  };

  const programs = ['Semua','Sembako','Relawan','Donor Darah','Kunjungan','Logistik','Umum'];
  const filtered = filter === 'Semua' ? fotos : fotos.filter(f => f.program === filter);

  return (
    <div style={{ display:'flex', minHeight:'100vh', background:'#f5f5f5', fontFamily:'Poppins,sans-serif' }}>
      <AdminSidebar />
      <main style={{ flex:1, padding:'32px 28px', overflowY:'auto' }}>

        {/* Header */}
        <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:24, flexWrap:'wrap', gap:12 }}>
          <div>
            <h1 style={{ fontSize:'1.4rem', fontWeight:900, color:'#1a1a1a', marginBottom:4 }}>📸 Upload Galeri</h1>
            <p style={{ fontSize:12, color:'#aaa' }}>Upload foto & atur di halaman mana foto ditampilkan untuk pengunjung</p>
          </div>
          <button onClick={()=>setShowForm(!showForm)} style={{
            padding:'11px 20px', background:'#C0392B', color:'#fff', border:'none',
            borderRadius:14, fontFamily:'Poppins,sans-serif', fontSize:13, fontWeight:700, cursor:'pointer',
          }}>📸 Upload Foto Baru</button>
        </div>

        {/* Toast */}
        <AnimatePresence>
          {toast.msg && (
            <motion.div initial={{opacity:0,y:-8}} animate={{opacity:1,y:0}} exit={{opacity:0}}
              style={{
                background: toast.type==='err' ? 'rgba(192,57,43,0.1)' : 'rgba(30,132,73,0.1)',
                border: `1px solid ${toast.type==='err' ? 'rgba(192,57,43,0.25)' : 'rgba(30,132,73,0.25)'}`,
                borderRadius:12, padding:'12px 16px', marginBottom:16,
                fontSize:13, fontWeight:600, color: toast.type==='err' ? '#C0392B' : '#1E8449',
              }}>
              {toast.type==='err' ? '⚠️' : '✅'} {toast.msg}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Stats */}
        <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fit,minmax(130px,1fr))', gap:12, marginBottom:22 }}>
          {[
            { label:'Total Foto',   value:fotos.length,                          icon:'🖼️', color:'#C0392B' },
            { label:'Aktif',        value:fotos.filter(f=>f.aktif).length,        icon:'✅', color:'#1E8449' },
            { label:'Tersembunyi',  value:fotos.filter(f=>!f.aktif).length,       icon:'👁️', color:'#888'   },
            { label:'Halaman',      value:new Set(fotos.flatMap(f=>f.lokasi)).size,icon:'📄', color:'#1A5276' },
          ].map((s,i)=>(
            <div key={i} style={{ background:'#fff', borderRadius:16, padding:'14px 16px', border:'1.5px solid #f0f0f0' }}>
              <div style={{ fontSize:20, marginBottom:6 }}>{s.icon}</div>
              <div style={{ fontSize:'1.2rem', fontWeight:900, color:s.color }}>{s.value}</div>
              <div style={{ fontSize:11, color:'#aaa', marginTop:3 }}>{s.label}</div>
            </div>
          ))}
        </div>

        {/* ═══ FORM UPLOAD ═══ */}
        <AnimatePresence>
          {showForm && (
            <motion.div initial={{opacity:0,height:0}} animate={{opacity:1,height:'auto'}} exit={{opacity:0,height:0}}
              style={{ overflow:'hidden', marginBottom:20 }}>
              <div style={{ background:'#fff', borderRadius:18, border:'1.5px solid rgba(192,57,43,0.2)', padding:'24px' }}>
                <h3 style={{ fontSize:14, fontWeight:800, color:'#1a1a1a', marginBottom:20 }}>📸 Upload Foto Kegiatan</h3>
                <form onSubmit={handleSave}>

                  {/* DROP ZONE */}
                  <div
                    onClick={()=>fileInputRef.current?.click()}
                    onDrop={handleDrop}
                    onDragOver={(e)=>{e.preventDefault();setIsDragging(true);}}
                    onDragLeave={()=>setIsDragging(false)}
                    style={{
                      border: isDragging ? '2.5px dashed #C0392B' : imgData ? '2px solid rgba(30,132,73,0.4)' : '2px dashed #ddd',
                      borderRadius:16, padding:'28px 20px', textAlign:'center', cursor:'pointer', marginBottom:20,
                      background: isDragging ? 'rgba(192,57,43,0.04)' : imgData ? 'rgba(30,132,73,0.03)' : '#fafafa',
                      transition:'all .2s',
                    }}>
                    {imgData ? (
                      <div>
                        <div style={{ position:'relative', display:'inline-block', borderRadius:14, overflow:'hidden', marginBottom:12 }}>
                          <img src={imgData} alt="preview" style={{ maxHeight:200, maxWidth:'100%', borderRadius:14, display:'block' }}/>
                          <button type="button"
                            onClick={(e)=>{ e.stopPropagation(); setImgData(null); setImgFile(null); }}
                            style={{ position:'absolute', top:8, right:8, background:'rgba(0,0,0,0.55)', color:'#fff', border:'none', borderRadius:'50%', width:28, height:28, cursor:'pointer', fontSize:14, display:'flex', alignItems:'center', justifyContent:'center' }}>✕</button>
                        </div>
                        <div style={{ fontSize:12, color:'#1E8449', fontWeight:600 }}>✅ {imgFile?.name} · {(imgFile?.size/1024).toFixed(0)} KB</div>
                        <div style={{ fontSize:11, color:'#aaa', marginTop:4 }}>Klik untuk ganti foto</div>
                      </div>
                    ) : (
                      <div>
                        <div style={{ fontSize:48, marginBottom:12 }}>📁</div>
                        <div style={{ fontSize:14, fontWeight:700, color: isDragging?'#C0392B':'#555', marginBottom:6 }}>
                          {isDragging ? 'Lepaskan untuk upload!' : 'Klik atau drag & drop foto di sini'}
                        </div>
                        <div style={{ fontSize:12, color:'#aaa', marginBottom:14 }}>JPG, PNG, WebP · Maks. 5MB</div>
                        <div style={{ display:'inline-block', padding:'9px 22px', background:'#C0392B', color:'#fff', borderRadius:30, fontSize:12, fontWeight:700 }}>
                          📂 Pilih dari Galeri / File Manager
                        </div>
                      </div>
                    )}
                    <input ref={fileInputRef} type="file" accept="image/*" onChange={handleFileChange} style={{ display:'none' }}/>
                  </div>

                  {/* Info foto */}
                  <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fit,minmax(200px,1fr))', gap:12, marginBottom:20 }}>
                    <div>
                      <label style={{ fontSize:11, fontWeight:600, color:'#555', display:'block', marginBottom:5 }}>Keterangan Foto</label>
                      <input type="text" placeholder="Deskripsi singkat foto..." value={form.nama}
                        onChange={e=>setForm({...form,nama:e.target.value})}
                        style={{ width:'100%', padding:'10px 14px', border:'1.5px solid #f0f0f0', borderRadius:12, fontFamily:'Poppins,sans-serif', fontSize:13, background:'#fafafa', outline:'none', boxSizing:'border-box' }}/>
                    </div>
                    <div>
                      <label style={{ fontSize:11, fontWeight:600, color:'#555', display:'block', marginBottom:5 }}>Kategori Program</label>
                      <select value={form.program} onChange={e=>setForm({...form,program:e.target.value})}
                        style={{ width:'100%', padding:'10px 14px', border:'1.5px solid #f0f0f0', borderRadius:12, fontFamily:'Poppins,sans-serif', fontSize:13, background:'#fafafa', outline:'none' }}>
                        {['Sembako','Relawan','Donor Darah','Kunjungan','Logistik','Umum'].map(p=><option key={p}>{p}</option>)}
                      </select>
                    </div>
                  </div>

                  {/* Pilih lokasi tampil */}
                  <div style={{ marginBottom:20 }}>
                    <label style={{ fontSize:12, fontWeight:700, color:'#1a1a1a', display:'block', marginBottom:10 }}>
                      📍 Tampilkan foto ini di halaman:
                      <span style={{ fontSize:10, color:'#aaa', fontWeight:400, marginLeft:6 }}>pilih satu atau lebih</span>
                    </label>
                    <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fill,minmax(190px,1fr))', gap:8 }}>
                      {LOKASI_OPTIONS.map(opt => {
                        const sel = form.lokasi.includes(opt.id);
                        return (
                          <div key={opt.id} onClick={()=>toggleLokasi(opt.id)} style={{
                            border: sel ? '2px solid #C0392B' : '1.5px solid #f0f0f0',
                            borderRadius:14, padding:'12px 14px', cursor:'pointer',
                            background: sel ? 'rgba(192,57,43,0.05)' : '#fafafa',
                            transition:'all .2s', display:'flex', alignItems:'center', gap:10,
                          }}>
                            <div style={{
                              width:30, height:30, borderRadius:'50%', flexShrink:0, fontSize:14,
                              background: sel ? '#C0392B' : '#f0f0f0',
                              display:'flex', alignItems:'center', justifyContent:'center', transition:'all .2s',
                            }}>{sel ? '✓' : opt.icon}</div>
                            <div>
                              <div style={{ fontSize:12, fontWeight:700, color: sel?'#C0392B':'#1a1a1a' }}>{opt.label}</div>
                              <div style={{ fontSize:10, color:'#aaa' }}>{opt.desc}</div>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                    {form.lokasi.length===0 && <p style={{ fontSize:11, color:'#E74C3C', marginTop:8 }}>⚠️ Pilih minimal 1 lokasi tampil</p>}
                  </div>

                  <div style={{ display:'flex', gap:10 }}>
                    <button type="submit" style={{
                      padding:'11px 26px',
                      background: (form.lokasi.length && imgData) ? '#C0392B' : '#ccc',
                      color:'#fff', border:'none', borderRadius:12,
                      fontFamily:'Poppins,sans-serif', fontSize:13, fontWeight:700,
                      cursor: (form.lokasi.length && imgData) ? 'pointer' : 'not-allowed',
                    }}>✅ Upload & Pasang Foto</button>
                    <button type="button" onClick={()=>{ setShowForm(false); setImgData(null); setImgFile(null); }} style={{
                      padding:'11px 18px', background:'#f5f5f5', color:'#555', border:'none',
                      borderRadius:12, fontFamily:'Poppins,sans-serif', fontSize:13, cursor:'pointer',
                    }}>Batal</button>
                  </div>
                </form>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Filter */}
        <div style={{ display:'flex', gap:8, marginBottom:18, flexWrap:'wrap' }}>
          {programs.map(p=>(
            <button key={p} onClick={()=>setFilter(p)} style={{
              padding:'6px 16px', borderRadius:20, border:'none', cursor:'pointer',
              fontFamily:'Poppins,sans-serif', fontSize:11, fontWeight:600,
              background: filter===p ? '#C0392B' : '#f5f5f5',
              color: filter===p ? '#fff' : '#666',
            }}>{p}</button>
          ))}
        </div>

        {/* Grid foto */}
        <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fill,minmax(210px,1fr))', gap:14 }}>
          {filtered.map((f,i)=>(
            <motion.div key={f.id}
              initial={{opacity:0,scale:0.93}} animate={{opacity:1,scale:1}} transition={{delay:i*0.05}}
              style={{ borderRadius:16, overflow:'hidden', background:'#fff', border:'1.5px solid #f0f0f0', opacity: f.aktif?1:0.6, cursor:'pointer' }}
              whileHover={{ scale:1.02, boxShadow:'0 8px 24px rgba(0,0,0,0.1)' }}
              onClick={()=>{ setPreview(f); setEditLokasi(null); }}>
              <div style={{ position:'relative', height:155 }}>
                <img src={f.url} alt={f.nama} style={{ width:'100%', height:'100%', objectFit:'cover', display:'block' }}/>
                <div style={{ position:'absolute', bottom:0, left:0, right:0, background:'linear-gradient(to top,rgba(0,0,0,0.65),transparent)', padding:'28px 10px 8px' }}>
                  <span style={{ fontSize:9, background:'rgba(192,57,43,0.9)', color:'#fff', padding:'2px 8px', borderRadius:10, fontWeight:700 }}>{f.program}</span>
                </div>
                {!f.aktif && (
                  <div style={{ position:'absolute', top:8, right:8, background:'rgba(0,0,0,0.6)', color:'#fff', fontSize:9, padding:'2px 8px', borderRadius:10, fontWeight:600 }}>Tersembunyi</div>
                )}
                <div style={{ position:'absolute', top:8, left:8, display:'flex', gap:4 }}>
                  {f.lokasi.slice(0,3).map(lid => {
                    const opt = LOKASI_OPTIONS.find(l=>l.id===lid);
                    return opt ? <div key={lid} title={opt.label} style={{ background:'rgba(0,0,0,0.55)', borderRadius:6, padding:'2px 5px', fontSize:11 }}>{opt.icon}</div> : null;
                  })}
                </div>
              </div>
              <div style={{ padding:'10px 12px 12px' }}>
                <div style={{ fontSize:12, fontWeight:700, color:'#1a1a1a', marginBottom:3, overflow:'hidden', textOverflow:'ellipsis', whiteSpace:'nowrap' }}>{f.nama}</div>
                <div style={{ fontSize:10, color:'#aaa' }}>📅 {f.tgl} · 👤 {f.uploader}</div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Modal preview & edit */}
        <AnimatePresence>
          {preview && (
            <motion.div initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}}
              style={{ position:'fixed', inset:0, background:'rgba(0,0,0,0.75)', backdropFilter:'blur(8px)', zIndex:2000, display:'flex', alignItems:'center', justifyContent:'center', padding:20 }}
              onClick={()=>{ setPreview(null); setEditLokasi(null); }}>
              <motion.div initial={{scale:0.85,y:30}} animate={{scale:1,y:0}} exit={{scale:0.85}}
                onClick={e=>e.stopPropagation()}
                style={{ background:'#fff', borderRadius:22, maxWidth:480, width:'100%', overflow:'auto', boxShadow:'0 24px 60px rgba(0,0,0,0.3)', maxHeight:'90vh' }}>
                <img src={preview.url} alt={preview.nama} style={{ width:'100%', height:220, objectFit:'cover', display:'block' }}/>
                <div style={{ padding:'18px 20px' }}>
                  <div style={{ fontWeight:800, fontSize:15, color:'#1a1a1a', marginBottom:6 }}>{preview.nama}</div>
                  <div style={{ display:'flex', gap:8, flexWrap:'wrap', marginBottom:14 }}>
                    <span style={{ fontSize:11, background:'rgba(26,82,118,0.1)', color:'#1A5276', padding:'3px 10px', borderRadius:10, fontWeight:600 }}>{preview.program}</span>
                    <span style={{ fontSize:11, color:'#aaa' }}>📅 {preview.tgl} · 👤 {preview.uploader}</span>
                  </div>

                  {/* Lokasi tampil */}
                  <div style={{ background:'#fafafa', borderRadius:14, padding:'14px', marginBottom:16 }}>
                    <div style={{ fontSize:12, fontWeight:700, color:'#1a1a1a', marginBottom:10 }}>📍 Tampil di halaman:</div>
                    {editLokasi === preview.id ? (
                      <div style={{ display:'flex', flexDirection:'column', gap:8 }}>
                        {LOKASI_OPTIONS.map(opt => {
                          const sel = preview.lokasi.includes(opt.id);
                          return (
                            <div key={opt.id}
                              onClick={()=>{
                                const nl = sel ? preview.lokasi.filter(l=>l!==opt.id) : [...preview.lokasi, opt.id];
                                updateLokasi(preview.id, nl);
                                setPreview({...preview, lokasi:nl});
                              }}
                              style={{ display:'flex', alignItems:'center', gap:10, padding:'8px 12px', borderRadius:10, cursor:'pointer', background: sel?'rgba(192,57,43,0.08)':'#fff', border: sel?'1.5px solid rgba(192,57,43,0.3)':'1.5px solid #f0f0f0' }}>
                              <span style={{ fontSize:16 }}>{sel?'✅':'⬜'}</span>
                              <span style={{ fontSize:12, fontWeight: sel?600:400, color: sel?'#C0392B':'#555' }}>{opt.icon} {opt.label}</span>
                            </div>
                          );
                        })}
                        <button onClick={()=>setEditLokasi(null)} style={{ marginTop:4, padding:'8px', background:'#1E8449', color:'#fff', border:'none', borderRadius:10, fontFamily:'Poppins,sans-serif', fontSize:12, fontWeight:700, cursor:'pointer' }}>✅ Selesai</button>
                      </div>
                    ) : (
                      <div>
                        <div style={{ display:'flex', flexWrap:'wrap', gap:6, marginBottom:10 }}>
                          {preview.lokasi.length > 0
                            ? preview.lokasi.map(lid => {
                                const opt = LOKASI_OPTIONS.find(l=>l.id===lid);
                                return opt ? <span key={lid} style={{ fontSize:11, background:'rgba(192,57,43,0.1)', color:'#C0392B', padding:'4px 10px', borderRadius:20, fontWeight:600 }}>{opt.icon} {opt.label}</span> : null;
                              })
                            : <span style={{ fontSize:12, color:'#aaa' }}>Belum dipasang di halaman manapun</span>
                          }
                        </div>
                        <button onClick={()=>setEditLokasi(preview.id)} style={{ fontSize:11, color:'#1A5276', background:'rgba(26,82,118,0.1)', border:'none', borderRadius:20, padding:'5px 14px', fontFamily:'Poppins,sans-serif', fontWeight:600, cursor:'pointer' }}>✏️ Ubah Lokasi Tampil</button>
                      </div>
                    )}
                  </div>

                  <div style={{ display:'flex', gap:8 }}>
                    <button onClick={()=>{ toggleAktif(preview.id); setPreview({...preview,aktif:!preview.aktif}); }} style={{
                      flex:1, padding:'10px', border:'none', borderRadius:12, cursor:'pointer',
                      fontFamily:'Poppins,sans-serif', fontSize:12, fontWeight:700,
                      background: preview.aktif ? 'rgba(136,136,136,0.1)' : 'rgba(30,132,73,0.1)',
                      color: preview.aktif ? '#888' : '#1E8449',
                    }}>{preview.aktif ? '👁️ Sembunyikan' : '✅ Tampilkan'}</button>
                    <button onClick={()=>{ deleteFoto(preview.id); setPreview(null); showToast('Foto berhasil dihapus.'); }} style={{
                      flex:1, padding:'10px', background:'rgba(192,57,43,0.1)', color:'#C0392B', border:'none', borderRadius:12, fontFamily:'Poppins,sans-serif', fontSize:12, fontWeight:700, cursor:'pointer',
                    }}>🗑️ Hapus</button>
                    <button onClick={()=>{ setPreview(null); setEditLokasi(null); }} style={{
                      flex:1, padding:'10px', background:'#f5f5f5', color:'#555', border:'none', borderRadius:12, fontFamily:'Poppins,sans-serif', fontSize:12, cursor:'pointer',
                    }}>Tutup</button>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </main>
    </div>
  );
}
