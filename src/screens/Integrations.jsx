import { SOURCES, RESOLUTION_STEPS, RUNS } from '../data/fixtures';
import Blueprint from '../components/Blueprint';
import { CheckCircle2, AlertTriangle } from 'lucide-react';

const stateColor = { Healthy: 'var(--color-good)', 'Rate limited': 'var(--color-warn)' };

export default function Integrations() {
  const maxStep = Math.max(...RESOLUTION_STEPS.map(s => s.resolved));

  return (
    <div className="page">
      <div className="page-head">
        <div>
          <div className="page-title">Integrations &amp; sync health</div>
          <div className="page-sub">Operational trust — is the pipeline actually running?</div>
        </div>
      </div>

      <div className="stat-grid n4">
        {SOURCES.map(s => (
          <Blueprint className="stat-card" key={s.k}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div className="lbl">{s.name}</div>
              {s.state === 'Healthy'
                ? <CheckCircle2 size={14} strokeWidth={1.5} color={stateColor[s.state]} />
                : <AlertTriangle size={14} strokeWidth={1.5} color={stateColor[s.state]} />}
            </div>
            <div className="val" style={{ fontSize: 20 }}>{s.added} <span className="text-4" style={{ fontSize: 12, fontWeight: 400 }}>new</span></div>
            <div className="note">{s.updated} updated · dedupe {s.dedupe}</div>
            <div className="text-3" style={{ fontSize: 11, marginTop: 4 }}>{s.quotaLabel}: {s.quotaPct}% · {s.note}</div>
          </Blueprint>
        ))}
      </div>

      <div className="split e">
        <Blueprint className="panel">
          <div className="panel-title">Identity resolution — match waterfall</div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            {RESOLUTION_STEPS.map(s => (
              <div key={s.step}>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 12.5, marginBottom: 3 }}>
                  <span>{s.step}</span><span className="num text-2">{s.resolved}</span>
                </div>
                <div style={{ height: 6, background: 'var(--color-neutral-200)' }}>
                  <div style={{ height: '100%', width: `${(s.resolved / maxStep) * 100}%`, background: 'var(--color-accent)' }} />
                </div>
              </div>
            ))}
          </div>
        </Blueprint>

        <Blueprint className="panel">
          <div className="panel-title">Failure &amp; retry</div>
          <div className="tool-row">
            <AlertTriangle size={16} strokeWidth={1.5} color="var(--color-warn)" />
            <div className="meta">
              <div className="n">LinkedIn Sales Navigator — rate limited</div>
              <div className="d">97% of the daily view cap used. Retry queued for 12:00 IST.</div>
            </div>
          </div>
          <div className="tool-row" style={{ borderBottom: 'none' }}>
            <CheckCircle2 size={16} strokeWidth={1.5} color="var(--color-good)" />
            <div className="meta">
              <div className="n">All other sources</div>
              <div className="d">Running on schedule, no retries queued.</div>
            </div>
          </div>
        </Blueprint>
      </div>

      <Blueprint style={{ padding: 0 }}>
        <div className="panel-title" style={{ padding: '15px 16px 0' }}>Run history</div>
        <div className="table-wrap">
          <table className="table">
            <thead>
              <tr><th>Run</th><th>Started</th><th>Duration</th><th>Sourced</th><th>Merged</th><th>Rejected</th><th>Status</th></tr>
            </thead>
            <tbody>
              {RUNS.map(r => (
                <tr key={r.id}>
                  <td>{r.id}</td>
                  <td>{r.started}</td>
                  <td className="num">{r.dur}</td>
                  <td className="num">{r.sourced}</td>
                  <td className="num">{r.merged}</td>
                  <td className="num">{r.rejected}</td>
                  <td><span className={'tag ' + (r.ok ? 'tag-accent' : 'tag-neutral')}>{r.result}</span></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Blueprint>
    </div>
  );
}
