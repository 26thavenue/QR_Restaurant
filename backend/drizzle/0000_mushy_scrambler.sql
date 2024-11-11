CREATE TABLE IF NOT EXISTS "location" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"country" text NOT NULL,
	"state" text NOT NULL,
	"city" text NOT NULL,
	"restaurant_id" uuid NOT NULL,
	"address" text NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "menu_items_on_ordersTable" (
	"menuItemId" uuid,
	"orderId" uuid,
	CONSTRAINT "menu_items_on_ordersTable_menuItemId_orderId_pk" PRIMARY KEY("menuItemId","orderId")
);
--> statement-breakpoint
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
	"restaurantId" uuid NOT NULL,
	"menuId" uuid NOT NULL,
	"isDiscount" boolean DEFAULT false,
	"discountPercent" integer DEFAULT 0,
	"categories" text NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "menu" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"name" text NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"restaurant_id" uuid
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "orders" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"name" text NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"restaurant_id" uuid
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "restaurant" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"name" text NOT NULL,
	"status" text DEFAULT 'pending' NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"location" text,
	"description" text NOT NULL,
	CONSTRAINT "restaurant_name_unique" UNIQUE("name")
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "location" ADD CONSTRAINT "location_restaurant_id_restaurant_id_fk" FOREIGN KEY ("restaurant_id") REFERENCES "public"."restaurant"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "menuItems" ADD CONSTRAINT "menuItems_menuId_menu_id_fk" FOREIGN KEY ("menuId") REFERENCES "public"."menu"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "menu" ADD CONSTRAINT "menu_restaurant_id_restaurant_id_fk" FOREIGN KEY ("restaurant_id") REFERENCES "public"."restaurant"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "orders" ADD CONSTRAINT "orders_restaurant_id_restaurant_id_fk" FOREIGN KEY ("restaurant_id") REFERENCES "public"."restaurant"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
