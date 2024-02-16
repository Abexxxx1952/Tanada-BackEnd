import { IsEmail, IsNotEmpty } from 'class-validator';

export class LoginUserDtoLocal {
  @IsNotEmpty()
  @IsEmail()
  readonly email: string;

  @IsNotEmpty()
  readonly password: string;
}
