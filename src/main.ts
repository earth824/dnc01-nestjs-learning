import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { GlobalFilter } from 'src/common/filters/global.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      // forbidNonWhitelisted: false,
      transform: true
    })
  );

  app.useGlobalFilters(new GlobalFilter());
  // NO Dependency Injection
  // app.useGlobalGuards(new AuthGuard(new JwtService()));

  await app.listen(process.env.PORT ?? 3001);
}

bootstrap().catch((error) => console.log(error));
