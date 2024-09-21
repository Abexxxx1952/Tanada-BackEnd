import { ConfigService } from '@nestjs/config';
import { DataSource } from 'typeorm';
import { config } from 'dotenv';
import * as path from 'path';
config();

const configService = new ConfigService();
const DBType = configService.getOrThrow('DATABASE_TYPE');
const DATABASE_USER = configService.getOrThrow('DATABASE_USER');
const DATABASE_PASSWORD = configService.getOrThrow('DATABASE_PASSWORD');
const DATABASE_HOST = configService.getOrThrow('DATABASE_HOST');
const DATABASE_NAME = configService.getOrThrow('DATABASE_NAME');
const url = `postgresql://${DATABASE_USER}:${DATABASE_PASSWORD}@${DATABASE_HOST}/${DATABASE_NAME}?sslmode=require`;

export const dataSourceOptions = {
  type: DBType,
  url,
  entities: [path.join(__dirname, '/../**/*.entity.{js,ts}')],
  migrations: [path.join(__dirname, '/migrations/**/*{.ts,.js}')],
};

export default new DataSource(dataSourceOptions);
