import { registerAs } from '@nestjs/config';

export default registerAs('app', () => ({
  port: parseInt(process.env.APP_PORT || '3000', 10),
  env: process.env.NODE_ENV || 'development',
  jwtSecret: process.env.JWT_SECRET || 'supersecretjwtkey',
  jwtExpiresIn: process.env.JWT_EXPIRES_IN || '1h',
}));
