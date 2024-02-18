import { IsEmail, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { Transform } from 'class-transformer';
export class CreateUserDtoLocal {
  @IsString()
  @IsOptional()
  @IsNotEmpty()
  readonly name?: string;

  @IsEmail()
  @IsNotEmpty()
  readonly email: string;

  @IsString()
  @IsNotEmpty()
  @Transform(({ obj }) => {
    return `[${typeof obj.password}]`;
  })
  readonly password: string;

  @IsString()
  @IsOptional()
  @IsNotEmpty()
  readonly icon?: string;
}
