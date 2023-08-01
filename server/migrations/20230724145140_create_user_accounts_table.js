/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
  return knex.schema.createTable('user_accounts', table => {
    table.string('DoD_id').primary();
    table.string('firstname');
    table.string('lastname');
    table.string('email');
    table.string('organization');
    table.string('password');
    table.boolean('moderator').defaultTo(false);
    table.boolean('banned').defaultTo(false);
  })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    return knex.schema.dropTableIfExists('user_accounts')
};
