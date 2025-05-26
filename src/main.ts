import { NestFactory } from '@nestjs/core';
import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { TransformInterceptor } from './common/interceptors/transform.interceptor';
import { ConfigService } from '@nestjs/config';
import { config } from 'process';

async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter(),
  );

  const configService = app.get(ConfigService);
  const port = configService.get<number>('APP_PORT') || 3030;

  //!* Configuración global de pipes, filtros e interceptores
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, // Elimina propiedades que no están definidas en el DTO
      forbidNonWhitelisted: true, // Lanza un error si hay propiedades no definidas
      transform: true, // Transforma los payloads a instancias de DTO
    }),
  );
  app.useGlobalFilters(new HttpExceptionFilter());
  app.useGlobalInterceptors(new TransformInterceptor());

  //!* Habilitar CORS (ajusta según tus necesidades de seguridad)
  app.enableCors({
    origin: '*', // Permite cualquier origen (para desarrollo). En producción, especifica tus dominios.
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
  });

  await app.listen(process.env.PORT ?? 3000);
}

bootstrap();
