# Fashion E-Commerce Shopping — normalisation

The example uses the saved sample records. The full set of fields is in the design and schema.

## Starting grouped records

| order_id | order_items records (list) |
| --- | --- |
| 201 | [301] |
| 202 | [302] |


The record IDs are grouped in a list. In 1NF, each record has its own row and each cell holds one value.

## 1NF: one value per cell

| order_items.order_item_id | order_items.order_id | order_items.product_id | orders.order_id | orders.customer_id | orders.status | customers.customer_id | customers.email |
| --- | --- | --- | --- | --- | --- | --- | --- |
| 301 | 201 | 101 | 201 | 1 | placed | 1 | ava@example.test |
| 302 | 202 | 102 | 202 | 2 | placed | 2 | leo@example.test |

Key: order_item_id.

## 2NF: depend on the whole key

order_items: order_id is a proper part of candidate key (order_id, product_id), and determines orders details. order_items: product_id is a proper part of candidate key (order_id, product_id), and determines products details.

## orders_example

| orders.order_id | orders.customer_id | orders.status | customers.customer_id | customers.email |
| --- | --- | --- | --- | --- |
| 201 | 1 | placed | 1 | ava@example.test |
| 202 | 2 | placed | 2 | leo@example.test |

## order_items_example

| order_items.order_item_id | order_items.order_id | order_items.product_id |
| --- | --- | --- |
| 301 | 201 | 101 |
| 302 | 202 | 102 |

## 3NF: store each entity’s details once

The entity keys determine their own descriptions. Related records keep foreign keys rather than repeating those descriptions.

## customers

| customer_id | email | display_name | created_at |
| --- | --- | --- | --- |
| 1 | ava@example.test | Ava Morgan | 2026-01-10T09:00:00+00:00 |
| 2 | leo@example.test | Leo Chen | 2026-01-11T10:30:00+00:00 |

## products

| product_id | sku | product_name | category | unit_price | stock_quantity | active |
| --- | --- | --- | --- | --- | --- | --- |
| 101 | JKT-001 | Classic Denim Jacket | outerwear | 79.5 | 12 | true |
| 102 | DRS-002 | Linen Summer Dress | dresses | 64 | 8 | true |

## orders

| order_id | customer_id | placed_at | status |
| --- | --- | --- | --- |
| 201 | 1 | 2026-02-01T14:15:00+00:00 | placed |
| 202 | 2 | 2026-02-02T16:45:00+00:00 | placed |

## order_items

| order_item_id | order_id | product_id | quantity | unit_price |
| --- | --- | --- | --- | --- |
| 301 | 201 | 101 | 1 | 79.5 |
| 302 | 202 | 102 | 2 | 64 |

## Dependencies

- customers: (customer_id) → email, display_name, created_at
- products: (product_id) → sku, product_name, category, unit_price, stock_quantity, active
- orders: (order_id) → customer_id, placed_at, status
- order_items: (order_item_id) → order_id, product_id, quantity, unit_price

Joining the decomposed sample tables reproduces the original 2 example rows. The design assumes the declared keys describe the relevant business dependencies.
