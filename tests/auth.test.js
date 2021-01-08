const request = require('supertest');
const db = require('../database/dbConfig');
const server = require('../api/server');
// const cleaner = require('knex-cleaner');

// beforeEach(() => {
//   return db.migrate
//     .rollback()
//     .then(() => db.migrate.latest())
//     .then(() => db.seed.run());
// });

describe('POST / register', () => {
  it('registers a user and returns with json', async () => {
    const res = await request(server)
      .post('/api/auth/register')
      .send({
        username: 'don',
        email: 'don@test.com',
        password: 'donnash',
        role: 'attendee'
      });
  });
});