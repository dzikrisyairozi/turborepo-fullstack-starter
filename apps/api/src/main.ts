import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Global validation pipe
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );

  // Swagger configuration
  const config = new DocumentBuilder()
    .setTitle('NestJS TypeScript Prisma Starter API')
    .setDescription(
      'A comprehensive starter template for NestJS with TypeScript, Prisma, and essential development tools',
    )
    .setVersion('1.0.0')
    .setContact(
      'API Support',
      'https://github.com/dzikrisyairozi/nest-ts-prisma-starter',
      'support@yourcompany.com',
    )
    .setLicense('MIT', 'https://opensource.org/licenses/MIT')
    .addServer('http://localhost:3000', 'Development server')
    .addServer('https://your-staging-api.com', 'Staging server')
    .addServer('https://your-production-api.com', 'Production server')
    .addBearerAuth(
      {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
        name: 'JWT',
        description: 'Enter JWT token',
        in: 'header',
      },
      'JWT-auth', // This name here is important for matching up with @ApiBearerAuth() in your controller!
    )
    .addApiKey(
      {
        type: 'apiKey',
        name: 'X-API-Key',
        in: 'header',
        description: 'API Key for external integrations',
      },
      'api-key',
    )
    .build();

  const document = SwaggerModule.createDocument(app, config);

  // Setup Swagger UI
  SwaggerModule.setup('api', app, document, {
    swaggerOptions: {
      persistAuthorization: true,
      tagsSorter: 'alpha',
      operationsSorter: 'alpha',
    },
    customSiteTitle: 'NestJS Starter API Documentation',
    customfavIcon: '/favicon.ico',
    customCss: `
      .topbar-wrapper .link {
        content: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="120" height="30"><text x="10" y="20" font-family="Arial" font-size="14" fill="%23333">NestJS Starter</text></svg>');
        width: 120px;
        height: 30px;
      }
      .swagger-ui .topbar { background-color: #f8f9fa; }
    `,
  });

  // Enable CORS for development
  app.enableCors({
    origin:
      process.env.NODE_ENV === 'production'
        ? ['https://your-production-domain.com']
        : true,
    credentials: true,
  });

  const port = process.env.PORT ?? 3002;
  await app.listen(port);

  console.log(`🚀 Application is running on: http://localhost:${port}`);
  console.log(
    `📚 Swagger documentation is available at: http://localhost:${port}/api`,
  );
}

void bootstrap();
