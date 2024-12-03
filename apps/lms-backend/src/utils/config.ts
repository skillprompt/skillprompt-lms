import { config } from 'dotenv';

config({
  path: '.env',
});

export const env = {
  NODE_ENV: process.env.NODE_ENV || 'development',
  HOST: process.env.HOST ?? 'localhost',
  PORT: Number(process.env.PORT) || 4000,
  FRONTEND_URI: 'frontend_uri',
  DataBase_URI: process.env.DataBase_URI || '',
  JWT_SECRET: process.env.JWT_SECRET || '',
} as const;
