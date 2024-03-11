import { Transform, plainToClass } from 'class-transformer';
import {
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsString,
  validateSync,
} from 'class-validator';

export enum Environment {
  Development = 'development',
  Production = 'production',
}

class EnvironmentVariables {
  @IsEnum(Environment)
  @IsNotEmpty()
  MODE: Environment;

  @IsNumber()
  @IsNotEmpty()
  PORT: number;

  @IsString()
  @IsNotEmpty()
  DATABASE_TYPE: string;

  @IsString()
  @IsNotEmpty()
  DATABASE_HOST: string;

  @IsString()
  @IsNotEmpty()
  DATABASE_NAME: string;

  @IsString()
  @IsNotEmpty()
  DATABASE_PASSWORD: string;

  @IsString()
  @IsNotEmpty()
  DATABASE_USER: string;

  @IsString()
  @IsNotEmpty()
  DB_CONNECTION_STRING: string;

  @IsString()
  @IsNotEmpty()
  JWT_ACCESS_TOKEN_SECRET: string;

  @IsNumber()
  @IsNotEmpty()
  @Transform(({ value }) => parseInt(value))
  JWT_ACCESS_TOKEN_EXPIRATION_TIME: number;

  @IsString()
  @IsNotEmpty()
  JWT_REFRESH_TOKEN_SECRET: string;

  @IsNumber()
  @IsNotEmpty()
  @Transform(({ value }) => parseInt(value))
  JWT_REFRESH_TOKEN_EXPIRATION_TIME: number;

  @IsString()
  @IsNotEmpty()
  GOOGLE_OAUTH2_CLIENT_ID: string;

  @IsString()
  @IsNotEmpty()
  GOOGLE_OAUTH2_CLIENT_SECRET: string;

  @IsString()
  @IsNotEmpty()
  GOOGLE_CALLBACK_URL: string;

  /* @IsString()
  GITHUB_OAUTH2_CLIENT_ID: string;

  @IsString()
  GITHUB_OAUTH2_CLIENT_SECRET: string; */
}

export function validate(config: Record<string, unknown>) {
  const validatedConfig = plainToClass(EnvironmentVariables, config, {
    enableImplicitConversion: true,
  });
  const errors = validateSync(validatedConfig, {
    skipMissingProperties: false,
  });

  if (errors.length > 0) {
    throw new Error(errors.toString());
  }
  return validatedConfig;
}
