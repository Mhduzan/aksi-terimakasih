import { useState } from 'react';
import { motion } from 'framer-motion';
import AdminSidebar from '../components/auth/AdminSidebar';

const LAPORAN = [
  { bulan:'Januari 2026', masuk:8500000,  keluar:3200000 },
  { bulan:'Februari 2026',masuk:12000000, keluar:4500000 },
  { bulan:'Maret 2026',   masuk:9800000,  keluar:5100000 },
  { bulan:'April 2026',   masuk:15000000, keluar:6800000 },
  { bulan:'Mei 2026',     masuk:18500000, keluar:7200000 },
];

const fmt  = n => 'Rp ' + Number(n).toLocaleString('id-ID');
const fmtK = n => n >= 1000000 ? `${(n/1000000).toFixed(1)}jt` : `${(n/1000).toFixed(0)}rb`;

export default function LaporanPage() {
  const [bulan, setBulan] = useState('Semua');

  const totalMasuk  = LAPORAN.reduce((a,l)=>a+l.masuk,0);
  const totalKeluar = LAPORAN.reduce((a,l)=>a+l.keluar,0);
  const saldo       = totalMasuk - totalKeluar;
  const maxVal      = Math.max(...LAPORAN.map(l=>l.masuk));

  const handlePrint = () => window.print();

  const handleExport = () => {
    const rows = [
      ['Bulan','Pemasukan','Pengeluaran','Saldo'],
      ...LAPORAN.map(l=>[l.bulan, l.masuk, l.keluar, l.masuk-l.keluar]),
      ['TOTAL', totalMasuk, totalKeluar, saldo],
    ];
    const csv = rows.map(r=>r.join(',')).join('\n');
    const blob = new Blob([csv], { type:'text/csv' });
    const url  = URL.createObjectURL(blob);
    const a    = document.createElement('a');
    a.href = url; a.download = 'laporan-atk.csv'; a.click();
  };

  return (
    <div style={{ display:'flex', minHeight:'100vh', background:'#f5f5f5', fontFamily:'Poppins,sans-serif' }}>
      <AdminSidebar />
      <main style={{ flex:1, padding:'32px 28px', overflowY:'auto' }}>

        {/* Header */}
        <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:24, flexWrap:'wrap', gap:12 }}>
          <div>
            <h1 style={{ fontSize:'1.4rem', fontWeight:900, color:'#1a1a1a', marginBottom:4 }}>📊 Laporan Keuangan</h1>
            <p style={{ fontSize:12, color:'#aaa' }}>Rekap pemasukan & pengeluaran komunitas</p>
          </div>
          <div style={{ display:'flex', gap:8 }}>
            <button onClick={handleExport} style={{
              padding:'10px 18px', background:'rgba(26,82,118,0.1)', color:'#1A5276',
              border:'1.5px solid rgba(26,82,118,0.2)', borderRadius:12,
              fontFamily:'Poppins,sans-serif', fontSize:12, fontWeight:700, cursor:'pointer',
            }}>📥 Export CSV</button>
            <button onClick={handlePrint} style={{
              padding:'10px 18px', background:'#C0392B', color:'#fff', border:'none',
              borderRadius:12, fontFamily:'Poppins,sans-serif', fontSize:12, fontWeight:700, cursor:'pointer',
            }}>🖨️ Cetak</button>
          </div>
        </div>

        {/* Summary cards */}
        <div style={{ display:'grid', gridTemplateColumns:'repeat(3,1fr)', gap:14, marginBottom:24 }}>
          {[
            { label:'Total Pemasukan', value:fmt(totalMasuk),  color:'#1E8449', icon:'⬇️' },
            { label:'Total Pengeluaran',value:fmt(totalKeluar), color:'#C0392B', icon:'⬆️' },
            { label:'Saldo Bersih',    value:fmt(saldo),        color:'#1A5276', icon:'💰' },
          ].map((s,i)=>(
            <motion.div key={i} initial={{opacity:0,y:16}} animate={{opacity:1,y:0}} transition={{delay:i*0.08}}
              style={{ background:'#fff', borderRadius:16, padding:'18px', border:'1.5px solid #f0f0f0' }}>
              <div style={{ fontSize:22, marginBottom:8 }}>{s.icon}</div>
              <div style={{ fontSize:'1.15rem', fontWeight:900, color:s.color }}>{s.value}</div>
              <div style={{ fontSize:11, color:'#aaa', marginTop:4 }}>{s.label}</div>
            </motion.div>
          ))}
        </div>

        {/* Chart bar sederhana */}
        <motion.div initial={{opacity:0,y:20}} animate={{opacity:1,y:0}} transition={{delay:0.25}}
          style={{ background:'#fff', borderRadius:18, border:'1.5px solid #f0f0f0', padding:'22px', marginBottom:20 }}>
          <h3 style={{ fontSize:14, fontWeight:800, color:'#1a1a1a', marginBottom:20 }}>Grafik Pemasukan & Pengeluaran</h3>
          <div style={{ display:'flex', alignItems:'flex-end', gap:16, height:160 }}>
            {LAPORAN.map((l,i)=>(
              <div key={i} style={{ flex:1, display:'flex', flexDirection:'column', alignItems:'center', gap:4 }}>
                <div style={{ display:'flex', gap:4, alignItems:'flex-end', width:'100%' }}>
                  {/* Bar masuk */}
                  <motion.div
                    initial={{ height:0 }} animate={{ height: `${(l.masuk/maxVal)*130}px` }}
                    transition={{ delay:i*0.1+0.3, duration:0.6, ease:'easeOut' }}
                    style={{
                      flex:1, background:'linear-gradient(to top,#1E8449,#27AE60)',
                      borderRadius:'4px 4px 0 0', minHeight:4,
                    }}
                    title={`Masuk: ${fmt(l.masuk)}`}
                  />
                  {/* Bar keluar */}
                  <motion.div
                    initial={{ height:0 }} animate={{ height: `${(l.keluar/maxVal)*130}px` }}
                    transition={{ delay:i*0.1+0.4, duration:0.6, ease:'easeOut' }}
                    style={{
                      flex:1, background:'linear-gradient(to top,#C0392B,#E74C3C)',
                      borderRadius:'4px 4px 0 0', minHeight:4,
                    }}
                    title={`Keluar: ${fmt(l.keluar)}`}
                  />
                </div>
                <div style={{ fontSize:9, color:'#aaa', textAlign:'center', whiteSpace:'nowrap' }}>
                  {l.bulan.split(' ')[0]}
                </div>
              </div>
            ))}
          </div>
          {/* Legend */}
          <div style={{ display:'flex', gap:16, marginTop:12, justifyContent:'center' }}>
            {[['#27AE60','Pemasukan'],['#C0392B','Pengeluaran']].map(([c,l])=>(
              <div key={l} style={{ display:'flex', alignItems:'center', gap:6, fontSize:11, color:'#666' }}>
                <div style={{ width:12, height:12, background:c, borderRadius:3 }}/>
                {l}
              </div>
            ))}
          </div>
        </motion.div>

        {/* Tabel laporan */}
        <motion.div initial={{opacity:0,y:20}} animate={{opacity:1,y:0}} transition={{delay:0.4}}
          style={{ background:'#fff', borderRadius:18, border:'1.5px solid #f0f0f0', overflow:'hidden' }}>
          <div style={{ padding:'16px 20px', borderBottom:'1px solid #f0f0f0' }}>
            <h3 style={{ fontSize:14, fontWeight:800, color:'#1a1a1a' }}>Rekap Per Bulan</h3>
          </div>
          <table style={{ width:'100%', borderCollapse:'collapse', fontSize:13 }}>
            <thead>
              <tr style={{ background:'#fafafa' }}>
                {['Bulan','Pemasukan','Pengeluaran','Saldo','Status'].map(h=>(
                  <th key={h} style={{ padding:'12px 16px', textAlign:'left', fontSize:11, fontWeight:700, color:'#aaa', borderBottom:'1px solid #f0f0f0' }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {LAPORAN.map((l,i)=>{
                const s = l.masuk - l.keluar;
                return (
                  <tr key={i} style={{ borderBottom:'1px solid #f8f8f8' }}>
                    <td style={{ padding:'12px 16px', fontWeight:600, color:'#1a1a1a' }}>{l.bulan}</td>
                    <td style={{ padding:'12px 16px', color:'#1E8449', fontWeight:600 }}>+{fmt(l.masuk)}</td>
                    <td style={{ padding:'12px 16px', color:'#C0392B', fontWeight:600 }}>-{fmt(l.keluar)}</td>
                    <td style={{ padding:'12px 16px', fontWeight:700, color: s>=0?'#1A5276':'#C0392B' }}>{fmt(s)}</td>
                    <td style={{ padding:'12px 16px' }}>
                      <span style={{
                        background: s>=0?'rgba(30,132,73,0.1)':'rgba(192,57,43,0.1)',
                        color: s>=0?'#1E8449':'#C0392B',
                        padding:'3px 10px', borderRadius:10, fontSize:11, fontWeight:700,
                      }}>
                        {s>=0?'✅ Surplus':'⚠️ Defisit'}
                      </span>
                    </td>
                  </tr>
                );
              })}
              {/* Total row */}
              <tr style={{ background:'rgba(192,57,43,0.04)', borderTop:'2px solid rgba(192,57,43,0.15)' }}>
                <td style={{ padding:'14px 16px', fontWeight:800, color:'#1a1a1a' }}>TOTAL</td>
                <td style={{ padding:'14px 16px', color:'#1E8449', fontWeight:800 }}>+{fmt(totalMasuk)}</td>
                <td style={{ padding:'14px 16px', color:'#C0392B', fontWeight:800 }}>-{fmt(totalKeluar)}</td>
                <td style={{ padding:'14px 16px', color:'#1A5276', fontWeight:900 }}>{fmt(saldo)}</td>
                <td style={{ padding:'14px 16px' }}>
                  <span style={{ background:'rgba(26,82,118,0.1)', color:'#1A5276', padding:'3px 10px', borderRadius:10, fontSize:11, fontWeight:700 }}>
                    Akumulasi
                  </span>
                </td>
              </tr>
            </tbody>
          </table>
        </motion.div>
      </main>
    </div>
  );
}
