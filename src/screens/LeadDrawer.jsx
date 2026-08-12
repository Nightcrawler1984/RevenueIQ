import { useState } from 'react';
import { X } from 'lucide-react';
import { LEADS, SRC, VERTS } from '../data/fixtures';
import { useApp } from '../context/AppContext';

function provFor(l, overrides) {
  const S = SRC, ov = overrides[l.id] || {};
  const has = k => l.sources.includes(k);
  const primary = has('apollo') ? 'apollo' : (has('seamless') ? 'seamless' : l.sources[0]);
  const rows = [];
  const conflict = has('apollo') && has('seamless');
  rows.push({
    field: 'Work email', value: ov.email || l.email, source: S[primary].name, sk: primary,
    conf: l.ev ? '98' : '71', flag: conflict ? 'conflict' : (l.ev ? 'verified' : 'unverified'),
    detail: conflict ? 'Two connectors returned a different address. The higher-confidence value is kept; pin the other to override.' : 'Single source. Re-verified on the last cron run.',
    candidates: conflict
      ? [{ value: l.email, source: 'Apollo', when: 'today 06:02', conf: '98%', best: !ov.email },
         { value: l.altEmail, source: 'Seamless.AI', when: 'today 06:05', conf: '64%', best: !!ov.email }]
      : [{ value: l.email, source: S[primary].name, when: 'today 06:02', conf: l.ev ? '98%' : '71%', best: true }],
  });
  rows.push({
    field: 'Direct dial', value: l.dd ? l.phone : 'not found', source: has('seamless') ? 'Seamless.AI' : S[primary].name,
    conf: l.dd ? '88' : '—', flag: l.dd ? 'direct' : 'missing',
    detail: l.dd ? 'Mobile, validated by carrier lookup 6 days ago.' : 'No connector returned a direct dial. Switchboard only.',
    candidates: [{ value: l.dd ? l.phone : 'switchboard only', source: has('seamless') ? 'Seamless.AI' : 'Apollo', when: 'today 06:05', conf: l.dd ? '88%' : '20%', best: true }],
  });
  rows.push({
    field: 'Job title', value: l.title, source: has('linkedin') ? 'LinkedIn SN' : S[primary].name,
    conf: has('linkedin') ? '96' : '74', flag: has('linkedin') ? 'live' : 'stale',
    detail: has('linkedin') ? 'Read from the live profile this morning — the freshest title source.' : 'Database title. LinkedIn is not connected for this record, so a promotion could be missed.',
    candidates: [{ value: l.title, source: has('linkedin') ? 'LinkedIn SN' : 'Apollo', when: 'today 06:11', conf: has('linkedin') ? '96%' : '74%', best: true }],
  });
  rows.push({
    field: 'Company size', value: l.emp + ' · ' + l.rev, source: 'Apollo', conf: '84', flag: '',
    detail: 'Firmographics are taken from Apollo and refreshed weekly, not daily.',
    candidates: [{ value: l.emp + ' · ' + l.rev, source: 'Apollo', when: '22 Jul', conf: '84%', best: true }],
  });
  rows.push({
    field: 'Buying signal', value: l.intents.length ? l.intents.join(' · ') : 'none captured',
    source: has('linkedin') ? 'LinkedIn SN' : 'Apollo', conf: l.intents.length ? '79' : '—', flag: l.intents.length ? 'fresh' : '',
    detail: 'Signals decay after 30 days and drop out of scoring automatically.',
    candidates: [{ value: l.intents.length ? l.intents.join(' · ') : 'none captured', source: 'Apollo Intent', when: 'today 06:02', conf: '79%', best: true }],
  });
  if (has('lemlist')) rows.push({
    field: 'Sequence state', value: l.seq + ' · last touch ' + l.touch, source: 'lemlist', conf: '100', flag: 'live',
    detail: 'Written back by the lemlist webhook within a minute of each event.',
    candidates: [{ value: l.seq, source: 'lemlist', when: 'today 06:03', conf: '100%', best: true }],
  });
  if (has('zoom')) rows.push({
    field: 'Meeting', value: 'Matched to a Zoom call · ' + l.touch + ' ago', source: 'Zoom', conf: '92', flag: 'matched',
    detail: 'Attendee email matched the golden record. Unmatched attendees queue up on the Meetings screen.',
    candidates: [{ value: 'Zoom call · attendee email match', source: 'Zoom', when: 'today 06:00', conf: '92%', best: true }],
  });
  return rows;
}

function timelineFor(l) {
  const S = SRC, t = [];
  const ev = (title, src, when, body) => ({ title, src: S[src].name, when, body });
  if (l.sources.includes('lemlist')) t.push(ev('Sequence step sent', 'lemlist', l.touch + ' ago', l.seq + ' — opened twice, no click yet.'));
  if (l.sources.includes('zoom')) t.push(ev('Zoom call recorded', 'zoom', '2d ago', 'Attendee email matched this record automatically. Recording and summary attached.'));
  if (l.sources.includes('linkedin')) t.push(ev('Profile activity', 'linkedin', '8d ago', l.activity));
  t.push(ev('Record enriched', 'apollo', 'today 06:02', 'Cron run #2841 refreshed firmographics and re-scored this record.'));
  t.push(ev('First sourced', l.sources[0], '19 Jun', 'Entered the bench from the ' + VERTS.find(v => v.k === l.vert).name + ' sourcing rule.'));
  return t;
}

const flagColor = { conflict: 'var(--color-warn)', verified: 'var(--color-good)', unverified: 'var(--color-neutral-400)', direct: 'var(--color-good)', missing: 'var(--color-neutral-400)', live: 'var(--color-good)', stale: 'var(--color-neutral-400)', fresh: 'var(--color-good)', matched: 'var(--color-good)', '': 'var(--color-neutral-400)' };

export default function LeadDrawer({ leadId, onClose }) {
  const { flash } = useApp();
  const [tab, setTab] = useState('record');
  const [overrides, setOverrides] = useState({});
  const l = LEADS.find(x => x.id === leadId);
  if (!l) return null;

  const rows = provFor(l, overrides);
  const timeline = timelineFor(l);

  const pin = (field, value) => {
    setOverrides(o => ({ ...o, [l.id]: { ...(o[l.id] || {}), [field]: value } }));
    flash(`Pinned ${field} — excluded from future syncs`);
  };

  return (
    <>
      <div className="drawer-backdrop" onClick={onClose} />
      <div className="drawer">
        <div className="drawer-head" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
          <div>
            <div style={{ fontFamily: 'var(--font-heading)', fontWeight: 600, fontSize: 20 }}>{l.name}</div>
            <div className="text-2" style={{ fontSize: 13 }}>{l.title} · {l.company}</div>
          </div>
          <button className="btn btn-icon btn-ghost" onClick={onClose}><X size={18} strokeWidth={1.5} /></button>
        </div>

        <div className="drawer-tabs">
          <button className={'drawer-tab' + (tab === 'record' ? ' active' : '')} onClick={() => setTab('record')}>Record</button>
          <button className={'drawer-tab' + (tab === 'provenance' ? ' active' : '')} onClick={() => setTab('provenance')}>Provenance</button>
        </div>

        <div className="drawer-body">
          {tab === 'record' ? (
            <>
              <div style={{ display: 'flex', gap: 8, marginBottom: 14 }}>
                <button className="btn btn-primary" onClick={() => flash(`Added ${l.name} to a sequence`)}>Add to sequence</button>
                <button className="btn btn-secondary" onClick={() => flash('Owner reassignment needs confirmation')}>Reassign owner</button>
              </div>

              <div className="kv-row"><span className="k">Seniority / role</span><span className="v">{l.tier} · {l.brole}</span></div>
              <div className="kv-row"><span className="k">Company</span><span className="v">{l.company} ({l.emp}, {l.rev})</span></div>
              <div className="kv-row"><span className="k">Location</span><span className="v">{l.city}</span></div>
              <div className="kv-row"><span className="k">Email</span><span className="v">{l.email} {l.ev && <span className="tag tag-accent" style={{ marginLeft: 6 }}>verified</span>}</span></div>
              <div className="kv-row"><span className="k">Direct dial</span><span className="v">{l.dd ? l.phone : '—'}</span></div>
              <div className="kv-row"><span className="k">LinkedIn</span><span className="v">{l.li}</span></div>
              <div className="kv-row"><span className="k">Tech stack</span><span className="v">{l.tech.join(' · ')}</span></div>
              <div className="kv-row"><span className="k">Intent topics</span><span className="v">{l.intents.length ? l.intents.join(' · ') : '—'}</span></div>
              <div className="kv-row"><span className="k">ICP score</span><span className="v num">{l.score}</span></div>
              <div className="kv-row"><span className="k">Owner</span><span className="v">{l.owner}</span></div>
              <div className="kv-row"><span className="k">Sequence</span><span className="v">{l.seq}</span></div>

              <div className="panel-title" style={{ fontSize: 15, marginTop: 20, marginBottom: 8 }}>Recent activity</div>
              {timeline.map((t, i) => (
                <div className="timeline-item" key={i}>
                  <div className="timeline-dot" />
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: 13, fontWeight: 500 }}>{t.title} <span className="text-4" style={{ fontWeight: 400 }}>· {t.src} · {t.when}</span></div>
                    <div className="text-2" style={{ fontSize: 12.5 }}>{t.body}</div>
                  </div>
                </div>
              ))}
            </>
          ) : (
            <>
              {rows.map((r, i) => (
                <div className="prov-row" key={i}>
                  <div className="field">{r.field}</div>
                  <div className="value">{r.value}</div>
                  {r.candidates.map((c, j) => (
                    <div className={'prov-cand' + (c.best ? ' best' : '')} key={j}>
                      <span><span className="sev-dot" style={{ background: flagColor[r.flag] }} /> {c.value} <span className="text-4">· {c.source} · {c.when} · {c.conf}</span></span>
                      {!c.best && <button className="btn btn-ghost" style={{ padding: '2px 6px', fontSize: 11 }} onClick={() => pin(r.field, c.value)}>Use this</button>}
                    </div>
                  ))}
                  <div className="text-3" style={{ fontSize: 11.5, marginTop: 3 }}>{r.detail}</div>
                </div>
              ))}
            </>
          )}
        </div>
      </div>
    </>
  );
}
