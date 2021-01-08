const request = require('supertest');
const db = require('../database/dbconfig');
const server = require('../api/server');

beforeEach(() => {
  return db.migrate
    .rollback()
    .then(() => db.migrate.latest())
    .then(() => db.seed.run());
});

// all users
describe('Get all users', () => {
  it('Status code 200', async () => {
    const res = await request(server).get('/api/users');
    // console.log(res.body);
    expect(res.status).toBe(200);
    expect(res.body).toHaveLength(10);
  });
});

//single user
describe('GET single user', () => {
  it('Status code 200 / single user', async () => {
    const res = await request(server).get('/api/users/1');
    expect(res.status).toBe(200);
  });
});

//update user
describe('PUT users/1', () => {
  it('update one user. Status code 201', async () => {
    const res = await request(server)
      .post('/api/auth/register')
      .send({
        username: 'Ramsha',
        email: 'ramsha@test.com',
        password: 'ramshanasir',
        role: 'attendee'
      });
    const edit = await request(server)
      .put('/api/users/11')
      .send({
        username: 'ramsha',
        email: 'nasir@test.com',
        password: 'nasirramsha',
        role: 'instructor'
      });
    console.log(edit.body);
    expect(edit.status).toBe(201);
    expect(edit.body).not.toMatchObject({ username: 'Ramsha' });
  });
});

// //delete user
describe('DELETE single user', () => {
  it('Status code 200 and user deleted', async () => {
    const res = await request(server).delete('/api/users/1');
    expect(res.status).toBe(200);
    expect(res.type).toBe('application/json');
  });
});