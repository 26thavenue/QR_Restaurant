CREATE TYPE "public"."foodCategories" AS ENUM('drinks', 'SNACKS', 'grill', 'desserts', 'vegan', 'sides', 'main courses', 'soups', 'salad', 'appetizers', 'others');--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "menuItems" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"name" text NOT NULL,
	"price" integer NOT NULL,
	"description" text NOT NULL,
	"ttP" time NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"rating" integer,
	"numberOrdered" integer DEFAULT 0,
	"stock" integer,
	"restaurant_id" uuid NOT NULL,
	"menu_id" uuid NOT NULL,
	"is_discount" boolean DEFAULT false,
	"discount_percent" integer DEFAULT 0,
	"categories" "foodCategories" DEFAULT 'others'
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "menu_items_on_orders" (
	"menuItem_id" uuid,
	"order_id" uuid,
	CONSTRAINT "menu_items_on_orders_menuItem_id_order_id_pk" PRIMARY KEY("menuItem_id","order_id")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "orders" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"name" text NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL,
	"total_price" integer NOT NULL
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "menuItems" ADD CONSTRAINT "menuItems_menu_id_menu_id_fk" FOREIGN KEY ("menu_id") REFERENCES "public"."menu"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
