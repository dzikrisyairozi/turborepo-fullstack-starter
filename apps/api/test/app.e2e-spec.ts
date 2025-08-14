import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { App } from 'supertest/types';
import { AppModule } from './../src/app.module';
import { PrismaService } from '../src/prisma/prisma.service';

// Mock PrismaService for E2E tests
const mockPrismaService = {
  $connect: jest.fn(),
  $disconnect: jest.fn(),
  // Add other Prisma methods as needed for your tests
};

describe('AppController (e2e)', () => {
  let app: INestApplication<App>;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    })
      .overrideProvider(PrismaService)
      .useValue(mockPrismaService)
      .compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  afterEach(async () => {
    await app.close();
  });

  it('/ (GET)', () => {
    return request(app.getHttpServer())
      .get('/')
      .expect(200)
      .expect('Hello World!');
  });

  // TODO: Add more E2E tests here
  // Example:
  // it('/users (GET)', () => {
  //   return request(app.getHttpServer())
  //     .get('/users')
  //     .expect(200)
  //     .expect([]);
  // });
});
