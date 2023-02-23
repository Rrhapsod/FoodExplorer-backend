export function up(knex) {
  return knex.schema.createTable("orders", (table) => {
    table.increments("id");
    table.integer("total_price");
    table.text("status");
    table
      .integer("user_id")
      .references("id")
      .inTable("users")
      .onDelete("CASCADE");
    table.timestamp("created_at").default(knex.fn.now());
  });
}

export function down(knex) {
  return knex.schema.dropTable("orders");
}
