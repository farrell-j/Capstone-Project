/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('posts').del()
  await knex('posts').insert([
    {SATCAT_id: 25544, date_posted: '2023-07-24T12:34:56Z' , post_text: 'testing, testing, testing', },
    {SATCAT_id: 24907, date_posted: '2023-07-24T12:34:56Z' , post_text: 'testing, testing, testing', },
  
  ]);
};
