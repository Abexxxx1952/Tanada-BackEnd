import { Transform } from 'class-transformer';
import { IsEmail, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateUserDtoLocal {
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  @ApiPropertyOptional()
  readonly name?: string;

  @IsEmail()
  @IsNotEmpty()
  @ApiProperty({ type: 'string', format: 'email' })
  readonly email: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  readonly password: string;

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  @ApiPropertyOptional()
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
