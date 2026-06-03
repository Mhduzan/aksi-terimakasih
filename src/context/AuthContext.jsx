import { createContext, useContext, useState, useEffect } from 'react';
import { authAPI } from '../utils/api';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser]       = useState(null);
  const [loading, setLoading] = useState(true);

  // Cek sesi saat pertama load
  useEffect(() => {
    const savedUser  = localStorage.getItem('atk_user');
    const savedToken = localStorage.getItem('atk_token');

    if (savedUser && savedToken) {
      try {
        setUser(JSON.parse(savedUser));
      } catch {
        localStorage.removeItem('atk_user');
        localStorage.removeItem('atk_token');
      }
    }
    setLoading(false);
  }, []);

  // ── Login via API ─────────────────────────────────────────
  const login = async (username, password) => {
    try {
      const result = await authAPI.login(username, password);

      if (!result.success) {
        return { ok: false, msg: result.message || 'Login gagal.' };
      }

      // Simpan token & user ke localStorage
      localStorage.setItem('atk_token', result.token);
      localStorage.setItem('atk_user',  JSON.stringify(result.user));
      setUser(result.user);
      return { ok: true };

    } catch (err) {
      console.error('Login error:', err);
      return { ok: false, msg: 'Tidak dapat terhubung ke server. Pastikan backend berjalan.' };
    }
  };

  // ── Logout ────────────────────────────────────────────────
  const logout = async () => {
    try { await authAPI.logout(); } catch {}
    localStorage.removeItem('atk_token');
    localStorage.removeItem('atk_user');
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{
      user,
      login,
      logout,
      isAdmin:   user?.role === 'admin',
      isAnggota: user?.role === 'anggota' || user?.role === 'admin',
      loading,
    }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
