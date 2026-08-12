import { useApp } from '../context/AppContext';
import { DAYS, VERTS, LEADS } from '../data/fixtures';
import Blueprint from '../components/Blueprint';
import { CheckCircle2, Circle } from 'lucide-react';

const maxDay = Math.max(...DAYS.map(d => d[1]));

export default function Overview() {
  const { role, scopedLeads } = useApp();

  const meetingsBooked = scopedLeads.filter(l => l.seq === 'Meeting booked').length;
  const replied = scopedLeads.filter(l => l.seq === 'Replied').length;
  const verified = scopedLeads.filter(l => l.ev).length;
  const avgScore = Math.round(scopedLeads.reduce((s, l) => s + l.score, 0) / scopedLeads.length);

  if (role === 'sdr') return <SdrQueue />;

  return (
    <div className="page">
      <div className="page-head">
        <div>
          <div className="page-title">Overview</div>
          <div className="page-sub">What changed overnight, and what to do about it.</div>
        </div>
      </div>

      <div className="stat-grid n4">
        <Blueprint className="stat-card">
          <div className="lbl">Bench, this vertical</div>
          <div className="val">{scopedLeads.length}</div>
          <div className="note">of {VERTS.filter(v => v.licensed).reduce((s, v) => s + v.total, 0).toLocaleString()} licensed total</div>
        </Blueprint>
        <Blueprint className="stat-card">
          <div className="lbl">Verified email coverage</div>
          <div className="val">{Math.round((verified / scopedLeads.length) * 100)}%</div>
          <div className="note">{verified} of {scopedLeads.length} records</div>
        </Blueprint>
        <Blueprint className="stat-card">
          <div className="lbl">Replies + meetings, 7d</div>
          <div className="val">{replied + meetingsBooked}</div>
          <div className="note">{meetingsBooked} meetings booked</div>
        </Blueprint>
        <Blueprint className="stat-card">
          <div className="lbl">Average ICP score</div>
          <div className="val">{avgScore}</div>
          <div className="note">across the current scope</div>
        </Blueprint>
      </div>

      <div className="split a">
        <Blueprint className="panel">
          <div className="panel-title">Records sourced, last 14 days</div>
          <div className="bars">
            {DAYS.map(([d, v], i) => (
              <div className={'bar-col' + (i === DAYS.length - 1 ? ' today' : '')} key={d}>
                <span className="bv">{v}</span>
                <div className="bb" style={{ height: `${(v / maxDay) * 100}%` }} />
                <span className="bl">{d}</span>
              </div>
            ))}
          </div>
        </Blueprint>

        <Blueprint className="panel">
          <div className="panel-title">Vertical performance</div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            {VERTS.filter(v => v.licensed).map(v => (
              <div key={v.k} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: 13 }}>
                <span>{v.name}</span>
                <span className="num text-2">{v.today}/day · {v.verified} verified</span>
              </div>
            ))}
          </div>
        </Blueprint>
      </div>

      <Blueprint className="panel" style={{ padding: 0 }}>
        <div className="panel-title" style={{ padding: '15px 16px 0' }}>Top scoring records</div>
        <div className="table-wrap">
          <table className="table">
            <thead>
              <tr>
                <th>Name</th><th>Company</th><th>Vertical</th><th>Score</th><th>Sequence state</th><th>Owner</th>
              </tr>
            </thead>
            <tbody>
              {[...scopedLeads].sort((a, b) => b.score - a.score).slice(0, 6).map(l => (
                <tr key={l.id}>
                  <td>{l.name}<div className="text-3" style={{ fontSize: 11.5 }}>{l.title}</div></td>
                  <td>{l.company}</td>
                  <td>{VERTS.find(v => v.k === l.vert)?.name}</td>
                  <td className="num" style={{ color: l.score >= 85 ? 'var(--color-accent)' : l.score >= 70 ? 'var(--color-text-2)' : 'var(--color-text-4)', fontWeight: l.score >= 85 ? 500 : 400 }}>{l.score}</td>
                  <td>{l.seq}</td>
                  <td>{l.owner}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Blueprint>
    </div>
  );
}

function SdrQueue() {
  const { scopedLeads } = useApp();
  const myLeads = scopedLeads.filter(l => l.owner === 'K. Raman');
  const tasks = [
    ...myLeads.filter(l => l.seq === 'Replied').map(l => ({ l, task: 'Reply waiting — send a response', urgent: true })),
    ...myLeads.filter(l => l.seq.startsWith('Step')).slice(0, 4).map(l => ({ l, task: `Next step due — ${l.seq}`, urgent: false })),
    ...myLeads.filter(l => l.seq === 'Not in sequence' && l.score >= 75).map(l => ({ l, task: 'High score, not yet enrolled', urgent: false })),
  ];

  return (
    <div className="page">
      <div className="page-head">
        <div>
          <div className="page-title">Today's queue</div>
          <div className="page-sub">Next best actions for K. Raman.</div>
        </div>
      </div>

      <div className="stat-grid n4">
        <Blueprint className="stat-card">
          <div className="lbl">Assigned leads</div>
          <div className="val">{myLeads.length}</div>
          <div className="note">in this vertical scope</div>
        </Blueprint>
        <Blueprint className="stat-card">
          <div className="lbl">Replies waiting</div>
          <div className="val">{myLeads.filter(l => l.seq === 'Replied').length}</div>
          <div className="note">respond today</div>
        </Blueprint>
        <Blueprint className="stat-card">
          <div className="lbl">Meetings booked</div>
          <div className="val">{myLeads.filter(l => l.seq === 'Meeting booked').length}</div>
          <div className="note">this week</div>
        </Blueprint>
        <Blueprint className="stat-card">
          <div className="lbl">Tasks today</div>
          <div className="val">{tasks.length}</div>
          <div className="note">across the queue</div>
        </Blueprint>
      </div>

      <Blueprint className="panel">
        <div className="panel-title">Next best actions</div>
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          {tasks.map((t, i) => (
            <div key={i} className="tool-row">
              {t.urgent ? <CheckCircle2 size={16} strokeWidth={1.5} color="var(--color-accent)" /> : <Circle size={16} strokeWidth={1.5} />}
              <div className="meta">
                <div className="n">{t.l.name} · {t.l.company}</div>
                <div className="d">{t.task}</div>
              </div>
              <span className="calls num">score {t.l.score}</span>
            </div>
          ))}
        </div>
      </Blueprint>
    </div>
  );
}
