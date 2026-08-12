import { MEETINGS } from '../data/fixtures';
import { useApp } from '../context/AppContext';
import Blueprint from '../components/Blueprint';

const outcomeTag = { Qualified: 'tag-accent', Nurture: 'tag-neutral', 'Needs link': 'tag-outline' };

export default function Meetings() {
  const { flash } = useApp();
  return (
    <div className="page">
      <div className="page-head">
        <div>
          <div className="page-title">Meetings</div>
          <div className="page-sub">Zoom calls matched back to bench records. Recordings are read, never copied.</div>
        </div>
      </div>

      <Blueprint style={{ padding: 0 }}>
        <div className="table-wrap">
          <table className="table">
            <thead>
              <tr><th>When</th><th>Title</th><th>Attendees</th><th>Matched record</th><th>Outcome</th><th>Next step</th><th></th></tr>
            </thead>
            <tbody>
              {MEETINGS.map((m, i) => (
                <tr key={i}>
                  <td>{m.date}<div className="text-3" style={{ fontSize: 11.5 }}>{m.time} · {m.dur}</div></td>
                  <td>{m.title}</td>
                  <td className="text-2">{m.attendees}</td>
                  <td>{m.mi >= 0 ? <a href="#" onClick={e => { e.preventDefault(); flash(`Opening ${m.match}'s record`); }}>{m.match}</a> : <span className="text-3">{m.match}</span>}</td>
                  <td><span className={'tag ' + outcomeTag[m.outcome]}>{m.outcome}</span></td>
                  <td className="text-2">{m.next}</td>
                  <td><button className="btn btn-ghost" onClick={() => flash(m.act)}>{m.act}</button></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Blueprint>
    </div>
  );
}
