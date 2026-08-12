// Fixture data ported from the design handoff (Sales Dashboard.dc.html).
// In production every array here is replaced by a real API/DB call —
// see README "Data the backend must provide" for the shape each one needs.

export const SRC = {
  apollo:   { name: 'Apollo',      ab: 'AP', bg: '#DCE3F3', fg: '#1C2F66' },
  seamless: { name: 'Seamless.AI', ab: 'SL', bg: '#EEF1F9', fg: '#243D83' },
  linkedin: { name: 'LinkedIn SN', ab: 'LI', bg: '#C7D0EA', fg: '#16254F' },
  zoom:     { name: 'Zoom',        ab: 'ZM', bg: '#F9E5BE', fg: '#7A5410' },
  lemlist:  { name: 'lemlist',     ab: 'LM', bg: '#EFEFED', fg: '#52525B' },
};

export const VERTS = [
  { k: 'ecom', name: 'E-commerce & Retail',      subs: 'DTC · Marketplaces · 3PL',              total: 148320, licensed: true,  today: 412, dm: '38%', verified: '81%', target: 72 },
  { k: 'eng',  name: 'Engineering & Industrial',  subs: 'Precision · EPC · Automation',          total: 96410,  licensed: true,  today: 188, dm: '34%', verified: '77%', target: 60 },
  { k: 'auto', name: 'Automotive',                subs: 'Tier-1 · EV charging · Dealer groups',  total: 121880, licensed: true,  today: 121, dm: '41%', verified: '84%', target: 66 },
  { k: 'agri', name: 'Agriculture',               subs: 'Precision ag · Processing · Equipment', total: 63540,  licensed: true,  today: 55,  dm: '26%', verified: '69%', target: 50 },
  { k: 'hlth', name: 'Healthcare & Life Sci',      subs: 'Providers · Devices · CROs',            total: 51200,  licensed: false, today: 0,   dm: '—',   verified: '—',   target: 40 },
  { k: 'logi', name: 'Logistics & Freight',        subs: 'Brokerage · Last mile · Cold chain',    total: 31590,  licensed: false, today: 0,   dm: '—',   verified: '—',   target: 34 },
];

const R = [
  ['Priya Raghavan','VP Demand Generation','VP','Champion','Lumen & Loom','ecom','DTC Apparel','420','$88M','Austin TX','apollo,linkedin,lemlist',92,'Step 3 · LinkedIn','2d','Hiring: Lifecycle Marketing|Pricing page ×3','Shopify Plus|Klaviyo|Gorgias','K. Raman',1,1,'Posted about replatforming off Magento — 8d ago'],
  ['Marcus Deele','Chief Digital Officer','C-Level','Economic buyer','Brightline Retail Group','ecom','Multi-brand Retail','3,100','$1.2B','Chicago IL','apollo,seamless,zoom',88,'Meeting booked','1d','Board mandate: DTC margin','SAP Commerce|Braze','A. Whitfield',1,1,'Spoke at Shoptalk on unified inventory'],
  ['Sana Iqbal','Director of Ecommerce Ops','Director','Influencer','Northbay Supply Co.','ecom','3PL & Fulfilment','780','$210M','Seattle WA','seamless,linkedin',74,'Step 2 · Email','5d','Job post: WMS integration','NetSuite|ShipHero','K. Raman',1,0,'Commented on a 3PL benchmarking post'],
  ['Tomas Berg','Head of Growth','Director','Champion','Verdant Cart','ecom','Marketplaces','160','$34M','Rotterdam','apollo,lemlist',69,'Replied','3h','Two demo requests this quarter','Shopify|Recharge','A. Whitfield',1,1,'Replied asking for pricing tiers'],
  ['Angela Ruiz','Chief Financial Officer','C-Level','Economic buyer','Palladio Home','ecom','Home & Furniture','540','$126M','Miami FL','apollo,seamless',81,'Not in sequence','—','Funding: $40M Series C','NetSuite|Avalara','K. Raman',0,1,'New CFO as of March'],
  ['Derek Osei','Ecommerce Manager','Manager','Gatekeeper','Cinder & Salt','ecom','DTC Food','95','$18M','Toronto','linkedin',52,'Paused','21d','—','Shopify|Attentive','A. Whitfield',0,0,'Changed role two weeks ago'],
  ['Nadia Fenwick','VP Engineering Operations','VP','Economic buyer','Halcyon Fabrication','eng','Precision Machining','1,200','$340M','Sheffield UK','apollo,seamless,linkedin',90,'Step 2 · Email','4d','RFQ volume +40%|Hiring 12 CNC','Epicor|Siemens NX','K. Raman',1,1,'Published a shop-floor automation case study'],
  ['Roland Kettl','Managing Director','C-Level','Economic buyer','Brant & Vogel EPC','eng','EPC & Infrastructure','4,200','$980M','Munich','apollo,zoom',86,'Meeting booked','2d','Two plant contracts awarded','SAP|Autodesk','A. Whitfield',1,1,'Discovery call held Tuesday'],
  ['Iris Kavanagh','Director of Automation','Director','Champion','Kestrel Automation','eng','Industrial Automation','610','$155M','Cork IE','seamless,lemlist',77,'Step 3 · LinkedIn','6d','Evaluating MES vendors','Ignition|Rockwell','K. Raman',1,0,'Downloaded the integration brief'],
  ['Hugo Mendez','Plant Manager','Manager','Influencer','Ironvale Precision','eng','Metal Forming','340','$62M','Monterrey','apollo',58,'Not in sequence','—','—','Fusion 360','A. Whitfield',0,0,'No recent activity'],
  ['Wei Lam','Chief Technology Officer','C-Level','Champion','Sixth Axis Robotics','eng','Robotics','220','$47M','Singapore','apollo,linkedin,zoom,lemlist',94,'Replied','8h','Series B $60M|Hiring Solutions Architect','ROS|AWS IoT','K. Raman',1,1,'Keynote on cobot payback periods'],
  ['Freya Lindqvist','Head of Procurement','Director','Gatekeeper','Merrow Metalworks','eng','Fabrication','890','$198M','Gothenburg','seamless',61,'Bounced','12d','—','IFS','A. Whitfield',0,1,'Email hard-bounced, needs re-verification'],
  ['Ana Beltrán','VP Supply Chain','VP','Economic buyer','Torqueline Components','auto','Tier-1 Supplier','5,400','$1.4B','Detroit MI','apollo,seamless,zoom',91,'Meeting booked','1d','EV program ramp|Supplier consolidation','SAP|Coupa','K. Raman',1,1,'Second call scheduled with her ops lead'],
  ['Sébastien Roy','Director of Network Development','Director','Champion','Voltmark Charging','auto','EV Charging','380','$92M','Lyon','apollo,linkedin,lemlist',85,'Step 3 · LinkedIn','3d','40 new sites announced','Salesforce|Twilio','A. Whitfield',1,1,'Posted a charger uptime teardown'],
  ['Grant Ashgrove','Group Chief Executive','C-Level','Economic buyer','Ashgrove Motors Group','auto','Dealer Group','2,600','$780M','Manchester UK','apollo',79,'Not in sequence','—','Acquired six dealerships','Keyloop','K. Raman',1,0,'Quoted in a trade piece on consolidation'],
  ['Mei Tanaka','Head of Connected Services','Director','Influencer','Halden Auto Systems','auto','OEM Software','7,300','$3.1B','Yokohama','seamless,linkedin',72,'Step 2 · Email','7d','Hiring: Telematics PM','AWS|Snowflake','A. Whitfield',1,0,'Opened the last three emails'],
  ['Owen Pike','Aftermarket Sales Manager','Manager','Influencer','Piston & Pike','auto','Aftermarket Parts','210','$40M','Birmingham UK','lemlist',49,'Paused','30d','—','Zoho','K. Raman',0,0,'Sequence paused after two no-opens'],
  ['Lucia Ferraro','Chief Information Officer','C-Level','Economic buyer','Ampere Mobility','auto','Fleet Electrification','900','$260M','Milan','apollo,seamless,zoom,linkedin',89,'Replied','5h','RFP issued for fleet telematics','Azure|Geotab','A. Whitfield',1,1,'Asked for a security questionnaire'],
  ['Tobias Hale','VP Operations','VP','Economic buyer','Terra Yield Co-op','agri','Grain & Co-ops','1,500','$410M','Des Moines IA','apollo,seamless',83,'Step 2 · Email','4d','Storage expansion capex','Trimble|Ag Leader','K. Raman',1,1,'Board approved a capex line in June'],
  ['Rita Boonstra','Director of Precision Ag','Director','Champion','Fielding Agronomics','agri','Precision Agriculture','260','$58M','Wageningen NL','apollo,linkedin,lemlist',87,'Step 3 · LinkedIn','2d','Pilot with two co-ops','Deere Ops|FieldView','A. Whitfield',1,1,'Shared yield-model results publicly'],
  ['Emeka Nwosu','Chief Operating Officer','C-Level','Economic buyer','Harrowgate Equipment','agri','Farm Equipment','3,400','$720M','Leeds UK','apollo,zoom',80,'Meeting booked','6d','Dealer network overhaul','Infor','K. Raman',1,1,'Intro call went 45 minutes'],
  ['Katrin Osei-Bonsu','Head of Sustainability','Director','Influencer','Silo & Stem','agri','Agri-processing','640','$140M','Accra','seamless,linkedin',66,'Not in sequence','—','ESG reporting mandate','SAP','A. Whitfield',1,0,'Speaking at a processing summit'],
  ['Jonas Vetter','Farm Systems Manager','Manager','Gatekeeper','Verdigris Farms','agri','Row Crop','120','$27M','Nebraska','apollo',44,'Not in sequence','—','—','FarmLogs','K. Raman',0,0,'Thin record — title only'],
  ['Amara Singh','VP Data & Analytics','VP','Champion','Cropline Analytics','agri','Ag Data & SaaS','190','$36M','Bengaluru','apollo,seamless,linkedin,lemlist',93,'Replied','1d','Hiring 5 data engineers|Pricing page ×5','Snowflake|dbt|HubSpot','A. Whitfield',1,1,'Asked about integration partners in a group'],
];

export const LEADS = R.map((r, i) => {
  const first = r[0].split(' ')[0].toLowerCase().replace(/[^a-z]/g, '');
  const last = r[0].split(' ').slice(-1)[0].toLowerCase().replace(/[^a-z]/g, '');
  const dom = r[4].toLowerCase().replace(/[^a-z0-9]/g, '') + '.com';
  return {
    id: 'GR-' + String(4100 + i * 7),
    name: r[0], title: r[1], tier: r[2], brole: r[3], company: r[4], vert: r[5], sub: r[6],
    emp: r[7] + ' emp', rev: r[8], city: r[9], sources: r[10].split(','), score: r[11],
    seq: r[12], touch: r[13],
    intents: r[14] === '—' ? [] : r[14].split('|'),
    tech: r[15].split('|'), owner: r[16], ev: !!r[17], dd: !!r[18], activity: r[19],
    email: first + '.' + last + '@' + dom,
    altEmail: first[0] + last + '@' + dom,
    phone: '+1 ' + (200 + i) + ' 555 0' + (100 + i),
    li: 'linkedin.com/in/' + first + '-' + last,
    initials: r[0].split(' ').map(s => s[0]).join('').slice(0, 2).toUpperCase(),
  };
});

export const SOURCES = [
  { k: 'apollo', name: 'Apollo', ab: 'AP', state: 'Healthy', time: '06:02', added: '+412', updated: '1,204', dedupe: '18%', quotaLabel: 'Export credits', quotaPct: 62, note: 'nominal' },
  { k: 'seamless', name: 'Seamless.AI', ab: 'SL', state: 'Healthy', time: '06:05', added: '+268', updated: '842', dedupe: '24%', quotaLabel: 'Credits', quotaPct: 41, note: 'nominal' },
  { k: 'linkedin', name: 'LinkedIn SN', ab: 'LI', state: 'Rate limited', time: '06:11', added: '+96', updated: '311', dedupe: '31%', quotaLabel: 'Daily view cap', quotaPct: 97, note: 'partial · retry 12:00' },
  { k: 'zoom', name: 'Zoom', ab: 'ZM', state: 'Healthy', time: '06:00', added: '+14', updated: '9', dedupe: '—', quotaLabel: 'API budget', quotaPct: 12, note: '14 calls · 9 matched' },
  { k: 'lemlist', name: 'lemlist', ab: 'LM', state: 'Healthy', time: '06:03', added: '+46', updated: '3,180', dedupe: '—', quotaLabel: 'Webhook lag', quotaPct: 8, note: '46 replies ingested' },
];

export const RESOLUTION_STEPS = [
  { step: 'Exact email match', resolved: 512 },
  { step: 'Domain + normalised name', resolved: 188 },
  { step: 'LinkedIn URL match', resolved: 96 },
  { step: 'Fuzzy name + company', resolved: 34 },
  { step: 'Manual review queue', resolved: 6 },
];

export const RUNS = [
  { id: '#2841', started: 'Today 06:00', dur: '11m 42s', sourced: '836', merged: '212', rejected: '18', result: 'Partial', ok: false },
  { id: '#2840', started: 'Yesterday 06:00', dur: '9m 18s', sourced: '791', merged: '188', rejected: '9', result: 'Complete', ok: true },
  { id: '#2839', started: '25 Jul 06:00', dur: '10m 04s', sourced: '824', merged: '196', rejected: '11', result: 'Complete', ok: true },
  { id: '#2838', started: '24 Jul 06:00', dur: '14m 51s', sourced: '602', merged: '141', rejected: '22', result: 'Retried', ok: true },
  { id: '#2837', started: '23 Jul 06:00', dur: '9m 47s', sourced: '780', merged: '203', rejected: '7', result: 'Complete', ok: true },
  { id: '#2836', started: '22 Jul 06:00', dur: '9m 33s', sourced: '812', merged: '198', rejected: '14', result: 'Complete', ok: true },
];

export const SEQS = [
  { name: 'Replatform pain · DTC', vert: 'E-commerce', steps: 4, owner: 'K. Raman', sent: '1,240', open: '58%', reply: '9.4%', meetings: 22,
    detail: [['Email · pattern interrupt','day 0',1240,412,100],['LinkedIn connect','day 2',980,201,79],['Email · case study','day 5',744,96,60],['Break-up','day 11',502,48,40]],
    insight: 'Step 2 carries the reply rate — the LinkedIn touch lifts step 3 opens by 19 points. Worth cloning into Automotive.' },
  { name: 'Shop-floor automation', vert: 'Engineering', steps: 5, owner: 'K. Raman', sent: '980', open: '51%', reply: '7.1%', meetings: 14,
    detail: [['Email · RFQ hook','day 0',980,288,100],['Email · payback math','day 3',801,152,82],['LinkedIn voice note','day 6',602,88,61],['Email · peer proof','day 9',441,52,45],['Break-up','day 14',300,21,31]],
    insight: 'Drop-off is steepest between step 3 and 4. Directors reply twice as often as plant managers — retarget the entry filter.' },
  { name: 'EV program ramp', vert: 'Automotive', steps: 4, owner: 'A. Whitfield', sent: '760', open: '63%', reply: '11.2%', meetings: 19,
    detail: [['Email · site rollout','day 0',760,301,100],['Email · uptime benchmark','day 3',640,188,84],['LinkedIn connect','day 6',498,121,66],['Break-up','day 10',352,62,46]],
    insight: 'Best reply rate in the account. Every meeting came from a record with a direct dial attached — prioritise Seamless-enriched rows.' },
  { name: 'Precision pilot', vert: 'Agriculture', steps: 3, owner: 'A. Whitfield', sent: '420', open: '47%', reply: '6.0%', meetings: 6,
    detail: [['Email · yield model','day 0',420,141,100],['Email · co-op proof','day 4',338,74,80],['Break-up','day 9',241,29,57]],
    insight: 'Thin bench, not a copy problem: only 26% of the agriculture records are decision makers. Fix sourcing before rewriting steps.' },
];

export const MEETINGS = [
  { date: 'Today', time: '11:00', dur: '30m', title: 'Torqueline · EV supplier review', attendees: '3 · Beltrán, Okafor, +1', match: 'Ana Beltrán', mi: 12, outcome: 'Qualified', next: 'Send commercial model', act: 'Open record' },
  { date: 'Today', time: '15:30', dur: '45m', title: 'Ampere Mobility · telematics RFP', attendees: '4 · Ferraro, +3', match: 'Lucia Ferraro', mi: 17, outcome: 'Qualified', next: 'Security questionnaire', act: 'Open record' },
  { date: 'Yesterday', time: '09:30', dur: '45m', title: 'Brant & Vogel · discovery', attendees: '2 · Kettl, Sauer', match: 'Roland Kettl', mi: 7, outcome: 'Qualified', next: 'Loop in plant ops', act: 'Open record' },
  { date: 'Yesterday', time: '16:00', dur: '25m', title: 'Harrowgate · dealer network', attendees: '3 · Nwosu, +2', match: 'Emeka Nwosu', mi: 20, outcome: 'Nurture', next: 'Re-touch in Q4', act: 'Open record' },
  { date: '24 Jul', time: '13:00', dur: '30m', title: 'Brightline Retail · intro', attendees: '2 · Deele, unknown', match: '1 attendee unmatched', mi: -1, outcome: 'Needs link', next: 'Resolve identity', act: 'Link to lead' },
  { date: '23 Jul', time: '10:00', dur: '20m', title: 'Inbound · unqualified', attendees: '1 · unknown', match: 'No match found', mi: -1, outcome: 'Needs link', next: 'Create record', act: 'Link to lead' },
];

export const SEGMENTS = [
  { name: 'EV ramp · economic buyers', count: '1,284', owner: 'A. Whitfield', refreshed: '06:04 today', criteria: ['Automotive', 'EV Charging + Tier-1', 'C-level / VP', 'Direct dial'], sync: true },
  { name: 'Replatform intent · DTC', count: '2,940', owner: 'K. Raman', refreshed: '06:04 today', criteria: ['E-commerce', 'Shopify Plus', 'Pricing page ×2+', 'Verified email'], sync: true },
  { name: 'Precision ag pilots', count: '412', owner: 'A. Whitfield', refreshed: '06:05 today', criteria: ['Agriculture', 'Precision Ag', 'Director+', 'Champion'], sync: false },
  { name: 'Shop-floor CAPEX', count: '1,860', owner: 'K. Raman', refreshed: '06:05 today', criteria: ['Engineering', '500+ employees', 'Hiring signal'], sync: true },
  { name: 'Stale · needs re-verify', count: '318', owner: 'Shared', refreshed: '06:06 today', criteria: ['Any vertical', 'Email > 90 days', 'Bounced or risky'], sync: false },
  { name: 'Zoom no-shows', count: '96', owner: 'Shared', refreshed: '06:06 today', criteria: ['Meeting booked', 'No attendance', 'Last 60 days'], sync: false },
];

export const DAYS = [
  ['14', 611], ['15', 702], ['16', 688], ['17', 741], ['18', 402], ['19', 318], ['20', 766],
  ['21', 803], ['22', 812], ['23', 780], ['24', 602], ['25', 824], ['26', 791], ['27', 836],
];

// — Connections (Apollo shown in full detail; remaining seven summarised for the config panel) —
const F = (label, value, hint, span) => ({ label, value, hint: hint || '', span: span || 1 });
const T = (n, d, calls) => ({ n, d, calls });

export const CONN = [
  { k: 'apollo', name: 'Apollo.io', ab: 'AP', cat: 'Contact & intent data', status: 'Connected', acct: 'revenueiq-ops@revenueiq.io', checked: 'today 06:02', def: 'api',
    api: { note: 'Server-to-server against the Apollo REST API. The key lives in the RevenueIQ vault and is injected per request — it never reaches the browser.',
      fields: [F('Base URL', 'https://api.apollo.io/api/v1', 'Global region'), F('Header name', 'X-Api-Key', 'Apollo passes the key as a header, not a bearer token'), F('API key', 'sk_live_••••••••••••4f21', 'Rotated 12 Jul · next rotation 12 Oct'), F('Rate limit', '600 req/min · 50k exports/month', '62% of this month\u2019s export credits used')],
      listTitle: 'Endpoints in use', listNote: 'Untick to exclude from the 06:00 run',
      items: [T('POST /mixed_people/search', 'Pulls new people matching each vertical\u2019s ICP rule', '412/day'), T('POST /people/match', 'Enriches a known record with email, direct dial and title', '1,204/day'), T('POST /organizations/enrich', 'Firmographics — headcount, revenue, tech stack', '310/wk'), T('GET /intent', 'Buying-intent topics, decayed after 30 days', '1/day')],
      footer: 'Authorised as revenueiq-ops@revenueiq.io · read scope', rotate: 'Rotate key' },
    cred: null,
    mcp: { note: 'Apollo\u2019s hosted MCP server, proxied through the RevenueIQ gateway so tool calls inherit the same vertical entitlements as this UI.',
      fields: [F('MCP server URL', 'https://mcp.apollo.io/sse', 'Published by Apollo', 2), F('Transport', 'SSE, streamable-HTTP fallback', ''), F('Auth', 'Bearer · workspace token ••••9a17', 'Held in the RevenueIQ vault')],
      listTitle: 'Tools exposed', listNote: 'Only ticked tools are callable by agents',
      items: [T('apollo.search_people', 'Natural-language ICP search returning candidate records', '86/day'), T('apollo.enrich_person', 'Fills email, direct dial and title for one person', '240/day'), T('apollo.enrich_company', 'Firmographic and technographic lookup', '75/day'), T('apollo.get_intent_topics', 'Intent topics for a domain', '30/day')],
      footer: 'Gateway logs every tool call against the requesting user', rotate: 'Re-issue token' } },

  { k: 'seamless', name: 'Seamless.AI', ab: 'SL', cat: 'Direct dials & mobiles', status: 'Connected', acct: 'ops@revenueiq.io', checked: 'today 06:05', def: 'cred',
    api: { note: 'Credit-metered REST API. Cheaper per record than the session route, but it returns fewer mobile numbers.',
      fields: [F('Base URL', 'https://api.seamless.ai/v1', ''), F('Auth', 'Authorization: Bearer', ''), F('API key', '••••••••••••7c03', 'Rotated 28 Jun'), F('Credits', '41% of monthly pool used', 'Run halts at 90% and raises to the owner')],
      listTitle: 'Endpoints in use', listNote: 'Untick to exclude from the 06:00 run',
      items: [T('POST /search/contacts', 'Contact search by title, seniority and company filters', '268/day'), T('POST /contact/enrich', 'Direct dial and mobile lookup', '842/day'), T('GET /credits', 'Balance check before each run', '1/day')],
      footer: 'Contract: 120k credits/year', rotate: 'Rotate key' },
    cred: { note: 'Authenticated session against the Seamless.AI web app. Slower than the API and sensitive to their UI changes — keep it for the fields the API does not expose.',
      fields: [F('Workspace email', 'ops@revenueiq.io', 'Team plan · seat 3 of 5'), F('Password', '••••••••••••', 'Encrypted at rest; MFA required to rotate'), F('MFA', 'Authenticator app', 'Backup codes held by the account owner'), F('Session refresh', 'Nightly 05:50 IST', 'Two failures raise to both admins')],
      listTitle: 'Fields collected', listNote: 'Session route only',
      items: [T('Mobile number', 'Mobiles the API withholds on this plan', '410/day'), T('Company switchboard', 'Fallback when no direct dial exists', '180/day'), T('Employee count band', 'Used to bracket account size', '842/day')],
      footer: 'Session valid · last renewed 05:50 today', rotate: 'Re-authenticate' },
    mcp: null },

  { k: 'zoominfo', name: 'ZoomInfo', ab: 'ZI', cat: 'Firmographics & org charts', status: 'Not connected', acct: 'no account linked', checked: '—', def: 'api', byokDefault: true,
    api: { note: 'ZoomInfo mints a short-lived JWT from a service-account private key — there is no static API key. Upload the key to the vault and RevenueIQ will mint a token per run.',
      fields: [F('Base URL', 'https://api.zoominfo.com', 'Enterprise tenant'), F('Auth type', 'JWT via PKI', 'Username + private key'), F('Service username', 'not set', 'Paste the service-account username'), F('Private key', 'not uploaded', 'PEM, 2048-bit — stored in the vault')],
      listTitle: 'Endpoints to enable', listNote: 'A sandbox test runs before the first live sync',
      items: [T('POST /search/contact', 'Contact search by ICP filters', '—'), T('POST /enrich/contact', 'Email, phone and title enrichment', '—'), T('POST /enrich/company', 'Firmographics and org chart', '—'), T('GET /usage', 'Credit guard-rail', '—')],
      footer: 'Not connected — nothing will run until a key is uploaded', rotate: 'Upload key' },
    cred: null,
    mcp: { note: 'If your ZoomInfo tenant has the MCP endpoint enabled, paste its URL here and approve the device-code prompt.',
      fields: [F('MCP server URL', 'not set', 'Copy it from the ZoomInfo admin console', 2), F('Transport', 'Streamable HTTP', ''), F('Auth', 'OAuth 2.1 · device code', 'An admin must approve the connection')],
      listTitle: 'Tools to expose', listNote: 'Available once the server responds',
      items: [T('zoominfo.search_contacts', 'ICP search returning contact candidates', '—'), T('zoominfo.enrich_contact', 'Enrich a single contact', '—'), T('zoominfo.company_org_chart', 'Reporting lines around a buyer', '—')],
      footer: 'Not connected', rotate: 'Start device flow' } },

  { k: 'linkedin', name: 'LinkedIn Sales Nav', ab: 'LI', cat: 'Live profiles & activity', status: 'Action needed', acct: 'a.whitfield@revenueiq.io', checked: 'today 06:11', def: 'cred', byokDefault: true,
    api: null,
    cred: { note: 'Sales Navigator publishes no data API, so RevenueIQ drives an authorised seat session. Stay inside the daily view cap or LinkedIn throttles the seat.',
      fields: [F('Seat', 'a.whitfield@revenueiq.io', 'Advanced Plus · seat 2 of 3'), F('Password', '••••••••••••', 'Rotated 03 Jul'), F('Session cookie', 'li_at ••••••e42b', 'Expires in 21 days — re-auth prompt at 7'), F('Daily view cap', '1,000 profiles', '97% used today — the run pauses at the cap')],
      listTitle: 'Collectors', listNote: 'Untick to reduce seat usage',
      items: [T('Profile refresh', 'Re-reads title, tenure and company for tracked leads', '311/day'), T('Activity signals', 'Posts, comments and job changes', '96/day'), T('Saved-search sync', 'Adds new members of two saved searches', '2/day')],
      footer: 'Seat rate-limited today · retry queued for 12:00 IST', rotate: 'Re-authenticate' },
    mcp: { note: 'A self-hosted bridge — LinkedIn ships no MCP server. It runs on the same seat session, so the daily cap still applies.',
      fields: [F('MCP server URL', 'https://mcp.revenueiq.io/linkedin', 'Self-hosted by RevenueIQ', 2), F('Transport', 'Streamable HTTP', ''), F('Auth', 'Bearer · gateway token ••••3d55', 'Issued by the RevenueIQ gateway')],
      listTitle: 'Tools exposed', listNote: 'Capped at 200 profile reads per agent per day',
      items: [T('linkedin.get_profile', 'Reads a profile the seat is allowed to view', '40/day'), T('linkedin.list_activity', 'Recent posts and comments for a lead', '25/day'), T('linkedin.sync_saved_search', 'Adds new saved-search members to the bench', '2/day')],
      footer: 'Shares the seat cap with the credential collector', rotate: 'Re-issue token' } },

  { k: 'zoom', name: 'Zoom', ab: 'ZM', cat: 'Meetings & recordings', status: 'Connected', acct: 'RevenueIQ sales account', checked: 'today 06:00', def: 'api',
    api: { note: 'A server-to-server OAuth app scoped to meeting metadata and cloud recordings for the sales account only — no personal calls are read.',
      fields: [F('Base URL', 'https://api.zoom.us/v2', ''), F('Auth', 'Server-to-server OAuth', 'Account ID + client credentials'), F('Client ID', 'zm_••••••••51a', ''), F('Client secret', '••••••••••••', 'Rotated 01 Jul')],
      listTitle: 'Endpoints in use', listNote: 'Untick to exclude from the 06:00 run',
      items: [T('GET /users/{id}/meetings', 'Lists calls to match against the bench', '14/day'), T('GET /meetings/{id}/recordings', 'Recording and transcript links', '9/day'), T('GET /report/meetings', 'Attendance and duration', '14/day')],
      footer: 'Scopes: meeting:read, recording:read, report:read', rotate: 'Rotate secret' },
    cred: null,
    mcp: { note: 'Zoom\u2019s hosted MCP server. Useful for pulling a transcript on demand rather than on the nightly schedule.',
      fields: [F('MCP server URL', 'https://mcp.zoom.us/sse', '', 2), F('Transport', 'SSE', ''), F('Auth', 'OAuth 2.1 · granted 14 Jul', 'Consent covers meetings and recordings')],
      listTitle: 'Tools exposed', listNote: 'Only ticked tools are callable by agents',
      items: [T('zoom.list_meetings', 'Recent meetings for the sales seats', 'on demand'), T('zoom.get_transcript', 'Transcript for one call', 'on demand'), T('zoom.match_attendees', 'Resolves attendee emails to golden records', '9/day')],
      footer: 'Recordings are read, never copied into RevenueIQ', rotate: 'Re-consent' } },

  { k: 'lemlist', name: 'lemlist', ab: 'LM', cat: 'Sequences & replies', status: 'Connected', acct: 'workspace: revenueiq-outbound', checked: 'today 06:03', def: 'api',
    api: { note: 'Two-way. RevenueIQ pushes leads into campaigns; lemlist posts every open, reply and bounce back to the webhook within seconds.',
      fields: [F('Base URL', 'https://api.lemlist.com/api', ''), F('Auth', 'Basic · API key as password', ''), F('API key', '••••••••••••e77', 'Rotated 20 Jun'), F('Webhook endpoint', 'https://in.revenueiq.io/hooks/lemlist', 'Signed HMAC-SHA256 · median lag 8s', 2)],
      listTitle: 'Calls & webhooks', listNote: 'Untick to stop that traffic',
      items: [T('POST /campaigns/{id}/leads', 'Adds a lead to a sequence', '214/day'), T('GET /campaigns', 'Campaign list and step counts', '1/day'), T('Webhook: emailsReplied', 'Writes reply state onto the record', '46/day'), T('Webhook: emailsBounced', 'Marks the email unverified and pauses the lead', '9/day')],
      footer: 'Write access enabled — sequences can be started from RevenueIQ', rotate: 'Rotate key' },
    cred: null,
    mcp: { note: 'Self-hosted bridge over the lemlist API, so an agent can enrol or pause leads without leaving the conversation.',
      fields: [F('MCP server URL', 'https://mcp.revenueiq.io/lemlist', 'Self-hosted by RevenueIQ', 2), F('Transport', 'Streamable HTTP', ''), F('Auth', 'Bearer · gateway token ••••b901', '')],
      listTitle: 'Tools exposed', listNote: 'Write tools require the VP Sales role',
      items: [T('lemlist.add_to_campaign', 'Enrols selected leads in a sequence', 'on demand'), T('lemlist.pause_lead', 'Pauses a lead across every campaign', 'on demand'), T('lemlist.campaign_stats', 'Step-level performance', 'on demand')],
      footer: 'Write tools are logged and reversible for 24 hours', rotate: 'Re-issue token' } },

  { k: 'gws', name: 'Google Workspace', ab: 'GW', cat: 'Sending mailboxes', status: 'Connected', acct: 'revenueiq.io · 2 mailboxes', checked: 'today 06:12', def: 'cred', byokDefault: true,
    api: { note: 'Gmail API on a service account with domain-wide delegation — used for sending, reply detection and thread state on the outreach mailboxes only.',
      fields: [F('Base URL', 'https://gmail.googleapis.com/gmail/v1', ''), F('Auth', 'Service account · domain-wide delegation', 'Approved by your Workspace super-admin'), F('Delegated mailboxes', 'k.raman@revenueiq.io, a.whitfield@revenueiq.io', 'Add or remove per campaign', 2), F('Scopes', 'gmail.send, gmail.readonly, gmail.metadata', 'No access to unrelated inboxes')],
      listTitle: 'What runs on this connection', listNote: 'Untick to stop that traffic',
      items: [T('messages.send', 'Sends approved outreach drafts on rotation', '412/day'), T('history.list', 'Detects replies and stops the sequence', 'every 2 min'), T('threads.get', 'Threads follow-ups under the original subject', '96/day'), T('Warm-up traffic', 'Seeded conversations that build sender reputation', '60/day')],
      footer: 'Sending domain authenticated · SPF, DKIM and DMARC pass', rotate: 'Rotate service key' },
    cred: { note: 'Per-mailbox OAuth. Each rep grants access to their own mailbox — nothing is shared, and revoking in their Google account stops sending immediately.',
      fields: [F('Mailbox', 'k.raman@revenueiq.io', 'Granted 14 Jul'), F('Grant', 'OAuth 2.0 · send + read own mail', 'Re-consent every 6 months'), F('Daily cap', '50 sends per mailbox', 'Raised as the warm-up score climbs'), F('Warm-up', 'Enabled · score 92', 'Runs for 21 days on a new mailbox')],
      listTitle: 'Connected mailboxes', listNote: 'Untick to take a mailbox out of rotation',
      items: [T('k.raman@revenueiq.io', 'Warm 92% · 31 of 50 sent today', 'Sending'), T('a.whitfield@revenueiq.io', 'Warm 88% · 44 of 50 sent today', 'Sending'), T('Shared: hello@revenueiq.io', 'Reply-catcher, never sends cold', 'Read only')],
      footer: 'Reply detection lag: under 2 minutes', rotate: 'Re-consent' },
    mcp: null },

  { k: 'm365', name: 'Microsoft 365', ab: 'MS', cat: 'Sending mailboxes', status: 'Connected', acct: 'outbound-revenueiq.com · 2 mailboxes', checked: 'today 06:12', def: 'cred', byokDefault: true,
    api: { note: 'Microsoft Graph app registration, scoped with an application access policy so it can only touch the two outreach mailboxes.',
      fields: [F('Base URL', 'https://graph.microsoft.com/v1.0', ''), F('Auth', 'App registration · client credentials', 'Tenant admin consent granted 09 Jul'), F('Client secret', '••••••••••••b47', 'Expires 09 Jan — reminder set'), F('Access policy', 'Restricted to the outbound-revenueiq.com group', 'Graph cannot read other mailboxes', 2)],
      listTitle: 'What runs on this connection', listNote: 'Untick to stop that traffic',
      items: [T('sendMail', 'Sends approved drafts on rotation', '12/day'), T('subscriptions (webhook)', 'Push notification on every reply', 'live'), T('messages.get', 'Thread state for follow-ups', '30/day'), T('Warm-up traffic', 'Seeded conversations during the 21-day ramp', '40/day')],
      footer: 'Two mailboxes still warming — caps rise automatically', rotate: 'Rotate secret' },
    cred: { note: 'Per-mailbox OAuth for reps who prefer to grant access themselves rather than through a tenant app.',
      fields: [F('Mailbox', 'r.iyer@outbound-revenueiq.com', 'Granted 09 Jul'), F('Grant', 'OAuth 2.0 · send + read own mail', 'Re-consent every 6 months'), F('Daily cap', '30 sends per mailbox', 'Warming — cap rises weekly'), F('Warm-up', 'Enabled · score 64 · 9 days left', 'Runs for 21 days on a new mailbox')],
      listTitle: 'Connected mailboxes', listNote: 'Untick to take a mailbox out of rotation',
      items: [T('r.iyer@outbound-revenueiq.com', 'Warm 64% · 18 of 30 sent today', 'Warming · 9 days left'), T('n.osei@outbound-revenueiq.com', 'Warm 58% · 15 of 30 sent today', 'Warming · 9 days left')],
      footer: 'Reply detection lag: under 2 minutes', rotate: 'Re-consent' },
    mcp: null },
];

// — Import: file format contract (13 columns) —
export const TCOLS = [
  { col: 'first_name', req: 'Required', example: 'Priya', rule: 'Text, 1–40 characters' },
  { col: 'last_name', req: 'Required', example: 'Raghavan', rule: 'Text, 1–40 characters' },
  { col: 'email', req: 'Conditional', example: 'priya.raghavan@lumenloom.com', rule: 'Valid address — required unless linkedin_url is given' },
  { col: 'job_title', req: 'Required', example: 'VP Demand Generation', rule: 'Free text; drives seniority and buying role' },
  { col: 'company', req: 'Required', example: 'Lumen & Loom', rule: 'Legal or trading name' },
  { col: 'company_domain', req: 'Recommended', example: 'lumenloom.com', rule: 'Root domain, no protocol — the primary dedupe key' },
  { col: 'phone', req: 'Optional', example: '+1 512 555 0134', rule: 'E.164 preferred; extensions after "x"' },
  { col: 'linkedin_url', req: 'Optional', example: 'linkedin.com/in/priya-raghavan', rule: 'Profile URL — the secondary dedupe key' },
  { col: 'vertical', req: 'Required', example: 'ecommerce', rule: 'One of: ecommerce, engineering, automotive, agriculture' },
  { col: 'sub_industry', req: 'Optional', example: 'DTC Apparel', rule: 'Free text' },
  { col: 'country', req: 'Optional', example: 'United States', rule: 'ISO country name' },
  { col: 'owner_email', req: 'Optional', example: 'k.raman@revenueiq.io', rule: 'Must be an active seat; blank assigns round-robin' },
  { col: 'tags', req: 'Optional', example: 'tradeshow-2026;warm', rule: 'Semicolon separated, no spaces after the separator' },
];

export const TROWS = [
  ['Priya', 'Raghavan', 'priya.raghavan@lumenloom.com', 'VP Demand Generation', 'Lumen & Loom', 'lumenloom.com', '+1 512 555 0134', 'linkedin.com/in/priya-raghavan', 'ecommerce', 'DTC Apparel', 'United States', 'k.raman@revenueiq.io', 'tradeshow-2026;warm'],
  ['Nadia', 'Fenwick', 'n.fenwick@halcyonfab.co.uk', 'VP Engineering Operations', 'Halcyon Fabrication', 'halcyonfab.co.uk', '+44 114 555 0198', 'linkedin.com/in/nadia-fenwick', 'engineering', 'Precision Machining', 'United Kingdom', '', 'inbound'],
  ['Sébastien', 'Roy', '', 'Director of Network Development', 'Voltmark Charging', 'voltmark.fr', '', 'linkedin.com/in/sebastien-roy', 'automotive', 'EV Charging', 'France', 'a.whitfield@revenueiq.io', 'ev;partner-intro'],
];

export const RECENT_IMPORTS = [
  { file: 'tradeshow_leads_jul.csv', user: 'K. Raman', date: '18 Jul', imported: 212, merged: 84, rejected: 6 },
  { file: 'ev_charging_partners.xlsx', user: 'A. Whitfield', date: '09 Jul', imported: 96, merged: 31, rejected: 2 },
  { file: 'agri_pilot_list.csv', user: 'A. Whitfield', date: '02 Jul', imported: 58, merged: 12, rejected: 4 },
];

// — AI outreach —
export const MAILBOXES = [
  { addr: 'k.raman@revenueiq.io', provider: 'Google Workspace', state: 'Sending', warm: 92, sentToday: 31, cap: 50 },
  { addr: 'a.whitfield@revenueiq.io', provider: 'Google Workspace', state: 'Sending', warm: 88, sentToday: 44, cap: 50 },
  { addr: 'r.iyer@outbound-revenueiq.com', provider: 'Microsoft 365', state: 'Warming · 9 days left', warm: 64, sentToday: 18, cap: 30 },
  { addr: 'n.osei@outbound-revenueiq.com', provider: 'Microsoft 365', state: 'Warming · 9 days left', warm: 58, sentToday: 15, cap: 30 },
];

export const GUARDRAILS = [
  { k: 'approval', label: 'Human approval before the first send', on: true },
  { k: 'verified', label: 'Only verified email addresses', on: true },
  { k: 'onceonly', label: 'One sequence per person (never double-touched)', on: true },
  { k: 'stopon', label: 'Stop on reply, meeting or unsubscribe (also on an OOO longer than 5 days)', on: true },
  { k: 'suppress', label: 'Suppress customers and competitors (checked against the CRM suppression list at send time)', on: true },
  { k: 'log', label: 'Log every generated draft (prompt, sources and output kept 12 months)', on: true },
];

export const AI_SOURCES = [
  { k: 'linkedin', label: 'LinkedIn activity', on: true },
  { k: 'intent', label: 'Intent signals', on: true },
  { k: 'tech', label: 'Tech stack', on: true },
  { k: 'zoom', label: 'Zoom call notes', on: false },
  { k: 'firmo', label: 'Company size & news', on: true },
  { k: 'hist', label: 'Past sequence history', on: false },
];

export const AI_SUBJECTS = [
  { text: 'Quick one on your Magento replatform', chars: 38, note: 'best opener' },
  { text: 'Priya — pricing page traffic ×3 this month', chars: 44, note: 'highest reply' },
  { text: 'Lumen & Loom + RevenueIQ', chars: 21, note: 'shortest' },
];

export const APPROVAL_QUEUE = [
  { name: 'Ana Beltrán', company: 'Torqueline Components', quality: 'Strong' },
  { name: 'Sébastien Roy', company: 'Voltmark Charging', quality: 'Strong' },
  { name: 'Katrin Osei-Bonsu', company: 'Silo & Stem', quality: 'Thin data' },
  { name: 'Hugo Mendez', company: 'Ironvale Precision', quality: 'Thin data' },
];

export const AI_SEQUENCE_STEPS = [
  { when: 'day 0', channel: 'Email', angle: 'Pattern interrupt on the intent signal', src: 'AI · per record', state: 'Approved' },
  { when: 'day 2', channel: 'LinkedIn', angle: 'Connect note referencing recent activity', src: 'AI · per record', state: 'Approved' },
  { when: 'day 5', channel: 'Email', angle: 'Proof point matched to sub-industry', src: 'AI · per record', state: 'Needs approval' },
  { when: 'day 8', channel: 'Call task', angle: 'Rep-scripted follow-up', src: 'Rep script', state: 'Manual' },
  { when: 'day 12', channel: 'Email', angle: 'Break-up, short and direct', src: 'AI · per record', state: 'Needs approval' },
];
