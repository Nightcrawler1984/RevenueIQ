// Login credentials for the testing gate. This is a lightweight client-side
// check — fine for keeping casual visitors out while you share a link with
// your team, but the values below ship inside the JS bundle, so treat this
// as a "keep it low-profile" gate, not real security.
//
// To change the password(s), just edit the values below and redeploy.

export const CREDENTIALS = {
  admin: {
    username: 'admin',
    password: 'revenueiq-admin-2026',
    role: 'admin',
    label: 'Admin',
  },
  team: {
    // Everyone on the team logs in with this same username + password.
    username: 'team',
    password: 'revenueiq-team-2026',
    role: 'team',
    label: 'Team',
  },
};

export function checkLogin(username, password) {
  const match = Object.values(CREDENTIALS).find(
    c => c.username.toLowerCase() === username.trim().toLowerCase() && c.password === password
  );
  return match ? { role: match.role, label: match.label, username: match.username } : null;
}
