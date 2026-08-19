// Postgres schema (Drizzle ORM) replacing src/data/fixtures.js.
// Each table's fixture equivalent is noted in a comment above it.

import {
  pgTable,
  pgEnum,
  uuid,
  text,
  integer,
  boolean,
  timestamp,
  jsonb,
  date,
  primaryKey,
  unique,
} from 'drizzle-orm/pg-core';

// ---------- enums ----------

export const authMethodEnum = pgEnum('auth_method', ['api', 'cred', 'mcp']);
export const connectionStatusEnum = pgEnum('connection_status', [
  'connected',
  'action_needed',
  'not_connected',
]);
export const leadSourceRoleEnum = pgEnum('lead_source_role', [
  'sourced',
  'enriched',
  'verified',
]);
export const enrollmentStatusEnum = pgEnum('enrollment_status', [
  'active',
  'replied',
  'paused',
  'bounced',
  'completed',
]);
export const stepEventTypeEnum = pgEnum('step_event_type', [
  'sent',
  'opened',
  'replied',
  'bounced',
]);
export const toggleGroupEnum = pgEnum('toggle_group', [
  'guardrail',
  'ai_context_source',
]);
export const approvalStateEnum = pgEnum('approval_state', [
  'approved',
  'needs_approval',
  'rejected',
]);

// ---------- A. catalog & integrations ----------

// replaces VERTS
export const verticals = pgTable('verticals', {
  key: text('key').primaryKey(),
  name: text('name').notNull(),
  subtitle: text('subtitle'),
  licensed: boolean('licensed').notNull().default(false),
  targetPerDay: integer('target_per_day').notNull().default(0),
});

// replaces SRC + the static half of CONN (name/category, not secrets)
export const integrations = pgTable('integrations', {
  key: text('key').primaryKey(),
  name: text('name').notNull(),
  abbrev: text('abbrev').notNull(),
  category: text('category').notNull(),
});

// replaces the live/config half of CONN, and SOURCES' status row.
// secretRef is a *name*, e.g. 'APOLLO_API_KEY' — resolved server-side from
// env vars / a secrets manager. The real key value never lives in this table.
export const integrationConnections = pgTable(
  'integration_connections',
  {
    id: uuid('id').primaryKey().defaultRandom(),
    integrationKey: text('integration_key')
      .notNull()
      .references(() => integrations.key),
    authMethod: authMethodEnum('auth_method').notNull(),
    status: connectionStatusEnum('status').notNull(),
    accountLabel: text('account_label'),
    secretRef: text('secret_ref'),
    config: jsonb('config').notNull().default({}),
    lastCheckedAt: timestamp('last_checked_at', { withTimezone: true }),
  },
  (t) => [unique().on(t.integrationKey, t.authMethod)],
);

// replaces the "Endpoints in use" / "Tools exposed" lists inside CONN
export const integrationEndpoints = pgTable('integration_endpoints', {
  id: uuid('id').primaryKey().defaultRandom(),
  connectionId: uuid('connection_id')
    .notNull()
    .references(() => integrationConnections.id, { onDelete: 'cascade' }),
  name: text('name').notNull(),
  description: text('description'),
  usageLabel: text('usage_label'),
  enabled: boolean('enabled').notNull().default(true),
});

// ---------- B. leads & signals ----------

// replaces LEADS (the R array)
export const leads = pgTable('leads', {
  id: uuid('id').primaryKey().defaultRandom(),
  displayId: text('display_id').notNull().unique(),
  name: text('name').notNull(),
  title: text('title'),
  tier: text('tier'),
  buyingRole: text('buying_role'),
  company: text('company').notNull(),
  verticalKey: text('vertical_key').references(() => verticals.key),
  subIndustry: text('sub_industry'),
  employeeCount: integer('employee_count'),
  revenueLabel: text('revenue_label'),
  city: text('city'),
  score: integer('score'),
  ownerEmail: text('owner_email'),
  email: text('email'),
  altEmail: text('alt_email'),
  phone: text('phone'),
  linkedinUrl: text('linkedin_url'),
  emailVerified: boolean('email_verified').notNull().default(false),
  isDecisionMaker: boolean('is_decision_maker').notNull().default(false),
  techStack: jsonb('tech_stack').notNull().default([]),
  lastActivityNote: text('last_activity_note'),
  createdAt: timestamp('created_at', { withTimezone: true }).notNull().defaultNow(),
  updatedAt: timestamp('updated_at', { withTimezone: true }).notNull().defaultNow(),
});

// which vendor(s) sourced/enriched/verified this lead — replaces sources[] on each row
export const leadSources = pgTable(
  'lead_sources',
  {
    leadId: uuid('lead_id')
      .notNull()
      .references(() => leads.id, { onDelete: 'cascade' }),
    integrationKey: text('integration_key')
      .notNull()
      .references(() => integrations.key),
    role: leadSourceRoleEnum('role').notNull().default('sourced'),
  },
  (t) => [primaryKey({ columns: [t.leadId, t.integrationKey, t.role] })],
);

// replaces the intents[] free-text array — structured buying signals
export const leadSignals = pgTable('lead_signals', {
  id: uuid('id').primaryKey().defaultRandom(),
  leadId: uuid('lead_id')
    .notNull()
    .references(() => leads.id, { onDelete: 'cascade' }),
  signalType: text('signal_type').notNull(),
  detail: text('detail').notNull(),
  sourceKey: text('source_key').references(() => integrations.key),
  detectedAt: timestamp('detected_at', { withTimezone: true }).notNull().defaultNow(),
});

// ---------- C. sequences & enrollment ----------

// replaces SEQS
export const sequences = pgTable('sequences', {
  id: uuid('id').primaryKey().defaultRandom(),
  name: text('name').notNull(),
  verticalKey: text('vertical_key').references(() => verticals.key),
  ownerEmail: text('owner_email'),
  insight: text('insight'),
});

// replaces SEQS[].detail rows
export const sequenceSteps = pgTable(
  'sequence_steps',
  {
    id: uuid('id').primaryKey().defaultRandom(),
    sequenceId: uuid('sequence_id')
      .notNull()
      .references(() => sequences.id, { onDelete: 'cascade' }),
    stepOrder: integer('step_order').notNull(),
    channel: text('channel').notNull(),
    dayOffset: integer('day_offset').notNull(),
  },
  (t) => [unique().on(t.sequenceId, t.stepOrder)],
);

// per-lead progress — replaces LEADS.seq / LEADS.touch
export const sequenceEnrollments = pgTable(
  'sequence_enrollments',
  {
    id: uuid('id').primaryKey().defaultRandom(),
    leadId: uuid('lead_id')
      .notNull()
      .references(() => leads.id, { onDelete: 'cascade' }),
    sequenceId: uuid('sequence_id')
      .notNull()
      .references(() => sequences.id),
    currentStep: integer('current_step').notNull().default(0),
    status: enrollmentStatusEnum('status').notNull().default('active'),
    lastTouchAt: timestamp('last_touch_at', { withTimezone: true }),
  },
  (t) => [unique().on(t.leadId, t.sequenceId)],
);

// per-step send/open/reply events — makes SEQS metrics real instead of fixture numbers
export const sequenceStepEvents = pgTable('sequence_step_events', {
  id: uuid('id').primaryKey().defaultRandom(),
  enrollmentId: uuid('enrollment_id')
    .notNull()
    .references(() => sequenceEnrollments.id, { onDelete: 'cascade' }),
  stepOrder: integer('step_order').notNull(),
  eventType: stepEventTypeEnum('event_type').notNull(),
  occurredAt: timestamp('occurred_at', { withTimezone: true }).notNull().defaultNow(),
});

// ---------- D. meetings ----------

// replaces MEETINGS
export const meetings = pgTable('meetings', {
  id: uuid('id').primaryKey().defaultRandom(),
  integrationKey: text('integration_key').references(() => integrations.key),
  externalId: text('external_id'),
  startsAt: timestamp('starts_at', { withTimezone: true }).notNull(),
  durationMin: integer('duration_min'),
  title: text('title'),
  attendees: jsonb('attendees').notNull().default([]),
  matchedLeadId: uuid('matched_lead_id').references(() => leads.id),
  intelScore: integer('intel_score'),
  outcome: text('outcome'),
  nextAction: text('next_action'),
});

// ---------- E. segments ----------

// replaces SEGMENTS — member count/list is a live query against `leads`, not stored here
export const segments = pgTable('segments', {
  id: uuid('id').primaryKey().defaultRandom(),
  name: text('name').notNull(),
  ownerEmail: text('owner_email'),
  criteria: jsonb('criteria').notNull().default([]),
  syncEnabled: boolean('sync_enabled').notNull().default(false),
  refreshedAt: timestamp('refreshed_at', { withTimezone: true }),
});

// ---------- F. sync runs & imports ----------

// replaces RUNS
export const syncRuns = pgTable('sync_runs', {
  id: uuid('id').primaryKey().defaultRandom(),
  integrationKey: text('integration_key').references(() => integrations.key),
  startedAt: timestamp('started_at', { withTimezone: true }).notNull().defaultNow(),
  durationMs: integer('duration_ms'),
  sourced: integer('sourced'),
  merged: integer('merged'),
  rejected: integer('rejected'),
  result: text('result'),
  ok: boolean('ok'),
});

// replaces RECENT_IMPORTS (TCOLS/TROWS stay as a code-level format contract, not DB data)
export const importBatches = pgTable('import_batches', {
  id: uuid('id').primaryKey().defaultRandom(),
  fileName: text('file_name').notNull(),
  uploadedBy: text('uploaded_by').notNull(),
  uploadedAt: timestamp('uploaded_at', { withTimezone: true }).notNull().defaultNow(),
  imported: integer('imported'),
  merged: integer('merged'),
  rejected: integer('rejected'),
});

// ---------- G. AI outreach ----------

// replaces MAILBOXES
export const mailboxes = pgTable('mailboxes', {
  id: uuid('id').primaryKey().defaultRandom(),
  address: text('address').notNull().unique(),
  integrationKey: text('integration_key').references(() => integrations.key),
  state: text('state').notNull(),
  warmPct: integer('warm_pct'),
  sentToday: integer('sent_today').notNull().default(0),
  dailyCap: integer('daily_cap').notNull(),
});

// replaces both GUARDRAILS and AI_SOURCES (same key/label/on shape)
export const featureToggles = pgTable(
  'feature_toggles',
  {
    toggleGroup: toggleGroupEnum('toggle_group').notNull(),
    key: text('key').notNull(),
    label: text('label').notNull(),
    enabled: boolean('enabled').notNull().default(true),
  },
  (t) => [primaryKey({ columns: [t.toggleGroup, t.key] })],
);

// replaces APPROVAL_QUEUE (query WHERE approval_state = 'needs_approval') + AI_SUBJECTS
export const outreachDrafts = pgTable('outreach_drafts', {
  id: uuid('id').primaryKey().defaultRandom(),
  leadId: uuid('lead_id')
    .notNull()
    .references(() => leads.id, { onDelete: 'cascade' }),
  sequenceStepId: uuid('sequence_step_id').references(() => sequenceSteps.id),
  subject: text('subject'),
  body: text('body'),
  dataQuality: text('data_quality'),
  approvalState: approvalStateEnum('approval_state').notNull().default('needs_approval'),
  createdAt: timestamp('created_at', { withTimezone: true }).notNull().defaultNow(),
});

// the "log every generated draft, 12 months" guardrail, made real
export const aiGenerationLog = pgTable('ai_generation_log', {
  id: uuid('id').primaryKey().defaultRandom(),
  draftId: uuid('draft_id').references(() => outreachDrafts.id),
  prompt: text('prompt').notNull(),
  sourcesUsed: jsonb('sources_used').notNull().default([]),
  output: text('output').notNull(),
  createdAt: timestamp('created_at', { withTimezone: true }).notNull().defaultNow(),
  retainUntil: timestamp('retain_until', { withTimezone: true }).notNull(),
});

// ---------- H. analytics ----------

// replaces DAYS — kept as a table for now; a materialized view over leads.createdAt
// is the better long-term source once real lead volume exists.
export const leadVolumeDaily = pgTable('lead_volume_daily', {
  day: date('day').primaryKey(),
  count: integer('count').notNull(),
});
