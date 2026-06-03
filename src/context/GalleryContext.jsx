import { createContext, useContext, useState } from 'react';

// ── Lokasi tampil yang bisa dipilih saat upload ──────────────
export const LOKASI_OPTIONS = [
  { id:'homepage',   label:'Beranda (Hero Slider)',   icon:'🏠', desc:'Tampil di slider hero halaman utama' },
  { id:'kegiatan',   label:'Halaman Kampanye',         icon:'📋', desc:'Tampil di galeri kegiatan/kampanye' },
  { id:'relawan',    label:'Halaman Relawan',           icon:'👥', desc:'Tampil di galeri aksi relawan' },
  { id:'donasi',     label:'Halaman Donasi',            icon:'💝', desc:'Tampil di galeri dampak donasi' },
  { id:'semua',      label:'Semua Halaman',             icon:'🌐', desc:'Tampil di semua galeri publik' },
];

// ── Data awal (pakai foto dari assets) ──────────────────────
const INIT_FOTOS = [
  {
    id:1, nama:'Pembagian Sembako Kateman',
    program:'Sembako', lokasi:['homepage','kegiatan'],
    tgl:'30 Mei 2026', uploader:'Sapri',
    url:'https://images.unsplash.com/photo-1593113598332-cd288d649433?w=600',
    aktif:true,
  },
  {
    id:2, nama:'Tim Relawan Sei Guntung',
    program:'Relawan', lokasi:['relawan','semua'],
    tgl:'28 Mei 2026', uploader:'Dewi',
    url:'https://images.unsplash.com/photo-1532629345422-7515f3d16bb6?w=600',
    aktif:true,
  },
  {
    id:3, nama:'Kegiatan Donor Darah',
    program:'Donor Darah', lokasi:['homepage','donasi'],
    tgl:'25 Mei 2026', uploader:'Admin',
    url:'https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=600',
    aktif:true,
  },
  {
    id:4, nama:'Kunjungan Rumah Warga',
    program:'Kunjungan', lokasi:['kegiatan'],
    tgl:'20 Mei 2026', uploader:'Budi',
    url:'https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=600',
    aktif:true,
  },
  {
    id:5, nama:'Pengiriman Logistik Motor',
    program:'Logistik', lokasi:['kegiatan','relawan'],
    tgl:'15 Mei 2026', uploader:'Sapri',
    url:'https://images.unsplash.com/photo-1542273917363-3b1817f69a2d?w=600',
    aktif:true,
  },
];

const GalleryContext = createContext(null);

export function GalleryProvider({ children }) {
  const [fotos, setFotos] = useState(INIT_FOTOS);

  // Ambil foto berdasarkan lokasi halaman
  const getFotosByLokasi = (lokasi) =>
    fotos.filter(f => f.aktif && (f.lokasi.includes(lokasi) || f.lokasi.includes('semua')));

  const addFoto = (foto) => {
    const baru = {
      ...foto,
      id: Date.now(),
      tgl: new Date().toLocaleDateString('id-ID', { day:'numeric', month:'long', year:'numeric' }),
      aktif: true,
    };
    setFotos(prev => [baru, ...prev]);
    return baru;
  };

  const deleteFoto = (id) => setFotos(prev => prev.filter(f => f.id !== id));

  const toggleAktif = (id) => setFotos(prev =>
    prev.map(f => f.id === id ? { ...f, aktif: !f.aktif } : f)
  );

  const updateLokasi = (id, lokasi) => setFotos(prev =>
    prev.map(f => f.id === id ? { ...f, lokasi } : f)
  );

  return (
    <GalleryContext.Provider value={{ fotos, getFotosByLokasi, addFoto, deleteFoto, toggleAktif, updateLokasi }}>
      {children}
    </GalleryContext.Provider>
  );
}

export const useGallery = () => useContext(GalleryContext);
