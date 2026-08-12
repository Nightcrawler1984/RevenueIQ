import {
  LayoutDashboard, Users, Layers, Plug, Plug2, Upload, Zap, Sparkles, Video, Bookmark, Smartphone, LogOut,
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { useAuth } from '../context/AuthContext';

const ITEMS = [
  { key: 'overview', label: 'Overview', icon: LayoutDashboard },
  { key: 'leads', label: 'Leads', icon: Users, trail: 'bench' },
  { key: 'verticals', label: 'Verticals', icon: Layers },
  { key: 'integrations', label: 'Integrations', icon: Plug, dot: true },
  { divider: true },
  { key: 'connect', label: 'Connections', icon: Plug2, trail: 'conn' },
  { key: 'import', label: 'Import contacts', icon: Upload },
  { divider: true },
  { key: 'sequences', label: 'Sequences', icon: Zap },
  { key: 'ai', label: 'AI outreach', icon: Sparkles, trail: 'ai' },
  { key: 'meetings', label: 'Meetings', icon: Video },
  { key: 'segments', label: 'Segments', icon: Bookmark },
  { key: 'mobile', label: 'On the road', icon: Smartphone },
];

export default function SideNav() {
  const { screen, go, benchCount, syncing, runSync } = useApp();
  const { session, isAdmin, logout } = useAuth();

  return (
    <aside className="side-nav">
      <div className="nav-brand-block">
        <div className="name">RevenueIQ</div>
        <div className="sub">Unified Lead Bench</div>
      </div>

      <nav className="nav-list">
        {ITEMS.map((item, i) => {
          if (item.divider) return <div className="nav-divider" key={'d' + i} />;
          const Icon = item.icon;
          const active = screen === item.key;
          return (
            <button
              key={item.key}
              type="button"
              className={'nav-item' + (active ? ' active' : '')}
              onClick={() => go(item.key)}
            >
              <Icon size={16} strokeWidth={1.5} />
              <span>{item.label}</span>
              {item.trail === 'bench' && <span className="trail">{benchCount}</span>}
              {item.trail === 'conn' && <span className="trail">6/8</span>}
              {item.trail === 'ai' && <span className="trail" style={{ color: 'var(--color-accent-700)' }}>live</span>}
              {item.dot && (
                <span
                  className="dot-pulse"
                  style={{ marginLeft: 'auto', background: 'var(--color-accent)' }}
                />
              )}
            </button>
          );
        })}
      </nav>

      <div className="nav-footer" style={{ borderTop: 'none', paddingBottom: 0 }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingBottom: 12, marginBottom: 12, borderBottom: '1px solid var(--color-divider)' }}>
          <div>
            <div style={{ fontSize: 12.5, fontWeight: 500 }}>{session?.username}</div>
            <div className="text-4" style={{ fontSize: 10.5 }}>{isAdmin ? 'Admin' : 'Team'} access</div>
          </div>
          <button type="button" className="btn btn-icon btn-ghost" title="Log out" onClick={logout}>
            <LogOut size={15} strokeWidth={1.5} />
          </button>
        </div>
      </div>
      <div className="nav-footer">
        <div className="lbl">Daily cron</div>
        <div className="time">06:00 IST · daily</div>
        <div className="next">{syncing ? 'Sync running…' : 'Next run in 14h 22m'}</div>
        <button type="button" className="btn btn-secondary btn-block" onClick={runSync} disabled={syncing}>
          {syncing ? 'Syncing…' : 'Run manual sync'}
        </button>
      </div>
    </aside>
  );
}
