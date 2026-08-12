import { useState } from 'react';
import { Upload, FileText, Download } from 'lucide-react';
import { TCOLS, TROWS, RECENT_IMPORTS } from '../data/fixtures';
import { useApp } from '../context/AppContext';
import Blueprint from '../components/Blueprint';

const STEPS = ['Get the template', 'Fill it in', 'Upload & map', 'Validate & import'];

function csvCell(v) { return /[",;\n]/.test(v) ? '"' + v.replace(/"/g, '""') + '"' : v; }

function download(text, name) {
  const a = document.createElement('a');
  const url = URL.createObjectURL(new Blob([text], { type: 'text/csv;charset=utf-8' }));
  a.href = url; a.download = name; document.body.appendChild(a); a.click();
  setTimeout(() => { URL.revokeObjectURL(url); a.remove(); }, 600);
}

export default function ImportContacts() {
  const { flash } = useApp();
  const [stage, setStage] = useState('idle'); // idle | busy | ready
  const [fileName, setFileName] = useState('');
  const [dedupe, setDedupe] = useState('domain');
  const [vertRule, setVertRule] = useState('ecom');
  const [owner, setOwner] = useState('round');
  const [enrich, setEnrich] = useState('yes');

  const sampleCsv = () => TCOLS.map(c => c.col).join(',') + '\n' + TROWS.map(r => r.map(csvCell).join(',')).join('\n') + '\n';

  const startDemo = (name) => {
    setFileName(name);
    setStage('busy');
    setTimeout(() => setStage('ready'), 1400);
  };

  const currentStep = stage === 'idle' ? 0 : stage === 'busy' ? 1 : 2;

  return (
    <div className="page">
      <div className="page-head">
        <div>
          <div className="page-title">Import contacts</div>
          <div className="page-sub">Bring your own list, in a format you cannot get wrong.</div>
        </div>
        <div className="page-actions">
          <button className="btn btn-secondary" onClick={() => flash('Field spec (PDF) downloading…')}><FileText size={14} strokeWidth={1.5} /> Field spec (PDF)</button>
          <button className="btn btn-secondary" onClick={() => download(sampleCsv(), 'revenueiq_contact_import_template.csv')}><Download size={14} strokeWidth={1.5} /> Download sample CSV</button>
        </div>
      </div>

      <div className="step-strip">
        {STEPS.map((s, i) => (
          <div className={'step-box' + (i <= currentStep ? ' active' : '')} key={s}>
            <div className="step-num">{i + 1}</div>
            <div className="step-label">{s}</div>
          </div>
        ))}
      </div>

      <div className="split c">
        <Blueprint className="panel">
          <div className="panel-title">Upload</div>
          {stage === 'idle' && (
            <div className="dropzone">
              <Upload size={26} strokeWidth={1.5} style={{ margin: '0 auto 10px' }} />
              <div style={{ fontSize: 14, marginBottom: 4 }}>Drop your CSV or XLSX here, or browse</div>
              <div className="text-4" style={{ fontSize: 11.5, marginBottom: 12 }}>UTF-8 · comma delimited · up to 50,000 rows · 25 MB</div>
              <button className="btn btn-secondary" onClick={() => download(sampleCsv(), 'revenueiq_contact_import_template.csv')}>Download the sample file</button>
              {' '}
              <button className="btn btn-ghost" onClick={() => startDemo('tradeshow_leads_aug.csv')}>Try a demo file →</button>
            </div>
          )}
          {stage === 'busy' && (
            <div>
              <div style={{ fontSize: 13.5 }}>Reading {fileName}…</div>
              <div className="progress-bar"><div className="fill" /></div>
            </div>
          )}
          {stage === 'ready' && (
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '8px 10px', background: 'var(--color-surface)', marginBottom: 10 }}>
                <span style={{ fontSize: 13 }}>{fileName} · {TROWS.length + 118} rows · {TCOLS.length} columns</span>
                <button className="btn btn-ghost" onClick={() => { setStage('idle'); setFileName(''); }}>Remove</button>
              </div>
              <div className="count-row">
                <div className="count-box ready"><div className="n">108</div><div className="l">ready to import</div></div>
                <div className="count-box review"><div className="n">9</div><div className="l">need review</div></div>
                <div className="count-box rejected"><div className="n">4</div><div className="l">rejected</div></div>
              </div>

              <div className="panel-title" style={{ fontSize: 14 }}>Column mapping</div>
              <table className="table" style={{ marginBottom: 12 }}>
                <thead><tr><th>Your column</th><th>Maps to</th><th>Status</th></tr></thead>
                <tbody>
                  <tr><td>Full Name</td><td>first_name / last_name</td><td><span className="tag tag-accent">Normalised</span></td></tr>
                  <tr><td>Work Email</td><td>email</td><td><span className="tag tag-accent">Auto-matched</span></td></tr>
                  <tr><td>Title</td><td>job_title</td><td><span className="tag tag-accent">Auto-matched</span></td></tr>
                  <tr><td>Segment</td><td>—</td><td><span className="tag tag-neutral">Kept as custom</span></td></tr>
                </tbody>
              </table>

              <div className="panel-title" style={{ fontSize: 14 }}>Rows needing attention</div>
              <div className="attn-row"><span className="sev-dot" style={{ background: 'var(--color-warn)' }} /><span className="desc">Missing email and no LinkedIn URL</span><span className="num">6 rows</span><button className="btn btn-ghost" style={{ fontSize: 11.5 }} onClick={() => flash('Reviewing rows…')}>Review</button></div>
              <div className="attn-row"><span className="sev-dot" style={{ background: 'var(--color-warn)' }} /><span className="desc">Vertical value not recognised</span><span className="num">2 rows</span><button className="btn btn-ghost" style={{ fontSize: 11.5 }} onClick={() => flash('Opened value mapper')}>Map value</button></div>
              <div className="attn-row"><span className="sev-dot" style={{ background: 'var(--color-neutral-500)' }} /><span className="desc">Duplicate of an existing golden record</span><span className="num">5 rows</span><button className="btn btn-ghost" style={{ fontSize: 11.5 }} onClick={() => flash('Accepted as merge')}>Accept</button></div>

              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 12, flexWrap: 'wrap', gap: 8 }}>
                <span className="text-3" style={{ fontSize: 12 }}>108 rows will import now; 9 need a decision first.</span>
                <div style={{ display: 'flex', gap: 8 }}>
                  <button className="btn btn-secondary" onClick={() => flash('Downloading error rows…')}>Download error rows</button>
                  <button className="btn btn-primary" onClick={() => flash('Imported 108 contacts')}>Import 108 contacts</button>
                </div>
              </div>
            </div>
          )}
        </Blueprint>

        <Blueprint className="panel">
          <div className="panel-title">Import rules</div>
          <RuleGroup label="Match existing records on" hint="Used to merge into existing golden records, not duplicate them."
            value={dedupe} onChange={setDedupe}
            options={[['domain', 'Email or domain + name'], ['email', 'Email only'], ['linkedin', 'LinkedIn URL']]} />
          <RuleGroup label="Assign to vertical" hint="Rows with a valid vertical column keep their own value."
            value={vertRule} onChange={setVertRule}
            options={[['ecom', 'E-commerce'], ['eng', 'Engineering'], ['auto', 'Automotive'], ['agri', 'Agriculture']]} />
          <RuleGroup label="Owner" hint="Blank owner_email cells fall back to round-robin."
            value={owner} onChange={setOwner}
            options={[['round', 'Round-robin'], ['me', 'Assign to me'], ['col', 'From owner_email column']]} />
          <RuleGroup label="Enrich on import" hint="Immediate enrichment uses on-demand credits."
            value={enrich} onChange={setEnrich}
            options={[['next', 'At the next run'], ['now', 'Immediately'], ['no', 'No']]} />
          <div className="text-4" style={{ fontSize: 11, marginTop: 10 }}>Imports count against the vertical's bench, respect entitlements, and merge into existing golden records rather than duplicating.</div>
        </Blueprint>
      </div>

      <Blueprint style={{ padding: 0, marginBottom: 18 }}>
        <div className="panel-title" style={{ padding: '15px 16px 4px' }}>Required file format</div>
        <div className="table-wrap">
          <table className="table">
            <thead><tr><th>Column</th><th>Requirement</th><th>Example</th><th>Rule</th></tr></thead>
            <tbody>
              {TCOLS.map(c => (
                <tr key={c.col}>
                  <td><code>{c.col}</code></td>
                  <td><span className={'req-tag ' + c.req}>{c.req}</span></td>
                  <td className="text-2">{c.example}</td>
                  <td className="text-2" style={{ fontSize: 12.5 }}>{c.rule}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="text-4" style={{ fontSize: 11, padding: '10px 16px 15px' }}>
          Encoding UTF-8 · Delimiter comma · Multi-values semicolon · Dates YYYY-MM-DD · Max 50,000 rows / 25 MB · leave optional cells blank, not "N/A".
        </div>
      </Blueprint>

      <div className="split e">
        <Blueprint style={{ padding: 0 }}>
          <div className="panel-title" style={{ padding: '15px 16px 0' }}>Sample preview</div>
          <div className="table-wrap" style={{ minWidth: 0 }}>
            <table className="table">
              <thead><tr>{TCOLS.map(c => <th key={c.col}>{c.col}</th>)}</tr></thead>
              <tbody>
                {TROWS.map((r, i) => (
                  <tr key={i}>{r.map((v, j) => <td key={j} className="text-2">{v === '' ? '—' : v}</td>)}</tr>
                ))}
              </tbody>
            </table>
          </div>
        </Blueprint>

        <Blueprint style={{ padding: 0 }}>
          <div className="panel-title" style={{ padding: '15px 16px 0' }}>Recent imports</div>
          <table className="table">
            <thead><tr><th>File</th><th>User</th><th>Date</th><th>Imported</th><th>Merged</th><th>Rejected</th></tr></thead>
            <tbody>
              {RECENT_IMPORTS.map((r, i) => (
                <tr key={i}>
                  <td>{r.file}</td><td>{r.user}</td><td>{r.date}</td>
                  <td className="num">{r.imported}</td><td className="num">{r.merged}</td><td className="num">{r.rejected}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </Blueprint>
      </div>
    </div>
  );
}

function RuleGroup({ label, hint, value, onChange, options }) {
  return (
    <div style={{ marginBottom: 12 }}>
      <div style={{ fontSize: 12.5, fontWeight: 500, marginBottom: 5 }}>{label}</div>
      <div className="chip-row">
        {options.map(([k, l]) => (
          <button key={k} className={'chip' + (value === k ? ' active' : '')} onClick={() => onChange(k)}>{l}</button>
        ))}
      </div>
      <div className="text-4" style={{ fontSize: 11, marginTop: 3 }}>{hint}</div>
    </div>
  );
}
