const bcrypt = require('bcrypt');

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  // await knex.schema.raw('TRUNCATE user_accounts CASCADE');
  // await knex.schema.raw('ALTER SEQUENCE user_accounts_id_seq RESTART WITH 1');
  await knex('user_accounts').del()
  await knex('user_accounts').insert([
    {DoD_id: BigInt(1234567890), 
      firstname: 'Jon', 
      lastname: 'Arbuckle', 
      email: 'jon.arbuckle@spaceforce.mil', 
      organization: 'SPACECOM', 
      password: bcrypt.hashSync('authorized', 10), 
      moderator: true},
    {DoD_id: BigInt(2134567890), 
      firstname: 'Charlie', 
      lastname: 'Brown', 
      email: 'charlie.brown@spaceforce.mil', 
      organization: 'NRO', 
      password: bcrypt.hashSync('operations', 10), 
      moderator: false},
    {DoD_id: BigInt(3124567890), 
      firstname: 'Christopher', 
      lastname: 'Robin', 
      email: 'christoper.robin@spaceforce.mil', 
      organization: 'NGA', 
      password: bcrypt.hashSync('collection', 10), 
      moderator: false}
  ]);
};
