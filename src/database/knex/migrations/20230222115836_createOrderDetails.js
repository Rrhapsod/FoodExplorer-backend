export function up(knex) {
  return knex.schema.createTable("orderDetails", (table) => {
    table.increments("id");
    table
      .integer("order_id")
      .references("id")
      .inTable("orders")
      .onDelete("CASCADE");
    table
      .integer("dish_id")
      .references("id")
      .inTable("dishes")
      .onDelete("CASCADE");
    table.integer("quantity");
    table.timestamp("created_at").default(knex.fn.now());
  });
}

export function down(knex) {
  return knex.schema.dropTable("orderDetails");
}
