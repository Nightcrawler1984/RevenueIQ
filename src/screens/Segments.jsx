import { SEGMENTS } from '../data/fixtures';
import { useApp } from '../context/AppContext';
import Blueprint from '../components/Blueprint';

export default function Segments() {
  const { go, flash } = useApp();
  return (
    <div className="page">
      <div className="page-head">
        <div>
          <div className="page-title">Segments</div>
          <div className="page-sub">Saved slices of the bench that re-run after the morning cron.</div>
        </div>
        <button className="btn btn-primary" onClick={() => flash('New segment')}>New segment</button>
      </div>

      <div className="stat-grid n3">
        {SEGMENTS.map(s => (
          <Blueprint className="panel" key={s.name}>
            <div style={{ fontFamily: 'var(--font-heading)', fontWeight: 600, fontSize: 15.5, marginBottom: 4 }}>{s.name}</div>
            <div className="val num" style={{ fontSize: 22 }}>{s.count}</div>
            <div className="text-3" style={{ fontSize: 11.5, marginBottom: 8 }}>{s.owner} · refreshed {s.refreshed}</div>
            <div className="chip-row" style={{ marginBottom: 10 }}>
              {s.criteria.map(c => <span key={c} className="tag tag-neutral" style={{ fontSize: 10.5 }}>{c}</span>)}
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span className="text-4" style={{ fontSize: 11, display: 'flex', alignItems: 'center', gap: 5 }}>
                <span className="status-dot" style={{ background: s.sync ? 'var(--color-accent)' : 'var(--color-neutral-400)' }} />
                {s.sync ? 'Syncing daily' : 'Not syncing'}
              </span>
              <button className="btn btn-ghost" onClick={() => go('leads')}>Open →</button>
            </div>
          </Blueprint>
        ))}
      </div>
    </div>
  );
}
