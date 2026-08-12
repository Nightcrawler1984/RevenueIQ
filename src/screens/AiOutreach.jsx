import { useState, useMemo } from 'react';
import { LEADS, MAILBOXES, GUARDRAILS, AI_SOURCES, AI_SUBJECTS, APPROVAL_QUEUE, AI_SEQUENCE_STEPS } from '../data/fixtures';
import { useApp } from '../context/AppContext';
import Blueprint from '../components/Blueprint';

const OBJECTIVES = [['meeting', 'Book a meeting'], ['convo', 'Start a conversation'], ['event', 'Event follow-up'], ['revive', 'Revive a stalled account']];
const VOICES = [['direct', 'Direct'], ['consult', 'Consultative'], ['peer', 'Peer-to-peer']];
const LENGTHS = [['short', 'Under 80 words'], ['mid', '80–120 words'], ['long', 'Long, one proof point']];

const PREVIEW_LEADS = LEADS.filter(l => ['Priya Raghavan', 'Ana Beltrán', 'Iris Kavanagh'].includes(l.name));

function intentToProse(intent) {
  if (!intent) return null;
  const [k, v] = intent.split(': ');
  if (k === 'Hiring') return `when you're hiring for ${v}`;
  return intent.toLowerCase();
}

function composeBody(lead, { objective, voice, length }) {
  const opening = `Noticed ${lead.activity.toLowerCase().replace(/^./, c => c)}`;
  const techLine = lead.tech.length ? `Given your stack (${lead.tech.slice(0, 2).join(', ')}), teams like yours usually feel this first in lead data quality.` : '';
  const intentLine = lead.intents.length ? `That, plus the fact that you're ${intentToProse(lead.intents[0])}, is why I'm reaching out now.` : '';
  const proof = length !== 'short' ? `Teams in ${lead.sub} have cut sourcing time by roughly a third after consolidating their vendor data into one record.` : '';
  const cta = objective === 'meeting' ? "Worth 15 minutes this week?" : objective === 'event' ? 'Good to reconnect after the event?' : "Open to a quick note back either way?";
  return [opening + '.', [techLine, intentLine].filter(Boolean).join(' '), proof, cta].filter(Boolean).join('\n\n');
}

export default function AiOutreach() {
  const { flash } = useApp();
  const [aiOn, setAiOn] = useState(true);
  const [objective, setObjective] = useState('meeting');
  const [voice, setVoice] = useState('direct');
  const [length, setLength] = useState('short');
  const [sourcesOn, setSourcesOn] = useState(Object.fromEntries(AI_SOURCES.map(s => [s.k, s.on])));
  const [subjIdx, setSubjIdx] = useState(0);
  const [leadIdx, setLeadIdx] = useState(0);
  const [guardOn, setGuardOn] = useState(Object.fromEntries(GUARDRAILS.map(g => [g.k, g.on])));

  const lead = PREVIEW_LEADS[leadIdx];
  const onCount = Object.values(sourcesOn).filter(Boolean).length;

  const body = useMemo(() => composeBody(lead, { objective, voice, length }), [lead, objective, voice, length]);

  return (
    <div className="page">
      <div className="page-head">
        <div>
          <div className="page-title">AI outreach</div>
          <div className="page-sub">Generate cold email per record, sent from your own warmed mailboxes, behind guardrails.</div>
        </div>
        <div className="page-actions" style={{ alignItems: 'center' }}>
          <button className={'toggle' + (aiOn ? ' on' : '')} onClick={() => setAiOn(v => !v)} />
          <span className="text-2" style={{ fontSize: 13 }}>{aiOn ? 'Automation live' : 'Paused'}</span>
          <button className="btn btn-primary" onClick={() => flash('New AI campaign started')}>New AI campaign</button>
        </div>
      </div>

      <div className="stat-grid n4">
        <Blueprint className="stat-card"><div className="lbl">Drafts generated today</div><div className="val">312</div></Blueprint>
        <Blueprint className="stat-card"><div className="lbl">Awaiting approval</div><div className="val">{APPROVAL_QUEUE.length}</div></Blueprint>
        <Blueprint className="stat-card"><div className="lbl">Sent today</div><div className="val">108 <span className="text-4" style={{ fontSize: 14 }}>/ 160 cap</span></div></Blueprint>
        <Blueprint className="stat-card"><div className="lbl">Reply rate</div><div className="val">9.8%</div><div className="note">+2.1pt vs old templates</div></Blueprint>
      </div>

      <div className="split c">
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          <Blueprint className="panel">
            <div className="panel-title">Brief</div>
            <ChipGroup label="Objective" value={objective} onChange={setObjective} options={OBJECTIVES} />
            <ChipGroup label="Voice" value={voice} onChange={setVoice} options={VOICES} />
            <ChipGroup label="Length" value={length} onChange={setLength} options={LENGTHS} />

            <div style={{ fontSize: 12.5, fontWeight: 500, margin: '10px 0 5px' }}>Personalise from</div>
            <div className="chip-row">
              {AI_SOURCES.map(s => (
                <button key={s.k} className={'chip' + (sourcesOn[s.k] ? ' active' : '')} onClick={() => setSourcesOn(o => ({ ...o, [s.k]: !o[s.k] }))}>
                  <span className="cdot" />{s.label}
                </button>
              ))}
            </div>
            <div className="text-4" style={{ fontSize: 11, marginTop: 5 }}>{onCount} of {AI_SOURCES.length} sources on. Only fields the connectors actually returned are used — the model is never asked to fill a gap it cannot see.</div>

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 12 }}>
              <span className="text-3" style={{ fontSize: 11.5 }}>About 40 seconds for 1,200 leads</span>
              <button className="btn btn-secondary" onClick={() => flash('Regenerating drafts…')}>Regenerate drafts</button>
            </div>
          </Blueprint>

          <Blueprint className="panel">
            <div className="panel-title">Draft preview</div>
            <div className="chip-row" style={{ marginBottom: 10 }}>
              {PREVIEW_LEADS.map((l, i) => (
                <button key={l.id} className={'chip' + (leadIdx === i ? ' active' : '')} onClick={() => setLeadIdx(i)}>{l.name}</button>
              ))}
            </div>

            <div style={{ fontSize: 12.5, fontWeight: 500, marginBottom: 6 }}>Subject lines</div>
            {AI_SUBJECTS.map((s, i) => (
              <div key={i} className={'subj-row' + (subjIdx === i ? ' selected' : '')} onClick={() => setSubjIdx(i)}>
                <span className="txt">{s.text}</span>
                <span className="meta">{s.chars} chars · {s.note}</span>
              </div>
            ))}

            <div className="email-preview" style={{ marginTop: 10 }}>
              <div className="email-meta">
                <span>From: k.raman@revenueiq.io</span>
                <span>To: {lead.email}</span>
                <span>Send time: today, 09:40 lead-local</span>
              </div>
              <div className="email-subject">{AI_SUBJECTS[subjIdx].text}</div>
              <div className="email-body">
                Hi {lead.name.split(' ')[0]},<br /><br />
                {body.split('\n\n').map((p, i) => (
                  <span key={i}>
                    {p.includes(lead.company) || p.toLowerCase().includes('hiring') || p.toLowerCase().includes('replatform')
                      ? <span className="token-hl">{p}</span> : p}
                    <br /><br />
                  </span>
                ))}
                Best,<br />K. Raman
              </div>
            </div>

            <div style={{ fontSize: 12.5, fontWeight: 500, margin: '14px 0 4px' }}>Pre-send checks</div>
            <div className="check-grid">
              <CheckItem ok label="No spam-trigger words" />
              <CheckItem ok label={`Length: ${length === 'short' ? '62' : length === 'mid' ? '104' : '148'} words — within band`} />
              <CheckItem ok label={`Personalisation depth: ${onCount} sources`} />
              <CheckItem ok label="No links or attachments" />
              <CheckItem ok label="One-click unsubscribe present" />
              <CheckItem ok label={`Sending mailbox warm 92%`} />
            </div>

            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 8, marginTop: 14 }}>
              <button className="btn btn-secondary" onClick={() => flash('Edit copy — becomes a rule for the segment')}>Edit copy</button>
              <button className="btn btn-secondary" onClick={() => flash('Test sent to your own inbox')}>Send test</button>
              <button className="btn btn-primary" onClick={() => flash(`Approved ${APPROVAL_QUEUE.length} drafts`)}>Approve {APPROVAL_QUEUE.length} drafts</button>
            </div>
          </Blueprint>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          <Blueprint className="panel">
            <div className="panel-title">Sending mailboxes</div>
            {MAILBOXES.map(m => (
              <div className="mail-row" key={m.addr}>
                <div className="meta">
                  <div className="addr">{m.addr}</div>
                  <div className="prov">{m.provider} · {m.state}</div>
                </div>
                <div className="warm-bar"><div className="fill" style={{ width: `${m.warm}%`, background: m.warm > 80 ? 'var(--color-accent)' : 'var(--color-neutral-500)' }} /></div>
                <span className="cap num">{m.sentToday}/{m.cap}</span>
              </div>
            ))}
            <div className="text-4" style={{ fontSize: 11, marginTop: 8 }}>Sends rotate across warmed mailboxes, spaced 4–9 minutes, inside 09:00–17:00 in the lead's own timezone. A reply pauses the sequence for that record.</div>
          </Blueprint>

          <Blueprint className="panel">
            <div className="panel-title">Guardrails</div>
            {GUARDRAILS.map(g => (
              <div className="guard-row" key={g.k}>
                <button className={'toggle' + (guardOn[g.k] ? ' on' : '')} onClick={() => setGuardOn(o => ({ ...o, [g.k]: !o[g.k] }))} />
                <span>{g.label}</span>
              </div>
            ))}
            <div className="text-4" style={{ fontSize: 11, marginTop: 8 }}>These are compliance requirements, not preferences — server-enforced in production.</div>
          </Blueprint>

          <Blueprint className="panel">
            <div className="panel-title">Approval queue</div>
            {APPROVAL_QUEUE.map((a, i) => (
              <div className="tool-row" key={i}>
                <div className="meta">
                  <div className="n">{a.name}</div>
                  <div className="d">{a.company}</div>
                </div>
                <span className={'tag ' + (a.quality === 'Strong' ? 'tag-accent' : 'tag-neutral')} style={{ marginRight: 8 }}>{a.quality}</span>
                <button className="btn btn-ghost" style={{ fontSize: 11.5 }} onClick={() => flash(`Approved ${a.name}`)}>Approve</button>
              </div>
            ))}
          </Blueprint>
        </div>
      </div>

      <Blueprint style={{ padding: 0 }}>
        <div className="panel-title" style={{ padding: '15px 16px 0' }}>Sequence</div>
        <table className="table">
          <thead><tr><th>When</th><th>Channel</th><th>AI angle</th><th>Copy source</th><th>State</th><th></th></tr></thead>
          <tbody>
            {AI_SEQUENCE_STEPS.map((s, i) => (
              <tr key={i}>
                <td>{s.when}</td><td>{s.channel}</td><td className="text-2">{s.angle}</td><td>{s.src}</td>
                <td><span className={'tag ' + (s.state === 'Approved' ? 'tag-accent' : s.state === 'Manual' ? 'tag-neutral' : 'tag-outline')}>{s.state}</span></td>
                <td><button className="btn btn-ghost" onClick={() => flash('Opened step detail')}>Open</button></td>
              </tr>
            ))}
          </tbody>
        </table>
      </Blueprint>
    </div>
  );
}

function ChipGroup({ label, value, onChange, options }) {
  return (
    <div style={{ marginBottom: 10 }}>
      <div style={{ fontSize: 12.5, fontWeight: 500, marginBottom: 5 }}>{label}</div>
      <div className="chip-row">
        {options.map(([k, l]) => (
          <button key={k} className={'chip' + (value === k ? ' active' : '')} onClick={() => onChange(k)}>{l}</button>
        ))}
      </div>
    </div>
  );
}

function CheckItem({ ok, label }) {
  return (
    <div className="check-item">
      <span className="sev-dot" style={{ background: ok ? 'var(--color-good)' : 'var(--color-warn)', marginTop: 4 }} />
      <span>{label}</span>
    </div>
  );
}
