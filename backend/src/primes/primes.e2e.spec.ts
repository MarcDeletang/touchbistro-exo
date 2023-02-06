import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../app.module';
import { bootstrap } from '../bootstrap';

describe('Primes Controller (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();
    app = moduleFixture.createNestApplication();
    await bootstrap(app);
    await app.init();
  });

  describe('Validation', () => {
    it('returns an error on validation on empty max value', async () => {
      const res = await request(app.getHttpServer()).get('/primes/median');
      expect(res.status).toBe(400);
      expect(res.body).toStrictEqual({
        statusCode: 400,
        message: [
          'max must not be greater than 1000000',
          'max must not be less than 3',
          'max must be an integer number',
        ],
        error: 'Bad Request',
      });
    });

    it('returns an error on validation on max value < 3', async () => {
      const res = await request(app.getHttpServer())
        .get('/primes/median')
        .query({ max: 2 });

      expect(res.status).toBe(400);
      expect(res.body).toStrictEqual({
        statusCode: 400,
        message: ['max must not be less than 3'],
        error: 'Bad Request',
      });
    });
  });

  describe('Valid case', () => {
    it('returns 3 when max === 6', async () => {
      const res = await request(app.getHttpServer())
        .get('/primes/median')
        .query({ max: 6 });
      expect(res.status).toBe(200);
      expect(res.body).toStrictEqual([3]);
    });

    it('returns 7 when max === 18', async () => {
      const res = await request(app.getHttpServer())
        .get('/primes/median')
        .query({ max: 18 });
      expect(res.status).toBe(200);
      expect(res.body).toStrictEqual([7]);
    });

    it('returns 7, 11 when max === 20', async () => {
      const res = await request(app.getHttpServer())
        .get('/primes/median')
        .query({ max: 20 });
      expect(res.status).toBe(200);
      expect(res.body).toStrictEqual([7, 11]);
    });

    it('returns 27763 when max === 60000', async () => {
      const res = await request(app.getHttpServer())
        .get('/primes/median')
        .query({ max: 60000 });
      expect(res.status).toBe(200);
      expect(res.body).toStrictEqual([27763]);
    });
  });
});
