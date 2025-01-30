/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.createTable("wb_tariffs", (table) => {
    table.increments("id").primary();
    table.string("sku");
    table.decimal("coefficient", 10, 2);
    table.date("date");
    table.timestamps(true, true);
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.dropTable("wb_tariffs");
};
