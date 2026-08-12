import { useState } from 'react';
import { CONN } from '../data/fixtures';
import { useApp } from '../context/AppContext';
import Blueprint from '../components/Blueprint';

const statusColor = { Connected: 'var(--color-good)', 'Action needed': 'var(--color-warn)', 'Not connected': 'var(--color-neutral-400)' };
const methodLabel = { api: 'API key', cred: 'Credentials', mcp: 'MCP connector' };

export default function Connections() {
  const { flash } = useApp();
  const [sel, setSel] = useState('apollo');
  const [modeByTool, setModeByTool] = useState({});
  const [ownerByTool, setOwnerByTool] = useState({});
  const [toolOff, setToolOff] = useState({});

  const tool = CONN.find(c => c.k === sel);
  const mode = modeByTool[sel] || tool.def;
  const cfg = tool[mode];
  const owner = ownerByTool[sel] ?? (tool.byokDefault ? 'byok' : 'pooled');
  const connectedCount = CONN.filter(c => c.status === 'Connected').length;

  const toggleTool = (idx) => {
    const key = sel + ':' + mode + ':' + idx;
    setToolOff(o => ({ ...o, [key]: !o[key] }));
  };

  return (
    <div className="page">
      <div className="page-head">
        <div>
          <div className="page-title">Connections</div>
          <div className="page-sub">Connect each vendor tool, three possible ways, with either our credentials or the customer's.</div>
        </div>
        <button className="btn btn-primary" onClick={() => flash('Add connection')}>Add connection</button>
      </div>

      <div className="stat-grid n3">
        <Blueprint className="stat-card">
          <div className="lbl">Connected tools</div>
          <div className="val">{connectedCount} <span className="text-4" style={{ fontSize: 16 }}>of {CONN.length}</span></div>
        </Blueprint>
        <Blueprint className="stat-card">
          <div className="lbl">MCP gateway</div>
          <div className="val" style={{ fontSize: 20 }}>5 servers</div>
          <div className="note">18 tools exposed</div>
        </Blueprint>
        <Blueprint className="stat-card">
          <div className="lbl">Credential vault</div>
          <div className="val" style={{ fontSize: 20 }}>14 secrets</div>
          <div className="note">last rotation 12 Jul · next 12 Oct</div>
        </Blueprint>
      </div>

      <div className="conn-layout">
        <Blueprint style={{ padding: '6px 0' }}>
          {CONN.map(c => (
            <div key={c.k} className={'conn-list-row' + (sel === c.k ? ' active' : '')} onClick={() => setSel(c.k)}>
              <div className="conn-monogram">{c.ab}</div>
              <div className="meta">
                <div className="name">{c.name}</div>
                <div className="sub">{methodLabel[c.def]} · {c.cat}</div>
              </div>
              <span className="status-dot" style={{ background: statusColor[c.status] }} />
            </div>
          ))}
          <div className="text-4" style={{ fontSize: 11, padding: '10px 12px 4px', borderTop: '1px solid var(--color-divider)', marginTop: 6 }}>
            MCP servers are proxied through the gateway so tool calls inherit the same entitlements as the UI.
          </div>
        </Blueprint>

        <Blueprint className="panel">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 12, flexWrap: 'wrap' }}>
            <div style={{ display: 'flex', gap: 10 }}>
              <div className="conn-monogram" style={{ width: 36, height: 36, fontSize: 12.5 }}>{tool.ab}</div>
              <div>
                <div style={{ fontFamily: 'var(--font-heading)', fontWeight: 600, fontSize: 18 }}>{tool.name}</div>
                <div className="text-2" style={{ fontSize: 12 }}>{tool.cat} · {tool.acct}</div>
              </div>
            </div>
            <div style={{ display: 'flex', gap: 8 }}>
              <button className="btn btn-secondary" onClick={() => flash(`Testing connection to ${tool.name}…`)}>Test connection</button>
              <button className="btn btn-secondary" onClick={() => flash(`Disconnect ${tool.name}? Needs confirmation.`)}>Disconnect</button>
            </div>
          </div>
          <span className="tag tag-accent" style={{ marginTop: 8, width: 'fit-content' }}>{tool.status}</span>

          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 16 }}>
            <div className="chip-row">
              {['api', 'cred', 'mcp'].map(m => (
                <button
                  key={m}
                  className={'chip' + (mode === m ? ' active' : '')}
                  style={{ opacity: tool[m] ? 1 : 0.5, cursor: tool[m] ? 'pointer' : 'not-allowed' }}
                  onClick={() => tool[m] && setModeByTool(o => ({ ...o, [sel]: m }))}
                >
                  {methodLabel[m]}
                </button>
              ))}
            </div>
            <span className="text-4" style={{ fontSize: 11 }}>Last verified {tool.checked}</span>
          </div>
          {!tool[mode] && <div className="text-3" style={{ fontSize: 12, marginTop: 6 }}>Not available for this tool — <button className="btn btn-ghost" style={{ padding: 0, fontSize: 12 }} onClick={() => flash('Requested this connection method')}>Request this method</button></div>}

          {cfg && (
            <>
              <div className="card elev-sm" style={{ background: 'var(--color-accent-100)', border: '1px solid var(--color-accent-300)', marginTop: 14, padding: 12 }}>
                <div className="chip-row" style={{ marginBottom: 8 }}>
                  <button className={'chip' + (owner === 'pooled' ? ' active' : '')} onClick={() => setOwnerByTool(o => ({ ...o, [sel]: 'pooled' }))}>RevenueIQ pooled key</button>
                  <button className={'chip' + (owner === 'byok' ? ' active' : '')} onClick={() => setOwnerByTool(o => ({ ...o, [sel]: 'byok' }))}>Client-owned (BYOK)</button>
                </div>
                <div style={{ fontSize: 12.5 }}>
                  {owner === 'pooled'
                    ? 'We call the vendor with our credential and meter usage to your account. Nothing for you to manage — the vendor rate limit is shared across tenants.'
                    : 'Paste your own key, seat login, or MCP server token. Sealed write-only into the vault, scoped to your workspace. Revoking in the vendor console stops the connector instantly.'}
                </div>
                {owner === 'byok' && (
                  <div className="stat-grid n3" style={{ marginTop: 10, marginBottom: 0 }}>
                    <div className="field-box"><div className="lbl">Stored</div><div className="val">Sealed, write-only</div></div>
                    <div className="field-box"><div className="lbl">Scope</div><div className="val">This workspace only</div></div>
                    <div className="field-box"><div className="lbl">Rotation reminder</div><div className="val">every 90 days</div></div>
                  </div>
                )}
              </div>

              <p className="text-2" style={{ fontSize: 13, maxWidth: '76ch', marginTop: 14 }}>{cfg.note}</p>

              <div className="field-grid" style={{ marginTop: 6 }}>
                {cfg.fields.map((f, i) => (
                  <div className={'field-box' + (f.span === 2 ? ' span2' : '')} key={i}>
                    <div className="lbl">{f.label}</div>
                    <div className="val">{f.value}</div>
                    {f.hint && <div className="hint">{f.hint}</div>}
                  </div>
                ))}
              </div>

              <div className="panel-title" style={{ fontSize: 15, marginTop: 18, marginBottom: 2 }}>{cfg.listTitle}</div>
              <div className="text-4" style={{ fontSize: 11, marginBottom: 6 }}>{cfg.listNote}</div>
              {cfg.items.map((it, i) => {
                const key = sel + ':' + mode + ':' + i;
                const on = !toolOff[key];
                return (
                  <div className="tool-row" key={i}>
                    <span className={'checkbox' + (on ? ' checked' : '')} onClick={() => toggleTool(i)}>{on ? '✓' : ''}</span>
                    <div className="meta">
                      <div className="n">{it.n}</div>
                      <div className="d">{it.d}</div>
                    </div>
                    <span className="calls num">{it.calls}</span>
                  </div>
                );
              })}

              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 14, flexWrap: 'wrap', gap: 8 }}>
                <span className="text-4" style={{ fontSize: 11 }}>{cfg.footer}</span>
                <div style={{ display: 'flex', gap: 8 }}>
                  <button className="btn btn-secondary" onClick={() => flash(cfg.rotate + '…')}>{cfg.rotate}</button>
                  <button className="btn btn-primary" onClick={() => flash(`Saved ${tool.name} connection`)}>Save connection</button>
                </div>
              </div>
            </>
          )}
        </Blueprint>
      </div>
    </div>
  );
}
