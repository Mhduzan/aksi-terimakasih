import { motion } from 'framer-motion';
import { useGallery } from '../../context/GalleryContext';

/**
 * Komponen galeri publik — dipakai di halaman pengunjung
 * @param {string} lokasi - id lokasi: 'homepage' | 'kegiatan' | 'relawan' | 'donasi'
 * @param {number} max    - jumlah foto maksimal yang ditampilkan (default 6)
 * @param {string} title  - judul section
 */
export default function GaleriPublik({ lokasi, max = 6, title = 'Galeri Kegiatan' }) {
  const { getFotosByLokasi } = useGallery();
  const fotos = getFotosByLokasi(lokasi).slice(0, max);

  if (fotos.length === 0) return null;

  return (
    <section style={{ padding:'50px 5%', background:'#fafafa', fontFamily:'Poppins,sans-serif' }}>
      <div style={{ maxWidth:1200, margin:'0 auto' }}>
        <div style={{ marginBottom:'2rem' }}>
          <span style={{
            display:'inline-block', background:'rgba(192,57,43,0.08)', color:'#C0392B',
            padding:'.4rem 1rem', borderRadius:50, fontSize:'.82rem', fontWeight:600, marginBottom:'.75rem',
          }}>Dokumentasi</span>
          <h2 style={{ fontSize:'1.7rem', fontWeight:800, color:'#1a1a1a', marginBottom:'.4rem' }}>{title}</h2>
          <p style={{ color:'#888', fontSize:'.88rem' }}>Foto-foto kegiatan nyata di lapangan</p>
        </div>

        <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fill,minmax(230px,1fr))', gap:14 }}>
          {fotos.map((f, i) => (
            <motion.div key={f.id}
              initial={{ opacity:0, y:16 }}
              whileInView={{ opacity:1, y:0 }}
              viewport={{ once:true }}
              transition={{ delay: i * 0.07 }}
              whileHover={{ y:-4, boxShadow:'0 12px 30px rgba(0,0,0,0.12)' }}
              style={{ borderRadius:16, overflow:'hidden', background:'#fff', cursor:'pointer', boxShadow:'0 2px 10px rgba(0,0,0,0.05)' }}>
              <div style={{ position:'relative', height:170, overflow:'hidden' }}>
                <img src={f.url} alt={f.nama}
                  style={{ width:'100%', height:'100%', objectFit:'cover', display:'block', transition:'transform .4s' }}
                  onMouseEnter={e=>e.target.style.transform='scale(1.06)'}
                  onMouseLeave={e=>e.target.style.transform='scale(1)'}
                />
                <div style={{
                  position:'absolute', bottom:0, left:0, right:0,
                  background:'linear-gradient(to top, rgba(0,0,0,0.6), transparent)',
                  padding:'28px 12px 10px',
                }}>
                  <span style={{ fontSize:10, background:'rgba(192,57,43,0.85)', color:'#fff', padding:'2px 8px', borderRadius:10, fontWeight:700 }}>
                    {f.program}
                  </span>
                </div>
              </div>
              <div style={{ padding:'10px 14px 14px' }}>
                <div style={{ fontSize:13, fontWeight:700, color:'#1a1a1a', marginBottom:4, overflow:'hidden', textOverflow:'ellipsis', whiteSpace:'nowrap' }}>{f.nama}</div>
                <div style={{ fontSize:11, color:'#aaa' }}>📅 {f.tgl}</div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
