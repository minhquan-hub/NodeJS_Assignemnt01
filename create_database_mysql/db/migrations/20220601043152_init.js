/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema
    .createTable("user", (table) => {
      table.increments('id', true).notNullable();
      table.string("name").notNullable();
      table.string("email").notNullable();
    })
    .createTable("salary", (table) => {
      table.increments();
      table.integer("salary").notNullable();
      table.integer("userId", 10).references("id").inTable("user");
    });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.dropTableIfExists("user").dropTableIfExists("salary");
};
