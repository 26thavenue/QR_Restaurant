ALTER TABLE "location" DISABLE ROW LEVEL SECURITY;--> statement-breakpoint
ALTER TABLE "menu_items_on_ordersTable" DISABLE ROW LEVEL SECURITY;--> statement-breakpoint
ALTER TABLE "menuItems" DISABLE ROW LEVEL SECURITY;--> statement-breakpoint
ALTER TABLE "menu" DISABLE ROW LEVEL SECURITY;--> statement-breakpoint
ALTER TABLE "orders" DISABLE ROW LEVEL SECURITY;--> statement-breakpoint
DROP TABLE "location" CASCADE;--> statement-breakpoint
DROP TABLE "menu_items_on_ordersTable" CASCADE;--> statement-breakpoint
DROP TABLE "menuItems" CASCADE;--> statement-breakpoint
DROP TABLE "menu" CASCADE;--> statement-breakpoint
DROP TABLE "orders" CASCADE;--> statement-breakpoint
ALTER TABLE "restaurant" ALTER COLUMN "created_at" DROP NOT NULL;--> statement-breakpoint
ALTER TABLE "restaurant" ALTER COLUMN "description" DROP NOT NULL;