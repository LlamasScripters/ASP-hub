ALTER TABLE "session_participants" DROP CONSTRAINT "session_participants_session_id_sessions_id_fk";
--> statement-breakpoint
ALTER TABLE "session_participants" ADD CONSTRAINT "session_participants_session_id_sessions_sport_id_fk" FOREIGN KEY ("session_id") REFERENCES "public"."sessions_sport"("id") ON DELETE cascade ON UPDATE no action;