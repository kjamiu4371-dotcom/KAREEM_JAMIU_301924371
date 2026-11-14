-- Run these deliberately invalid statements one at a time, outside a transaction.
-- Each should fail at the named constraint; the sample rows should remain unchanged.

-- 1. customers primary key. Expected: pk_customers, SQLSTATE 23505.
INSERT INTO portfolio."customers" ("customer_id", "email", "display_name", "created_at")
VALUES (1, 'new.customer@example.test', 'Mia Reed', '2026-03-01T08:00:00Z');

-- 2. customers unique email. Expected: uq_customers_0, SQLSTATE 23505.
INSERT INTO portfolio."customers" ("customer_id", "email", "display_name", "created_at")
VALUES (1001, 'ava@example.test', 'Mia Reed', '2026-03-02T08:00:00Z');

-- 3. customers not null email. Expected: email, SQLSTATE 23502.
INSERT INTO portfolio."customers" ("customer_id", "email", "display_name", "created_at")
VALUES (1002, NULL, 'Nia Park', '2026-03-03T08:00:00Z');

-- 4. products primary key. Expected: pk_products, SQLSTATE 23505.
INSERT INTO portfolio."products" ("product_id", "sku", "product_name", "category", "unit_price", "stock_quantity", "active")
VALUES (101, 'NEW-101', 'Cotton Shirt', 'tops', 45, 5, TRUE);

-- 5. products unique sku. Expected: uq_products_0, SQLSTATE 23505.
INSERT INTO portfolio."products" ("product_id", "sku", "product_name", "category", "unit_price", "stock_quantity", "active")
VALUES (1003, 'JKT-001', 'Cotton Shirt', 'tops', 45, 5, TRUE);

-- 6. products price check. Expected: product_price_positive, SQLSTATE 23514.
INSERT INTO portfolio."products" ("product_id", "sku", "product_name", "category", "unit_price", "stock_quantity", "active")
VALUES (1004, 'CHK-PRICE', 'Test Scarf', 'accessories', 0, 5, TRUE);

-- 7. products stock check. Expected: product_stock_nonnegative, SQLSTATE 23514.
INSERT INTO portfolio."products" ("product_id", "sku", "product_name", "category", "unit_price", "stock_quantity", "active")
VALUES (1005, 'CHK-STOCK', 'Test Belt', 'accessories', 25, -1, TRUE);

-- 8. orders primary key. Expected: pk_orders, SQLSTATE 23505.
INSERT INTO portfolio."orders" ("order_id", "customer_id", "placed_at", "status")
VALUES (201, 2, '2026-03-04T12:00:00Z', 'placed');

-- 9. orders customer foreign key. Expected: fk_orders_0, SQLSTATE 23503.
INSERT INTO portfolio."orders" ("order_id", "customer_id", "placed_at", "status")
VALUES (1006, 9991, '2026-03-05T12:00:00Z', 'placed');

-- 10. items primary key. Expected: pk_order_items, SQLSTATE 23505.
INSERT INTO portfolio."order_items" ("order_item_id", "order_id", "product_id", "quantity", "unit_price")
VALUES (301, 202, 101, 1, 79.5);

-- 11. items unique order product. Expected: uq_order_items_0, SQLSTATE 23505.
INSERT INTO portfolio."order_items" ("order_item_id", "order_id", "product_id", "quantity", "unit_price")
VALUES (1007, 201, 101, 3, 79.5);

-- 12. items order foreign key. Expected: fk_order_items_0, SQLSTATE 23503.
INSERT INTO portfolio."order_items" ("order_item_id", "order_id", "product_id", "quantity", "unit_price")
VALUES (1008, 9992, 102, 1, 64);

-- 13. items product foreign key. Expected: fk_order_items_1, SQLSTATE 23503.
INSERT INTO portfolio."order_items" ("order_item_id", "order_id", "product_id", "quantity", "unit_price")
VALUES (1009, 201, 9993, 1, 79.5);

-- 14. items quantity check. Expected: item_quantity_positive, SQLSTATE 23514.
INSERT INTO portfolio."order_items" ("order_item_id", "order_id", "product_id", "quantity", "unit_price")
VALUES (1010, 201, 102, 0, 64);
