import { registerAs } from '@nestjs/config';

export default registerAs('database', () => ({
  type: 'postgres',
  host: process.env.DB_HOST || 'localhost',
  port: parseInt(process.env.DB_PORT ?? '5445', 10),
  username: process.env.DB_USERNAME || 'postgres',
  password: process.env.DB_PASSWORD || 'password',
  database: process.env.DB_DATABASE || 'my_api_db',
  synchronize: process.env.DB_SYNCHRONIZE === 'true', // ¡Cuidado con `synchronize` en producción!
  logging: process.env.DB_LOGGING === 'true',
  entities: [__dirname + '/../**/*.entity{.ts,.js}'],
  migrations: [__dirname + '/../migrations/*.js'], // Si usas migraciones
  cli: {
    migrationsDir: 'src/migrations',
  },
}));
