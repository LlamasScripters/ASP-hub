ALTER TYPE "public"."status" RENAME TO "reservation_status";--> statement-breakpoint
ALTER TABLE "reservations" RENAME COLUMN "user_id" TO "booker_id";--> statement-breakpoint
ALTER TABLE "reservations" DROP CONSTRAINT "reservations_user_id_users_id_fk";
--> statement-breakpoint
ALTER TABLE "reservations" ADD CONSTRAINT "reservations_booker_id_users_id_fk" FOREIGN KEY ("booker_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;