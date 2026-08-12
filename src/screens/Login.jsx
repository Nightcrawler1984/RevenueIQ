import { useState } from 'react';
import { Lock } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import Blueprint from '../components/Blueprint';

export default function Login() {
  const { login, error } = useAuth();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const submit = (e) => {
    e.preventDefault();
    login(username, password);
  };

  return (
    <div style={{
      height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center',
      background: 'var(--color-bg)', fontFamily: 'var(--font-body)',
    }}>
      <Blueprint style={{ width: 360, padding: 28 }}>
        <div style={{ textAlign: 'center', marginBottom: 22 }}>
          <div style={{ fontFamily: 'var(--font-heading)', fontWeight: 600, fontSize: 24, letterSpacing: '.02em' }}>RevenueIQ</div>
          <div className="text-3 uc" style={{ fontSize: 10, marginTop: 3 }}>Unified Lead Bench</div>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: 6, justifyContent: 'center', marginBottom: 18 }}>
          <Lock size={13} strokeWidth={1.5} className="text-3" />
          <span className="text-3" style={{ fontSize: 12.5 }}>This is a private testing build</span>
        </div>

        <form onSubmit={submit}>
          <div className="field" style={{ marginBottom: 12 }}>
            <label>Username</label>
            <input
              className="input" autoFocus autoComplete="username"
              value={username} onChange={e => setUsername(e.target.value)}
            />
          </div>
          <div className="field" style={{ marginBottom: 6 }}>
            <label>Password</label>
            <input
              className="input" type="password" autoComplete="current-password"
              value={password} onChange={e => setPassword(e.target.value)}
            />
          </div>

          {error && (
            <div style={{ color: 'var(--color-bad)', fontSize: 12.5, margin: '8px 0 0' }}>{error}</div>
          )}

          <button type="submit" className="btn btn-primary btn-block" style={{ marginTop: 14 }}>
            Sign in
          </button>
        </form>

        <div className="text-4" style={{ fontSize: 11, textAlign: 'center', marginTop: 16 }}>
          Don't have a login? Ask whoever shared this link with you.
        </div>
      </Blueprint>
    </div>
  );
}
