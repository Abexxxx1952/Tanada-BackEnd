import { IsEmail, IsNotEmpty, IsString } from 'class-validator';
export class LoginUserDtoLocal {
  @IsEmail()
  @IsNotEmpty()
  readonly email: string;

  @IsString()
  @IsNotEmpty()
  readonly password: string;
}
