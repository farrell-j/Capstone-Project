/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema.createTable('satellite', table => {
        table.integer('SATCAT').primary();
        table.bigint('created_by_id').unsigned();
        table.foreign('created_by_id').references('user_accounts.DoD_id').onDelete('CASCADE');
        table.string('launch_date');
        table.string('inclination');
        table.string('raan');
        table.string('eccentricity');
        table.string('argument_of_perigee')
        table.string('mean_anomaly')
    })
  
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
  return knex.schema.dropSchemaIfExists('satellite');
};
