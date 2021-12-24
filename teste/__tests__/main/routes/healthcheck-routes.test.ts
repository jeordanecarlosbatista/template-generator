import { setupApp } from '@main/config/app';
import { Express } from 'express';
import request from 'supertest';

let app: Express;

describe('HealthCheck Routes', () => {
  beforeAll(() => {
    app = setupApp();
  });

  describe('GET /healthcheck', () => {
    test('Should return 200 on health checked', async () => {
      await request(app)
        .get('/api/healthcheck')
        .expect(200);
    });
  });
});
