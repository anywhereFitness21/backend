const server = require('../api/server');
const request = require('supertest');
const db = require('../database/dbconfig');

beforeEach(() => {
  return db.migrate
    .rollback()
    .then(() => db.migrate.latest())
    .then(() => db.seed.run());
});

describe('Get every classes', () => {
  it('GET /api/classes', async () => {
    const res = await request(server).get('/api/classes');
    expect(res.status).toBe(200);
  });
});

describe('Get all classes & error', () => {
  it('GET /api/classes', async () => {
    const res = await request(server).get('/api/classes');
    expect(res.type).toMatch(/json/i);
  });
});

describe('Post class', () => {
  it('POST /api/classes', async () => {
    const res = await request(server)
      .post('/api/classes')
      .send({ class_name: 'yoga', class_duration: '35 minutes', class_intensity_level: 'low', class_city: 'Arlington Heights', start_time: '8am' });
    expect(res.body.class_name).toBe('yoga');
  });
});

describe('register the user', () => {
  it('POST /api/auth/register', async () => {
    const res = await request(server)
      .post('/api/auth/register')
      .send({ username: 'Jon', email: 'jon@gmail.com', password: 'jon65', role: 'attendee' });
    expect(res.status).toBe(200);
  });
});

describe('login a user', () => {
  it('POST /api/auth/login', async () => {
    const signup = await request(server)
      .post('/api/auth/register')
      .send({ username: 'Jon', email: 'jon@aol.com', password: 'jon65', role: 'attendee' })
      .then(async () => {
        const res = await request(server)
          .post('/api/auth/login')
          .send({ username: 'Jon', password: 'jon65' });
        expect(res.status).toBe(200);
        expect(res.body.user.role).toBe('attendee');
      });
  });
});

describe('Put a class', () => {
  it('Put /api/classes/1', async () => {
    const res = await request(server)
      .post('/api/classes')
      .send({ class_name: 'yoga', class_duration: '35 minutes', class_intensity_level: 'low', class_city: 'Arlington Heights', start_time: '8am' });
    const edit = await request(server)
      .put('/api/classes/1')
      .send({ class_name: 'hot yoga' });
    expect(edit.status).toBe(201);
  });
});