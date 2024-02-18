import { IsEmail, IsNotEmpty, IsString } from 'class-validator';
import { Transform } from 'class-transformer';
export class LoginUserDtoLocal {
  @IsEmail()
  @IsNotEmpty()
  readonly email: string;

  @IsString()
  @IsNotEmpty()
  @Transform(({ obj }) => {
    return `[${typeof obj.password}]`;
  })
  readonly password: string;
}
