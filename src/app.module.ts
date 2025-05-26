import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { appConfig, databaseConfig } from './config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './modules/auth/auth.module';
import { UsersModule } from './modules/users/users.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true, // Hace que ConfigModule esté disponible globalmente
      load: [appConfig, databaseConfig], // Carga tus configuraciones
      envFilePath: '.env', // Especifica la ruta de tu archivo .env
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        // eslint-disable-next-line @typescript-eslint/no-misused-promises
        ...configService.get('database'), // Carga la configuración de la base de datos
        autoLoadEntities: true, // Carga automáticamente las entidades
      }),
    }),
    // Tus módulos de dominio
    UsersModule,
    AuthModule,
    // ... otros módulos
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
