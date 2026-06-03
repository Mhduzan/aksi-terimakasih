// src/utils/api.js
// Pasang file ini di frontend React untuk koneksi ke backend ATK

const BASE = import.meta.env.VITE_API_URL || 'http://localhost:5000';

// ── Helper fetch ──────────────────────────────────────────────
async function apiFetch(endpoint, options = {}) {
  const token = localStorage.getItem('atk_token');

  const headers = {
    ...options.headers,
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
  };

  // Jangan set Content-Type jika body adalah FormData (upload file)
  if (!(options.body instanceof FormData)) {
    headers['Content-Type'] = 'application/json';
  }

  const res = await fetch(`${BASE}/api${endpoint}`, { ...options, headers });
  const data = await res.json();

  // Auto logout jika token expired
  if (res.status === 401) {
    localStorage.removeItem('atk_token');
    localStorage.removeItem('atk_user');
    window.location.href = '/login';
  }

  return { ok: res.ok, status: res.status, ...data };
}

// ── Auth ──────────────────────────────────────────────────────
export const authAPI = {
  login: (username, password) =>
    apiFetch('/auth/login', { method:'POST', body: JSON.stringify({ username, password }) }),

  me: () => apiFetch('/auth/me'),

  logout: () => apiFetch('/auth/logout', { method:'POST' }),
};

// ── Dashboard ─────────────────────────────────────────────────
export const dashboardAPI = {
  stats: () => apiFetch('/dashboard/stats'),
};

// ── Transaksi ─────────────────────────────────────────────────
export const transaksiAPI = {
  getAll: (params = {}) => {
    const qs = new URLSearchParams(params).toString();
    return apiFetch(`/transaksi${qs ? '?'+qs : ''}`);
  },
  create: (data) =>
    apiFetch('/transaksi', { method:'POST', body: JSON.stringify(data) }),
  remove: (id) =>
    apiFetch(`/transaksi/${id}`, { method:'DELETE' }),
  laporan: () => apiFetch('/transaksi/laporan'),
};

// ── Donatur ───────────────────────────────────────────────────
export const donaturAPI = {
  getAll: (params = {}) => {
    const qs = new URLSearchParams(params).toString();
    return apiFetch(`/donatur${qs ? '?'+qs : ''}`);
  },
  create: (data) =>
    apiFetch('/donatur', { method:'POST', body: JSON.stringify(data) }),
  remove: (id) =>
    apiFetch(`/donatur/${id}`, { method:'DELETE' }),
};

// ── Galeri ────────────────────────────────────────────────────
export const galeriAPI = {
  getAll: (params = {}) => {
    const qs = new URLSearchParams(params).toString();
    return apiFetch(`/galeri${qs ? '?'+qs : ''}`);
  },

  // Upload file (FormData)
  upload: (file, meta = {}) => {
    const form = new FormData();
    form.append('foto', file);
    form.append('nama', meta.nama || '');
    form.append('program', meta.program || 'Umum');
    form.append('lokasi', JSON.stringify(meta.lokasi || []));
    return apiFetch('/galeri/upload', { method:'POST', body: form });
  },

  toggleAktif: (id) =>
    apiFetch(`/galeri/${id}/aktif`, { method:'PATCH' }),

  updateLokasi: (id, lokasi) =>
    apiFetch(`/galeri/${id}/lokasi`, { method:'PATCH', body: JSON.stringify({ lokasi }) }),

  remove: (id) =>
    apiFetch(`/galeri/${id}`, { method:'DELETE' }),
};

// ── Anggota ───────────────────────────────────────────────────
export const anggotaAPI = {
  getAll: () => apiFetch('/anggota'),
  create: (data) =>
    apiFetch('/anggota', { method:'POST', body: JSON.stringify(data) }),
  toggleStatus: (id) =>
    apiFetch(`/anggota/${id}/status`, { method:'PATCH' }),
  remove: (id) =>
    apiFetch(`/anggota/${id}`, { method:'DELETE' }),
};
