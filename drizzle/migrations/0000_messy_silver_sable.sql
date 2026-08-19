CREATE TYPE "public"."approval_state" AS ENUM('approved', 'needs_approval', 'rejected');--> statement-breakpoint
CREATE TYPE "public"."auth_method" AS ENUM('api', 'cred', 'mcp');--> statement-breakpoint
CREATE TYPE "public"."connection_status" AS ENUM('connected', 'action_needed', 'not_connected');--> statement-breakpoint
CREATE TYPE "public"."enrollment_status" AS ENUM('active', 'replied', 'paused', 'bounced', 'completed');--> statement-breakpoint
CREATE TYPE "public"."lead_source_role" AS ENUM('sourced', 'enriched', 'verified');--> statement-breakpoint
CREATE TYPE "public"."step_event_type" AS ENUM('sent', 'opened', 'replied', 'bounced');--> statement-breakpoint
CREATE TYPE "public"."toggle_group" AS ENUM('guardrail', 'ai_context_source');--> statement-breakpoint
CREATE TABLE "ai_generation_log" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"draft_id" uuid,
	"prompt" text NOT NULL,
	"sources_used" jsonb DEFAULT '[]'::jsonb NOT NULL,
	"output" text NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"retain_until" timestamp with time zone NOT NULL
);
--> statement-breakpoint
CREATE TABLE "feature_toggles" (
	"toggle_group" "toggle_group" NOT NULL,
	"key" text NOT NULL,
	"label" text NOT NULL,
	"enabled" boolean DEFAULT true NOT NULL,
	CONSTRAINT "feature_toggles_toggle_group_key_pk" PRIMARY KEY("toggle_group","key")
);
--> statement-breakpoint
CREATE TABLE "import_batches" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"file_name" text NOT NULL,
	"uploaded_by" text NOT NULL,
	"uploaded_at" timestamp with time zone DEFAULT now() NOT NULL,
	"imported" integer,
	"merged" integer,
	"rejected" integer
);
--> statement-breakpoint
CREATE TABLE "integration_connections" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"integration_key" text NOT NULL,
	"auth_method" "auth_method" NOT NULL,
	"status" "connection_status" NOT NULL,
	"account_label" text,
	"secret_ref" text,
	"config" jsonb DEFAULT '{}'::jsonb NOT NULL,
	"last_checked_at" timestamp with time zone,
	CONSTRAINT "integration_connections_integration_key_auth_method_unique" UNIQUE("integration_key","auth_method")
);
--> statement-breakpoint
CREATE TABLE "integration_endpoints" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"connection_id" uuid NOT NULL,
	"name" text NOT NULL,
	"description" text,
	"usage_label" text,
	"enabled" boolean DEFAULT true NOT NULL
);
--> statement-breakpoint
CREATE TABLE "integrations" (
	"key" text PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"abbrev" text NOT NULL,
	"category" text NOT NULL
);
--> statement-breakpoint
CREATE TABLE "lead_signals" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"lead_id" uuid NOT NULL,
	"signal_type" text NOT NULL,
	"detail" text NOT NULL,
	"source_key" text,
	"detected_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "lead_sources" (
	"lead_id" uuid NOT NULL,
	"integration_key" text NOT NULL,
	"role" "lead_source_role" DEFAULT 'sourced' NOT NULL,
	CONSTRAINT "lead_sources_lead_id_integration_key_role_pk" PRIMARY KEY("lead_id","integration_key","role")
);
--> statement-breakpoint
CREATE TABLE "lead_volume_daily" (
	"day" date PRIMARY KEY NOT NULL,
	"count" integer NOT NULL
);
--> statement-breakpoint
CREATE TABLE "leads" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"display_id" text NOT NULL,
	"name" text NOT NULL,
	"title" text,
	"tier" text,
	"buying_role" text,
	"company" text NOT NULL,
	"vertical_key" text,
	"sub_industry" text,
	"employee_count" integer,
	"revenue_label" text,
	"city" text,
	"score" integer,
	"owner_email" text,
	"email" text,
	"alt_email" text,
	"phone" text,
	"linkedin_url" text,
	"email_verified" boolean DEFAULT false NOT NULL,
	"is_decision_maker" boolean DEFAULT false NOT NULL,
	"tech_stack" jsonb DEFAULT '[]'::jsonb NOT NULL,
	"last_activity_note" text,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL,
	CONSTRAINT "leads_display_id_unique" UNIQUE("display_id")
);
--> statement-breakpoint
CREATE TABLE "mailboxes" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"address" text NOT NULL,
	"integration_key" text,
	"state" text NOT NULL,
	"warm_pct" integer,
	"sent_today" integer DEFAULT 0 NOT NULL,
	"daily_cap" integer NOT NULL,
	CONSTRAINT "mailboxes_address_unique" UNIQUE("address")
);
--> statement-breakpoint
CREATE TABLE "meetings" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"integration_key" text,
	"external_id" text,
	"starts_at" timestamp with time zone NOT NULL,
	"duration_min" integer,
	"title" text,
	"attendees" jsonb DEFAULT '[]'::jsonb NOT NULL,
	"matched_lead_id" uuid,
	"intel_score" integer,
	"outcome" text,
	"next_action" text
);
--> statement-breakpoint
CREATE TABLE "outreach_drafts" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"lead_id" uuid NOT NULL,
	"sequence_step_id" uuid,
	"subject" text,
	"body" text,
	"data_quality" text,
	"approval_state" "approval_state" DEFAULT 'needs_approval' NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "segments" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"name" text NOT NULL,
	"owner_email" text,
	"criteria" jsonb DEFAULT '[]'::jsonb NOT NULL,
	"sync_enabled" boolean DEFAULT false NOT NULL,
	"refreshed_at" timestamp with time zone
);
--> statement-breakpoint
CREATE TABLE "sequence_enrollments" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"lead_id" uuid NOT NULL,
	"sequence_id" uuid NOT NULL,
	"current_step" integer DEFAULT 0 NOT NULL,
	"status" "enrollment_status" DEFAULT 'active' NOT NULL,
	"last_touch_at" timestamp with time zone,
	CONSTRAINT "sequence_enrollments_lead_id_sequence_id_unique" UNIQUE("lead_id","sequence_id")
);
--> statement-breakpoint
CREATE TABLE "sequence_step_events" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"enrollment_id" uuid NOT NULL,
	"step_order" integer NOT NULL,
	"event_type" "step_event_type" NOT NULL,
	"occurred_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "sequence_steps" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"sequence_id" uuid NOT NULL,
	"step_order" integer NOT NULL,
	"channel" text NOT NULL,
	"day_offset" integer NOT NULL,
	CONSTRAINT "sequence_steps_sequence_id_step_order_unique" UNIQUE("sequence_id","step_order")
);
--> statement-breakpoint
CREATE TABLE "sequences" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"name" text NOT NULL,
	"vertical_key" text,
	"owner_email" text,
	"insight" text
);
--> statement-breakpoint
CREATE TABLE "sync_runs" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"integration_key" text,
	"started_at" timestamp with time zone DEFAULT now() NOT NULL,
	"duration_ms" integer,
	"sourced" integer,
	"merged" integer,
	"rejected" integer,
	"result" text,
	"ok" boolean
);
--> statement-breakpoint
CREATE TABLE "verticals" (
	"key" text PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"subtitle" text,
	"licensed" boolean DEFAULT false NOT NULL,
	"target_per_day" integer DEFAULT 0 NOT NULL
);
--> statement-breakpoint
ALTER TABLE "ai_generation_log" ADD CONSTRAINT "ai_generation_log_draft_id_outreach_drafts_id_fk" FOREIGN KEY ("draft_id") REFERENCES "public"."outreach_drafts"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "integration_connections" ADD CONSTRAINT "integration_connections_integration_key_integrations_key_fk" FOREIGN KEY ("integration_key") REFERENCES "public"."integrations"("key") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "integration_endpoints" ADD CONSTRAINT "integration_endpoints_connection_id_integration_connections_id_fk" FOREIGN KEY ("connection_id") REFERENCES "public"."integration_connections"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "lead_signals" ADD CONSTRAINT "lead_signals_lead_id_leads_id_fk" FOREIGN KEY ("lead_id") REFERENCES "public"."leads"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "lead_signals" ADD CONSTRAINT "lead_signals_source_key_integrations_key_fk" FOREIGN KEY ("source_key") REFERENCES "public"."integrations"("key") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "lead_sources" ADD CONSTRAINT "lead_sources_lead_id_leads_id_fk" FOREIGN KEY ("lead_id") REFERENCES "public"."leads"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "lead_sources" ADD CONSTRAINT "lead_sources_integration_key_integrations_key_fk" FOREIGN KEY ("integration_key") REFERENCES "public"."integrations"("key") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "leads" ADD CONSTRAINT "leads_vertical_key_verticals_key_fk" FOREIGN KEY ("vertical_key") REFERENCES "public"."verticals"("key") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "mailboxes" ADD CONSTRAINT "mailboxes_integration_key_integrations_key_fk" FOREIGN KEY ("integration_key") REFERENCES "public"."integrations"("key") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "meetings" ADD CONSTRAINT "meetings_integration_key_integrations_key_fk" FOREIGN KEY ("integration_key") REFERENCES "public"."integrations"("key") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "meetings" ADD CONSTRAINT "meetings_matched_lead_id_leads_id_fk" FOREIGN KEY ("matched_lead_id") REFERENCES "public"."leads"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "outreach_drafts" ADD CONSTRAINT "outreach_drafts_lead_id_leads_id_fk" FOREIGN KEY ("lead_id") REFERENCES "public"."leads"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "outreach_drafts" ADD CONSTRAINT "outreach_drafts_sequence_step_id_sequence_steps_id_fk" FOREIGN KEY ("sequence_step_id") REFERENCES "public"."sequence_steps"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "sequence_enrollments" ADD CONSTRAINT "sequence_enrollments_lead_id_leads_id_fk" FOREIGN KEY ("lead_id") REFERENCES "public"."leads"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "sequence_enrollments" ADD CONSTRAINT "sequence_enrollments_sequence_id_sequences_id_fk" FOREIGN KEY ("sequence_id") REFERENCES "public"."sequences"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "sequence_step_events" ADD CONSTRAINT "sequence_step_events_enrollment_id_sequence_enrollments_id_fk" FOREIGN KEY ("enrollment_id") REFERENCES "public"."sequence_enrollments"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "sequence_steps" ADD CONSTRAINT "sequence_steps_sequence_id_sequences_id_fk" FOREIGN KEY ("sequence_id") REFERENCES "public"."sequences"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "sequences" ADD CONSTRAINT "sequences_vertical_key_verticals_key_fk" FOREIGN KEY ("vertical_key") REFERENCES "public"."verticals"("key") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "sync_runs" ADD CONSTRAINT "sync_runs_integration_key_integrations_key_fk" FOREIGN KEY ("integration_key") REFERENCES "public"."integrations"("key") ON DELETE no action ON UPDATE no action;