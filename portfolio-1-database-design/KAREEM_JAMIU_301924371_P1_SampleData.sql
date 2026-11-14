-- Fictional sample records for Fashion E-Commerce Shopping.
BEGIN;
SET LOCAL standard_conforming_strings = on;
INSERT INTO portfolio."customers" ("customer_id", "email", "display_name", "created_at") VALUES (1, 'ava@example.test', 'Ava Morgan', '2026-01-10T09:00:00Z');
INSERT INTO portfolio."customers" ("customer_id", "email", "display_name", "created_at") VALUES (2, 'leo@example.test', 'Leo Chen', '2026-01-11T10:30:00+00:00');
INSERT INTO portfolio."products" ("product_id", "sku", "product_name", "category", "unit_price", "stock_quantity", "active") VALUES (101, 'JKT-001', 'Classic Denim Jacket', 'outerwear', 79.5, 12, TRUE);
INSERT INTO portfolio."products" ("product_id", "sku", "product_name", "category", "unit_price", "stock_quantity", "active") VALUES (102, 'DRS-002', 'Linen Summer Dress', 'dresses', 64, 8, TRUE);
INSERT INTO portfolio."orders" ("order_id", "customer_id", "placed_at", "status") VALUES (201, 1, '2026-02-01T14:15:00Z', 'placed');
INSERT INTO portfolio."orders" ("order_id", "customer_id", "placed_at", "status") VALUES (202, 2, '2026-02-02T16:45:00+00:00', 'placed');
INSERT INTO portfolio."order_items" ("order_item_id", "order_id", "product_id", "quantity", "unit_price") VALUES (301, 201, 101, 1, 79.5);
INSERT INTO portfolio."order_items" ("order_item_id", "order_id", "product_id", "quantity", "unit_price") VALUES (302, 202, 102, 2, 64);
COMMIT;
