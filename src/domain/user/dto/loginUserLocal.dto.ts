import { Transform } from 'class-transformer';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class LoginLocalUserDto {
  @IsEmail()
  @IsNotEmpty()
  @ApiProperty({ type: 'string', format: 'email' })
  readonly email: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
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
