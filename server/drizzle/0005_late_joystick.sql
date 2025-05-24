ALTER TABLE "complexs" RENAME TO "complexes";--> statement-breakpoint
ALTER TABLE "rooms" DROP CONSTRAINT "rooms_complex_id_complexs_id_fk";
--> statement-breakpoint
ALTER TABLE "rooms" ADD CONSTRAINT "rooms_complex_id_complexes_id_fk" FOREIGN KEY ("complex_id") REFERENCES "public"."complexes"("id") ON DELETE cascade ON UPDATE no action;