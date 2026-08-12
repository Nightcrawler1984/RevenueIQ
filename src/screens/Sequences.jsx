import { useState } from 'react';
import { SEQS } from '../data/fixtures';
import Blueprint from '../components/Blueprint';

export default function Sequences() {
  const [selIdx, setSelIdx] = useState(0);
  const seq = SEQS[selIdx];
  const maxSent = Math.max(...seq.detail.map(d => d[2]));

  return (
    <div className="page">
      <div className="page-head">
        <div>
          <div className="page-title">Sequences</div>
          <div className="page-sub">lemlist campaign performance, reply-state written back within seconds.</div>
        </div>
      </div>

      <div className="chip-row" style={{ marginBottom: 14 }}>
        {SEQS.map((s, i) => (
          <button key={s.name} className={'chip' + (selIdx === i ? ' active' : '')} onClick={() => setSelIdx(i)}>{s.name}</button>
        ))}
      </div>

      <div className="stat-grid n4">
        <Blueprint className="stat-card"><div className="lbl">Sent</div><div className="val">{seq.sent}</div><div className="note">{seq.steps} steps · {seq.owner}</div></Blueprint>
        <Blueprint className="stat-card"><div className="lbl">Open rate</div><div className="val">{seq.open}</div></Blueprint>
        <Blueprint className="stat-card"><div className="lbl">Reply rate</div><div className="val">{seq.reply}</div></Blueprint>
        <Blueprint className="stat-card"><div className="lbl">Meetings booked</div><div className="val">{seq.meetings}</div></Blueprint>
      </div>

      <Blueprint className="panel" style={{ marginBottom: 18 }}>
        <div className="panel-title">Step-level performance — {seq.vert}</div>
        <table className="table">
          <thead><tr><th>Step</th><th>When</th><th>Sent</th><th>Replied</th><th>Relative volume</th></tr></thead>
          <tbody>
            {seq.detail.map((d, i) => (
              <tr key={i}>
                <td>{d[0]}</td><td className="text-2">{d[1]}</td><td className="num">{d[2]}</td><td className="num">{d[3]}</td>
                <td style={{ width: 200 }}>
                  <div style={{ height: 6, background: 'var(--color-neutral-200)' }}>
                    <div style={{ height: '100%', width: `${(d[2] / maxSent) * 100}%`, background: 'var(--color-accent)' }} />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </Blueprint>

      <Blueprint className="panel">
        <div className="panel-title">Non-obvious insight</div>
        <p style={{ fontSize: 13.5, margin: 0 }}>{seq.insight}</p>
      </Blueprint>
    </div>
  );
}
