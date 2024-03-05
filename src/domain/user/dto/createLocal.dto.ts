import { Transform } from 'class-transformer';
import { IsEmail, IsNotEmpty, IsOptional, IsString } from 'class-validator';

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
  readonly password: string;

  @IsString()
  @IsOptional()
  @IsNotEmpty()
  readonly icon?: string;
}

export class CreateUserDtoLocalWithoutPassword extends CreateUserDtoLocal {
  @IsString()
  @IsNotEmpty()
  @Transform(({ obj }) => {
    return `[${typeof obj.password}]`;
  })
  readonly password: string;
}
