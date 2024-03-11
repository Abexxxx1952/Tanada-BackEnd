import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';

export class LoginDto {
  @IsEmail()
  @ApiProperty({ type: 'string', format: 'email' })
  readonly email: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(1)
  @ApiProperty({ type: 'string', format: 'password' })
  readonly password: string;
}
