// Run once in mongosh against a fresh exercise database.
// These records are fictional events for the case study.
(async function () {
  db = db.getSiblingDB('portfolio_nosql');
  if ((await db.getCollectionNames()).includes("purchase_events")) {
    throw new Error('The exercise collection already exists. Use a fresh database.');
  }

  // The validator checks the stable event fields while details can vary.
  await db.createCollection("purchase_events", {
    validator: {
    "$jsonSchema": {
        "bsonType": "object",
        "required": [
            "_id",
            "schemaVersion",
            "simulation",
            "eventType",
            "occurredAt",
            "source",
            "embedded",
            "references",
            "details"
        ],
        "properties": {
            "_id": {
                "bsonType": "string",
                "minLength": 1
            },
            "schemaVersion": {
                "enum": [
                    1
                ]
            },
            "simulation": {
                "enum": [
                    true
                ]
            },
            "eventType": {
                "bsonType": "string",
                "enum": [
                    "order_placed",
                    "item_added"
                ]
            },
            "occurredAt": {
                "bsonType": "date"
            },
            "source": {
                "bsonType": "object",
                "required": [
                    "entity",
                    "key",
                    "snapshot"
                ],
                "properties": {
                    "entity": {
                        "enum": [
                            "order_items"
                        ]
                    },
                    "key": {
                        "bsonType": "object",
                        "required": [
                            "order_item_id"
                        ]
                    },
                    "snapshot": {
                        "bsonType": "object"
                    }
                }
            },
            "embedded": {
                "bsonType": "object"
            },
            "references": {
                "bsonType": "object"
            },
            "details": {
                "bsonType": "object"
            }
        }
    }
},
    validationLevel: 'strict', validationAction: 'error'
  });

  // Insert the four example events and show their IDs.
  printjson(await db.getCollection("purchase_events").insertMany([
    {
        "_id": "event_000001",
        "schemaVersion": 1,
        "simulation": true,
        "eventType": "order_placed",
        "occurredAt": ISODate("2030-01-01T10:00:00Z"),
        "source": {
            "entity": "order_items",
            "key": {
                "order_item_id": 301
            },
            "snapshot": {
                "order_item_id": 301,
                "order_id": 201,
                "product_id": 101,
                "quantity": 1,
                "unit_price": 79.5
            }
        },
        "embedded": {
            "orders": [
                {
                    "key": {
                        "order_id": 201
                    },
                    "snapshot": {
                        "order_id": 201,
                        "customer_id": 1,
                        "placed_at": "2026-02-01T14:15:00Z",
                        "status": "placed"
                    },
                    "via": [
                        "order_items.order_id → orders"
                    ]
                }
            ],
            "customers": [
                {
                    "key": {
                        "customer_id": 1
                    },
                    "snapshot": {
                        "customer_id": 1,
                        "email": "ava@example.test",
                        "display_name": "Ava Morgan",
                        "created_at": "2026-01-10T09:00:00Z"
                    },
                    "via": [
                        "order_items.order_id → orders.customer_id → customers"
                    ]
                }
            ],
            "products": [
                {
                    "key": {
                        "product_id": 101
                    },
                    "snapshot": {
                        "product_id": 101,
                        "sku": "JKT-001",
                        "product_name": "Classic Denim Jacket",
                        "category": "outerwear",
                        "unit_price": 79.5,
                        "stock_quantity": 12,
                        "active": true
                    },
                    "via": [
                        "order_items.product_id → products"
                    ]
                }
            ]
        },
        "references": {},
        "details": {
            "channel": "web"
        }
    },
    {
        "_id": "event_000002",
        "schemaVersion": 1,
        "simulation": true,
        "eventType": "item_added",
        "occurredAt": ISODate("2030-01-01T10:01:00Z"),
        "source": {
            "entity": "order_items",
            "key": {
                "order_item_id": 301
            },
            "snapshot": {
                "order_item_id": 301,
                "order_id": 201,
                "product_id": 101,
                "quantity": 1,
                "unit_price": 79.5
            }
        },
        "embedded": {
            "orders": [
                {
                    "key": {
                        "order_id": 201
                    },
                    "snapshot": {
                        "order_id": 201,
                        "customer_id": 1,
                        "placed_at": "2026-02-01T14:15:00Z",
                        "status": "placed"
                    },
                    "via": [
                        "order_items.order_id → orders"
                    ]
                }
            ],
            "customers": [
                {
                    "key": {
                        "customer_id": 1
                    },
                    "snapshot": {
                        "customer_id": 1,
                        "email": "ava@example.test",
                        "display_name": "Ava Morgan",
                        "created_at": "2026-01-10T09:00:00Z"
                    },
                    "via": [
                        "order_items.order_id → orders.customer_id → customers"
                    ]
                }
            ],
            "products": [
                {
                    "key": {
                        "product_id": 101
                    },
                    "snapshot": {
                        "product_id": 101,
                        "sku": "JKT-001",
                        "product_name": "Classic Denim Jacket",
                        "category": "outerwear",
                        "unit_price": 79.5,
                        "stock_quantity": 12,
                        "active": true
                    },
                    "via": [
                        "order_items.product_id → products"
                    ]
                }
            ]
        },
        "references": {},
        "details": {
            "channel": "mobile",
            "note": "Illustrative event-specific metadata",
            "examples": {
                "coupon_code": "illustrative coupon_code",
                "variant_attributes": "illustrative variant_attributes",
                "payment_reference": "illustrative payment_reference",
                "delivery_note": "illustrative delivery_note"
            }
        }
    },
    {
        "_id": "event_000003",
        "schemaVersion": 1,
        "simulation": true,
        "eventType": "order_placed",
        "occurredAt": ISODate("2030-01-01T10:02:00Z"),
        "source": {
            "entity": "order_items",
            "key": {
                "order_item_id": 302
            },
            "snapshot": {
                "order_item_id": 302,
                "order_id": 202,
                "product_id": 102,
                "quantity": 2,
                "unit_price": 64
            }
        },
        "embedded": {
            "orders": [
                {
                    "key": {
                        "order_id": 202
                    },
                    "snapshot": {
                        "order_id": 202,
                        "customer_id": 2,
                        "placed_at": "2026-02-02T16:45:00+00:00",
                        "status": "placed"
                    },
                    "via": [
                        "order_items.order_id → orders"
                    ]
                }
            ],
            "customers": [
                {
                    "key": {
                        "customer_id": 2
                    },
                    "snapshot": {
                        "customer_id": 2,
                        "email": "leo@example.test",
                        "display_name": "Leo Chen",
                        "created_at": "2026-01-11T10:30:00+00:00"
                    },
                    "via": [
                        "order_items.order_id → orders.customer_id → customers"
                    ]
                }
            ],
            "products": [
                {
                    "key": {
                        "product_id": 102
                    },
                    "snapshot": {
                        "product_id": 102,
                        "sku": "DRS-002",
                        "product_name": "Linen Summer Dress",
                        "category": "dresses",
                        "unit_price": 64,
                        "stock_quantity": 8,
                        "active": true
                    },
                    "via": [
                        "order_items.product_id → products"
                    ]
                }
            ]
        },
        "references": {},
        "details": {
            "channel": "web"
        }
    },
    {
        "_id": "event_000004",
        "schemaVersion": 1,
        "simulation": true,
        "eventType": "item_added",
        "occurredAt": ISODate("2030-01-01T10:03:00Z"),
        "source": {
            "entity": "order_items",
            "key": {
                "order_item_id": 302
            },
            "snapshot": {
                "order_item_id": 302,
                "order_id": 202,
                "product_id": 102,
                "quantity": 2,
                "unit_price": 64
            }
        },
        "embedded": {
            "orders": [
                {
                    "key": {
                        "order_id": 202
                    },
                    "snapshot": {
                        "order_id": 202,
                        "customer_id": 2,
                        "placed_at": "2026-02-02T16:45:00+00:00",
                        "status": "placed"
                    },
                    "via": [
                        "order_items.order_id → orders"
                    ]
                }
            ],
            "customers": [
                {
                    "key": {
                        "customer_id": 2
                    },
                    "snapshot": {
                        "customer_id": 2,
                        "email": "leo@example.test",
                        "display_name": "Leo Chen",
                        "created_at": "2026-01-11T10:30:00+00:00"
                    },
                    "via": [
                        "order_items.order_id → orders.customer_id → customers"
                    ]
                }
            ],
            "products": [
                {
                    "key": {
                        "product_id": 102
                    },
                    "snapshot": {
                        "product_id": 102,
                        "sku": "DRS-002",
                        "product_name": "Linen Summer Dress",
                        "category": "dresses",
                        "unit_price": 64,
                        "stock_quantity": 8,
                        "active": true
                    },
                    "via": [
                        "order_items.product_id → products"
                    ]
                }
            ]
        },
        "references": {},
        "details": {
            "channel": "mobile",
            "note": "Illustrative event-specific metadata",
            "examples": {
                "coupon_code": "illustrative coupon_code",
                "variant_attributes": "illustrative variant_attributes",
                "payment_reference": "illustrative payment_reference",
                "delivery_note": "illustrative delivery_note"
            }
        }
    }
]));
  await db.getCollection("purchase_events").createIndex({eventType: 1, occurredAt: -1}, {name: 'event_type_time'});

  // 1. Find the first sample event type (up to five documents).
  printjson(await db.getCollection("purchase_events").find({"eventType":"order_placed"}).sort({_id:1}).limit(5).toArray());

  // 2. Find events for the first source record using nested key fields (up to five).
  printjson(await db.getCollection("purchase_events").find({"source.key.order_item_id":301}).sort({_id:1}).limit(5).toArray());

  // 3. Find events in the sample time range using a MongoDB Date filter (up to five).
  printjson(await db.getCollection("purchase_events").find({"occurredAt":{"$gte":ISODate("2030-01-01T10:00:00Z"), "$lt":ISODate("2030-01-01T11:00:00Z")}}).sort({_id:1}).limit(5).toArray());

  // 4. Count documents for each event type.
  printjson(await db.getCollection("purchase_events").aggregate([{"$group":{"_id":"$eventType", "documentCount":{"$sum":1}}}, {"$sort":{"_id":1}}]).toArray());

  // A date stored as text should be rejected by the validator.
  try {
    await db.getCollection("purchase_events").insertOne({...{
    "_id": "event_000001",
    "schemaVersion": 1,
    "simulation": true,
    "eventType": "order_placed",
    "occurredAt": ISODate("2030-01-01T10:00:00Z"),
    "source": {
        "entity": "order_items",
        "key": {
            "order_item_id": 301
        },
        "snapshot": {
            "order_item_id": 301,
            "order_id": 201,
            "product_id": 101,
            "quantity": 1,
            "unit_price": 79.5
        }
    },
    "embedded": {
        "orders": [
            {
                "key": {
                    "order_id": 201
                },
                "snapshot": {
                    "order_id": 201,
                    "customer_id": 1,
                    "placed_at": "2026-02-01T14:15:00Z",
                    "status": "placed"
                },
                "via": [
                    "order_items.order_id → orders"
                ]
            }
        ],
        "customers": [
            {
                "key": {
                    "customer_id": 1
                },
                "snapshot": {
                    "customer_id": 1,
                    "email": "ava@example.test",
                    "display_name": "Ava Morgan",
                    "created_at": "2026-01-10T09:00:00Z"
                },
                "via": [
                    "order_items.order_id → orders.customer_id → customers"
                ]
            }
        ],
        "products": [
            {
                "key": {
                    "product_id": 101
                },
                "snapshot": {
                    "product_id": 101,
                    "sku": "JKT-001",
                    "product_name": "Classic Denim Jacket",
                    "category": "outerwear",
                    "unit_price": 79.5,
                    "stock_quantity": 12,
                    "active": true
                },
                "via": [
                    "order_items.product_id → products"
                ]
            }
        ]
    },
    "references": {},
    "details": {
        "channel": "web"
    }
}, _id: 'invalid_date_example', occurredAt: 'not-a-date'});
  } catch (error) { print('Invalid date error: ' + error.code); }

  // Reusing an event ID should be rejected by the unique _id index.
  try { await db.getCollection("purchase_events").insertOne({
    "_id": "event_000001",
    "schemaVersion": 1,
    "simulation": true,
    "eventType": "order_placed",
    "occurredAt": ISODate("2030-01-01T10:00:00Z"),
    "source": {
        "entity": "order_items",
        "key": {
            "order_item_id": 301
        },
        "snapshot": {
            "order_item_id": 301,
            "order_id": 201,
            "product_id": 101,
            "quantity": 1,
            "unit_price": 79.5
        }
    },
    "embedded": {
        "orders": [
            {
                "key": {
                    "order_id": 201
                },
                "snapshot": {
                    "order_id": 201,
                    "customer_id": 1,
                    "placed_at": "2026-02-01T14:15:00Z",
                    "status": "placed"
                },
                "via": [
                    "order_items.order_id → orders"
                ]
            }
        ],
        "customers": [
            {
                "key": {
                    "customer_id": 1
                },
                "snapshot": {
                    "customer_id": 1,
                    "email": "ava@example.test",
                    "display_name": "Ava Morgan",
                    "created_at": "2026-01-10T09:00:00Z"
                },
                "via": [
                    "order_items.order_id → orders.customer_id → customers"
                ]
            }
        ],
        "products": [
            {
                "key": {
                    "product_id": 101
                },
                "snapshot": {
                    "product_id": 101,
                    "sku": "JKT-001",
                    "product_name": "Classic Denim Jacket",
                    "category": "outerwear",
                    "unit_price": 79.5,
                    "stock_quantity": 12,
                    "active": true
                },
                "via": [
                    "order_items.product_id → products"
                ]
            }
        ]
    },
    "references": {},
    "details": {
        "channel": "web"
    }
}); }
  catch (error) { print('Duplicate ID error: ' + error.code); }

  print('Document count: ' + await db.getCollection("purchase_events").countDocuments());
})().catch(error => { print(error.stack || String(error)); quit(1); });
