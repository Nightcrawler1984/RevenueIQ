import { useApp } from '../context/AppContext';
import Blueprint from '../components/Blueprint';
import { CheckCircle2, Phone, Mail } from 'lucide-react';

export default function Mobile() {
  const { scopedLeads, flash } = useApp();
  const queue = scopedLeads.filter(l => l.seq !== 'Not in sequence').slice(0, 6);

  return (
    <div className="page">
      <div className="page-head">
        <div>
          <div className="page-title">On the road</div>
          <div className="page-sub">The SDR queue and one record, at phone width — thumb-reachable actions.</div>
        </div>
      </div>

      <div className="phone-frame">
        <div style={{ fontFamily: 'var(--font-heading)', fontWeight: 600, fontSize: 16, marginBottom: 10 }}>Today's queue</div>
        {queue.map(l => (
          <div className="phone-task" key={l.id}>
            <CheckCircle2 size={18} strokeWidth={1.5} color="var(--color-accent)" />
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ fontSize: 13.5, fontWeight: 500 }}>{l.name}</div>
              <div className="text-3" style={{ fontSize: 11.5 }}>{l.company} · {l.seq}</div>
            </div>
            <button className="btn btn-icon btn-secondary" style={{ minWidth: 44, minHeight: 44 }} onClick={() => flash(`Calling ${l.name}…`)}><Phone size={16} strokeWidth={1.5} /></button>
            <button className="btn btn-icon btn-secondary" style={{ minWidth: 44, minHeight: 44 }} onClick={() => flash(`Opening email to ${l.name}`)}><Mail size={16} strokeWidth={1.5} /></button>
          </div>
        ))}
      </div>

      <div className="text-3" style={{ textAlign: 'center', fontSize: 12, marginTop: 14 }}>
        This is the intended phone treatment — the real app renders this layout natively below ~480px width.
      </div>
    </div>
  );
}
