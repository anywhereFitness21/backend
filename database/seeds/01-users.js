exports.seed = function(knex) {
    // Template for inserting seed entries --> I just removed the intitial return function
    return knex('users').insert([
      { username: 'Smith', email: 'smith@test.com', password: 'smithjohnson', role: 'instructor' }, //change these to whatever matches our schema
      { username: 'Ramsha', email: 'ramsha@test.com', password: 'ramshanasir', role: 'attendeee' },
      { username: 'Chase', email: 'chase@test.com', password: 'chasemiller', role: 'attendee' },
      { username: 'Chase', email: 'chases@test.com', password: 'chasesnider', role: 'instructor' },
      { username: 'chris', email: 'chris@test.com', password: 'chrisbarba', role: 'attendee' },
      { username: 'Benaiah', email: 'benaiah@test.com', password: 'benaiahvarner', role: 'instructor' },
      { username: 'Gabriel', email: 'gabriel@test.com', password: 'gabrielanguiano', role: 'instructor' },
      { username: 'Adham', email: 'adham@test.com', password: 'adhamabdelfattah', role: 'instructor' },
      ]);
  };