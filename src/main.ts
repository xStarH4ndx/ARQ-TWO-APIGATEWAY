import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, // Quita propiedades que no están en los DTOs
      forbidNonWhitelisted: true, // Lanza error si hay propiedades extras
      transform: true, // Transforma payloads al tipo declarado
    }),
  );
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
