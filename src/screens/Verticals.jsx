import { VERTS, LEADS } from '../data/fixtures';
import Blueprint from '../components/Blueprint';
import { Lock } from 'lucide-react';

export default function Verticals() {
  return (
    <div className="page">
      <div className="page-head">
        <div>
          <div className="page-title">Verticals</div>
          <div className="page-sub">How the bench breaks down by industry, and how each is performing.</div>
        </div>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
        {VERTS.map(v => {
          const benchCount = LEADS.filter(l => l.vert === v.k).length;
          return (
            <Blueprint className="panel" key={v.k} style={{ opacity: v.licensed ? 1 : 0.75 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 16, flexWrap: 'wrap' }}>
                <div>
                  <div style={{ fontFamily: 'var(--font-heading)', fontWeight: 600, fontSize: 19, display: 'flex', alignItems: 'center', gap: 8 }}>
                    {v.name}
                    {!v.licensed && <span className="tag tag-neutral" style={{ display: 'inline-flex', alignItems: 'center', gap: 4 }}><Lock size={10} /> Not licensed</span>}
                  </div>
                  <div className="text-2" style={{ fontSize: 12.5 }}>{v.subs}</div>
                </div>
                {!v.licensed && <button className="btn btn-primary">Contact account manager</button>}
              </div>

              <div className="stat-grid n4" style={{ marginTop: 14, marginBottom: 0 }}>
                <div>
                  <div className="lbl uc" style={{ fontSize: 10 }}>Total sourced</div>
                  <div className="val num" style={{ fontSize: 20 }}>{v.total.toLocaleString()}</div>
                </div>
                <div>
                  <div className="lbl uc" style={{ fontSize: 10 }}>{v.licensed ? 'On the bench' : 'Available on license'}</div>
                  <div className="val num" style={{ fontSize: 20 }}>{v.licensed ? benchCount : v.total.toLocaleString()}</div>
                </div>
                <div>
                  <div className="lbl uc" style={{ fontSize: 10 }}>Decision-maker share</div>
                  <div className="val num" style={{ fontSize: 20 }}>{v.dm}</div>
                </div>
                <div>
                  <div className="lbl uc" style={{ fontSize: 10 }}>Verified email</div>
                  <div className="val num" style={{ fontSize: 20 }}>{v.verified}</div>
                </div>
              </div>

              {v.licensed && (
                <div style={{ marginTop: 10 }}>
                  <div className="text-3" style={{ fontSize: 11.5, marginBottom: 4 }}>Sourcing target: {v.today}/day</div>
                  <div style={{ height: 6, background: 'var(--color-neutral-200)' }}>
                    <div style={{ height: '100%', width: `${Math.min(100, (v.today / v.target) * 100)}%`, background: 'var(--color-accent)' }} />
                  </div>
                </div>
              )}
            </Blueprint>
          );
        })}
      </div>
    </div>
  );
}
