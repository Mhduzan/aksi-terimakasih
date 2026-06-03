import { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext(null);

const ACCOUNTS = [
  { id:1, username:'admin',   password:'admin123',   role:'admin',   name:'Administrator',     avatar:'https://randomuser.me/api/portraits/men/10.jpg' },
  { id:2, username:'sapri',   password:'sapri123',   role:'anggota', name:'Sapri Koordinator',  avatar:'https://randomuser.me/api/portraits/men/32.jpg' },
  { id:3, username:'dewi',    password:'dewi123',    role:'anggota', name:'Dewi Sekretaris',    avatar:'https://randomuser.me/api/portraits/women/11.jpg' },
  { id:4, username:'budi',    password:'budi123',    role:'anggota', name:'Budi Bendahara',     avatar:'https://randomuser.me/api/portraits/men/11.jpg' },
];

export function AuthProvider({ children }) {
  const [user, setUser]       = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const saved = localStorage.getItem('atk_user');
    if (saved) { try { setUser(JSON.parse(saved)); } catch {} }
    setLoading(false);
  }, []);

  const login = (username, password) => {
    const found = ACCOUNTS.find(a => a.username === username && a.password === password);
    if (!found) return { ok: false, msg: 'Username atau password salah' };
    const { password: _, ...safe } = found;
    localStorage.setItem('atk_user', JSON.stringify(safe));
    setUser(safe);
    return { ok: true };
  };

  const logout = () => {
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
