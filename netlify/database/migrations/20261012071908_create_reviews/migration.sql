CREATE TABLE "reviews" (
	"id" serial PRIMARY KEY,
	"restaurant_id" text NOT NULL,
	"nickname" text NOT NULL,
	"rating" integer NOT NULL,
	"content" text NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE INDEX "reviews_restaurant_id_idx" ON "reviews" ("restaurant_id");