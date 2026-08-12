import { createContext, useContext, useState, useCallback, useRef } from 'react';
import { VERTS, LEADS } from '../data/fixtures';

const AppContext = createContext(null);

export function AppProvider({ children }) {
  const [screen, setScreen] = useState('overview');
  const [vert, setVert] = useState('all');
  const [role, setRole] = useState('vp'); // 'vp' | 'sdr'
  const [q, setQ] = useState('');
  const [syncing, setSyncing] = useState(false);
  const [toast, setToast] = useState('');
  const toastTimer = useRef(null);

  const flash = useCallback((msg) => {
    setToast(msg);
    clearTimeout(toastTimer.current);
    toastTimer.current = setTimeout(() => setToast(''), 2600);
  }, []);

  const go = useCallback((s) => setScreen(s), []);

  const runSync = useCallback(() => {
    setSyncing(true);
    flash('Manual sync started — this can take a few minutes');
    setTimeout(() => { setSyncing(false); flash('Sync complete'); }, 2200);
  }, [flash]);

  const licensedVerts = VERTS.filter(v => v.licensed).map(v => v.k);
  const scopedLeads = LEADS.filter(l => licensedVerts.includes(l.vert) && (vert === 'all' || l.vert === vert));
  const totalRecords = VERTS.filter(v => v.licensed).reduce((s, v) => s + v.today, 0);
  const benchCount = scopedLeads.length;

  const value = {
    screen, setScreen, go,
    vert, setVert,
    role, setRole,
    q, setQ,
    syncing, runSync,
    toast, flash,
    scopedLeads, benchCount, totalRecords,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export function useApp() {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error('useApp must be used within AppProvider');
  return ctx;
}
