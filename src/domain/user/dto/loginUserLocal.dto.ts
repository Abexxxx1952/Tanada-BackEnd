import { Transform } from 'class-transformer';
import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class LoginLocalUserDto {
  @IsEmail()
  @ApiProperty({ type: 'string', format: 'email' })
  readonly email: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(1)
  @ApiProperty({ type: 'string', format: 'password' })
  readonly password: string;
}

export class LoginLocalUserDtoWithoutPassword extends LoginLocalUserDto {
  @IsString()
  @IsNotEmpty()
  @Transform(({ obj }) => {
    return `[${typeof obj.password}]`;
  })
  readonly password: string;
}
