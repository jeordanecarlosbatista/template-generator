import { Express } from 'express';
import request = require('supertest');
import { setupApp } from '@main/config/app';

let app: Express;

describe('CORS Middleware', () => {
  beforeAll(async () => {
    app = setupApp();
  });

  test('Should enable CORS', async () => {
    app.get('/test_cors', (req, res) => {
      res.send();
    });
    await request(app)
      .get('/test_cors')
      .expect('access-control-allow-origin', '*')
      .expect('access-control-allow-methods', '*')
      .expect('access-control-allow-headers', '*');
  });
});
