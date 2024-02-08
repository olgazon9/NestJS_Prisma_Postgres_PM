import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  
  // Enable CORS for all origins
  app.enableCors();
  
  // Or, for more specific CORS configuration (e.g., specific origins)
  // app.enableCors({
  //   origin: 'http://localhost:3001', // Allow only this origin
  //   methods: 'GET,HEAD,PUT,PATCH,POST,DELETE', // Allowed methods
  //   allowedHeaders: 'Content-Type, Accept', // Allowed headers
  // });

  // Use global pipes for validation
  app.useGlobalPipes(new ValidationPipe({
    whitelist: true,
    transform: true,
    forbidNonWhitelisted: true,
    disableErrorMessages: false,
  }));

  await app.listen(3000);
  console.log(`Application is running on: ${await app.getUrl()}`);
}

bootstrap();
