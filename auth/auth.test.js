const request = require('supertest');
const db = require('../database/dbconfig');
const server = require('../api/server');

beforeEach(() => {
  return db.migrate
    .rollback()
    .then(() => db.migrate.latest())
    .then(() => db.seed.run());
});

describe('post register', () => {
  it('register user and returns json', async () => {
    const res = await request(server)
      .post('/api/auth/register')
      .send({
        username: 'Ramsha',
        email: 'ramsha@test.com',
        password: 'ramshanasir',
        role: 'attendee'
      });
    expect(res.status).toBe(200);
  });
});

describe('login', () => {
  it('Status 201', async () => {
    const res = await request(server)
      .post('/api/auth/register')
      .send({
        username: 'Ramsha',
        email: 'ramsha@test.com',
        password: 'ramshanasir',
        role: 'attendee'
      });
    const response = await request(server)
      .post('/api/auth/login')
      .send({
        username: 'ramsha',
        password: 'ramshanasir'
      });
    expect(response.status).toBe(200);
    expect(response.body.user).toHaveProperty('id');
    expect(response.body.user).toHaveProperty('token');
    expect(response.body.user).toMatchObject({ role: 'attendee' });
  });
});