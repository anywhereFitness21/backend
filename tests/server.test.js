const request = require('supertest');
const db = require('../database/dbconfig');
const server = require('../api/server');

// //tests if server is working
describe('server', function() {
  it('describes the test working', async function() {
    const res = await request(server).get('/');
    expect(res.type).toBe('application/json');
    expect(res.status).toBe(200);

  });
});