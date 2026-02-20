import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { AuthGuard } from 'src/auth/guards/auth.guard';
import { JwtService } from '@nestjs/jwt';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      // forbidNonWhitelisted: false,
      transform: true
    })
  );
  // NO Dependency Injection
  // app.useGlobalGuards(new AuthGuard(new JwtService()));

  await app.listen(process.env.PORT ?? 3001);
}

bootstrap().catch((error) => console.log(error));
