import { ApiProperty } from '@nestjs/swagger';
import { LoginLocalUserDto } from '../../../domain/user/dto/loginUserLocal.dto';

export class LoginLocalUser implements LoginLocalUserDto {
  @ApiProperty({ type: 'string', format: 'email' })
  readonly email: string;

  @ApiProperty({ type: 'string', format: 'password' })
  readonly password: string;
}
