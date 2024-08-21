import { Field, ArgsType } from '@nestjs/graphql';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';
import { LoginLocalUserDto } from '../../dto/loginUserLocal.dto';

@ArgsType()
export class LoginLocalArgs implements LoginLocalUserDto {
  @Field()
  @IsEmail()
  @IsNotEmpty()
  readonly email: string;

  @Field()
  @IsString()
  @IsNotEmpty()
  readonly password: string;
}
