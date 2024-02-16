import { IsEmail, IsNotEmpty, IsOptional, IsString } from 'class-validator';
export class UpdateUserDto {
  @IsString()
  @IsNotEmpty()
  @IsOptional()
  readonly name?: string;

  @IsEmail()
  @IsNotEmpty()
  @IsOptional()
  readonly email?: string;

  @IsString()
  @IsNotEmpty()
  @IsOptional()
  readonly password?: string;

  @IsString()
  @IsNotEmpty()
  @IsOptional()
  readonly icon?: string;
}
