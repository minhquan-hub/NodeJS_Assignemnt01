/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {
  // truncate all existing tables
  await knex.raw('TRUNCATE TABLE user');
  await knex.raw('TRUNCATE TABLE salary');

  // Deletes ALL existing entries
  await knex('user').insert([
    {
      id: 1,
      name: 'Quan',
      email: 'quan@gmail.com'
    },
    {
      id: 2,
      name: 'Tuan',
      email: 'tuan@gmail.com'
    },
    {
      id: 3,
      name: 'Minh',
      email: 'minh@gmail.com'
    }
  ]);

  await knex('salary').insert([
    {
      id: 1,
      salary: 1000,
      userId: 1
    },
    {
      id: 2,
      salary: 1500,
      userId: 2
    }
  ]);

  return 
};
