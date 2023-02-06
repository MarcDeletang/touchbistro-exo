import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './app.module';
import { bootstrap } from './bootstrap';
import { cors } from './config';

const corsResponseHeader = 'access-control-allow-origin';

describe('Testing CORS setup', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();
    app = moduleFixture.createNestApplication();
    await bootstrap(app);
    await app.init();
  });

  it('Should return a valid access-control-allow-origin header', async () => {
    const res = await request(app.getHttpServer()).options('/');
    expect(res.header[corsResponseHeader]).toBe(cors);
    expect(res.status).toBe(204);
  });
});
