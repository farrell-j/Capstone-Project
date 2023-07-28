/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
  return knex.schema.createTable('posts', table => {
    table.increments('post_id').primary();
    table.string('SATCAT_id').unsigned();
    table.foreign('SATCAT_id').references('satellite.SATCAT').onDelete('cascade');
    table.timestamp('date_posted').defaultTo(knex.fn.now());
    table.string('post_text');
    table.string('post_author');
    table.integer('up_votes');
    table.integer('down_votes');
  })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
  return knex.schema.dropTableIfExists('posts');
};
