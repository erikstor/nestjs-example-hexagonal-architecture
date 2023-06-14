import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger, ValidationPipe } from '@nestjs/common';
import { HttpExceptionFilter } from './users/infra/exceptions/http-exception.filter';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import * as fs from 'node:fs';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const logger = new Logger();

  const config = new DocumentBuilder()
    .setTitle('Microservicio de usuarios')
    .setDescription(
      'Api que expone las funcionalidades correspondientes al microservicio de usuarios',
    )
    .setVersion('1.0')
    .addTag('Usuarios')
    .addBearerAuth()
    .addServer('api')
    .build();

    const document = SwaggerModule.createDocument(app, config);
    fs.writeFileSync("./swagger-spec.json", JSON.stringify(document));

  
  SwaggerModule.setup('', app, document);

  app.enableCors({
    allowedHeaders: ['GET', 'HEAD', 'PUT', 'PATCH', 'POST', 'DELETE'],
    origin: ['http://localhost:4000/'],
  });
  app.setGlobalPrefix('api');
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
    }),
  );
  app.useGlobalFilters(new HttpExceptionFilter());

  await app.listen(process.env.PORT || 3000);
  logger.log(`App running on port ${process.env.PORT}`);
}

bootstrap();
