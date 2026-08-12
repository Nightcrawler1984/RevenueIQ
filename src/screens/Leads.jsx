import { useState, useMemo } from 'react';
import { ArrowUp, ArrowDown, ArrowUpDown } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { SRC } from '../data/fixtures';
import Blueprint from '../components/Blueprint';
import LeadDrawer from './LeadDrawer';

const TIERS = ['all', 'C-Level', 'VP', 'Director', 'Manager'];
const SOURCES = ['all', ...Object.keys(SRC)];

export default function Leads() {
  const { scopedLeads, q, flash } = useApp();
  const [tier, setTier] = useState('all');
  const [src, setSrc] = useState('all');
  const [ev, setEv] = useState(false);
  const [dd, setDd] = useState(false);
  const [sk, setSk] = useState('score');
  const [sd, setSd] = useState('desc');
  const [sel, setSel] = useState([]);
  const [drawerId, setDrawerId] = useState(null);

  const filtered = useMemo(() => {
    const qq = q.trim().toLowerCase();
    let out = scopedLeads.filter(l => {
      if (tier !== 'all' && l.tier !== tier) return false;
      if (src !== 'all' && !l.sources.includes(src)) return false;
      if (ev && !l.ev) return false;
      if (dd && !l.dd) return false;
      if (qq && !(l.name + ' ' + l.company + ' ' + l.title + ' ' + l.tech.join(' ') + ' ' + l.sub).toLowerCase().includes(qq)) return false;
      return true;
    });
    const dir = sd === 'desc' ? -1 : 1;
    out.sort((a, b) => (a.score - b.score) * dir);
    return out;
  }, [scopedLeads, q, tier, src, ev, dd, sd]);

  const clearFilters = () => { setTier('all'); setSrc('all'); setEv(false); setDd(false); };
  const hasFilters = tier !== 'all' || src !== 'all' || ev || dd;

  const toggleAll = () => setSel(sel.length === filtered.length ? [] : filtered.map(l => l.id));
  const toggleOne = (id) => setSel(s => s.includes(id) ? s.filter(x => x !== id) : [...s, id]);

  return (
    <div className="page">
      <div className="page-head">
        <div>
          <div className="page-title">Leads</div>
          <div className="page-sub">Find, filter, select, act — {filtered.length} of {scopedLeads.length} records.</div>
        </div>
      </div>

      <div className="chip-row" style={{ marginBottom: 12 }}>
        {TIERS.map(t => (
          <button key={t} className={'chip' + (tier === t ? ' active' : '')} onClick={() => setTier(t)}>
            {t === 'all' ? 'All tiers' : t}
          </button>
        ))}
        <span style={{ width: 1, background: 'var(--color-divider)', margin: '0 2px' }} />
        {SOURCES.map(s => (
          <button key={s} className={'chip' + (src === s ? ' active' : '')} onClick={() => setSrc(s)}>
            {s === 'all' ? 'All sources' : SRC[s].name}
          </button>
        ))}
        <span style={{ width: 1, background: 'var(--color-divider)', margin: '0 2px' }} />
        <button className={'chip' + (ev ? ' active' : '')} onClick={() => setEv(v => !v)}>
          <span className="cdot" />Verified email
        </button>
        <button className={'chip' + (dd ? ' active' : '')} onClick={() => setDd(v => !v)}>
          <span className="cdot" />Direct dial
        </button>
      </div>

      {sel.length > 0 && (
        <div className="bulk-bar">
          <span className="n">{sel.length} selected</span>
          <button className="btn btn-secondary" onClick={() => { flash(`Added ${sel.length} to a sequence`); setSel([]); }}>Add to sequence</button>
          <button className="btn btn-secondary" onClick={() => flash('Owner reassignment needs confirmation')}>Assign owner</button>
          <button className="btn btn-secondary" onClick={() => flash('Exporting selection…')}>Export</button>
          <button className="btn btn-secondary" onClick={() => flash('Added to segment')}>Add to segment</button>
          <button className="btn btn-ghost" style={{ marginLeft: 'auto' }} onClick={() => setSel([])}>Clear</button>
        </div>
      )}

      <Blueprint style={{ padding: 0 }}>
        <div className="table-wrap">
          <table className="table">
            <thead>
              <tr>
                <th><span className={'checkbox' + (sel.length === filtered.length && filtered.length ? ' checked' : '')} onClick={toggleAll}>{sel.length === filtered.length && filtered.length ? '✓' : ''}</span></th>
                <th>Name + title</th>
                <th>Company</th>
                <th>Vertical</th>
                <th className="sortable" onClick={() => { setSk('score'); setSd(d => d === 'desc' ? 'asc' : 'desc'); }}>
                  <span style={{ display: 'inline-flex', alignItems: 'center', gap: 4 }}>
                    Score {sd === 'desc' ? <ArrowDown size={11} /> : <ArrowUp size={11} />}
                  </span>
                </th>
                <th>Sources</th>
                <th>Last signal</th>
                <th>Owner</th>
                <th>Sequence state</th>
              </tr>
            </thead>
            <tbody>
              {filtered.length === 0 && (
                <tr><td colSpan={8}>
                  <div className="empty-state">
                    <div style={{ marginBottom: 8 }}>No records match {hasFilters ? 'the active filters' : 'this search'}.</div>
                    {hasFilters && <button className="btn btn-secondary" onClick={clearFilters}>Clear filters</button>}
                  </div>
                </td></tr>
              )}
              {filtered.map(l => (
                <tr key={l.id} style={{ cursor: 'pointer' }} onClick={() => setDrawerId(l.id)}>
                  <td onClick={e => e.stopPropagation()}>
                    <span className={'checkbox' + (sel.includes(l.id) ? ' checked' : '')} onClick={() => toggleOne(l.id)}>{sel.includes(l.id) ? '✓' : ''}</span>
                  </td>
                  <td>{l.name}<div className="text-3" style={{ fontSize: 11.5 }}>{l.title}</div></td>
                  <td>{l.company}<div className="text-4" style={{ fontSize: 11 }}>{l.city}</div></td>
                  <td>{l.sub}</td>
                  <td className="num" style={{ color: l.score >= 85 ? 'var(--color-accent)' : l.score >= 70 ? 'var(--color-text-2)' : 'var(--color-text-4)', fontWeight: l.score >= 85 ? 500 : 400 }}>{l.score}</td>
                  <td>
                    {l.sources.map(s => (
                      <span key={s} className="src-badge" style={{ background: SRC[s].bg, color: SRC[s].fg }} title={SRC[s].name}>{SRC[s].ab}</span>
                    ))}
                  </td>
                  <td className="text-2">{l.touch}</td>
                  <td>
                    <span style={{ display: 'inline-flex', alignItems: 'center', gap: 8 }}>
                      <span className="owner-dot" style={{ background: l.owner === 'K. Raman' ? 'var(--color-accent)' : 'var(--color-gold)' }} />
                      {l.owner}
                    </span>
                  </td>
                  <td>{l.seq}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Blueprint>

      {drawerId && <LeadDrawer leadId={drawerId} onClose={() => setDrawerId(null)} />}
    </div>
  );
}
