import { useState, useRef, useEffect } from 'react';
import { Search, ChevronDown } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { VERTS } from '../data/fixtures';

export default function TopBar() {
  const { vert, setVert, role, setRole, q, setQ, syncing, totalRecords } = useApp();
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    function onDoc(e) { if (ref.current && !ref.current.contains(e.target)) setOpen(false); }
    document.addEventListener('mousedown', onDoc);
    return () => document.removeEventListener('mousedown', onDoc);
  }, []);

  const current = vert === 'all' ? { name: 'All licensed verticals' } : VERTS.find(v => v.k === vert);

  return (
    <div className="top-bar">
      <div className="vert-btn" ref={ref} onClick={() => setOpen(o => !o)}>
        <div className="kicker"><span className="sq" />Licensed vertical</div>
        <div className="val">{current.name}<ChevronDown size={14} strokeWidth={1.5} /></div>

        {open && (
          <div className="vert-dropdown" onClick={e => e.stopPropagation()}>
            <div className="vert-row" onClick={() => { setVert('all'); setOpen(false); }}>
              <span>All licensed verticals</span>
              <span className="count num">{totalRecords}/day</span>
            </div>
            {VERTS.map(v => (
              <div
                key={v.k}
                className={'vert-row' + (!v.licensed ? ' locked' : '')}
                onClick={() => { if (v.licensed) { setVert(v.k); setOpen(false); } }}
              >
                <span>{v.name}</span>
                <span className="count num">{v.licensed ? v.total.toLocaleString() : 'locked'}</span>
              </div>
            ))}
            <div className="vert-footnote">Locked verticals are sourced but withheld until licensed. Contact your account manager to add one.</div>
          </div>
        )}
      </div>

      <div className="search-wrap">
        <Search size={15} strokeWidth={1.5} />
        <input
          placeholder={`Search ${totalRecords.toLocaleString()} records…`}
          value={q}
          onChange={e => setQ(e.target.value)}
        />
      </div>

      <div className="seg role-seg">
        <label className="seg-opt">
          <input type="radio" name="role" checked={role === 'vp'} onChange={() => setRole('vp')} />
          VP Sales
        </label>
        <label className="seg-opt">
          <input type="radio" name="role" checked={role === 'sdr'} onChange={() => setRole('sdr')} />
          SDR
        </label>
      </div>

      <div className="sync-chip">
        <span className="dot" style={{ background: syncing ? 'var(--color-accent)' : 'var(--color-good)' }} />
        <div className="lines">
          <span className="head">{syncing ? 'Syncing now' : 'All systems nominal'}</span>
          <span className="sub">{syncing ? 'Started moments ago' : 'Last run 06:00 · 11m 42s'}</span>
        </div>
      </div>
    </div>
  );
}
