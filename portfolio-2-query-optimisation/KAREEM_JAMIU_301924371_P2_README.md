# Fashion E-Commerce Shopping — SQL queries

## 1. Show related orders, customers, order_items, products records (up to 20).

```sql
SELECT t0."order_id" AS "orders_order_id",
       t0."placed_at" AS "orders_placed_at",
       t3."customer_id" AS "customers_customer_id",
       t3."email" AS "customers_email",
       t1."order_item_id" AS "order_items_order_item_id",
       t1."quantity" AS "order_items_quantity",
       t2."product_id" AS "products_product_id",
       t2."sku" AS "products_sku"
FROM portfolio."orders" t0
JOIN portfolio."order_items" t1 ON t1."order_id" = t0."order_id"
JOIN portfolio."products" t2 ON t1."product_id" = t2."product_id"
JOIN portfolio."customers" t3 ON t0."customer_id" = t3."customer_id"
ORDER BY t0."order_id", t3."customer_id", t1."order_item_id", t2."product_id"
LIMIT 20;
```

| orders_order_id | orders_placed_at | customers_customer_id | customers_email | order_items_order_item_id | order_items_quantity | products_product_id | products_sku |
| --- | --- | --- | --- | --- | --- | --- | --- |
| 201 | 2026-02-01T14:15:00+00:00 | 1 | ava@example.test | 301 | 1 | 101 | JKT-001 |
| 202 | 2026-02-02T16:45:00+00:00 | 2 | leo@example.test | 302 | 2 | 102 | DRS-002 |

## 2. Find orders records where placed_at matches "2026-02-01T14:15:00Z" (up to 20).

```sql
SELECT * FROM portfolio."orders"
WHERE "placed_at" IS NOT DISTINCT FROM '2026-02-01T14:15:00Z'
ORDER BY "order_id"
LIMIT 20;
```

| order_id | customer_id | placed_at | status |
| --- | --- | --- | --- |
| 201 | 1 | 2026-02-01T14:15:00+00:00 | placed |

## 3. Count orders records for each customer_id (up to 20 groups).

```sql
SELECT "customer_id", count(*) AS record_count
FROM portfolio."orders"
GROUP BY "customer_id"
ORDER BY record_count DESC, "customer_id" NULLS LAST
LIMIT 20;
```

| customer_id | record_count |
| --- | --- |
| 1 | 1 |
| 2 | 1 |

## 4. Find orders records where placed_at matches "2026-02-01T14:15:00Z" (up to 20).

```sql
SELECT * FROM portfolio."orders"
WHERE "placed_at" IS NOT DISTINCT FROM '2026-02-01T14:15:00Z'
ORDER BY "order_id"
LIMIT 20;
```

| order_id | customer_id | placed_at | status |
| --- | --- | --- | --- |
| 201 | 1 | 2026-02-01T14:15:00+00:00 | placed |


## Index comparison

| Phase | Median (ms) | Three runs (ms) | Plan nodes | Buffer hits |
| --- | --- | --- | --- | --- |
| Before index | 0.997 | 0.997, 1.573, 0.988 | Sort → Seq Scan | 112 |
| After index | 0.18 | 0.18, 0.186, 0.177 | Sort → Bitmap Heap Scan → Bitmap Index Scan | 25 |

The median execution time changed from 0.997 ms to 0.18 ms. The measured plan used p2_filter_idx. The results matched in both phases. An index adds storage and write-maintenance costs; timings depend on the selected lookup and environment.

## Execution plans

### Before index, run 1

```text
Sort (actual time=0.974..0.976 rows=20 loops=1)
  Seq Scan on orders (actual time=0.014..0.942 rows=20 loops=1)
Planning Time: 0.313 ms
Execution Time: 0.997 ms
```

### Before index, run 2

```text
Sort (actual time=1.539..1.541 rows=20 loops=1)
  Seq Scan on orders (actual time=0.019..1.494 rows=20 loops=1)
Planning Time: 0.409 ms
Execution Time: 1.573 ms
```

### Before index, run 3

```text
Sort (actual time=0.965..0.967 rows=20 loops=1)
  Seq Scan on orders (actual time=0.015..0.932 rows=20 loops=1)
Planning Time: 0.317 ms
Execution Time: 0.988 ms
```

### After index, run 1

```text
Sort (actual time=0.127..0.129 rows=20 loops=1)
  Bitmap Heap Scan on orders (actual time=0.028..0.093 rows=20 loops=1)
    Bitmap Index Scan using p2_filter_idx (actual time=0.014..0.015 rows=20 loops=1)
Planning Time: 0.508 ms
Execution Time: 0.18 ms
```

### After index, run 2

```text
Sort (actual time=0.132..0.134 rows=20 loops=1)
  Bitmap Heap Scan on orders (actual time=0.029..0.098 rows=20 loops=1)
    Bitmap Index Scan using p2_filter_idx (actual time=0.014..0.015 rows=20 loops=1)
Planning Time: 0.516 ms
Execution Time: 0.186 ms
```

### After index, run 3

```text
Sort (actual time=0.123..0.125 rows=20 loops=1)
  Bitmap Heap Scan on orders (actual time=0.028..0.09 rows=20 loops=1)
    Bitmap Index Scan using p2_filter_idx (actual time=0.015..0.015 rows=20 loops=1)
Planning Time: 0.487 ms
Execution Time: 0.177 ms
```

## Reproduce

Use a fresh database with the Portfolio 1 schema and sample data. Run KAREEM_JAMIU_301924371_P2_Queries.sql, then KAREEM_JAMIU_301924371_P2_Optimisation.sql. The optimisation script creates a separate performance table and runs EXPLAIN (ANALYZE, BUFFERS).

[Query screenshot](screenshots/KAREEM_JAMIU_301924371_P2_QueryResults.png) · [Index comparison](screenshots/KAREEM_JAMIU_301924371_P2_IndexComparison.png)

## References

- [PostgreSQL — EXPLAIN](https://www.postgresql.org/docs/17/using-explain.html)

