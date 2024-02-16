import { IsEmail, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateUserDtoLocal {
  @IsOptional()
  @IsString()
  readonly name?: string;

  @IsEmail()
  readonly email: string;

  @IsNotEmpty()
  readonly password: string;

  @IsOptional()
  @IsString()
  icon?: string;
}
