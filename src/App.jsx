import { AppProvider, useApp } from './context/AppContext';
import { AuthProvider, useAuth } from './context/AuthContext';
import SideNav from './components/SideNav';
import TopBar from './components/TopBar';
import Toast from './components/Toast';
import Login from './screens/Login';

import Overview from './screens/Overview';
import Leads from './screens/Leads';
import Verticals from './screens/Verticals';
import Integrations from './screens/Integrations';
import Connections from './screens/Connections';
import ImportContacts from './screens/ImportContacts';
import Sequences from './screens/Sequences';
import AiOutreach from './screens/AiOutreach';
import Meetings from './screens/Meetings';
import Segments from './screens/Segments';
import Mobile from './screens/Mobile';

const SCREENS = {
  overview: Overview,
  leads: Leads,
  verticals: Verticals,
  integrations: Integrations,
  connect: Connections,
  import: ImportContacts,
  sequences: Sequences,
  ai: AiOutreach,
  meetings: Meetings,
  segments: Segments,
  mobile: Mobile,
};

function Shell() {
  const { screen } = useApp();
  const Screen = SCREENS[screen] || Overview;

  return (
    <div className="app-shell">
      <SideNav />
      <div style={{ flex: 1, minWidth: 0, display: 'flex', flexDirection: 'column' }}>
        <TopBar />
        <main className="main-region">
          <Screen />
        </main>
      </div>
      <Toast />
    </div>
  );
}

function Gate() {
  const { session } = useAuth();
  if (!session) return <Login />;
  return (
    <AppProvider>
      <Shell />
    </AppProvider>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <Gate />
    </AuthProvider>
  );
}
