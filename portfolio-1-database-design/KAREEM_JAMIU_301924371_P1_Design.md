# Fashion E-Commerce Shopping — database design

My case study records customers, products, orders, order_items.

## Users

- Customers browsing and ordering fashion products
- Store staff managing products and reviewing orders

## Main operations

- Browse active products by category and price
- Place orders containing one or more products
- Reserve inventory while preventing negative stock

## Entities

| Entity | Information stored |
| --- | --- |
| customers | Stores customer contact details for order ownership. |
| products | Stores the fashion catalogue, sale price, and available inventory. |
| orders | Records each customer order and its placement time and status. |
| order_items | Stores purchased product lines, linked to their order and product. In the normalisation example, customer and product details stay in their parent entities instead of being repeated on each line; unit_price preserves the purchase-time price. |

## customers

| Field | Type | Key | Required |
| --- | --- | --- | --- |
| customer_id | BIGINT | PK | Yes |
| email | TEXT | Unique | Yes |
| display_name | TEXT |  | Yes |
| created_at | TIMESTAMPTZ |  | Yes |
- Unique key: (email).

## products

| Field | Type | Key | Required |
| --- | --- | --- | --- |
| product_id | BIGINT | PK | Yes |
| sku | TEXT | Unique | Yes |
| product_name | TEXT |  | Yes |
| category | TEXT |  | Yes |
| unit_price | NUMERIC(18,2) |  | Yes |
| stock_quantity | INTEGER |  | Yes |
| active | BOOLEAN |  | Yes |
- Unique key: (sku).

## orders

| Field | Type | Key | Required |
| --- | --- | --- | --- |
| order_id | BIGINT | PK | Yes |
| customer_id | BIGINT | FK | Yes |
| placed_at | TIMESTAMPTZ |  | Yes |
| status | TEXT |  | Yes |
- customer_id → customers.customer_id

## order_items

| Field | Type | Key | Required |
| --- | --- | --- | --- |
| order_item_id | BIGINT | PK | Yes |
| order_id | BIGINT | FK | Yes |
| product_id | BIGINT | FK | Yes |
| quantity | INTEGER |  | Yes |
| unit_price | NUMERIC(18,2) |  | Yes |
- order_id → orders.order_id
- product_id → products.product_id
- Unique key: (order_id, product_id).

## Relationships and business rules

- Each customer email identifies at most one customer.
- Each product has a distinct stock-keeping unit.
- A catalogue product must have a positive unit price.
- Available stock must never be below zero.
- Every order belongs to an existing customer.
- Every order item belongs to an existing order.
- Every order item references an existing product.
- Each order item must have a quantity greater than zero.
- A product appears at most once in an order; additional units are represented by quantity.

## Assumptions

- All records and benchmark rows are synthetic; no real customer data is used.
- Prices use one assumed currency, and each order item stores the product price when ordered.
- An order contains at most one line per product; quantity is stored on that line.
- Payment processing and shipment tracking are outside the relational model.

